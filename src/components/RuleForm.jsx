import { useState } from 'react';

const GENRE_OPTIONS = [
  { value: '', label: 'Qualsiasi genere' },
  { value: 'rock', label: 'Rock' },
  { value: 'pop', label: 'Pop' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'electronic', label: 'Elettronica' },
  { value: 'hiphop', label: 'Hip Hop' },
  { value: 'classical', label: 'Classica' },
  { value: 'folk', label: 'Folk' },
  { value: 'metal', label: 'Metal' },
  { value: 'soul', label: 'Soul / R&B' },
  { value: 'reggae', label: 'Reggae' },
];

const MOOD_OPTIONS = [
  { value: '', label: 'Qualsiasi umore' },
  { value: 'happy', label: 'Allegro' },
  { value: 'energetic', label: 'Energico' },
  { value: 'relaxed', label: 'Rilassato' },
  { value: 'sad', label: 'Malinconico' },
  { value: 'romantic', label: 'Romantico' },
  { value: 'dark', label: 'Cupo / Aggressivo' },
];

const DECADE_OPTIONS = [
  { value: '', label: 'Qualsiasi decennio' },
  { value: '1950s', label: "Anni '50" },
  { value: '1960s', label: "Anni '60" },
  { value: '1970s', label: "Anni '70" },
  { value: '1980s', label: "Anni '80" },
  { value: '1990s', label: "Anni '90" },
  { value: '2000s', label: 'Anni 2000' },
  { value: '2010s', label: 'Anni 2010' },
  { value: '2020s', label: 'Anni 2020' },
];

const BPM_OPTIONS = [
  { value: '', label: 'Qualsiasi BPM' },
  { value: 'slow', label: 'Lento (60–90 BPM)' },
  { value: 'medium', label: 'Medio (90–130 BPM)' },
  { value: 'fast', label: 'Veloce (130–200 BPM)' },
];

export default function RuleForm({ onGenerate, isGenerating }) {
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [decade, setDecade] = useState('');
  const [bpm, setBpm] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!description.trim()) {
      newErrors.description = 'Descrivi cosa vuoi ascoltare, ad esempio "rock allegro anni 80".';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onGenerate({
      description: description.trim(),
      explicitCriteria: {
        genre: genre || null,
        mood: mood || null,
        decade: decade || null,
        bpm: bpm || null,
      },
    });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description && e.target.value.trim()) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.description;
        return next;
      });
    }
  };

  return (
    <form className="rule-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group form-group--main">
        <label htmlFor="description" className="form-label">
          Cosa vuoi ascoltare?
        </label>
        <input
          id="description"
          type="text"
          className={`form-input form-input--large ${errors.description ? 'form-input--error' : ''}`}
          placeholder='Descrivi la tua playlist, ad esempio "rock allegro anni 80"...'
          value={description}
          onChange={handleDescriptionChange}
          onBlur={validate}
          aria-describedby={errors.description ? 'desc-error' : 'desc-hint'}
          autoFocus
        />
        <span id="desc-hint" className="form-hint">
          Scrivi genere, umore, decennio o BPM. Il generatore interpreterà la tua richiesta.
        </span>
        {errors.description && (
          <span id="desc-error" className="form-error" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <fieldset className="form-fieldset">
        <legend className="form-legend">Affina con i selettori</legend>
        <div className="form-selectors">
          <div className="form-group">
            <label htmlFor="genre" className="form-label">Genere</label>
            <select id="genre" className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
              {GENRE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mood" className="form-label">Umore</label>
            <select id="mood" className="form-select" value={mood} onChange={(e) => setMood(e.target.value)}>
              {MOOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="decade" className="form-label">Decennio</label>
            <select id="decade" className="form-select" value={decade} onChange={(e) => setDecade(e.target.value)}>
              {DECADE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bpm" className="form-label">BPM</label>
            <select id="bpm" className="form-select" value={bpm} onChange={(e) => setBpm(e.target.value)}>
              {BPM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <button type="submit" className="btn btn--primary" disabled={isGenerating}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        {isGenerating ? 'Genero la playlist...' : 'Genera playlist'}
      </button>
    </form>
  );
}
