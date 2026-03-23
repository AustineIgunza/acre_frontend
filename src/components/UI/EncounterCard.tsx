"use client";

import { useState } from "react";
import { useCombatStore } from "@/store/combatStore";
import { CombatEncounter } from "@/types/combat";

interface EncounterCardProps {
  encounter: CombatEncounter;
  is_loading: boolean;
}

export default function EncounterCard({
  encounter,
  is_loading,
}: EncounterCardProps) {
  const [feedback, setFeedback] = useState<{
    choice: string;
    message: string;
    isCorrect: boolean;
  } | null>(null);
  const { submitAnswer } = useCombatStore();

  const handleChoice = async (choice: "A" | "B" | "C" | "D") => {
    const isCorrect = choice === encounter.correct_option;
    setFeedback({
      choice,
      message: isCorrect ? encounter.win_feedback : encounter.loss_feedback,
      isCorrect,
    });

    // Wait 2 seconds then submit
    setTimeout(() => {
      submitAnswer(encounter.id, choice);
      setFeedback(null);
    }, 2000);
  };

  const options: Array<{ key: "A" | "B" | "C" | "D"; label: string }> = [
    { key: "A", label: encounter.options.A },
    { key: "B", label: encounter.options.B },
    { key: "C", label: encounter.options.C },
    { key: "D", label: encounter.options.D },
  ];

  return (
    <div 
      className="rounded-2xl border shadow-lg backdrop-blur overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        animation: "smoothFadeIn 0.6s ease-out"
      }}
    >
      {/* Scenario */}
      <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
          ⚡ Challenge Question
        </h3>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {encounter.scenario}
        </p>
      </div>

      {/* Options */}
      <div className="px-6 sm:px-8 py-6 sm:py-8">
        <p className="text-xs sm:text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
          Select your answer:
        </p>
        <div className="space-y-2 sm:space-y-3 mb-6">
          {options.map(({ key, label }, index) => (
            <button
              key={key}
              onClick={() => handleChoice(key)}
              disabled={is_loading || !!feedback}
              className="w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all"
              style={{
                backgroundColor: feedback?.choice === key 
                  ? feedback.isCorrect 
                    ? "var(--success-soft)" 
                    : "var(--error-soft)"
                  : "var(--surface-alt)",
                borderColor: feedback?.choice === key 
                  ? feedback.isCorrect 
                    ? "var(--success)" 
                    : "var(--error)"
                  : "var(--border)",
                color: feedback?.choice === key 
                  ? feedback.isCorrect 
                    ? "var(--success)" 
                    : "var(--error)"
                  : "var(--text-secondary)",
                cursor: is_loading || !!feedback ? "not-allowed" : "pointer",
                opacity: is_loading || !!feedback ? 0.6 : 1,
                animation: `slideInFromLeft ${0.4 + index * 0.1}s ease-out`,
                transform: "translateZ(0)"
              }}
              onMouseEnter={(e) => {
                if (!is_loading && !feedback) {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span className="font-bold mr-2">{key}.</span>
              <span className="text-sm sm:text-base">{label}</span>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className="p-4 sm:p-5 rounded-xl border-2"
            style={{
              backgroundColor: feedback.isCorrect ? "var(--success-soft)" : "var(--error-soft)",
              borderColor: feedback.isCorrect ? "var(--success)" : "var(--error)",
              color: feedback.isCorrect ? "var(--success)" : "var(--error)",
              animation: "smoothScale 0.3s ease-out"
            }}
          >
            <p className="font-bold mb-2 text-sm sm:text-base">
              {feedback.isCorrect ? "✅ CORRECT!" : "❌ INCORRECT"}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">{feedback.message}</p>
          </div>
        )}

        {/* Loading State */}
        {is_loading && (
          <div className="text-center" style={{ color: "var(--text-muted)" }}>
            <p style={{ animation: "pulseGlow 1.5s ease-in-out infinite", fontSize: "14px" }}>
              ⏳ Evaluating your answer...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
