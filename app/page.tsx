"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

const chapters = ["Welcome", "Why you", "The stairs", "Memories", "Cinema", "Voices", "Soundtrack", "The table", "A wish", "Your card"];
const defaultPhotos = [
  "/generated/birthday-doorway.webp",
  "/generated/birthday-cake.webp",
  "/generated/birthday-balcony.webp",
];

const timeline = [
  ["2026", "This birthday", "A whole little world, made just to celebrate you."],
  ["2024", "That brave thing", "You did it scared, and somehow made courage look effortless."],
  ["2022", "The beginning", "The year a small decision quietly changed everything."],
  ["2019", "Our favourite chaos", "No plan, no sleep, and still one of the best days ever."],
  ["Always", "The golden thread", "You kept becoming more yourself — and we kept loving every version."],
];

const films = [
  { title: "The happiest kind of chaos", length: "0:48", note: "The laugh right at the end is the whole reason this clip lives here." },
  { title: "One more adventure", length: "1:12", note: "Nobody knew where we were going. You made it feel like the point." },
  { title: "A very questionable dance", length: "0:36", note: "For legal reasons, we will call this choreography." },
];

const voiceNotes = [
  { name: "Riya", length: "0:42", note: "I tried to keep this normal. I lasted eleven seconds. Happy birthday, my favourite human." },
  { name: "The group chat", length: "1:18", note: "Six people, one microphone, absolutely no ability to speak in turns." },
  { name: "Home", length: "0:51", note: "A quiet reminder that wherever you go, you are always someone’s favourite notification." },
];

const soundtrack = [
  ["01", "Main character morning", "For opening the curtains like today was written for you."],
  ["02", "Windows-down anthem", "For the drives where nobody knew the words but everyone committed."],
  ["03", "The soft one", "For late nights, honest talks, and the version of you only close friends know."],
  ["04", "Birthday forever", "Non-negotiable. Loud every year. No skipping."],
];

const guestWishes = [
  ["Riya", "You make ordinary days feel like stories worth keeping."],
  ["Your people", "Thank you for always saving us a seat — literally and otherwise."],
  ["The group chat", "Happy birthday to the person who makes the bad ideas memorable."],
  ["Home", "Go be brilliant. Eat something first."],
];

