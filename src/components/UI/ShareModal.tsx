"use client";

import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  heatmapImage?: string; // Base64 encoded image
}

export default function ShareModal({ isOpen, onClose, heatmapImage }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = "Check out my ACRE learning progress! 🎓";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank");
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        window.open(url, "_blank");
        break;
    }
  };

  const handleDownload = () => {
    if (heatmapImage) {
      const link = document.createElement("a");
      link.href = heatmapImage;
      link.download = "acre-heatmap.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          animation: "overlayEnter 0.3s ease-out"
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--surface)",
          borderRadius: "16px",
          border: "2px solid var(--border)",
          padding: "24px",
          maxWidth: "min(400px, 90vw)",
          zIndex: 10000,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--foreground)", margin: 0 }}>
            Share Your Progress 🎉
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              color: "var(--text-muted)"
            }}
          >
            ✕
          </button>
        </div>

        {/* Social Share Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <button
            onClick={() => handleShare("twitter")}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #1DA1F2",
              backgroundColor: "rgba(29, 161, 242, 0.1)",
              color: "#1DA1F2",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(29, 161, 242, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(29, 161, 242, 0.1)";
            }}
          >
            𝕏 Twitter
          </button>

          <button
            onClick={() => handleShare("facebook")}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #1877F2",
              backgroundColor: "rgba(24, 119, 242, 0.1)",
              color: "#1877F2",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(24, 119, 242, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(24, 119, 242, 0.1)";
            }}
          >
            f Facebook
          </button>

          <button
            onClick={() => handleShare("linkedin")}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #0A66C2",
              backgroundColor: "rgba(10, 102, 194, 0.1)",
              color: "#0A66C2",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(10, 102, 194, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(10, 102, 194, 0.1)";
            }}
          >
            in LinkedIn
          </button>

          <button
            onClick={() => handleShare("whatsapp")}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid #25D366",
              backgroundColor: "rgba(37, 211, 102, 0.1)",
              color: "#25D366",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(37, 211, 102, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(37, 211, 102, 0.1)";
            }}
          >
            💬 WhatsApp
          </button>
        </div>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid var(--primary)",
            backgroundColor: "var(--primary-soft)",
            color: "var(--primary)",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "12px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-soft)";
            e.currentTarget.style.color = "var(--primary)";
          }}
        >
          {copied ? "✓ Link Copied!" : "📋 Copy Link"}
        </button>

        {/* Download Heatmap */}
        {heatmapImage && (
          <button
            onClick={handleDownload}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "2px solid var(--success)",
              backgroundColor: "var(--success-soft)",
              color: "var(--success)",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--success)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--success-soft)";
              e.currentTarget.style.color = "var(--success)";
            }}
          >
            📥 Download Heatmap
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid var(--border)",
            backgroundColor: "transparent",
            color: "var(--text-secondary)",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "12px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--surface-alt)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
