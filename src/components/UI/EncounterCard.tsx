"use client";

import { useState } from "react";
import { useCombatStore } from "@/store/combatStore";
import { CombatEncounter } from "@/types/combat";
import Toast from "./Toast";

interface EncounterCardProps {
  encounter: CombatEncounter;
  is_loading: boolean;
}

export default function EncounterCard({
  encounter,
  is_loading,
}: EncounterCardProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState<{
    message: string;
    isCorrect: boolean;
  } | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [hoveredOption, setHoveredOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const { submitAnswer } = useCombatStore();

  const handleChoice = async (choice: "A" | "B" | "C" | "D") => {
    const isCorrect = choice === encounter.correct_option;
    const message = isCorrect ? encounter.win_feedback : encounter.loss_feedback;
    
    setSelectedChoice(choice);
    setToastData({ message, isCorrect });
    setToastVisible(true);

    // Wait 2 seconds then submit
    setTimeout(() => {
      submitAnswer(encounter.id, choice);
      setSelectedChoice(null);
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
      className="rounded-2xl border shadow-lg backdrop-blur overflow-visible"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
        zIndex: 1
      }}
    >
      {/* Scenario */}
      <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: "var(--primary)" }}>
          ⚡ Challenge Question
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {encounter.scenario}
        </p>
      </div>

      {/* Options */}
      <div className="px-4 sm:px-5 py-4 sm:py-5" style={{ position: "relative" }}>
        <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
          Select your answer:
        </p>
        <div className="space-y-2 mb-4" style={{ position: "relative" }}>
          {options.map(({ key, label }, index) => (
            <div key={key} style={{ position: "relative" }}>
              <button
                onClick={() => handleChoice(key)}
                disabled={is_loading || !!selectedChoice}
                className="w-full p-2 sm:p-3 text-left rounded-xl border-2 transition-all"
                style={{
                  backgroundColor: selectedChoice === key 
                    ? toastData?.isCorrect 
                      ? "var(--success-soft)" 
                      : "var(--error-soft)"
                    : "var(--surface-alt)",
                  borderColor: selectedChoice === key 
                    ? toastData?.isCorrect 
                      ? "var(--success)" 
                      : "var(--error)"
                    : hoveredOption === key
                    ? "var(--primary)"
                    : "var(--border)",
                  color: selectedChoice === key 
                    ? toastData?.isCorrect 
                      ? "var(--success)" 
                      : "var(--error)"
                    : "var(--text-secondary)",
                  cursor: is_loading || !!selectedChoice ? "not-allowed" : "pointer",
                  opacity: is_loading || !!selectedChoice ? 0.6 : 1,
                  animation: `slideInFromLeft ${0.3 + index * 0.08}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  transform: hoveredOption === key && !is_loading && !selectedChoice 
                    ? "translateY(-2px)" 
                    : "translateY(0)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={() => !is_loading && !selectedChoice && setHoveredOption(key)}
                onMouseLeave={() => setHoveredOption(null)}
                onTouchStart={() => !is_loading && !selectedChoice && setHoveredOption(key)}
                onTouchEnd={() => setHoveredOption(null)}
              >
                <span className="font-bold mr-2">{key}.</span>
                <span className="text-xs sm:text-sm">{label}</span>
              </button>

              {/* Hover Tooltip - Shows full text on smaller screens */}
              {hoveredOption === key && !is_loading && !selectedChoice && (
                <div
                  style={{
                    position: "fixed",
                    backgroundColor: "var(--surface)",
                    border: "2px solid var(--primary)",
                    borderRadius: "12px",
                    padding: "12px",
                    maxWidth: "min(300px, 90vw)",
                    zIndex: 10001,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    animation: "popupEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    pointerEvents: "none",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="font-bold" style={{ color: "var(--primary)" }}>{key}. </span>
                    {label}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loading State */}
        {is_loading && (
          <div className="text-center" style={{ color: "var(--text-muted)" }}>
            <p style={{ animation: "pulseGlow 1.5s ease-in-out infinite", fontSize: "14px" }}>
              ⏳ Evaluating your answer...
            </p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastData && (
        <Toast 
          message={toastData.message}
          isCorrect={toastData.isCorrect}
          isVisible={toastVisible}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </div>
  );
}
