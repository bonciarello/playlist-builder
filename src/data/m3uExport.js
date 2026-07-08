/**
 * Genera e scarica un file .m3u a partire dalla playlist.
 */

/**
 * Crea il contenuto di un file M3U.
 * Formato esteso con #EXTINF per includere durata e metadati.
 */
export function generateM3U(playlist) {
  const lines = ['#EXTM3U'];
  lines.push(`#PLAYLIST:${playlistName(playlist.criteria)}`);
  lines.push('');

  for (const track of playlist.tracks) {
    lines.push(`#EXTINF:${track.durationSec},${track.artist} - ${track.title}`);
    lines.push(`#EXTALB:${track.album}`);
    lines.push(`#EXTGENRE:${track.genre}`);
    lines.push(`${track.artist} - ${track.title}.mp3`);
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Costruisce un nome descrittivo per la playlist.
 */
function playlistName(criteria) {
  const parts = [];
  if (criteria.genre) parts.push(criteria.genre.charAt(0).toUpperCase() + criteria.genre.slice(1));
  if (criteria.mood) parts.push(criteria.mood.charAt(0).toUpperCase() + criteria.mood.slice(1));
  if (criteria.decade) parts.push(criteria.decade);
  return parts.join(' - ') || 'Playlist';
}

/**
 * Scarica il file M3U nel browser.
 */
export function downloadM3U(playlist) {
  const content = generateM3U(playlist);
  const blob = new Blob([content], { type: 'audio/x-mpegurl' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const name = playlistName(playlist.criteria).replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s+/g, '_');
  link.href = url;
  link.download = `${name}.m3u`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
