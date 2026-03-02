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
      { threshold: 0.25 }
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
    <section className="timeline-section scroll-reveal">
      <div className="timeline-inner">
        <span className="section-label gold-text">Our Journey</span>
        <h2 className="timeline-heading">Love Story</h2>
        <div className="timeline-line-wrap">
          <div className="timeline-line" />
          {MILESTONES.map((m, i) => (
            <div
              key={m.title}
              className={`timeline-item ${i % 2 === 0 ? "timeline-left" : "timeline-right"}`}
              ref={addRef}
            >
              <div className="timeline-node">
                <span className="timeline-node-heart">♥</span>
              </div>
              <div className="timeline-card timeline-card--glass">
                <div className="timeline-img-wrap">
                  <img src={m.image} alt={m.title} className="timeline-img" />
                </div>
                <div className="timeline-card-body">
                  <span className="timeline-date accent-text">{m.date}</span>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
