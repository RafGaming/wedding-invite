"use client";
import { useState } from "react";
import Card from "./Card";
import styles from "./EnvelopeOpen.module.css";

export default function EnvelopeOpen({ onOpen, ready }) {
  const [opened, setOpened] = useState(false);

  function handleOpen() {
    if (opened) return;
    setOpened(true);
    if (onOpen) onOpen();
  }

  return (
    <div className={styles.wrapper} aria-live="polite">
      {/* inner card that slides up when opened — use existing Card component */}
      <div className={`${styles.cardWrap} ${opened ? styles.cardVisible : ""}`} aria-hidden={!opened}>
        <div className={styles.cardInner}>
          <Card />
        </div>
      </div>

      {/* envelope body (static) */}
      <img src="/envelope/body.png" alt="Envelope body" className={styles.body} />

      {/* top flap */}
      <div className={`${styles.flap} ${opened ? styles.flapOpen : ""}`} aria-hidden={opened}>
        <img src="/envelope/flap.png" alt="" className={styles.flapImg} aria-hidden="true" />
      </div>

      {/* wax seal button */}
      <button
        className={`${styles.seal} ${opened ? styles.sealGone : ""}`}
        onClick={handleOpen}
        aria-pressed={opened}
        aria-label={opened ? "Envelope opened" : "Open envelope"}
      >
        <img src="/envelope/seal.png" alt="" className={styles.sealImg} aria-hidden="true" />
      </button>
    </div>
  );
}
