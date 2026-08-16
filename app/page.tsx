"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

const chapters = ["Welcome", "Why you", "Memories", "A wish", "Your card"];
const defaultPhotos = [
  "/generated/birthday-doorway.png",
  "/generated/birthday-cake.png",
  "/generated/birthday-balcony.png",
];

export default function BirthdayStory() {
  const [chapter, setChapter] = useState(-1);
  const [editorOpen, setEditorOpen] = useState(false);
  const [name, setName] = useState("Emma");
  const [age, setAge] = useState("21");
  const [from, setFrom] = useState("Riya");
  const [relationship, setRelationship] = useState("friend");
  const [special, setSpecial] = useState("Your kind heart, the way you make everyone laugh, and how you always show up");
  const [message, setMessage] = useState("Happy birthday to my favourite adventure buddy. Life is softer, brighter and so much more fun with you in it. Here’s to everything waiting for you this year.");
  const [photos, setPhotos] = useState<string[]>([]);

  const qualities = useMemo(() => {
    const parts = special.split(",").map((item) => item.trim()).filter(Boolean);
    return [parts[0] || "Your kind heart", parts[1] || "The best laughs", parts[2] || "Always showing up"];
  }, [special]);
  const gallery = photos.length ? photos : defaultPhotos;

  const next = () => setChapter((value) => Math.min(value + 1, 4));
  const previous = () => setChapter((value) => Math.max(value - 1, -1));

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
    setPhotos(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <main className="story-shell">
      <Confetti count={46} />

      <header className="story-header">
        <button className="logo" onClick={() => setChapter(-1)} aria-label="Back to the beginning">
          <span>m</span><b>made for you</b>
        </button>
        <button className="personalise" onClick={() => setEditorOpen(true)}>Personalise <span>✦</span></button>
      </header>

      <nav className="chapter-nav" aria-label="Birthday story chapters">
        {chapters.map((label, index) => (
          <button key={label} className={chapter === index ? "active" : chapter > index ? "done" : ""} onClick={() => setChapter(index)}>
            <i>{index + 1}</i><span>{label}</span>
          </button>
        ))}
      </nav>

      <section className={`panel hero-panel ${chapter === -1 ? "show" : ""}`} aria-hidden={chapter !== -1}>
        <img src="/generated/birthday-doorway.png" alt="Pastel birthday room with balloons and an open blue doorway" />
        <div className="image-wash" />
        <div className="hero-copy">
          <p className="overline">A little birthday world for {name}</p>
          <h1>Something lovely<br />is waiting <em>inside.</em></h1>
          <p className="lead">Five little rooms. A thousand reasons to celebrate you.</p>
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

      <section className={`panel memories-panel ${chapter === 2 ? "show" : ""}`} aria-hidden={chapter !== 2}>
        <div className="section-heading memory-heading">
          <p className="overline">Room three · our favourite frames</p>
          <h2>Keep these<br /><em>close.</em></h2>
          <p>Good days, blurry nights, and all the beautiful bits in between.</p>
        </div>
        <div className="photo-stack">
          {gallery.slice(0, 3).map((photo, index) => (
            <figure key={`${photo}-${index}`} className={`memory-photo memory-${index + 1}`}>
              <img src={photo} alt={photos.length ? `Uploaded memory ${index + 1}` : `Birthday memory placeholder ${index + 1}`} />
              <figcaption>{["the happiest kind of chaos", "one more wish", "always more to come"][index]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="doodle-arrow">our little<br />time capsule ↗</div>
      </section>

      <section className={`panel wish-panel ${chapter === 3 ? "show" : ""}`} aria-hidden={chapter !== 3}>
        <img src="/generated/birthday-cake.png" alt="Pastel birthday cake with candles and confetti" />
        <div className="wish-gradient" />
        <div className="wish-copy">
          <p className="overline">Room four · make it a good one</p>
          <h2>Close your eyes.<br />Make a <em>wish.</em></h2>
          <p>Here’s to {age || "another"} — and every brilliant thing coming next.</p>
          <button className="cta blue" onClick={next}>Blow out the candles <span>→</span></button>
        </div>
        <div className="candle-sparkles" aria-hidden="true"><i>✦</i><i>✦</i><i>✦</i></div>
      </section>

      <section className={`panel finale-panel ${chapter === 4 ? "show" : ""}`} aria-hidden={chapter !== 4}>
        <img src="/generated/birthday-balcony.png" alt="Dreamy birthday balcony at blue hour with pink and blue balloons" />
        <div className="finale-wash" />
        <article className="final-card">
          <p className="overline">One last thing, from {from}</p>
          <h2>Happy birthday,<br /><em>{name}.</em></h2>
          <p className="message">{message}</p>
          <div className="sign-off"><span>With all my love,</span><b>{from}</b></div>
          <div className="stamp">{age || "♥"}</div>
        </article>
        <div className="final-caption">For my favourite {relationship}. <button onClick={() => setChapter(-1)}>Start again ↺</button></div>
      </section>

      {chapter >= 0 && <div className="story-arrows"><button onClick={previous}>←</button><span>{chapter + 1} / 5</span><button onClick={next} disabled={chapter === 4}>→</button></div>}

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
