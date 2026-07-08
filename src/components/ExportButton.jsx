export default function ExportButton({ playlist, onExport }) {
  if (!playlist || playlist.tracks.length === 0) return null;

  return (
    <button
      className="btn btn--export"
      onClick={() => onExport(playlist)}
      type="button"
      aria-label="Esporta la playlist in formato M3U"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Esporta M3U
    </button>
  );
}
