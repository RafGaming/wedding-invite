"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function GalleryWallPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/wedding-photos");
        if (res.ok) {
          const data = await res.json();
          setPhotos(data);
        }
      } catch (err) {
        console.error("Failed to load photos:", err);
      }
      setLoading(false);
    }
    fetchPhotos();
  }, []);

  return (
    <main className="gallery-wall-page">
      <div className="gallery-wall-container">
        <Link href="/" className="gallery-wall-back">
          ← Back to Invitation
        </Link>

        <header className="gallery-wall-header">
          <h1 className="gallery-wall-title gold-shimmer">
            Wedding Memories 💕
          </h1>
          <p className="gallery-wall-subtitle">
            Photos shared by our beloved guests
          </p>
        </header>

        {loading ? (
          <div className="gallery-wall-loading">
            <p>Loading memories...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-wall-empty">
            <p>No photos yet — be the first to share! 📸</p>
            <Link href="/upload" className="gallery-wall-upload-link">
              Upload a Photo
            </Link>
          </div>
        ) : (
          <div className="gallery-wall-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="gallery-wall-card">
                <img
                  src={photo.image_url}
                  alt={`Photo by ${photo.uploader_name}`}
                  className="gallery-wall-img"
                />
                <div className="gallery-wall-overlay">
                  <span className="gallery-wall-uploader">
                    {photo.uploader_name}
                  </span>
                  {photo.comment && (
                    <p className="gallery-wall-comment">{photo.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
