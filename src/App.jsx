import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./styles/global.css";

const CHIP_COLORS = {
  frontend: { base: [63, 136, 197], dark: false },
  backend: { base: [19, 111, 99], dark: false },
  language: { base: [255, 186, 8], dark: true },
  // ai: { base: [208, 0, 0], dark: false },
  database: { base: [3, 43, 67], dark: false },
  tools: { base: [92, 107, 192], dark: false },
  uiux: { base: [230, 81, 0], dark: false },
};

const LEGEND = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "language", label: "Language" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
  { key: "uiux", label: "UI/UX" },
];

const NODES = [
  { id: "React", cat: "frontend", r: 48 },
  { id: "JavaScript", cat: "language", r: 44 },
  { id: "TypeScript", cat: "language", r: 36 },
  { id: "D3", cat: "frontend", r: 32 },
  { id: "UI / UX", cat: "uiux", r: 25 },
  { id: "HTML / CSS", cat: "frontend", r: 34 },
  { id: "Python", cat: "language", r: 46 },
  { id: "Responsive Design", cat: "uiux", r: 52 },
  { id: "Design Systems", cat: "uiux", r: 45 },
  { id: "FastAPI", cat: "backend", r: 40 },
  { id: "Figma", cat: "uiux", r: 32 },
  { id: "Atlassian Forge", cat: "tools", r: 52 },
  { id: "Accessibility", cat: "uiux", r: 36 },
  { id: "REST APIs", cat: "backend", r: 36 },
  { id: "OpenAI API", cat: "backend", r: 43 },
  { id: "Supabase", cat: "database", r: 40 },
  { id: "PostgreSQL", cat: "database", r: 38 },
  { id: "Git", cat: "tools", r: 30 },
];

