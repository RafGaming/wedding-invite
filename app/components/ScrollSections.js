"use client";
import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import RSVPForm from "./RSVPForm";
import GuestBook from "./GuestBook";

const LOVE_QUOTES = [
  { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Elizabeth Barrett Browning" },
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
  { text: "I have found the one whom my soul loves.", author: "Song of Solomon 3:4" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
  { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
];

function LoveQuoteRotator() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % LOVE_QUOTES.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quote = LOVE_QUOTES[current];

  return (
    <section className="love-quotes-section">
      <div className="love-quotes-inner">
        <div className="romantic-divider" aria-hidden="true">❧ ♥ ✦ ♥ ❦</div>
        <div className={`love-quote-wrap ${visible ? "love-quote--visible" : "love-quote--hidden"}`}>
          <p className="love-quote-text">&ldquo;{quote.text}&rdquo;</p>
          <span className="love-quote-author">— {quote.author}</span>
        </div>
        <div className="romantic-divider" aria-hidden="true">❧ ♥ ✦ ♥ ❦</div>
      </div>
    </section>
  );
}

function QRCodeSection() {
  return (
    <section className="qr-section scroll-reveal">
      <div className="qr-inner">
        <span className="section-label gold-text">Share the Magic</span>
        <h2 className="qr-heading">Capture the Magic</h2>
        <p className="qr-subtext">Scan to upload your wedding photos and share your moments with us</p>
        <div className="qr-card">
          {/* Ornamental corners */}
          <span className="qr-corner qr-corner--tl" aria-hidden="true">✦</span>
          <span className="qr-corner qr-corner--tr" aria-hidden="true">✦</span>
          <span className="qr-corner qr-corner--bl" aria-hidden="true">✦</span>
          <span className="qr-corner qr-corner--br" aria-hidden="true">✦</span>
          {/* QR code placeholder SVG */}
          <div className="qr-code-wrap">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="qr-svg"
              aria-label="QR Code placeholder"
              role="img"
            >
              {/* Gold border */}
              <rect x="2" y="2" width="196" height="196" rx="12" ry="12"
                fill="none" stroke="#C9A96E" strokeWidth="3" />
              {/* Inner border */}
              <rect x="8" y="8" width="184" height="184" rx="8" ry="8"
                fill="rgba(61,107,65,0.35)" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
              {/* Top-left position marker */}
              <rect x="20" y="20" width="50" height="50" rx="4" fill="none" stroke="#C9A96E" strokeWidth="3" />
              <rect x="28" y="28" width="34" height="34" rx="2" fill="#C9A96E" opacity="0.8" />
              <rect x="34" y="34" width="22" height="22" rx="1" fill="#0E1A12" />
              {/* Top-right position marker */}
              <rect x="130" y="20" width="50" height="50" rx="4" fill="none" stroke="#C9A96E" strokeWidth="3" />
              <rect x="138" y="28" width="34" height="34" rx="2" fill="#C9A96E" opacity="0.8" />
              <rect x="144" y="34" width="22" height="22" rx="1" fill="#0E1A12" />
              {/* Bottom-left position marker */}
              <rect x="20" y="130" width="50" height="50" rx="4" fill="none" stroke="#C9A96E" strokeWidth="3" />
              <rect x="28" y="138" width="34" height="34" rx="2" fill="#C9A96E" opacity="0.8" />
              <rect x="34" y="144" width="22" height="22" rx="1" fill="#0E1A12" />
              {/* Data modules pattern (decorative) */}
              {[
                [84,20],[92,20],[100,20],[108,20],
                [84,28],[100,28],[108,28],
                [84,36],[92,36],[108,36],
                [84,44],[92,44],[100,44],
                [84,52],[108,52],
                [84,60],[92,60],[100,60],[108,60],
                [84,68],[100,68],
                [130,84],[138,84],[146,84],[154,84],[162,84],[170,84],[178,84],
                [20,84],[28,84],[36,84],[44,84],[52,84],[60,84],[68,84],
                [84,84],[100,84],[108,84],[116,84],[124,84],
                [84,92],[92,92],[108,92],[116,92],[124,92],
                [84,100],[100,100],[116,100],[124,100],
                [84,108],[92,108],[108,108],[124,108],
                [84,116],[100,116],[108,116],[116,116],
                [130,130],[146,130],[162,130],[178,130],
                [138,138],[154,138],[170,138],
                [130,146],[146,146],[162,146],[178,146],
                [138,154],[154,154],
                [130,162],[146,162],[170,162],[178,162],
                [138,170],[154,170],[162,170],
                [130,178],[146,178],[162,178],[178,178],
              ].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill="#C9A96E" opacity="0.7" />
              ))}
              {/* Center heart */}
              <text x="100" y="107" textAnchor="middle" fontSize="18" fill="#C4A0AA">♥</text>
            </svg>
          </div>
          <p className="qr-point-text">Point your camera here</p>
          <p className="qr-url-note">
            Update QR code with your deployed URL + <code>/upload</code>
          </p>
        </div>
        <p className="qr-hint">
          📱 Guests can also visit <strong>/upload</strong> directly on their phones
        </p>
      </div>
    </section>
  );
}

