import React, { useState, useEffect, useRef } from "react";
import "./styles/global.css";

const CHIP_COLORS = {
  frontend: { base: [63, 136, 197], light: [120, 180, 240], dark: false },
  backend: { base: [19, 111, 99], light: [40, 170, 150], dark: false },
  language: { base: [255, 186, 8], light: [255, 220, 100], dark: true },
  ai: { base: [208, 0, 0], light: [255, 80, 80], dark: false },
  database: { base: [3, 43, 67], light: [20, 90, 140], dark: false },
  tools: { base: [92, 107, 192], light: [140, 155, 240], dark: false },
  uiux: { base: [230, 81, 0], light: [255, 140, 60], dark: false },
};

const TECH = [
  { label: "React", cat: "frontend" },
  { label: "JavaScript", cat: "frontend" },
  { label: "UI / UX", cat: "uiux" },
  { label: "TypeScript", cat: "frontend" },
  { label: "HTML / CSS", cat: "uiux" },
  { label: "Python", cat: "language" },
  { label: "C", cat: "language" },
  { label: "FastAPI", cat: "backend" },
  { label: "Algorithms", cat: "tools" },
  { label: "Atlassian Forge", cat: "tools" },
  { label: "REST APIs", cat: "backend" },
  { label: "OpenAI API", cat: "ai" },
  { label: "Supabase", cat: "database" },
  { label: "PostgreSQL", cat: "database" },
  { label: "Git", cat: "tools" },
];

const LEGEND = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "language", label: "Language" },
  { key: "ai", label: "AI" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
  { key: "uiux", label: "UI/UX" },
];

const PROJECTS = [
  {
    name: "StudySprinter",
    tag: "AI · Full-Stack",
    desc: "AI-powered study tool for generating flashcards and quizzes from any topic. Built full-stack from scratch with a collapsible sidebar, deck management, per-deck stats, and dark mode.",
    stack: [
      "React",
      "FastAPI",
      "Python",
      "Supabase",
      "OpenAI API",
      "PostgreSQL",
    ],
    github: "https://github.com/annakuchina/studysprinter",
    live: "https://studysprinter.vercel.app/",
    img: `${process.env.PUBLIC_URL}/screenshots/studysprinter.jpg`,
    reverse: false,
  },
  {
    name: "Jira Pets",
    tag: "Atlassian Forge · Capstone",
    desc: "Gamified Jira dashboard plugin where your ticket activity drives a virtual pet system: XP, level progression, health, happiness, and an in-app shop. Built in a 6-person Agile team with mentorship from an Atlassian engineer.",
    stack: ["React", "JavaScript", "Atlassian Forge", "Forge KVS", "Agile"],
    github: null,
    live: null,
    img: `${process.env.PUBLIC_URL}/screenshots/jirapets.jpg`,
    note: "Available to discuss in interviews",
    reverse: true,
  },
];

const EARLIER = [
  {
    name: "Tower Defence Game",
    tech: "Python · Pygame · Procreate",
    img: `${process.env.PUBLIC_URL}/screenshots/towerdefence.jpg`,
    link: "https://github.com/annakuchina/Tower-Defense-Game",
  },
  {
    name: "Match-3 Game",
    tech: "Python · Pygame · Procreate",
    img: `${process.env.PUBLIC_URL}/screenshots/match3.jpg`,
    link: "https://github.com/annakuchina/woodland-game",
  },
  {
    name: "Drum Machine",
    tech: "React · Redux · CSS",
    img: `${process.env.PUBLIC_URL}/screenshots/drummachine.jpg`,
    link: "https://codepen.io/annakuchina/full/vYKExoB",
  },
];

