import { useState, useCallback } from 'react';
import Header from './components/Header';
import RuleForm from './components/RuleForm';
import PlaylistPreview from './components/PlaylistPreview';
import ExportButton from './components/ExportButton';
import { parseDescription, generatePlaylist, formatTotalDuration } from './data/playlistGenerator';
import { downloadM3U } from './data/m3uExport';
import './App.css';

export default function App() {
  const [playlist, setPlaylist] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(({ description, explicitCriteria }) => {
    setIsGenerating(true);
    setLastRequest({ description, explicitCriteria });

    // Simula un breve caricamento per feedback
    setTimeout(() => {
      const parsed = parseDescription(description);
      const newPlaylist = generatePlaylist(parsed, explicitCriteria);
      setPlaylist(newPlaylist);
      setIsGenerating(false);
    }, 400);
  }, []);

  const handleRegenerate = useCallback(() => {
    if (!lastRequest) return;
    setIsGenerating(true);
    setTimeout(() => {
      const parsed = parseDescription(lastRequest.description);
      const newPlaylist = generatePlaylist(parsed, lastRequest.explicitCriteria);
      setPlaylist(newPlaylist);
      setIsGenerating(false);
    }, 300);
  }, [lastRequest]);

  const handleRemoveTrack = useCallback((trackId) => {
    setPlaylist((prev) => {
      if (!prev) return prev;
      const newTracks = prev.tracks.filter((t) => t.id !== trackId);
      return {
        ...prev,
        tracks: newTracks,
        totalDuration: formatTotalDuration(newTracks),
      };
    });
  }, []);

  const handleExport = useCallback((pl) => {
    downloadM3U(pl);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <RuleForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        <PlaylistPreview
          playlist={playlist}
          onRegenerate={handleRegenerate}
          onRemoveTrack={handleRemoveTrack}
        />
        <div className="app-actions">
          <ExportButton playlist={playlist} onExport={handleExport} />
        </div>
      </main>
      <footer className="app-footer">
        <p>Costruttore di Playlist &mdash; Genera scalette descrivendo la musica a parole.</p>
      </footer>
    </div>
  );
}
