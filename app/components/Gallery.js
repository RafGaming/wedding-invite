"use client";
import { useState, useEffect } from "react";

const PHOTOS = [
  { src: "/bg/gallery-1.jpg", caption: "Our First Photo", label: "Beginnings" },
  { src: "/bg/gallery-2.jpg", caption: "Adventures Together", label: "Travel" },
  { src: "/bg/gallery-3.jpg", caption: "The Proposal", label: "The Ring" },
  { src: "/bg/gallery-4.jpg", caption: "Engagement Party", label: "Celebration" },
  { src: "/bg/gallery-5.jpg", caption: "Pre-Wedding Shoot", label: "Forever" },
  { src: "/bg/gallery-6.jpg", caption: "With Family", label: "Loved Ones" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <section className="gallery-section scroll-reveal" id="gallery">
      <div className="gallery-header">
        <span className="section-label gold-text">Gallery</span>
        <h2 className="gallery-heading">Our Moments</h2>
      </div>
      <div className="masonry-grid">
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="masonry-item"
            onClick={() => setLightbox(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightbox(p)}
            aria-label={`View photo: ${p.caption}`}
          >
            <div className="masonry-img-wrap">
              <img src={p.src} alt={p.caption} className="masonry-img" loading="lazy" />
              <div className="masonry-overlay">
                <span className="gallery-label mauve-text">{p.label}</span>
                <p className="gallery-caption-text">{p.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            className="lightbox-close"
            aria-label="Close photo"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} className="lightbox-img" />
            <div className="lightbox-caption">
              <span className="gallery-label mauve-text">{lightbox.label}</span>
              <p className="lightbox-caption-text">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
