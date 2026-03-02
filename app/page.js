"use client";
import { useState, useEffect } from "react";
import Envelope from "./components/Envelope";
import Sparkles from "./components/Sparkles";
import Petals from "./components/Petals";
import MusicPlayer from "./components/MusicPlayer";
import ScrollSections from "./components/ScrollSections";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const SCROLL_KEYS = new Set([
      "ArrowDown", "ArrowUp", " ",
      "PageDown", "PageUp", "Home", "End",
    ]);

    const preventScroll = (e) => e.preventDefault();
    const preventKeyScroll = (e) => {
      if (SCROLL_KEYS.has(e.key)) e.preventDefault();
    };

    if (!isOpened) {
      const scrollY = window.scrollY;
      document.body.classList.add("scroll-locked");
      document.body.style.top = `-${scrollY}px`;

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll);

      return () => {
        document.body.classList.remove("scroll-locked");
        const savedTop = document.body.style.top;
        document.body.style.top = "";
        window.scrollTo(0, parseInt(savedTop || "0", 10) * -1);

        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeyScroll);
      };
    }
  }, [isOpened]);

  return (
    <main>
      <Preloader onDone={() => setPreloaderDone(true)} />
      <CustomCursor />

      {/* cinematic parallax background */}
      <div className="parallax-bg">
        <div className="bg-layer layer1"></div>
        <div className="bg-layer layer2"></div>
      </div>

      {/* ambient effects */}
      <Sparkles />
      <Petals />
      <MusicPlayer />

      {/* hero section — floating envelope */}
      <section className="hero-section">
        <div className="photo-bg">
          <img src="/bg.jpg" alt="Wedding background" className="section-photo" />
          <div className="photo-blur-overlay"></div>
        </div>
        <Envelope onOpen={() => setIsOpened(true)} ready={preloaderDone} />
      </section>

      {/* scrollable bride & groom sections — rendered only after envelope is opened */}
      {isOpened && <ScrollSections />}
    </main>
  );
}
