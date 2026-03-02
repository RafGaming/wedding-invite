"use client";
import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import RSVPForm from "./RSVPForm";
import GuestBook from "./GuestBook";

const NAV_SECTIONS = [
  { id: "cover", label: "Cover" },
  { id: "groom", label: "Groom" },
  { id: "bride", label: "Bride" },
  { id: "story", label: "Story" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
];

export default function ScrollSections() {
  const sectionsRef = useRef([]);
  const [details, setDetails] = useState({});
  const [activeSection, setActiveSection] = useState("cover");

  useEffect(() => {
    fetch("/api/wedding-details")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setDetails(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Track active nav section via IntersectionObserver
  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map(({ id }) =>
      document.getElementById(id)
    ).filter(Boolean);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionEls.forEach((el) => navObserver.observe(el));
    return () => navObserver.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ─── MAGAZINE NAVIGATION ─── */}
      <nav className="mag-nav" aria-label="Section navigation">
        <div className="mag-nav-inner">
          {NAV_SECTIONS.map(({ id, label }, idx) => (
            <span key={id} className="mag-nav-entry">
              {idx > 0 && <span className="mag-nav-dot" aria-hidden="true">·</span>}
              <button
                className={`mag-nav-item${activeSection === id ? " mag-nav-active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </span>
          ))}
        </div>
      </nav>

      {/* ─── MAGAZINE COVER ─── */}
      <section className="mag-cover scroll-reveal" id="cover" ref={addRef}>
        <div className="mag-cover-inner">
          <div className="mag-cover-rule" />
          <span className="mag-cover-issue gold-text">A Love Story · Est. 2019</span>
          <div className="mag-cover-rule" />
          <h1 className="mag-cover-names">
            <span className="mag-cover-name">Jethro</span>
            <span className="mag-cover-amp">and</span>
            <span className="mag-cover-name">Francisca</span>
          </h1>
          <div className="mag-cover-rule mag-cover-rule--thick" />
          <p className="mag-cover-date">12.31.2026</p>
          <div className="mag-cover-rule" />
        </div>
      </section>

      {/* ─── THE GROOM ─── */}
      <section className="mag-spread scroll-reveal" id="groom" ref={addRef}>
        <div className="mag-spread-photo mag-spread-photo--left">
          <img src="/bg/groom.jpg" alt="The Groom" className="mag-spread-img" />
        </div>
        <div className="mag-spread-text">
          <span className="mag-vert-label" aria-hidden="true">THE GROOM</span>
          <span className="mag-page-num" aria-hidden="true">02</span>
          <span className="section-label gold-text">The Groom</span>
          <h2 className="mag-spread-name">Jethro Dionisio</h2>
          <div className="mag-pull-quote">
            <p>
              &ldquo;Every love story is beautiful, but ours is my favorite.&rdquo;
            </p>
          </div>
          <div className="section-divider" />
          <p className="mag-spread-bio">
            <span className="mag-drop-cap">A</span>
            loving partner, a gentle soul, and the man who makes every day brighter. His warmth and kindness light up every room he enters.
          </p>
        </div>
        <div className="mag-page-turn" aria-hidden="true" />
      </section>

      {/* ─── THE BRIDE ─── */}
      <section className="mag-spread mag-spread--alt scroll-reveal" id="bride" ref={addRef}>
        <div className="mag-spread-text mag-spread-text--right">
          <span className="mag-vert-label" aria-hidden="true">THE BRIDE</span>
          <span className="mag-page-num" aria-hidden="true">03</span>
          <span className="section-label gold-text">The Bride</span>
          <h2 className="mag-spread-name">Francisca Domingo</h2>
          <div className="mag-pull-quote">
            <p>
              &ldquo;I choose you. And I&rsquo;ll choose you over and over. Without pause, without doubt, in a heartbeat.&rdquo;
            </p>
          </div>
          <div className="section-divider" />
          <p className="mag-spread-bio">
            <span className="mag-drop-cap">G</span>
            raceful, radiant, and full of love. Her smile is the light that guides this beautiful journey they are about to share forever.
          </p>
        </div>
        <div className="mag-spread-photo mag-spread-photo--right">
          <img src="/bg/bride.jpg" alt="The Bride" className="mag-spread-img" />
        </div>
        <div className="mag-page-turn" aria-hidden="true" />
      </section>

      {/* ─── TIMELINE ─── */}
      <Timeline />

      {/* ─── OUR STORY ─── */}
      <section className="photo-section scroll-reveal" ref={addRef}>
        <div className="photo-bg">
          <img src="/bg/couple.jpg" alt="Together" className="section-photo" />
          <div className="photo-blur-overlay" />
        </div>
        <div className="photo-text-overlay">
          <span className="section-label gold-text">Our Story</span>
          <h2 className="section-name">Together Forever</h2>
          <div className="mag-pull-quote mag-pull-quote--light">
            <p>&ldquo;Two souls, one heart, an eternal bond.&rdquo;</p>
          </div>
          <div className="section-divider" />
          <p className="section-bio">
            From the moment they met, they knew their story was meant to be
            written in the stars. Now, they invite you to witness the next
            beautiful chapter.
          </p>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <Gallery />

      {/* ─── COUNTDOWN & DETAILS ─── */}
      <Countdown ref={addRef} />
      <section className="details-section scroll-reveal" ref={addRef}>
        <div className="details-bg">
          <img src="/bg/save-the-date-bg.jpg" alt="" className="details-bg-img" />
        </div>
        <div className="details-card">
          <h2 className="gold-text details-title">Save the Date</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <h3>Date</h3>
              <p className="mauve-text">{details.wedding_date || "To Be Announced"}</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <h3>Venue</h3>
              <p className="mauve-text">{details.venue || "To Be Announced"}</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <h3>Time</h3>
              <p className="mauve-text">{details.time || "To Be Announced"}</p>
            </div>
            <div className="detail-item">
              <span className="detail-icon">👗</span>
              <h3>Dress Code</h3>
              <p className="mauve-text">{details.dress_code || "Formal / Semi-Formal"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RSVP FORM ─── */}
      <div id="rsvp">
        <RSVPForm />
      </div>

      {/* ─── GUEST BOOK ─── */}
      <GuestBook />

      {/* ─── EDITORIAL FOOTER ─── */}
      <footer className="mag-footer">
        <div className="mag-footer-rule" />
        <span className="mag-footer-label gold-text">Letter from the Editors</span>
        <div className="mag-footer-fin" aria-hidden="true">FIN</div>
        <h3 className="mag-footer-names gold-shimmer">Jethro &amp; Francisca</h3>
        <p className="mag-footer-tagline">We can&rsquo;t wait to celebrate with you</p>
        <div className="mag-footer-heart" aria-hidden="true">♾</div>
        <div className="mag-footer-rule" />
      </footer>
    </>
  );
}
