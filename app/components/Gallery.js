"use client";
import { useState } from "react";

const PHOTOS = [
  { src: "/bg/gallery-1.jpg", caption: "Our First Photo", label: "Beginnings" },
  { src: "/bg/gallery-2.jpg", caption: "Adventures Together", label: "Travel" },
  { src: "/bg/gallery-3.jpg", caption: "The Proposal", label: "The Ring" },
  { src: "/bg/gallery-4.jpg", caption: "Engagement Party", label: "Celebration" },
  { src: "/bg/gallery-5.jpg", caption: "Pre-Wedding Shoot", label: "Forever" },
  { src: "/bg/gallery-6.jpg", caption: "With Family", label: "Loved Ones" },
];

// Duplicate photos to fill the heart mosaic grid (5×5 = 25 cells used by clip-path)
const MOSAIC_PHOTOS = Array.from({ length: 25 }, (_, i) => PHOTOS[i % PHOTOS.length]);

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (photo) => setLightbox(photo);
  const closeLightbox = () => setLightbox(null);

  return (
    <section className="gallery-section scroll-reveal">
      <div className="gallery-header">
        <span className="section-label gold-text">Gallery</span>
        <h2 className="gallery-heading">Our Moments</h2>
      </div>

      {/* Heart-shaped photo collage */}
      <div className="heart-gallery-outer">
        <div className="heart-gallery-container">
          <div className="heart-mosaic">
            {MOSAIC_PHOTOS.map((p, i) => (
              <div
                key={i}
                className="heart-photo-cell"
                onClick={() => openLightbox(PHOTOS[i % PHOTOS.length])}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${p.caption}`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(PHOTOS[i % PHOTOS.length])}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  className="heart-photo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="gallery-tagline">
        <em>Every moment with you is a treasure</em>
      </p>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div
            className="gallery-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="gallery-lightbox-img"
            />
            <div className="gallery-lightbox-caption">
              <span className="gallery-label mauve-text">{lightbox.label}</span>
              <p className="gallery-caption-text">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