export default function ScrollSections() {
  const sectionsRef = useRef([]);
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch("/api/wedding-details")
      .then((res) => res.ok ? res.json() : Promise.reject())
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

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {/* ───── THE GROOM ───── */}
      <section
        className="photo-section scroll-reveal"
        ref={addRef}
      >
        <span className="section-page-number" aria-hidden="true">01</span>
        <div className="photo-bg">
          <img
            src="/bg/groom.jpg"
            alt="The Groom"
            className="section-photo ken-burns"
          />
          <div className="photo-blur-overlay"></div>
        </div>
        <div className="photo-text-overlay">
          <span className="section-label gold-text">The Groom</span>
          <h2 className="section-name">Jethro Dionisio</h2>
          <p className="section-quote">
            &ldquo;Every love story is beautiful, but ours is my
            favorite.&rdquo;
          </p>
          <div className="section-divider"></div>
          <p className="section-bio">
            A loving partner, a gentle soul, and the man who makes every day
            brighter. His warmth and kindness light up every room he enters.
          </p>
        </div>
      </section>

      <div className="romantic-section-divider" aria-hidden="true">
        <span>❧</span><span>♥</span><span>✦</span><span>♥</span><span>❦</span>
      </div>

      {/* ───── THE BRIDE ───── */}
      <section
        className="photo-section photo-section-alt scroll-reveal"
        ref={addRef}
      >
        <span className="section-page-number" aria-hidden="true">02</span>
        <div className="photo-bg">
          <img
            src="/bg/bride.jpg"
            alt="The Bride"
            className="section-photo ken-burns"
          />
          <div className="photo-blur-overlay"></div>
        </div>
        <div className="photo-text-overlay">
          <span className="section-label gold-text">The Bride</span>
          <h2 className="section-name">
            Francisca Domingo
          </h2>
          <p className="section-quote">
            &ldquo;I choose you. And I&rsquo;ll choose you over and over. Without
            pause, without doubt, in a heartbeat.&rdquo;
          </p>
          <div className="section-divider"></div>
          <p className="section-bio">
            Graceful, radiant, and full of love. Her smile is the light that
            guides this beautiful journey they are about to share forever.
          </p>
        </div>
      </section>

      <div className="romantic-section-divider" aria-hidden="true">
        <span>❧</span><span>♥</span><span>✦</span><span>♥</span><span>❦</span>
      </div>

      {/* ───── TIMELINE ───── */}
      <Timeline />

      {/* ───── OUR STORY ───── */}
      <section
        className="photo-section scroll-reveal"
        ref={addRef}
      >
        <span className="section-page-number" aria-hidden="true">03</span>
        <div className="photo-bg">
          <img
            src="/bg/couple.jpg"
            alt="Together"
            className="section-photo ken-burns"
          />
          <div className="photo-blur-overlay"></div>
        </div>
        <div className="photo-text-overlay">
          <span className="section-label gold-text">Our Story</span>
          <h2 className="section-name">Together Forever</h2>
          <p className="section-quote">
            &ldquo;Two souls, one heart, an eternal bond.&rdquo;
          </p>
          <div className="section-divider"></div>
          <p className="section-bio">
            From the moment they met, they knew their story was meant to be
            written in the stars. Now, they invite you to witness the next
            beautiful chapter.
          </p>
        </div>
      </section>

      {/* ───── LOVE QUOTES ROTATOR ───── */}
      <LoveQuoteRotator />

      {/* ───── GALLERY ───── */}
      <Gallery />

      <div className="romantic-section-divider" aria-hidden="true">
        <span>❧</span><span>♥</span><span>✦</span><span>♥</span><span>❦</span>
      </div>

      {/* ───── COUNTDOWN & DETAILS ───── */}
      <Countdown ref={addRef} />
      <section
        className="details-section scroll-reveal"
        ref={addRef}
      >
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

      {/* ───── QR CODE SECTION ───── */}
      <QRCodeSection />

      {/* ───── RSVP FORM ───── */}
      <RSVPForm />

      {/* ───── GUEST BOOK ───── */}
      <GuestBook />

      {/* ───── FOOTER ───── */}
      <footer className="wedding-footer">
        <div className="footer-divider" aria-hidden="true">❧ ♥ ✦ ♥ ❦</div>
        <p className="mauve-text">With Love,</p>
        <h3 className="gold-shimmer">Jethro &amp; Francisca</h3>
        <p className="footer-note">We can&rsquo;t wait to celebrate with you ♥</p>
        <div className="footer-heart" aria-hidden="true">♥</div>
      </footer>
    </>
  );
}
