export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-brand">
          <div className="brand-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" fill="var(--color-accent)" />
              <circle cx="50" cy="50" r="30" fill="var(--color-surface)" />
              <circle cx="50" cy="50" r="6" fill="var(--color-accent)" />
              <line x1="50" y1="20" x2="50" y2="38" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
              <rect x="38" y="38" width="24" height="4" rx="2" fill="var(--color-accent-2)" />
              <rect x="38" y="46" width="18" height="4" rx="2" fill="var(--color-accent-2)" opacity="0.7" />
              <rect x="38" y="54" width="22" height="4" rx="2" fill="var(--color-accent-3)" opacity="0.5" />
            </svg>
          </div>
          <div>
            <h1 className="brand-name">Costruttore di Playlist</h1>
            <p className="brand-tagline">Descrivi la musica che vuoi sentire. Noi la mettiamo in scaletta.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