function Chip({ label, cat }) {
  const gradRef = useRef(null);
  const c = CHIP_COLORS[cat];
  const [r, g, b] = c.base;
  const [lr, lg, lb] = c.light;

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    if (gradRef.current) {
      gradRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgb(${lr},${lg},${lb}), rgb(${r},${g},${b}))`;
    }
  };

  return (
    <div
      className="chip"
      style={{
        background: `rgb(${r},${g},${b})`,
        color: c.dark ? "#111" : "#fff",
      }}
      onMouseMove={onMouseMove}>
      <div className="chip-gradient" ref={gradRef} />
      <span className="chip-label">{label}</span>
    </div>
  );
}

function SkillChips() {
  return (
    <div>
      <div className="chips-grid">
        {TECH.map((t) => (
          <Chip key={t.label} label={t.label} cat={t.cat} />
        ))}
      </div>
      <div className="chips-legend">
        {LEGEND.map((l) => {
          const [r, g, b] = CHIP_COLORS[l.key].base;
          return (
            <div className="legend-item" key={l.key}>
              <span
                className="legend-dot"
                style={{ background: `rgb(${r},${g},${b})` }}
              />
              {l.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{ boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none" }}>
        <a href="#home" className="nav-logo">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="12" fill="#0a0a0a" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="42"
              fontWeight="700"
              fontFamily="sans-serif">
              AK
            </text>
          </svg>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-inner">
            <h1 className="hero-title">Anna Kuchina</h1>
            <p className="hero-subtitle">
              Building software that actually gets used.
            </p>
            <p className="hero-bio">
              CS graduate from UNSW. I build full-stack apps, from the UI down
              to the API and database. Currently open to junior software
              engineering roles in Sydney or remote.
            </p>
            <div className="hero-links">
              <a href="#projects" className="btn btn-primary">
                View projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline">
                ↓ Resume
              </a>
              <a
                href="https://github.com/annakuchina"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline">
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/annakuchina"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline">
                LinkedIn
              </a>
            </div>
            <SkillChips />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="projects">
        <div className="container">
          <p className="section-eyebrow">Work</p>
          <h2 className="section-title">Selected work</h2>
          <p className="section-desc">
            Full-stack projects built from scratch, integrating AI-powered
            tooling.
          </p>
          {PROJECTS.map((p) => (
            <div className="project-card" key={p.name}>
              <div
                className={`project-card-inner${p.reverse ? " reverse" : ""}`}>
                <div className="project-screenshot">
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      <img src={p.img} alt={p.name} />
                    </a>
                  ) : (
                    <img src={p.img} alt={p.name} />
                  )}
                </div>
                <div className="project-info">
                  <span className="project-tag">{p.tag}</span>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map((s) => (
                      <span className="stack-pill" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline"
                        style={{
                          fontSize: "0.78rem",
                          padding: "0.45rem 0.9rem",
                        }}>
                        GitHub
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{
                          fontSize: "0.78rem",
                          padding: "0.45rem 0.9rem",
                        }}>
                        Link
                      </a>
                    )}
                    {p.note && <span className="project-note">{p.note}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <p className="section-eyebrow about-centered">Background</p>
          <h2 className="section-title about-centered">About</h2>
          <div className="about-text about-centered">
            <p>
              Full-stack developer based in Sydney, recently graduated from UNSW
              with a Bachelor of Computer Science.
            </p>
            <p>
              My main project is StudySprinter, an AI-powered study tool using
              React, FastAPI, Supabase, and the OpenAI API. My UNSW capstone
              Jira Pets is a gamified Jira dashboard gadget on Atlassian Forge,
              developed with mentorship from an Atlassian engineer.
            </p>
            <p>
              Active in UNSW's Women in Technology and Cybersecurity Society
              during my degree.
            </p>
          </div>
          <div className="open-to-work about-centered">
            <p className="otw-title">Open to work</p>
            <p className="otw-desc">
              Looking for junior software engineering roles in Sydney or
              remote/hybrid Australia. Open to in-person, hybrid, and remote
              roles. Frontend, full-stack, or anything where I'll write real
              code.
            </p>
          </div>
        </div>
      </section>

      {/* EARLIER WORK */}
      <section id="earlier">
        <div className="container">
          <p className="section-eyebrow">Before uni</p>
          <h2 className="section-title">Earlier work</h2>
          <p className="section-desc">
            Small projects from high school: games, UI design, and responsive
            web pages.
          </p>
          <div className="earlier-grid">
            {EARLIER.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="earlier-card"
                style={{ textDecoration: "none", display: "block" }}>
                <img className="earlier-img" src={p.img} alt={p.name} />
                <div className="earlier-info">
                  <p className="earlier-name">{p.name}</p>
                  <p className="earlier-tech">{p.tech}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="contact-inner">
            <h2 className="contact-title">Get in touch</h2>
            <p className="contact-sub">
              Open to junior software engineering roles in Sydney or remote.
            </p>
            <div className="contact-links">
              <a
                href="mailto:annakuchina2@gmail.com"
                className="btn btn-primary">
                Email me
              </a>
              <a
                href="https://linkedin.com/in/annakuchina"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline">
                LinkedIn
              </a>
              <a
                href="https://github.com/annakuchina"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built with React · 2026</p>
      </footer>
    </>
  );
}
