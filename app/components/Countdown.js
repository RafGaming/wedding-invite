"use client";
import { useState, useEffect, forwardRef } from "react";

const FALLBACK_DATE = new Date("2026-12-31T18:00:00");

function getTimeLeft(weddingDate) {
  const now = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

const RADIUS = 38;
const CIRC = 2 * Math.PI * RADIUS;

function getRingOffset(value, max) {
  return CIRC * (1 - Math.min(value, max) / max);
}

function CountdownUnit({ label, value, max }) {
  const offset = getRingOffset(value, max);
  return (
    <div className="countdown-unit">
      <div className="countdown-ring-wrap">
        <svg className="countdown-svg" viewBox="0 0 90 90" aria-hidden="true">
          <circle
            className="countdown-ring-bg"
            cx="45"
            cy="45"
            r={RADIUS}
            fill="none"
            strokeWidth="3"
          />
          <circle
            className="countdown-ring-fill"
            cx="45"
            cy="45"
            r={RADIUS}
            fill="none"
            strokeWidth="3"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 45 45)"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="countdown-flip-inner">
          <span key={value} className="countdown-number flip-in">
            {pad(value)}
          </span>
        </div>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

const Countdown = forwardRef(function Countdown(props, ref) {
  const [weddingDate, setWeddingDate] = useState(FALLBACK_DATE);
  const [dateLabel, setDateLabel] = useState("December 31, 2026 (Placeholder)");
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(FALLBACK_DATE));

  useEffect(() => {
    fetch("/api/wedding-details")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.wedding_date) {
          const parsed = new Date(data.wedding_date);
          if (!isNaN(parsed.getTime())) {
            setWeddingDate(parsed);
            setDateLabel(data.wedding_date);
            setTimeLeft(getTimeLeft(parsed));
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(weddingDate)), 1000);
    return () => clearInterval(id);
  }, [weddingDate]);

  const units = [
    { label: "Days", value: timeLeft.days, max: 365 },
    { label: "Hours", value: timeLeft.hours, max: 24 },
    { label: "Minutes", value: timeLeft.minutes, max: 60 },
    { label: "Seconds", value: timeLeft.seconds, max: 60 },
  ];

  return (
    <section className="countdown-section scroll-reveal" ref={ref} aria-live="polite" aria-atomic="true">
      <div className="countdown-inner">
        <span className="section-label gold-text">Counting Down</span>
        <h2 className="countdown-heading">Until&nbsp;&nbsp;&nbsp;&nbsp;We&nbsp;&nbsp;&nbsp;&nbsp;Say&nbsp;&nbsp;&#8220;I&nbsp;&nbsp;Do&#8221;</h2>
        <div className="countdown-grid">
          {units.map(({ label, value, max }) => (
            <CountdownUnit key={label} label={label} value={value} max={max} />
          ))}
        </div>
        <p className="countdown-note accent-text">{dateLabel}</p>
      </div>
    </section>
  );
});

Countdown.displayName = "Countdown";

export default Countdown;
