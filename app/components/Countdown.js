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

const Countdown = forwardRef(function Countdown(props, ref) {
  const [weddingDate, setWeddingDate] = useState(FALLBACK_DATE);
  const [dateLabel, setDateLabel] = useState("December 31, 2026 (Placeholder)");
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(FALLBACK_DATE));

  useEffect(() => {
    fetch("/api/wedding-details")
      .then((res) => res.ok ? res.json() : Promise.reject())
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
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="countdown-section scroll-reveal" ref={ref}>
      <div className="countdown-inner">
        <span className="section-label gold-text">Counting Down</span>
        <h2 className="countdown-heading">Until&nbsp;&nbsp;&nbsp;&nbsp;We&nbsp;&nbsp;&nbsp;&nbsp;Say&nbsp;&nbsp;&#8220;I&nbsp;&nbsp;Do&#8221;</h2>
        <div className="countdown-heart" aria-hidden="true">♥</div>
        <div className="countdown-grid">
          {units.map(({ label, value }) => (
            <div key={label} className="countdown-unit">
              <div className="countdown-ring">
                <span className="countdown-number">{pad(value)}</span>
              </div>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>
        <p className="countdown-note accent-text">{dateLabel}</p>
      </div>
    </section>
  );
});

Countdown.displayName = "Countdown";

export default Countdown;
