/**
 * Generatore di playlist mock basato su regole descrittive.
 * Interpreta il testo libero e i criteri selezionati per produrre
 * una playlist fittizia coerente con titoli, artisti e durate plausibili.
 */

// ── Database mock di titoli e artisti per genere ──────────────────────────

const TITLE_POOLS = {
  rock: [
    "Fuoco nella notte", "Catene di acciaio", "Orizzonte ribelle",
    "L'ultimo viaggio", "Tempesta elettrica", "Anime di pietra",
    "Sulle strade del vento", "Lupi solitari", "Grido nel deserto",
    "Frammenti di ieri", "La città che dorme", "Senza ritorno",
    "Notti di tuono", "Confini di vetro", "Ruggine e polvere",
    "Il giorno dopo", "Sotto la pelle", "Binari paralleli",
    "Stelle cadenti", "Muro di suono"
  ],
  pop: [
    "Brillano le vetrine", "Domenica mattina", "Fiore di città",
    "Giorni di sole", "Danza leggera", "Vento d'estate",
    "Parole al miele", "Luna park", "Biciclette bianche",
    "Specchio rotto", "Acqua fresca", "Fotografie sparse",
    "Nuvole rosa", "Radio libera", "Senza parole",
    "Maglia a righe", "Dolce attesa", "Onde del mare",
    "Ballo da sola", "Mattina presto"
  ],
  jazz: [
    "Fumo blu", "Scala cromatica", "Note di mezzanotte",
    "Il sentiero nascosto", "Velluto rosso", "Ombre lunghe",
    "Preludio d'autunno", "L'ospite silenzioso", "Chiave di volta",
    "Trame sotterranee", "Riflessi d'ambra", "Settima minore",
    "Passi sul marciapiede", "Lampioni accesi", "Studio n. 4",
    "After Midnight", "Saxophone Serenade", "The Blue Hour",
    "Whisper Not", "Round Midnight"
  ],
  electronic: [
    "Pixel dust", "Neon highways", "Digital sunrise",
    "Binary dreams", "Circuit breaker", "Synthetic pulse",
    "Data stream", "Laser rain", "Hologram city",
    "Zero gravity", "Phase shift", "Quantum groove",
    "Signal lost", "Chrome horizon", "Pulse width",
    "Input output", "Grid runner", "Flux state",
    "Voltage drop", "Cache memory"
  ],
  hiphop: [
    "Quartiere alto", "Rime di strada", "Blocco note",
    "Sottopasso", "Grazie a nessuno", "Muri parlanti",
    "Cerchi sull'asfalto", "Cassa dritta", "Luci gialle",
    "Marciapiedi", "Codice d'onore", "Zona 7",
    "Notti bianche", "Sottozero", "Ringhi e versi",
    "Passo dopo passo", "Fuori dal coro", "Orologio rotto",
    "Radio quartiere", "Senza filtro"
  ],
  classical: [
    "Adagio in Re minore", "Variazioni sul tema", "Studio op. 23",
    "Notturno n. 2", "Sonata al chiaro di luna", "Fuga a quattro voci",
    "Preludio op. 15", "Danza delle ombre", "Intermezzo lirico",
    "Concerto per archi", "Elegia in Sol", "Toccata e fuga",
    "Walzer triste", "Capriccio n. 5", "Sinfonia breve",
    "Romanza senza parole", "Aria in La maggiore", "Scherzo op. 31",
    "Pastorale", "Rondò finale"
  ],
  folk: [
    "Campo di grano", "La ballata del pescatore", "Vento del nord",
    "Sentieri di casa", "Mani callose", "Fieno d'estate",
    "Il canto della terra", "Fontana vecchia", "Colline verdi",
    "Tratturi", "Luna sui tetti", "Acqua di fonte",
    "Filastrocca antica", "Mestieri perduti", "Radici",
    "Giorno di festa", "Canti alla brina", "Madre terra",
    "La via del ritorno", "Corde di canapa"
  ],
  metal: [
    "Forgiato nel fuoco", "Muro di spine", "Abisso nero",
    "Sentenza finale", "Dominio di ferro", "Carne e metallo",
    "Grido primordiale", "Sangue e cenere", "Occhi di ghiaccio",
    "Colosso caduto", "La furia dentro", "Risveglio oscuro",
    "Cataclisma", "Lame incrociate", "Sepolto vivo",
    "Idra a sette teste", "Nessuna pietà", "Echi di guerra",
    "Torre di silenzio", "Battaglione"
  ],
  soul: [
    "Calore umano", "Velluto e seta", "Sussurri nella notte",
    "Abbraccio lento", "Corde vocali", "Domenica migliore",
    "Passo felpato", "Anima scalza", "Luce dorata",
    "Battito d'ali", "Miele e limone", "Storia infinita",
    "Respiro profondo", "Nuda verità", "Pelle d'oca",
    "Oro colato", "Notte fonda", "A braccia aperte",
    "Carezze di voce", "Il peso del cuore"
  ],
  reggae: [
    "Onda su onda", "Sole allo zenit", "Sabbia dorata",
    "Rasta pace", "Isola verde", "Ritmo lento",
    "Cocco e lime", "Brezza marina", "Tramonto rosso",
    "Marcia tranquilla", "One Love Road", "Giamaica blues",
    "Conchiglie e coralli", "Dreadlock sun", "Passo leggero",
    "Marea crescente", "Banana boat", "Cielo terso",
    "Acque calme", "Palma al vento"
  ]
};

