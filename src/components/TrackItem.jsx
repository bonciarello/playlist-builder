export default function TrackItem({ track, index, onRemove }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRemove(track.id);
    }
  };

  return (
    <li className="track-item">
      <span className="track-number" aria-label={`Traccia ${index + 1}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <button
        className="track-play-btn"
        aria-label={`Riproduci ${track.title}`}
        type="button"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      </button>
      <div className="track-info">
        <span className="track-title">{track.title}</span>
        <span className="track-artist">{track.artist}</span>
      </div>
      <div className="track-meta">
        <span className="track-year">{track.year}</span>
        <span className="track-bpm">{track.bpm} BPM</span>
      </div>
      <span className="track-duration">{track.duration}</span>
      <button
        className="track-remove-btn"
        onClick={() => onRemove(track.id)}
        onKeyDown={handleKeyDown}
        aria-label={`Rimuovi ${track.title} dalla playlist`}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
}
