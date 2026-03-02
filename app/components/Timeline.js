"use client";
import { useEffect, useRef } from "react";

const MILESTONES = [
  {
    date: "Spring 2019",
    title: "First Met",
    description:
      "Two strangers crossed paths at a mutual friend's gathering, sharing laughs and discovering a world of common interests.",
    image: "/bg/timeline-first-met.jpg",
  },
  {
    date: "Summer 2019",
    title: "First Date",
    description:
      "A quiet walk along the waterfront turned into hours of conversation — neither of them wanted the evening to end.",
    image: "/bg/timeline-first-date.jpg",
  },
  {
    date: "December 2024",
    title: "The Proposal",
    description:
      "Under a canopy of fairy lights, Jethro got down on one knee and asked Francisca to spend forever with him. She said yes.",
    image: "/bg/timeline-proposal.jpg",
  },
  {
    date: "December 31, 2026",
    title: "The Big Day",
    description:
      "Surrounded by family and friends, they will exchange vows and begin their greatest adventure together.",
    image: "/bg/timeline-big-day.jpg",
  },
];

export default function Timeline() {
  const itemRefs = useRef([]);

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

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  return (
    <section className="timeline-section" id="story">
      <div className="timeline-inner">
        <span className="section-label gold-text">Our Journey</span>
        <h2 className="timeline-heading">Love Story</h2>
      </div>
      <div className="chapter-list">
        {MILESTONES.map((m, i) => (
          <div
            key={m.title}
            className={`chapter-band ${i % 2 === 0 ? "chapter-ltr" : "chapter-rtl"}`}
            ref={addRef}
          >
            <span className="chapter-num accent-text">0{i + 1}</span>
            <div className="chapter-photo">
              <img src={m.image} alt={m.title} className="chapter-img" loading="lazy" />
            </div>
            <div className="chapter-text">
              <span className="chapter-date gold-text">{m.date}</span>
              <h3 className="chapter-title">{m.title}</h3>
              <p className="chapter-desc">{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
