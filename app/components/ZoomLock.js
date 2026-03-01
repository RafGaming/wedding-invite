"use client";
import { useEffect } from "react";

export default function ZoomLock() {
  useEffect(() => {
    // Block Ctrl+Plus / Ctrl+Minus / Ctrl+0 keyboard zoom
    const handleKeydown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    // Block Ctrl+scroll wheel zoom
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Block pinch-to-zoom on trackpad / touch (fires as gesturechange on Safari)
    const handleGesture = (e) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("gesturestart", handleGesture);
    document.addEventListener("gesturechange", handleGesture);
    document.addEventListener("gestureend", handleGesture);

    // Reset zoom to 100% on mount in case user is already zoomed
    document.body.style.zoom = "100%";

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", handleGesture);
      document.removeEventListener("gesturechange", handleGesture);
      document.removeEventListener("gestureend", handleGesture);
    };
  }, []);

  return null;
}
