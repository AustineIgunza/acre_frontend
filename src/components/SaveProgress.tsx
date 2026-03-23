"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface SaveProgressProps {
  playerScore?: number;
  totalQuestions?: number;
  canSave?: boolean;
}

export default function SaveProgress({ playerScore = 0, totalQuestions = 9, canSave = true }: SaveProgressProps) {
  const router = useRouter();
  const accuracy = totalQuestions > 0 ? Math.round((playerScore / totalQuestions) * 100) : 0;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "24px",
      backgroundColor: "var(--surface)",
      borderRadius: "12px",
      border: "1px solid var(--border)",
      marginTop: "24px",
    }}>
      {/* Progress Summary */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}>
        <div style={{
          padding: "12px",
          backgroundColor: "var(--primary-soft)",
          borderRadius: "8px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
            Score
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--primary)" }}>
            {playerScore}/{totalQuestions}
          </div>
        </div>
        <div style={{
          padding: "12px",
          backgroundColor: "var(--success-soft)",
          borderRadius: "8px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
            Accuracy
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--success)" }}>
            {accuracy}%
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}>
        {/* Save Progress Button */}
        <button
          onClick={() => {
            if (canSave) {
              // Store progress data
              const progressData = {
                score: playerScore,
                totalQuestions,
                accuracy,
                timestamp: new Date().toISOString(),
              };
              localStorage.setItem("acre-progress", JSON.stringify(progressData));
              alert("Progress saved locally!");
            }
          }}
          style={{
            padding: "12px 16px",
            backgroundColor: canSave ? "var(--primary)" : "var(--border)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: canSave ? "pointer" : "not-allowed",
            opacity: canSave ? 1 : 0.5,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (canSave) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          💾 Save Progress
        </button>

        {/* Sign In / Sign Up Button */}
        <Link
          href="/signin"
          style={{
            padding: "12px 16px",
            backgroundColor: "var(--secondary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            textDecoration: "none",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          🔐 Sign In
        </Link>
      </div>

      {/* Info Text */}
      <div style={{
        fontSize: "13px",
        color: "var(--text-muted)",
        padding: "12px",
        backgroundColor: "var(--accent-warm-soft)",
        borderRadius: "6px",
        borderLeft: "3px solid var(--accent-warm)",
      }}>
        <strong>Pro Tip:</strong> Sign in to sync your progress across devices and unlock achievements!
      </div>
    </div>
  );
}