const PROJECTS = [
  {
    name: "StudySprinter",
    tag: "AI · Full-Stack",
    desc: "A full-stack study app that turns any topic into a structured study workflow. Generate flashcards, take quizzes, write notes, and track progress per deck. Built so AI-generated content becomes something you can return to, not just a one-off answer.",
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
    role: "Solo full-stack project. Designed the product flow, built the React frontend and FastAPI backend, integrated the OpenAI API, designed the Supabase schema, and deployed the application end to end.",
  },
  {
    name: "Jira Pets",
    tag: "Atlassian Forge · Capstone",
    desc: "A Jira dashboard gadget that turns routine ticket activity into visible progress. Completing tasks earns XP and keeps your pet healthy. Miss tasks and your pet's health drops, motivating you to complete work on time. Built as a six-person Agile capstone with mentorship from an Atlassian engineer.",
    stack: ["React", "JavaScript", "Atlassian Forge", "Forge KVS", "Agile"],
    github: null,
    live: null,
    video: "https://www.youtube.com/watch?v=36hbX5SzgYo",
    img: `${process.env.PUBLIC_URL}/screenshots/jirapets.jpg`,
    role: "Designed the cat and dog graphics for different levels, built the level-up modal, pet reset modal, and heart animation, implemented backend logic for pet-health decrease, and wrote Jest tests using Forge Bridge mocking.",
    note: "Code private (Atlassian capstone)",
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

const STATS = [
  {
    label: "Degree",
    value: "Bachelor of Computer Science · UNSW",
    color: "#3F88C5",
  },
  {
    label: "Focus",
    value: "Frontend · Full-Stack · AI tooling",
    color: "#136F63",
  },
  {
    label: "Interests",
    value: "AI tooling · UI/UX · Full-stack products",
    color: "#D00000",
  },
  {
    label: "Open to",
    value: "SWE roles · Sydney, remote or relocating",
    color: "#5C6BC0",
  },
];

function BubbleField() {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !wrapRef.current) return;
    const W = wrapRef.current.offsetWidth || 500;
    const H = 400;
    const cx = W / 2,
      cy = H / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("width", W)
      .attr("height", H);

    svg.selectAll("*").remove();

    const nodes = NODES.map((d) => ({
      ...d,
      x: cx + (Math.random() - 0.5) * 300,
      y: cy + (Math.random() - 0.5) * 300,
    }));
    const sim = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX(cx).strength(0.08))
      .force("y", d3.forceY(cy).strength(0.08))
      .force("collision", d3.forceCollide((d) => d.r + 2).strength(1))
      .force("charge", d3.forceManyBody().strength(-5))
      .velocityDecay(0.6)
      .alphaDecay(0.03);

    const g = svg.selectAll("g").data(nodes).join("g").style("cursor", "grab");

    g.append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => {
        const [r, g, b] = CHIP_COLORS[d.cat].base;
        return `rgb(${r},${g},${b})`;
      });

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", (d) => (CHIP_COLORS[d.cat].dark ? "#111" : "#fff"))
      .attr("font-weight", 700)
      .attr("pointer-events", "none")
      .attr("font-family", "DM Sans, sans-serif")
      .text((d) => d.id)
      .style("font-size", (d) => `${Math.max(8, Math.min(d.r * 0.28, 11))}px`);

    sim.on("tick", () => {
      g.attr("transform", (d) => {
        d.x = Math.max(d.r + 4, Math.min(W - d.r - 4, d.x));
        d.y = Math.max(d.r + 4, Math.min(H - d.r - 4, d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    g.call(
      d3
        .drag()
        .on("start", (e, d) => {
          if (!e.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (e, d) => {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on("end", (e, d) => {
          if (!e.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }),
    );

    return () => sim.stop();
  }, []);

  return (
    <div ref={wrapRef} className="bubble-wrap">
      <svg ref={svgRef} style={{ display: "block", width: "100%" }} />
      <p
        style={{
          textAlign: "center",
          fontSize: "0.7rem",
          color: "var(--ink3)",
          padding: "0.4rem 0",
          fontFamily: "var(--font-body)",
        }}>
        drag to explore ↑
      </p>
      <div className="bubble-legend">
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
  const [menuOpen, setMenuOpen] = useState(false);

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
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-grid">
              <div className="hero-left">
                <p className="section-eyebrow">Full-Stack Developer · Sydney</p>
                <h1 className="hero-title">Anna Kuchina</h1>
                <p className="hero-subtitle">
                  Turning ideas into deployed products.
                </p>
                <p className="hero-bio">
                  CS graduate from UNSW. I build full-stack apps, from the UI
                  down to the API and database. Currently open to software
                  engineering roles in Sydney or remote, and open to relocating.
                </p>

                <div className="hero-links">
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
                  <a
                    href={`${process.env.PUBLIC_URL}/Anna_Kuchina_Resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline">
                    ↓ Resume
                  </a>
                </div>
              </div>
              <BubbleField />
            </div>
            <div className="stats-row">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <p className="stat-label" style={{ color: s.color }}>
                    {s.label}
                  </p>
                  <p className="stat-value">{s.value}</p>
                </div>
              ))}
            </div>
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
              <div className="project-card-inner">
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
                        studysprinter.vercel.app{" "}
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}>
                          ↗
                        </span>
                      </a>
                    )}
                    {p.video && (
                      <a
                        href={p.video}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{
                          fontSize: "0.78rem",
                          padding: "0.45rem 0.9rem",
                        }}>
                        Watch demo{" "}
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}>
                          ↗
                        </span>
                      </a>
                    )}
                    {p.note && <span className="project-note">{p.note}</span>}
                  </div>
                </div>
                {p.role && (
                  <div className="project-role">
                    <p className="project-role-label">My role</p>
                    <p className="project-role-text">{p.role}</p>
                  </div>
                )}
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
            <p className="hero-subtitle">Open to work</p>
            <p className="otw-desc">
              Looking for frontend or full-stack roles where I can build useful
              products and keep growing as an engineer. Open to in-person,
              hybrid and remote work. Australian citizen, eligible to work in
              Australia.
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
              Open to software engineering roles in Sydney or remote.
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
              <a
                href="/Anna_Kuchina_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline">
                ↓ Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built with React & D3 · 2026</p>
      </footer>
    </>
  );
}
