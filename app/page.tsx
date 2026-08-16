"use client";

import { useEffect, useMemo, useState } from "react";

type Palette = "confetti" | "midnight" | "comic" | "bubblegum";

const rooms = [
  { label: "The hello", short: "01" },
  { label: "Little things", short: "02" },
  { label: "Our wall", short: "03" },
  { label: "Make a wish", short: "04" },
  { label: "The balcony", short: "05" },
];

const themes: Record<Palette, { label: string; hint: string }> = {
  confetti: { label: "Confetti", hint: "cream · cherry · lilac" },
  midnight: { label: "Midnight Gold", hint: "ink · moonlight · gold" },
  comic: { label: "Comic Pop", hint: "lemon · red · blue" },
  bubblegum: { label: "Bubblegum", hint: "lilac · mint · blush" },
};

export default function Home() {
  const [room, setRoom] = useState(-1);
  const [showEditor, setShowEditor] = useState(false);
  const [name, setName] = useState("Emma");
  const [age, setAge] = useState("21");
  const [from, setFrom] = useState("Riya");
  const [relationship, setRelationship] = useState("friend");
  const [special, setSpecial] = useState("endless kindness, terrible puns, and always being the last to leave");
  const [message, setMessage] = useState("Happy birthday to my partner in every adventure. Life is brighter, funnier, and much more beautiful with you in it.");
  const [palette, setPalette] = useState<Palette>("confetti");
  const [soundOn, setSoundOn] = useState(false);

  const specialBits = useMemo(
    () => special.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 3),
    [special],
  );

  const next = () => setRoom((current) => Math.min(current + 1, rooms.length - 1));
  const previous = () => setRoom((current) => Math.max(current - 1, -1));

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (showEditor) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Escape" && room >= 0) setRoom(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showEditor, room]);

  return (
    <main className={`experience theme-${palette}`} data-room={room}>
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => setRoom(-1)} aria-label="Return to the entrance">
          <span className="brand-mark">m</span>
          <span>made for you</span>
        </button>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? "Mute ambience" : "Turn ambience on"}>
            {soundOn ? "♪" : "♩"}
          </button>
          <button className="edit-button" onClick={() => setShowEditor(true)}>Personalise <span>↗</span></button>
        </div>
      </header>

      <nav className="floorplan" aria-label="Story rooms">
        <span className="floorplan-title">A little tour for {name}</span>
        <div className="floorplan-track">
          {rooms.map((item, index) => (
            <button
              key={item.label}
              className={index === room ? "active" : index < room ? "visited" : ""}
              onClick={() => setRoom(index)}
              aria-current={index === room ? "step" : undefined}
            >
              <span>{item.short}</span><em>{item.label}</em>
            </button>
          ))}
        </div>
      </nav>

      <section className={`scene entrance ${room === -1 ? "is-visible" : ""}`} aria-hidden={room !== -1}>
        <div className="entrance-copy">
          <p className="eyebrow">A birthday story in five rooms</p>
          <h1>There&apos;s something<br />waiting <i>inside.</i></h1>
          <p className="intro">We saved a few of the things that make {name}, {name}. Take your time. Look around.</p>
          <button className="primary-button" onClick={next}><span>Knock to enter</span><b>→</b></button>
          <small>Best explored slowly · headphones optional</small>
        </div>
        <button className="door" onClick={next} aria-label="Enter the first room">
          <span className="door-number">{age || "21"}</span>
          <span className="door-light" />
          <span className="door-handle" />
          <span className="doormat">FOR {name.toUpperCase()}</span>
        </button>
        <div className="plant plant-left" aria-hidden="true"><i /><i /><i /></div>
        <div className="plant plant-right" aria-hidden="true"><i /><i /></div>
      </section>

      <section className={`scene room room-one ${room === 0 ? "is-visible" : ""}`} aria-hidden={room !== 0}>
        <div className="room-label"><span>Room one</span><i />The hello</div>
        <div className="sun-window" aria-hidden="true"><span /></div>
        <div className="hello-note">
          <span className="tape" />
          <p>For the one who<br />makes ordinary days</p>
          <strong>feel like the good part.</strong>
          <small>— {from}</small>
        </div>
        <div className="side-table" aria-hidden="true"><span className="vase">✿</span><i /></div>
        <div className="scene-copy">
          <p className="eyebrow">Come in, {name}</p>
          <h2>This place was<br />made with <i>you</i> in mind.</h2>
          <p>There are little pieces of you tucked into every room. Start wherever the light catches your eye.</p>
        </div>
      </section>

      <section className={`scene room room-two ${room === 1 ? "is-visible" : ""}`} aria-hidden={room !== 1}>
        <div className="room-label"><span>Room two</span><i />Little things</div>
        <div className="shelf shelf-top" />
        <div className="object-grid">
          {specialBits.map((bit, index) => (
            <article className="keepsake" key={bit} style={{ "--tilt": `${index % 2 ? 2 : -2}deg` } as React.CSSProperties}>
              <span className="keepsake-icon">{["☀", "☺", "∞"][index]}</span>
              <p>{bit}</p>
              <small>thing no. 0{index + 1}</small>
            </article>
          ))}
        </div>
        <div className="scene-copy align-right">
          <p className="eyebrow">The tiny museum of {name}</p>
          <h2>It&apos;s the little things<br />that are <i>everything.</i></h2>
          <p>Hover over a keepsake. These are the details people remember long after the candles go out.</p>
        </div>
      </section>

      <section className={`scene room room-three ${room === 2 ? "is-visible" : ""}`} aria-hidden={room !== 2}>
        <div className="room-label"><span>Room three</span><i />Our wall</div>
        <div className="gallery-wall">
          <figure className="photo photo-a"><div className="photo-fill">summer<br />somewhere</div><figcaption>the day we lost track of time</figcaption></figure>
          <figure className="photo photo-b"><div className="photo-fill">you + me<br />+ no plan</div><figcaption>still my favourite plan</figcaption></figure>
          <figure className="photo photo-c"><div className="photo-fill">late nights<br />& loud laughs</div><figcaption>proof that we were here</figcaption></figure>
          <div className="scribble">more of this,<br /><i>always.</i></div>
        </div>
        <div className="scene-copy gallery-copy">
          <p className="eyebrow">A few frames from us</p>
          <h2>Some memories<br />refuse to sit <i>still.</i></h2>
          <p>Your uploaded photos will live here as layered, touchable snapshots—not a plain carousel.</p>
        </div>
      </section>

      <section className={`scene room room-four ${room === 3 ? "is-visible" : ""}`} aria-hidden={room !== 3}>
        <div className="room-label"><span>Room four</span><i />Make a wish</div>
        <div className="night-window"><span className="moon" /><i /><i /><i /></div>
        <div className="cake-table">
          <div className="cake">
            <span className="candle"><i /></span><span className="candle"><i /></span><span className="candle"><i /></span>
            <b>{age || "21"}</b>
          </div>
          <div className="table-top" />
        </div>
        <div className="wish-copy">
          <p className="eyebrow">One breath. One wish.</p>
          <h2>{name}, this year<br />looks good on you.</h2>
          <button className="wish-button" onClick={next}>Blow out the candles <span>→</span></button>
        </div>
      </section>

      <section className={`scene balcony ${room === 4 ? "is-visible" : ""}`} aria-hidden={room !== 4}>
        <div className="room-label light"><span>Final room</span><i />The balcony</div>
        <div className="stars" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
        <div className="city" aria-hidden="true">{Array.from({ length: 11 }, (_, index) => <i key={index} />)}</div>
        <div className="balcony-rail" aria-hidden="true" />
        <article className="birthday-card">
          <span className="card-kicker">A note from {from}</span>
          <h2>Happy birthday,<br /><i>{name}.</i></h2>
          <p>{message}</p>
          <div className="signature">with all my love, <strong>{from}</strong></div>
          <span className="card-stamp">{age || "♥"}</span>
        </article>
        <div className="final-copy">
          <p>Made for my favourite {relationship}.</p>
          <button onClick={() => setRoom(-1)}>Walk through again ↺</button>
        </div>
        <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
      </section>

      {room >= 0 && (
        <div className="room-controls">
          <button onClick={previous} aria-label="Previous room">←</button>
          <span>{String(room + 1).padStart(2, "0")} <i /> {String(rooms.length).padStart(2, "0")}</span>
          <button onClick={next} disabled={room === rooms.length - 1} aria-label="Next room">→</button>
        </div>
      )}

      <aside className={`editor ${showEditor ? "open" : ""}`} aria-hidden={!showEditor}>
        <div className="editor-head"><div><small>LIVE STORY EDITOR</small><h2>Make it theirs.</h2></div><button onClick={() => setShowEditor(false)} aria-label="Close editor">×</button></div>
        <div className="editor-scroll">
          <div className="two-fields"><label>Their name<input value={name} onChange={(e) => setName(e.target.value)} /></label><label>Turning<input value={age} onChange={(e) => setAge(e.target.value)} /></label></div>
          <div className="two-fields"><label>They are your<select value={relationship} onChange={(e) => setRelationship(e.target.value)}><option>friend</option><option>partner</option><option>sibling</option><option>parent</option><option>favourite person</option></select></label><label>Your name<input value={from} onChange={(e) => setFrom(e.target.value)} /></label></div>
          <label>What makes them special?<textarea value={special} onChange={(e) => setSpecial(e.target.value)} rows={3} /></label>
          <label>Your own message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} /></label>
          <fieldset><legend>Pick a look</legend><div className="palette-grid">{(Object.keys(themes) as Palette[]).map((key) => <button key={key} className={`${key} ${palette === key ? "selected" : ""}`} onClick={() => setPalette(key)}><i /><span><b>{themes[key].label}</b><small>{themes[key].hint}</small></span></button>)}</div></fieldset>
        </div>
        <button className="save-story" onClick={() => { setShowEditor(false); setRoom(-1); }}>Preview their story <span>→</span></button>
      </aside>
      {showEditor && <button className="scrim" onClick={() => setShowEditor(false)} aria-label="Close editor overlay" />}
    </main>
  );
}
