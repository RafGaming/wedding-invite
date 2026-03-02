"use client";
import { useEffect, useRef } from "react";

const PHOTOS = [
  { src: "/bg/gallery-1.jpg", caption: "Our First Photo", label: "Beginnings" },
  { src: "/bg/gallery-2.jpg", caption: "Adventures Together", label: "Travel" },
  { src: "/bg/gallery-3.jpg", caption: "The Proposal", label: "The Ring" },
  { src: "/bg/gallery-4.jpg", caption: "Engagement Party", label: "Celebration" },
  { src: "/bg/gallery-5.jpg", caption: "Pre-Wedding Shoot", label: "Forever" },
  { src: "/bg/gallery-6.jpg", caption: "With Family", label: "Loved Ones" },
];

export default function Gallery() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery-section scroll-reveal">
      <div className="gallery-header">
        <span className="section-label gold-text">Gallery</span>
        <h2 className="gallery-heading">Our Moments</h2>
      </div>
      <div className="gallery-grid">
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="gallery-grid-item"
            ref={(el) => (itemsRef.current[i] = el)}
          >
            <div className="gallery-img-wrap">
              <img src={p.src} alt={p.caption} className="gallery-img" />
            </div>
            <div className="gallery-caption">
              <span className="gallery-label mauve-text">{p.label}</span>
              <p className="gallery-caption-text">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