const ARTIST_POOLS = {
  rock: [
    "I Nomadi Elettrici", "Gli Insonni", "Marco Tempesta",
    "Le Ombre del Vespro", "Lupo Solitario", "Nucleo 9",
    "I Sovversivi", "Senza Resa", "Aria Pesante",
    "Cristallo Nero", "Ponte Sospeso", "I Fuggitivi"
  ],
  pop: [
    "Chiara Luce", "Alessio Mare", "Le Bollicine",
    "Giorgia Vento", "I Colori", "Sofia Stella",
    "Nico Blu", "Le Nuvole", "Alice Prato",
    "Diego Luna", "Coriandoli", "I Battiti"
  ],
  jazz: [
    "Paolo Notturno Trio", "Blue Note Society", "Ella's Echo",
    "Il Quartetto Sospeso", "Miles Away", "Velvet Underground Jazz",
    "Thelonio Monkfish", "Sax Gordon", "Lady Daydream",
    "Count Basic", "Charles Minguccio", "Bill E. Holiday"
  ],
  electronic: [
    "Synthwave Runner", "Pixel Drift", "Neon Circuit",
    "Data Ghost", "Flux Capacitor", "Binary Star",
    "Deep Phase", "Chrome Waves", "Grid System",
    "Laser Lips", "Voltage Vault", "Hologram Kid"
  ],
  hiphop: [
    "Kappa Zero", "Django Flow", "Minus 9",
    "La Squadra", "Rime Urbane", "Blocco Est",
    "Deejay Zanna", "MC Ruggine", "Pietro Barre",
    "Sottoscala", "I Veri", "Nitro Fresh"
  ],
  classical: [
    "Orchestra Filarmonica di Milano", "Quartetto Aretino",
    "Camerata Fiorentina", "I Solisti Veneti", "Ensemble Barocco",
    "Pianista Anonimo", "Sinfonietta Romana", "Duo Clementi"
  ],
  folk: [
    "I Canterini", "Terra Mia", "Suono Antico",
    "Radici Profonde", "Cantastorie Errante", "Lino Corda",
    "I Viandanti", "Gente di Campagna", "Valle Incantata"
  ],
  metal: [
    "Ferro Battuto", "Abisso", "Giudizio Finale",
    "Nero Assoluto", "Dominion", "Requiem Metallico",
    "Carneficina", "SetteSpade", "Mastodonte"
  ],
  soul: [
    "Otis Redding Jr.", "Aretha's Children", "The Night Shift",
    "Sam & The Cookies", "Velvet Voices", "Marvin's Door",
    "The Soul Kitchen", "Gladys Nightfall", "Curtis Mayfly"
  ],
  reggae: [
    "The Wailers Tribute", "Marley's Sons", "Island Breeze",
    "Trenchtown Roots", "Dub Foundation", "Kingston Collective",
    "Sunrise Riddim", "Coconut Crew", "I Jah People"
  ]
};

// ── Mappatura parole chiave → criteri ────────────────────────────────────

