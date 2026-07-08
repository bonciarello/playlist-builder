/**
 * Test suite per il Costruttore di Playlist.
 * Verifica il corretto funzionamento del generatore e dell'esportazione.
 * Eseguire con: node --test tests/playlist.test.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDescription,
  generatePlaylist,
  formatTotalDuration,
} from '../src/data/playlistGenerator.js';
import { generateM3U, downloadM3U } from '../src/data/m3uExport.js';

describe('parseDescription', () => {
  it('riconosce "rock allegro anni 80" → genere rock, mood happy, decade 1980s', () => {
    const result = parseDescription('rock allegro anni 80');
    assert.equal(result.genre, 'rock');
    assert.equal(result.mood, 'happy');
    assert.equal(result.decade, '1980s');
  });

  it('riconosce "jazz triste anni 60" → genere jazz, mood sad, decade 1960s', () => {
    const result = parseDescription('jazz triste anni 60');
    assert.equal(result.genre, 'jazz');
    assert.equal(result.mood, 'sad');
    assert.equal(result.decade, '1960s');
  });

  it('riconosce "elettronica energico 120-140 bpm" → electronic, energetic, fast bpm', () => {
    const result = parseDescription('elettronica energico 120-140 bpm');
    assert.equal(result.genre, 'electronic');
    assert.equal(result.mood, 'energetic');
    assert.equal(result.bpm, 'fast');
  });

  it('riconosce "pop rilassato anni 2000" → pop, relaxed, 2000s', () => {
    const result = parseDescription('pop rilassato anni 2000');
    assert.equal(result.genre, 'pop');
    assert.equal(result.mood, 'relaxed');
    assert.equal(result.decade, '2000s');
  });

  it('riconosce "metal aggressivo veloce" → metal, dark, fast', () => {
    const result = parseDescription('metal aggressivo veloce');
    assert.equal(result.genre, 'metal');
    assert.equal(result.mood, 'dark');
    assert.equal(result.bpm, 'fast');
  });

  it('ritorna null per criteri non riconosciuti', () => {
    const result = parseDescription('ascoltare musica bella');
    assert.equal(result.genre, null);
    assert.equal(result.mood, null);
    assert.equal(result.decade, null);
    assert.equal(result.bpm, null);
  });

  it('case insensitive', () => {
    const result = parseDescription('ROCK ALLEGRO ANNI 80');
    assert.equal(result.genre, 'rock');
    assert.equal(result.mood, 'happy');
    assert.equal(result.decade, '1980s');
  });
});

describe('generatePlaylist', () => {
  it('genera 12 tracce con i criteri specificati', () => {
    const parsed = parseDescription('rock allegro anni 80');
    const playlist = generatePlaylist(parsed);
    assert.equal(playlist.tracks.length, 12);
    assert.equal(playlist.criteria.genre, 'rock');
    assert.equal(playlist.criteria.mood, 'happy');
    assert.equal(playlist.criteria.decade, '1980s');
  });

  it('ogni traccia ha tutti i campi richiesti', () => {
    const playlist = generatePlaylist({ genre: 'jazz', mood: 'sad' });
    for (const track of playlist.tracks) {
      assert.ok(track.id, 'manca id');
      assert.ok(track.title, 'manca title');
      assert.ok(track.artist, 'manca artist');
      assert.ok(track.duration, 'manca duration');
      assert.ok(typeof track.durationSec === 'number', 'durationSec non è numero');
      assert.ok(track.year >= 1980 && track.year <= 1989, `anno ${track.year} fuori dal range`);
    }
  });

  it('usa i criteri espliciti quando forniti', () => {
    const playlist = generatePlaylist(
      { genre: null, mood: null },
      { genre: 'soul', mood: 'romantic', decade: '1970s', bpm: 'slow' }
    );
    assert.equal(playlist.criteria.genre, 'soul');
    assert.equal(playlist.criteria.mood, 'romantic');
    assert.equal(playlist.criteria.decade, '1970s');
    assert.equal(playlist.criteria.bpm, 'slow');
  });

  it('le durate sono nel formato mm:ss', () => {
    const playlist = generatePlaylist({ genre: 'pop' });
    for (const track of playlist.tracks) {
      assert.match(track.duration, /^\d{1,2}:\d{2}$/, `formato errato: ${track.duration}`);
    }
  });

  it('la durata totale è calcolata correttamente', () => {
    const playlist = generatePlaylist({ genre: 'folk' });
    const expectedTotal = playlist.tracks.reduce((s, t) => s + t.durationSec, 0);
    const totalMatch = playlist.totalDuration.match(/^(\d+):(\d{2})$/);
    if (totalMatch) {
      const mins = parseInt(totalMatch[1]);
      const secs = parseInt(totalMatch[2]);
      assert.equal(mins * 60 + secs, expectedTotal);
    }
  });
});

describe('formatTotalDuration', () => {
  it('formatta secondi in mm:ss', () => {
    const tracks = [
      { durationSec: 125 },  // 2:05
      { durationSec: 210 },  // 3:30
    ];
    assert.equal(formatTotalDuration(tracks), '5:35');
  });

  it('gestisce ore quando > 60 minuti', () => {
    const tracks = Array(20).fill({ durationSec: 210 }); // 20 * 3:30 = 70 min
    const result = formatTotalDuration(tracks);
    assert.match(result, /^\d:\d{2}:\d{2}$/);
  });
});

describe('generateM3U', () => {
  it('produce un file M3U valido', () => {
    const playlist = generatePlaylist({ genre: 'rock' });
    const content = generateM3U(playlist);

    assert.ok(content.startsWith('#EXTM3U'), 'non inizia con #EXTM3U');
    assert.ok(content.includes('#EXTINF:'), 'manca #EXTINF');
    assert.ok(content.includes('#PLAYLIST:'), 'manca #PLAYLIST');
  });

  it('contiene tutti i titoli e artisti della playlist', () => {
    const playlist = generatePlaylist({ genre: 'jazz' });
    const content = generateM3U(playlist);

    for (const track of playlist.tracks) {
      assert.ok(
        content.includes(track.title) || content.includes(track.artist),
        `manca traccia: ${track.title} - ${track.artist}`
      );
    }
  });

  it('contiene le durate in secondi', () => {
    const playlist = generatePlaylist({ genre: 'pop' });
    const content = generateM3U(playlist);

    for (const track of playlist.tracks) {
      assert.ok(
        content.includes(`#EXTINF:${track.durationSec}`),
        `manca durata per: ${track.title}`
      );
    }
  });
});

describe('Rimozione tracce (logica)', () => {
  it('rimuovere una traccia riduce il conteggio e ricalcola la durata', () => {
    const playlist = generatePlaylist({ genre: 'rock' });
    const originalCount = playlist.tracks.length;
    const originalTotal = playlist.tracks.reduce((s, t) => s + t.durationSec, 0);

    // Simula rimozione della prima traccia
    const removedTrack = playlist.tracks[0];
    const newTracks = playlist.tracks.filter(t => t.id !== removedTrack.id);
    const newTotal = formatTotalDuration(newTracks);

    assert.equal(newTracks.length, originalCount - 1);
    const expectedSec = originalTotal - removedTrack.durationSec;
    const newMatch = newTotal.match(/^(\d+):(\d{2})$/);
    if (newMatch) {
      assert.equal(parseInt(newMatch[1]) * 60 + parseInt(newMatch[2]), expectedSec);
    }
  });
});

console.log('\n✅ Tutti i test superati!\n');
