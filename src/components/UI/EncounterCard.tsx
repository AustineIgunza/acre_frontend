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
      <div className="px-4 sm:px-5 py-2 sm:py-3" style={{ position: "relative" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
          Select your answer:
        </p>
        <div className="space-y-1 mb-3" style={{ position: "relative" }}>
          {options.map(({ key, label }, index) => (
            <div key={key} style={{ position: "relative" }}>
              <button
                onClick={() => handleChoice(key)}
                disabled={is_loading || !!selectedChoice}
                className="w-full p-1.5 sm:p-2 text-left rounded-lg border-2 transition-all"
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
                    : "var(--border)",
                  color: selectedChoice === key 
                    ? toastData?.isCorrect 
                      ? "var(--success)" 
                      : "var(--error)"
                    : "var(--text-secondary)",
                  cursor: is_loading || !!selectedChoice ? "not-allowed" : "pointer",
                  opacity: is_loading || !!selectedChoice ? 0.6 : 1,
                  animation: `slideInFromLeft ${0.3 + index * 0.08}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  pointerEvents: is_loading || !!selectedChoice ? "none" : "auto"
                }}
              >
                <span className="font-bold mr-2">{key}.</span>
                <span className="text-xs sm:text-sm">{label}</span>
              </button>
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