export default function BirthdayStory() {
  const [chapter, setChapter] = useState(-1);
  const [editorOpen, setEditorOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("birthday-story-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [selectedFilm, setSelectedFilm] = useState(0);
  const [openVoice, setOpenVoice] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [name, setName] = useState("Emma");
  const [age, setAge] = useState("21");
  const [from, setFrom] = useState("Riya");
  const [relationship, setRelationship] = useState("friend");
  const [special, setSpecial] = useState("Your kind heart, the way you make everyone laugh, and how you always show up");
  const [message, setMessage] = useState("Happy birthday to my favourite adventure buddy. Life is softer, brighter and so much more fun with you in it. Here’s to everything waiting for you this year.");
  const [photos, setPhotos] = useState<string[]>([]);
  const pointerStartX = useRef<number | null>(null);

  const qualities = useMemo(() => {
    const parts = special.split(",").map((item) => item.trim()).filter(Boolean);
    return [parts[0] || "Your kind heart", parts[1] || "The best laughs", parts[2] || "Always showing up"];
  }, [special]);
  const gallery = photos.length ? photos : defaultPhotos;

  const next = () => setChapter((value) => Math.min(value + 1, 9));
  const previous = () => setChapter((value) => Math.max(value - 1, -1));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("birthday-story-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (editorOpen) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editorOpen]);

  const uploadPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).slice(0, 4);
    photos.forEach((photo) => {
      if (photo.startsWith("blob:")) URL.revokeObjectURL(photo);
    });
    setPhotos(files.map((file) => URL.createObjectURL(file)));
  };

  const finishSwipe = (clientX: number) => {
    if (pointerStartX.current === null || editorOpen) return;
    const distance = clientX - pointerStartX.current;
    if (Math.abs(distance) > 55) {
      if (distance < 0) next();
      else previous();
    }
    pointerStartX.current = null;
  };

  return (
    <main
      className="story-shell"
      onPointerDown={(event) => { pointerStartX.current = event.clientX; }}
      onPointerUp={(event) => finishSwipe(event.clientX)}
    >
      <Confetti count={46} />
      <p className="sr-status" aria-live="polite">{chapter < 0 ? "Birthday story entrance" : `Room ${chapter + 1} of 10: ${chapters[chapter]}`}</p>

      <header className="story-header">
        <button className="logo" onClick={() => setChapter(-1)} aria-label="Back to the beginning">
          <span>m</span><b>made for you</b>
        </button>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme((value) => value === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span className="theme-toggle-track" aria-hidden="true"><i>{theme === "light" ? "☀" : "☾"}</i></span>
            <b>{theme === "light" ? "Light" : "Dark"}</b>
          </button>
          <button className="personalise" onClick={() => setEditorOpen(true)}>Personalise <span>✦</span></button>
        </div>
      </header>

      <nav className="chapter-nav" aria-label="Birthday story chapters">
        {chapters.map((label, index) => (
          <button key={label} className={chapter === index ? "active" : chapter > index ? "done" : ""} onClick={() => setChapter(index)}>
            <i>{index + 1}</i><span>{label}</span>
          </button>
        ))}
      </nav>

      <section className={`panel hero-panel ${chapter === -1 ? "show" : ""}`} aria-hidden={chapter !== -1}>
        <img src="/generated/birthday-doorway.webp" width="1536" height="1024" fetchPriority="high" alt="Pastel birthday room with balloons and an open blue doorway" />
        <div className="image-wash" />
        <div className="hero-copy">
          <p className="overline">A little birthday world for {name}</p>
          <h1>Something lovely<br />is waiting <em>inside.</em></h1>
          <p className="lead">Ten little rooms. A thousand reasons to celebrate you.</p>
          <button className="cta" onClick={next}>Step inside <span>→</span></button>
        </div>
        <div className="hero-tag"><span>{age}</span><p>looks good<br />on you.</p></div>
        <p className="hint">Use the arrows or your keyboard to wander</p>
      </section>

      <section className={`panel welcome-panel ${chapter === 0 ? "show" : ""}`} aria-hidden={chapter !== 0}>
        <div className="soft-orb orb-one" /><div className="soft-orb orb-two" />
        <div className="welcome-card">
          <span className="mini-confetti">✦ &nbsp; ● &nbsp; ✦</span>
          <p className="overline">Room one · just for you</p>
          <h2>Hi, {name}.</h2>
          <p>This place is filled with the little things that make you impossible not to love.</p>
          <button className="text-link" onClick={next}>Keep wandering <span>→</span></button>
        </div>
        <div className="floating-note note-one">today is<br /><b>all yours</b><span>♥</span></div>
        <div className="floating-note note-two">from {from},<br />with love</div>
      </section>

      <section className={`panel qualities-panel ${chapter === 1 ? "show" : ""}`} aria-hidden={chapter !== 1}>
        <div className="section-heading">
          <p className="overline">Room two · the very best bits</p>
          <h2>A few things we<br />love about <em>you.</em></h2>
        </div>
        <div className="quality-grid">
          {qualities.map((quality, index) => (
            <article key={quality} className={`quality-card quality-${index + 1}`}>
              <span>{["♥", "☀", "✦"][index]}</span><small>0{index + 1}</small><p>{quality}</p>
            </article>
          ))}
        </div>
        <p className="tiny-note">And honestly? This list could go on forever.</p>
      </section>

      <section className={`panel timeline-panel ${chapter === 2 ? "show" : ""}`} aria-hidden={chapter !== 2}>
        <div className="section-heading timeline-heading">
          <p className="overline">Room three · one step at a time</p>
          <h2>The years that<br />made <em>you.</em></h2>
          <p>Every landing keeps a little piece of the story.</p>
        </div>
        <div className="timeline-stairs">
          {timeline.map(([year, title, note], index) => (
            <article key={year} style={{ "--step": index } as React.CSSProperties}>
              <b>{year}</b><div><strong>{title}</strong><p>{note}</p></div>
            </article>
          ))}
        </div>
        <span className="stairs-doodle">keep going ↗</span>
      </section>

      <section className={`panel memories-panel ${chapter === 3 ? "show" : ""}`} aria-hidden={chapter !== 3}>
        <div className="section-heading memory-heading">
          <p className="overline">Room four · our favourite frames</p>
          <h2>Keep these<br /><em>close.</em></h2>
          <p>Good days, blurry nights, and all the beautiful bits in between.</p>
        </div>
        <div className="photo-stack">
          {gallery.slice(0, 3).map((photo, index) => (
            <figure key={`${photo}-${index}`} className={`memory-photo memory-${index + 1}`}>
              <img src={photo} width="1536" height="1024" loading="lazy" decoding="async" alt={photos.length ? `Uploaded memory ${index + 1}` : `Birthday memory placeholder ${index + 1}`} />
              <figcaption>{["the happiest kind of chaos", "one more wish", "always more to come"][index]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="doodle-arrow">our little<br />time capsule ↗</div>
      </section>

      <section className={`panel cinema-panel ${chapter === 4 ? "show" : ""}`} aria-hidden={chapter !== 4}>
        <div className="cinema-glow" />
        <div className="cinema-copy">
          <p className="overline">Room five · the tiny cinema</p>
          <h2>Press play on<br /><em>us.</em></h2>
          <p>{films[selectedFilm].note}</p>
        </div>
        <div className="film-screen">
          <img src={gallery[selectedFilm % gallery.length]} width="1536" height="1024" loading="lazy" decoding="async" alt="Selected birthday memory for the screening room" />
          <div className="film-screen-shade" />
          <button aria-label={`Select ${films[selectedFilm].title}`}><span>▶</span></button>
          <div><b>{films[selectedFilm].title}</b><small>{films[selectedFilm].length}</small></div>
        </div>
        <div className="film-list">
          {films.map((film, index) => <button key={film.title} className={selectedFilm === index ? "active" : ""} onClick={() => setSelectedFilm(index)}><i>0{index + 1}</i><span><b>{film.title}</b><small>{film.length}</small></span></button>)}
        </div>
      </section>

      <section className={`panel voices-panel ${chapter === 5 ? "show" : ""}`} aria-hidden={chapter !== 5}>
        <div className="section-heading voices-heading">
          <p className="overline">Room six · press to listen</p>
          <h2>Voices that feel<br />like <em>home.</em></h2>
          <p>Little messages from the people who know exactly how wonderful you are.</p>
        </div>
        <div className="voice-stack">
          {voiceNotes.map((voice, index) => (
            <button key={voice.name} className={openVoice === index ? "active" : ""} onClick={() => setOpenVoice(index)} aria-expanded={openVoice === index}>
              <span className="voice-play">{openVoice === index ? "❚❚" : "▶"}</span>
              <span className="voice-copy"><b>{voice.name}</b><small>{voice.length}</small><em>{voice.note}</em></span>
              <i><span /></i>
            </button>
          ))}
        </div>
      </section>

      <section className={`panel soundtrack-panel ${chapter === 6 ? "show" : ""}`} aria-hidden={chapter !== 6}>
        <div className="record-disc" aria-hidden="true"><i /><span>for<br />{name}</span></div>
        <div className="soundtrack-copy">
          <p className="overline">Room seven · your birthday soundtrack</p>
          <h2>Every life needs<br />good <em>music.</em></h2>
          <p>{soundtrack[selectedTrack][2]}</p>
        </div>
        <div className="track-list">
          {soundtrack.map(([number, title], index) => <button key={number} className={selectedTrack === index ? "active" : ""} onClick={() => setSelectedTrack(index)}><i>{number}</i><span>{title}</span><b>{selectedTrack === index ? "♪" : "＋"}</b></button>)}
        </div>
      </section>

      <section className={`panel table-panel ${chapter === 7 ? "show" : ""}`} aria-hidden={chapter !== 7}>
        <div className="table-heading">
          <p className="overline">Room eight · everyone saved you a seat</p>
          <h2>The long<br /><em>birthday table.</em></h2>
          <p>Pull up a chair. There’s love with your name all over it.</p>
        </div>
        <div className="wish-table">
          {guestWishes.map(([author, wish], index) => <article key={author} className={`table-note table-note-${index + 1}`}><span>“</span><p>{wish}</p><b>{author}</b></article>)}
        </div>
      </section>

      <section className={`panel wish-panel ${chapter === 8 ? "show" : ""}`} aria-hidden={chapter !== 8}>
        <img src="/generated/birthday-cake.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Pastel birthday cake with candles and confetti" />
        <div className="wish-gradient" />
        <div className="wish-copy">
          <p className="overline">Room nine · make it a good one</p>
          <h2>Close your eyes.<br />Make a <em>wish.</em></h2>
          <p>Here’s to {age || "another"} — and every brilliant thing coming next.</p>
          <button className="cta blue" onClick={next}>Blow out the candles <span>→</span></button>
        </div>
        <div className="candle-sparkles" aria-hidden="true"><i>✦</i><i>✦</i><i>✦</i></div>
      </section>

      <section className={`panel finale-panel ${chapter === 9 ? "show" : ""}`} aria-hidden={chapter !== 9}>
        <img src="/generated/birthday-balcony.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Dreamy birthday balcony at blue hour with pink and blue balloons" />
        <div className="finale-wash" />
        <article className="final-card">
          <p className="overline">Room ten · one last thing, from {from}</p>
          <h2>Happy birthday,<br /><em>{name}.</em></h2>
          <p className="message">{message}</p>
          <div className="sign-off"><span>With all my love,</span><b>{from}</b></div>
          <div className="stamp">{age || "♥"}</div>
        </article>
        <div className="final-caption">For my favourite {relationship}. <button onClick={() => setChapter(-1)}>Start again ↺</button></div>
      </section>

      {chapter >= 0 && <div className="story-arrows"><button onClick={previous} aria-label="Previous room">←</button><span>{chapter + 1} / 10</span><button onClick={next} disabled={chapter === 9} aria-label="Next room">→</button></div>}

      <aside className={`editor ${editorOpen ? "open" : ""}`} aria-hidden={!editorOpen}>
        <div className="editor-title"><div><p className="overline">Make the story theirs</p><h2>Personalise it.</h2></div><button onClick={() => setEditorOpen(false)} aria-label="Close">×</button></div>
        <div className="editor-body">
          <div className="field-row"><label>Their name<input value={name} onChange={(e) => setName(e.target.value)} /></label><label>Turning<input value={age} onChange={(e) => setAge(e.target.value)} /></label></div>
          <div className="field-row"><label>They are your<select value={relationship} onChange={(e) => setRelationship(e.target.value)}><option>friend</option><option>partner</option><option>sibling</option><option>parent</option><option>favourite person</option></select></label><label>Your name<input value={from} onChange={(e) => setFrom(e.target.value)} /></label></div>
          <label>What makes them special?<textarea rows={4} value={special} onChange={(e) => setSpecial(e.target.value)} /></label>
          <label>Your message<textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
          <label className="photo-upload">Add their photos<input type="file" accept="image/*" multiple onChange={uploadPhotos} /><span><b>＋ Choose up to 4 photos</b><small>{photos.length ? `${photos.length} added — looking good!` : "They’ll appear in the memory room"}</small></span></label>
        </div>
        <button className="save" onClick={() => { setEditorOpen(false); setChapter(-1); }}>See their story <span>→</span></button>
      </aside>
      {editorOpen && <button className="scrim" onClick={() => setEditorOpen(false)} aria-label="Close personalisation panel" />}
    </main>
  );
}

function Confetti({ count }: { count: number }) {
  return <div className="confetti-field" aria-hidden="true">{Array.from({ length: count }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>;
}
