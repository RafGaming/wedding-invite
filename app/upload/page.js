"use client";
import { useState, useEffect, useRef } from "react";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/wedding-photos");
      if (res.ok) {
        const data = await res.json();
        setPhotos(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      // Photo feed is non-critical — fail silently so the upload form still works
      console.error("Failed to fetch photos:", err);
    }
  }

  function handleFileSelect(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setImage(file);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!image) { setError("Please select a photo to share."); return; }

    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!image) { setError("Please select a photo to share."); return; }

    setSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("comment", comment.trim());
    formData.append("image", image);

    try {
      const res = await fetch("/api/wedding-photos", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setSuccess(true);
      fetchPhotos();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setName("");
    setComment("");
    setImage(null);
    setPreview(null);
    setSuccess(false);
    setError("");
  }

  return (
    <div className="upload-page">
      {/* Ambient sparkles */}
      <div className="upload-ambient" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="upload-sparkle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + (i % 4)}s`,
          }} />
        ))}
      </div>

      <div className="upload-content">
        {/* Header */}
        <div className="upload-header">
          <div className="upload-header-flourish">❤ ✦ ❤</div>
          <h1 className="upload-title">Share Your Moments</h1>
          <p className="upload-subtitle">
            📸 Capture the magic of this beautiful day and share it with us 💕
          </p>
        </div>

        {success ? (
          /* Success State */
          <div className="upload-success-card">
            <div className="upload-success-animation">
              <div className="upload-success-check">✓</div>
              <div className="upload-success-dots">
                {["❤️", "💕", "💗", "✨", "💖"].map((h, i) => (
                  <span key={i} className="upload-success-dot" style={{ animationDelay: `${i * 0.15}s` }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="upload-success-title">Thank you!</h2>
            <p className="upload-success-msg">
              Thank you for sharing this beautiful moment! 💕<br />
              Your photo is part of our story now.
            </p>
            <button className="upload-btn" onClick={resetForm}>
              Share Another Photo ✨
            </button>
          </div>
        ) : (
          /* Upload Form */
          <form className="upload-form" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="upload-field">
              <label className="upload-label" htmlFor="upload-name">
                <span className="upload-label-icon">👤</span> Your Name
              </label>
              <input
                id="upload-name"
                type="text"
                className="upload-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            {/* Image Upload */}
            <div className="upload-field">
              <label className="upload-label">
                <span className="upload-label-icon">📷</span> Photo
              </label>
              <div
                className={`upload-dropzone ${dragging ? "upload-dropzone--active" : ""} ${preview ? "upload-dropzone--has-preview" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                aria-label="Upload photo area"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="upload-preview-img" />
                ) : (
                  <div className="upload-dropzone-inner">
                    <span className="upload-camera-icon">📸</span>
                    <p className="upload-dropzone-text">Tap to capture or select a photo</p>
                    <p className="upload-dropzone-hint">JPG, PNG, WEBP, HEIC accepted</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="upload-file-input"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Comment */}
            <div className="upload-field">
              <label className="upload-label" htmlFor="upload-comment">
                <span className="upload-label-icon">💬</span> Sweet Note{" "}
                <span className="upload-optional">(optional)</span>
              </label>
              <textarea
                id="upload-comment"
                className="upload-textarea"
                placeholder="Add a sweet note..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                disabled={submitting}
              />
            </div>

            {error && <p className="upload-error">{error}</p>}

            <button
              type="submit"
              className="upload-btn upload-btn--submit"
              disabled={submitting || !name || !image}
            >
              {submitting ? "Uploading... ⏳" : "Share This Memory ✨"}
            </button>
          </form>
        )}

        {/* Live photo feed */}
        {photos.length > 0 && (
          <div className="upload-feed">
            <div className="upload-feed-header">
              <span className="upload-feed-flourish">❧</span>
              <h2 className="upload-feed-title">Memories Shared</h2>
              <span className="upload-feed-flourish">❦</span>
            </div>
            <div className="upload-feed-grid">
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="upload-feed-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="upload-feed-img-wrap">
                    <img
                      src={photo.image_url}
                      alt={`Photo by ${photo.uploader_name}`}
                      className="upload-feed-img"
                      loading="lazy"
                    />
                    <div className="upload-feed-overlay">
                      <p className="upload-feed-name">{photo.uploader_name}</p>
                      {photo.comment && (
                        <p className="upload-feed-comment">&ldquo;{photo.comment}&rdquo;</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="upload-footer">
          <p>With Love, <strong>Jethro &amp; Francisca</strong> ♥</p>
        </footer>
      </div>
    </div>
  );
}
