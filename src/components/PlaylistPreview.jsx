import { useState } from 'react';
import TrackItem from './TrackItem';
import { criteriaLabels } from '../data/playlistGenerator';

export default function PlaylistPreview({ playlist, onRegenerate, onRemoveTrack }) {
  const [removingId, setRemovingId] = useState(null);

  if (!playlist || playlist.tracks.length === 0) {
    return (
      <div className="playlist-empty">
        <div className="playlist-empty-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <p className="playlist-empty-text">
          La tua playlist apparirà qui.<br />
          Descrivi cosa vuoi ascoltare e premi <strong>Genera playlist</strong>.
        </p>
      </div>
    );
  }

  const labels = criteriaLabels(playlist.criteria);

  const handleRemove = (id) => {
    setRemovingId(id);
    // Piccolo delay per l'animazione
    setTimeout(() => {
      onRemoveTrack(id);
      setRemovingId(null);
    }, 200);
  };

  return (
    <section className="playlist-preview" aria-label="Anteprima playlist">
      <header className="playlist-header">
        <div className="playlist-header-info">
          <h2 className="playlist-title">La tua playlist</h2>
          <div className="playlist-criteria">
            <span className="criteria-tag">{labels.genre}</span>
            <span className="criteria-tag">{labels.mood}</span>
            <span className="criteria-tag">{labels.decade}</span>
            <span className="criteria-tag">{labels.bpm}</span>
          </div>
        </div>
        <div className="playlist-header-actions">
          <span className="playlist-stats">
            {playlist.tracks.length} brani &middot; {playlist.totalDuration}
          </span>
          <button
            className="btn btn--secondary"
            onClick={onRegenerate}
            type="button"
            aria-label="Genera una nuova playlist con gli stessi criteri"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Rigenera
          </button>
        </div>
      </header>

      <ol className="track-list">
        {playlist.tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            onRemove={handleRemove}
          />
        ))}
      </ol>
    </section>
  );
}
