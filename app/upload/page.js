"use client";
import { useState, useEffect, useRef } from "react";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/wedding-photos");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (err) {
      console.error("Failed to load photo feed:", err);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleReset() {
    setName("");
    setComment("");
    setImage(null);
    setPreview(null);
    setSuccess(false);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("image", image);

    try {
      const res = await fetch("/api/wedding-photos", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed.");
      }
      setSuccess(true);
      fetchPhotos();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="upload-page">
      <div className="upload-container">
        <header className="upload-header">
          <h1 className="upload-title">Share Your Moments 📸</h1>
          <p className="upload-subtitle">Capture the magic and share it with us</p>
        </header>

        {success ? (
          <div className="upload-success">
            <div className="upload-success-icon">✓</div>
            <p className="upload-success-msg">
              Thank you for sharing this beautiful moment! 💕
            </p>
            <button className="upload-another-btn" onClick={handleReset}>
              Upload Another
            </button>
          </div>
        ) : (
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="rsvp-field">
              <label className="rsvp-label">Your Name</label>
              <input
                className="rsvp-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="rsvp-field">
              <label className="rsvp-label">Photo</label>
              <div
                className="upload-drop-area"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="upload-preview-img"
                  />
                ) : (
                  <>
                    <span className="upload-camera-icon">📷</span>
                    <p className="upload-drop-text">
                      Tap to capture or select a photo
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  required
                  disabled={loading}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="rsvp-field">
              <label className="rsvp-label">
                Add a sweet note (optional)
              </label>
              <textarea
                className="rsvp-textarea"
                placeholder="Share a message about this moment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
                rows={3}
              />
            </div>

            {error && <p className="upload-error">{error}</p>}

            <button
              type="submit"
              className="rsvp-submit"
              disabled={loading || !image}
            >
              {loading ? "Uploading..." : "Share This Memory ✨"}
            </button>
          </form>
        )}
      </div>

      {photos.length > 0 && (
        <div className="upload-feed">
          <h2 className="upload-feed-heading">Shared Memories</h2>
          <div className="upload-feed-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="upload-feed-card">
                <img
                  src={photo.image_url}
                  alt={`Photo by ${photo.uploader_name}`}
                  className="upload-feed-img"
                />
                <div className="upload-feed-info">
                  <span className="upload-feed-name">{photo.uploader_name}</span>
                  {photo.comment && (
                    <p className="upload-feed-comment">{photo.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
