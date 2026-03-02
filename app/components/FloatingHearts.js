"use client";
import { useEffect, useRef } from "react";

const HEART_SYMBOLS = ["❤️", "💕", "💗", "💓", "🌸", "💖"];
// Max concurrent hearts — limited for performance on lower-end devices
const MAX_HEARTS = 24;
// Interval in ms between new heart spawns
const SPAWN_INTERVAL_MS = 1800;

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts = [];

    function createHeart() {
      const el = document.createElement("span");
      el.className = "floating-heart";
      el.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];

      const size = 10 + Math.random() * 16;
      const left = Math.random() * 100;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 8;
      const drift = (Math.random() - 0.5) * 60;

      el.style.cssText = `
        position: fixed;
        left: ${left}vw;
        bottom: -60px;
        font-size: ${size}px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        animation: floatingHeartRise ${duration}s ease-in ${delay}s infinite;
        --drift: ${drift}px;
      `;

      container.appendChild(el);
      hearts.push(el);

      if (hearts.length > MAX_HEARTS) {
        const old = hearts.shift();
        old.remove();
      }
    }

    const interval = setInterval(createHeart, SPAWN_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      hearts.forEach((h) => h.remove());
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
