"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isCorrect: boolean;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function Toast({ message, isCorrect, isVisible, onDismiss }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false);
      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onDismiss();
        }, 600); // Duration of exit animation
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible && !isExiting) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        animation: isExiting 
          ? "toastExit 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
          : "toastEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <div
        className="rounded-lg shadow-2xl backdrop-blur border px-4 py-3 sm:px-5 sm:py-4"
        style={{
          backgroundColor: isCorrect ? "var(--success-soft)" : "var(--error-soft)",
          borderColor: isCorrect ? "var(--success)" : "var(--error)",
          color: isCorrect ? "var(--success)" : "var(--error)",
          minWidth: "280px",
          maxWidth: "360px",
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">
            {isCorrect ? "✅" : "❌"}
          </span>
          <div className="flex-1">
            <p className="font-bold text-sm mb-1">
              {isCorrect ? "CORRECT!" : "INCORRECT"}
            </p>
            <p className="text-xs opacity-90 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