const GENRE_KEYWORDS = {
  rock: ["rock", "rock and roll", "rock'n'roll", "hard rock", "punk", "indie rock", "alternative rock"],
  pop: ["pop", "pop rock", "synth pop", "dance pop", "electropop"],
  jazz: ["jazz", "blues", "swing", "bebop", "fusion", "cool jazz"],
  electronic: ["elettronica", "electronic", "techno", "house", "ambient", "trance", "edm", "synth", "elettronico"],
  hiphop: ["hip hop", "hip-hop", "rap", "trap", "hiphop"],
  classical: ["classica", "classico", "orchestra", "sinfonia", "opera", "barocco", "classical"],
  folk: ["folk", "cantautore", "acustico", "popolare", "tradizionale", "acoustic"],
  metal: ["metal", "heavy metal", "thrash", "death metal", "black metal", "doom"],
  soul: ["soul", "r&b", "rhythm and blues", "motown", "funk", "groove"],
  reggae: ["reggae", "ska", "dub", "dancehall"],
};

const MOOD_KEYWORDS = {
  happy: ["allegro", "felice", "gioioso", "divertente", "spensierato", "euforico", "happy", "allegra", "felici", "gioia"],
  sad: ["triste", "malinconico", "nostalgico", "deprimente", "lacrime", "sad", "tristi", "malinconia", "pianto"],
  energetic: ["energico", "potente", "carico", "esplosivo", "frenetico", "adrenalinico", "energy", "energetic", "forte"],
  relaxed: ["rilassato", "calmo", "tranquillo", "chill", "soffice", "morbido", "relax", "calma", "tranquillità"],
  dark: ["cupo", "oscuro", "tenebroso", "aggressivo", "rabbioso", "duro", "cattivo", "dark", "aggressive"],
  romantic: ["romantico", "sentimentale", "passionale", "amore", "love", "cuore", "sospiro", "passione"],
};

const DECADE_KEYWORDS = {
  "1950s": ["anni 50", "anni '50", "anni cinquanta", "1950", "50s", "fifties"],
  "1960s": ["anni 60", "anni '60", "anni sessanta", "1960", "60s", "sixties"],
  "1970s": ["anni 70", "anni '70", "anni settanta", "1970", "70s", "seventies"],
  "1980s": ["anni 80", "anni '80", "anni ottanta", "1980", "80s", "eighties"],
  "1990s": ["anni 90", "anni '90", "anni novanta", "1990", "90s", "nineties"],
  "2000s": ["anni 2000", "2000", "duemila", "00s", "two thousands"],
  "2010s": ["anni 2010", "2010", "duemiladieci", "10s"],
  "2020s": ["anni 2020", "2020", "duemilaventi", "20s"],
};

const BPM_KEYWORDS = {
  slow: ["lento", "lenta", "slow", "bpm basso", "rilassato", "calmo", "adagio"],
  medium: ["medio", "media", "moderato", "andante", "bpm medio", "normale"],
  fast: ["veloce", "rapido", "fast", "bpm alto", "allegro", "presto", "frenetico"],
};

/**
 * Analizza il testo descrittivo ed estrae i criteri riconosciuti.
 */
export function parseDescription(text) {
  const lower = text.toLowerCase().trim();
  const criteria = {
    genre: null,
    mood: null,
    decade: null,
    bpm: null,
  };

  for (const [genre, keywords] of Object.entries(GENRE_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      criteria.genre = genre;
      break;
    }
  }

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      criteria.mood = mood;
      break;
    }
  }

  for (const [decade, keywords] of Object.entries(DECADE_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      criteria.decade = decade;
      break;
    }
  }

  for (const [bpmRange, keywords] of Object.entries(BPM_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      criteria.bpm = bpmRange;
      break;
    }
  }

  // Controlla anche un range di BPM numerico (es. "120-140 bpm")
  const bpmMatch = lower.match(/(\d{2,3})\s*[-–]\s*(\d{2,3})\s*(?:bpm)?/);
  if (bpmMatch) {
    const [_, min, max] = bpmMatch;
    const avg = (parseInt(min) + parseInt(max)) / 2;
    if (avg < 90) criteria.bpm = 'slow';
    else if (avg < 130) criteria.bpm = 'medium';
    else criteria.bpm = 'fast';
  }

  return criteria;
}

/**
 * Genera una playlist fittizia basata sui criteri.
 */
export function generatePlaylist(parsedCriteria, explicitCriteria = {}) {
  const criteria = {
    genre: explicitCriteria.genre || parsedCriteria.genre || 'rock',
    mood: explicitCriteria.mood || parsedCriteria.mood || 'happy',
    decade: explicitCriteria.decade || parsedCriteria.decade || '1980s',
    bpm: explicitCriteria.bpm || parsedCriteria.bpm || 'medium',
  };

  const trackCount = 12;
  const titles = TITLE_POOLS[criteria.genre] || TITLE_POOLS.rock;
  const artists = ARTIST_POOLS[criteria.genre] || ARTIST_POOLS.rock;

  // Decade range
  const decadeRanges = {
    '1950s': [1950, 1959],
    '1960s': [1960, 1969],
    '1970s': [1970, 1979],
    '1980s': [1980, 1989],
    '1990s': [1990, 1999],
    '2000s': [2000, 2009],
    '2010s': [2010, 2019],
    '2020s': [2020, 2026],
  };
  const [decadeStart, decadeEnd] = decadeRanges[criteria.decade] || [1980, 1989];

  // BPM range
  const bpmRanges = {
    slow: [60, 90],
    medium: [90, 130],
    fast: [130, 200],
  };
  const [bpmMin, bpmMax] = bpmRanges[criteria.bpm] || [90, 130];

  // Shuffle array helper
  const shuffled = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const shuffledTitles = shuffled(titles);
  const shuffledArtists = shuffled(artists);

  const tracks = [];
  for (let i = 0; i < trackCount; i++) {
    const titleIdx = i % shuffledTitles.length;
    const artistIdx = i % shuffledArtists.length;
    // Ensure no duplicate title+artist combo
    let title = shuffledTitles[titleIdx];
    let artist = shuffledArtists[artistIdx];
    if (tracks.some(t => t.title === title && t.artist === artist)) {
      title = shuffledTitles[(titleIdx + Math.floor(Math.random() * 5) + 1) % shuffledTitles.length];
      artist = shuffledArtists[(artistIdx + Math.floor(Math.random() * 3) + 1) % shuffledArtists.length];
    }

    const minSec = 2 * 60 + 30;  // 2:30
    const maxSec = 5 * 60 + 30;  // 5:30
    const durationSec = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
    const minutes = Math.floor(durationSec / 60);
    const seconds = durationSec % 60;
    const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const year = Math.floor(Math.random() * (decadeEnd - decadeStart + 1)) + decadeStart;
    const bpm = Math.floor(Math.random() * (bpmMax - bpmMin + 1)) + bpmMin;

    tracks.push({
      id: `track-${i}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      artist,
      album: `${title} (${year} Remaster)`,
      duration,
      durationSec,
      year,
      bpm,
      genre: criteria.genre,
    });
  }

  return {
    criteria,
    tracks,
    totalDuration: formatTotalDuration(tracks),
  };
}

/**
 * Formatta la durata totale in mm:ss (o h:mm:ss).
 */
export function formatTotalDuration(tracks) {
  const totalSec = tracks.reduce((sum, t) => sum + t.durationSec, 0);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Traduce i valori dei criteri in etichette leggibili.
 */
export function criteriaLabels(criteria) {
  const genreLabels = {
    rock: 'Rock', pop: 'Pop', jazz: 'Jazz', electronic: 'Elettronica',
    hiphop: 'Hip Hop', classical: 'Classica', folk: 'Folk',
    metal: 'Metal', soul: 'Soul / R&B', reggae: 'Reggae',
  };
  const moodLabels = {
    happy: 'Allegro', sad: 'Malinconico', energetic: 'Energico',
    relaxed: 'Rilassato', dark: 'Cupo / Aggressivo', romantic: 'Romantico',
  };
  const bpmLabels = {
    slow: 'Lento (60-90 BPM)', medium: 'Medio (90-130 BPM)', fast: 'Veloce (130-200 BPM)',
  };
  const decadeLabels = {
    '1950s': 'Anni \'50', '1960s': 'Anni \'60', '1970s': 'Anni \'70',
    '1980s': 'Anni \'80', '1990s': 'Anni \'90', '2000s': 'Anni 2000',
    '2010s': 'Anni 2010', '2020s': 'Anni 2020',
  };

  return {
    genre: genreLabels[criteria.genre] || criteria.genre,
    mood: moodLabels[criteria.mood] || criteria.mood,
    bpm: bpmLabels[criteria.bpm] || criteria.bpm,
    decade: decadeLabels[criteria.decade] || criteria.decade,
  };
}
