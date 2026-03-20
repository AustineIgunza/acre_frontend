"use client";

import { useState, useRef, useEffect } from "react";
import { useArceStore } from "@/store/arceStore";
import { CrisisScenario, ThermalState } from "@/types/arce";
import { getDefenseEvaluation } from "@/utils/mockTestData";
import MiniLoadingOverlay from "./MiniLoadingOverlay";
import FeedbackModal from "./FeedbackModal";

interface CrisisModalProps {
  scenario: CrisisScenario;
  onFeedback?: (thermalState: ThermalState) => void;
}

export default function CrisisModal({ scenario }: CrisisModalProps) {
  const {
    selectAction,
    showDefense,
    submitDefense,
    selectedActionButton,
    showDefenseTextbox,
    isLoading,
    testMode,
  } = useArceStore();

  const [defenseText, setDefenseText] = useState("");
  const [defenseSubmitted, setDefenseSubmitted] = useState(false);
  const [thermalState, setThermalState] = useState<ThermalState>("neutral");
  const [feedback, setFeedback] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [formalDef, setFormalDef] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when it appears
  useEffect(() => {
    if (showDefenseTextbox && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showDefenseTextbox]);

  const handleActionClick = (buttonId: string) => {
    selectAction(buttonId);
    // For multiple choice, immediately show defense
    if (scenario.questionType === "multiple-choice") {
      setTimeout(() => showDefense(), 300);
    }
  };

  const handleDefenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In test mode, allow empty defense; otherwise require 20 chars
    if (!testMode && defenseText.trim().length < 20) {
      alert("Please provide a more detailed defense (at least 20 characters).");
      return;
    }

    setIsEvaluating(true);

    // Get evaluation based on actual button + defense
    const evaluation = getDefenseEvaluation(
      scenario.id,
      selectedActionButton || "",
      defenseText.length
    );

    setThermalState(evaluation.thermalState);
    setFeedback(evaluation.feedback);
    setKeywords(evaluation.keywords);
    setFormalDef(evaluation.formalDefinition);

    // Simulate API delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsEvaluating(false);
    setDefenseSubmitted(true);

    // Submit to store
    await submitDefense(defenseText);

    // Show feedback for 3.5 seconds, then move to next
    setTimeout(() => {
      setDefenseSubmitted(false);
      setDefenseText("");
      setThermalState("neutral");
      setFeedback("");
      setKeywords([]);
      setFormalDef("");
      
      // Move to next scenario
      const { nextNode, gameSession, currentPhase } = useArceStore.getState();
      
      // Check if we should end game (5 scenarios completed)
      if (gameSession && gameSession.responses.length >= 5) {
        useArceStore.getState().endGame();
      } else {
        nextNode();
      }
    }, 3500);
  };

  return (
    <>
      {/* Mini Loading Overlay during evaluation */}
      {isEvaluating && <MiniLoadingOverlay />}

      <div className="min-h-screen-gradient bg-gradient-blue-white text-slate-900 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 flex flex-col items-center justify-start relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-40 left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-slow animation-delay-2000"></div>
        
        {/* Content Container - Fully Centered and Scrollable */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-6 sm:gap-8 relative z-10">
          {/* Crisis Section - Centered */}
          <div className="w-full text-center animate-slideDown">
            {/* Crisis Heading */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent animate-float">
                CRISIS
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-600">
                Make your critical decision
              </p>
            </div>

            {/* Crisis Text Box - Premium styling */}
            <div className="text-center mb-6 sm:mb-8 animate-slideUp">
              <p className="text-base sm:text-lg lg:text-xl font-semibold leading-snug sm:leading-relaxed text-slate-800 bg-white/80 backdrop-blur-lg border-1.5 border-blue-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 break-words">
                {scenario.crisisText}
              </p>
            </div>

            {/* Action Buttons for Multiple Choice - Centered */}
            {scenario.questionType === "multiple-choice" &&
              scenario.actionButtons &&
              !showDefenseTextbox && (
              <div className="w-full space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest text-center mb-3 sm:mb-4">
                  Select Your Response:
                </p>
                {scenario.actionButtons.map((button, idx) => (
                  <button
                    key={button.id}
                    onClick={() => handleActionClick(button.id)}
                    disabled={isLoading}
                    className={`action-button w-full transition-all duration-300 animate-slideUp ${
                      selectedActionButton === button.id ? "selected ring-2 ring-blue-500 scale-105" : "hover:scale-102"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className="action-button-index text-base sm:text-lg font-bold">
                      {String.fromCharCode(65 + (button.order - 1))}
                    </span>
                    <span className="action-button-label flex-1 text-left text-sm sm:text-base break-words">{button.label}</span>
                    <span className="text-xs text-slate-500 hidden sm:inline">Click to select</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Defense Textbox - Inline, not fixed position */}
          {showDefenseTextbox && !defenseSubmitted && (
            <div className="defense-box-inline w-full animate-slideDown">
              <form onSubmit={handleDefenseSubmit} className="flex flex-col gap-3 sm:gap-4">
                <label className="defense-label text-center text-base sm:text-lg font-bold text-slate-900">
                  Defend Your Logic {testMode && <span className="text-xs bg-yellow-200 px-2 py-1 rounded ml-2">TEST MODE</span>}
                </label>
                <textarea
                  ref={textareaRef}
                  value={defenseText}
                  onChange={(e) => setDefenseText(e.target.value)}
                  placeholder={testMode ? "TEST MODE: Type anything or leave blank (will auto-pass)..." : "Explain your reasoning... (min 20 chars)"}
                  className="defense-textarea w-full p-3 sm:p-4 border-1.5 border-blue-200 rounded-xl text-slate-800 bg-blue-50/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 transition-all duration-250"
                  disabled={isLoading || isEvaluating}
                  autoFocus
                />
                <div className="text-center text-xs sm:text-sm text-slate-500 font-medium">
                  {defenseText.length} / {testMode ? "optional" : "20"} characters {!testMode && "minimum"}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || (!testMode && defenseText.trim().length < 20) || isEvaluating}
                  className="button-primary w-full py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base rounded-xl hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-250"
                >
                  {isEvaluating ? "Evaluating..." : testMode ? "Submit (TEST MODE)" : "Submit Defense"}
                </button>
              </form>
            </div>
          )}

          {/* Feedback is now in modal - removed inline display */}

          {/* Spacer to allow scrolling room */}
          <div className="h-4 sm:h-8" />
        </div>
      </div>

      {/* Feedback Modal - Popup instead of inline */}
      <FeedbackModal
        isOpen={defenseSubmitted}
        thermalState={thermalState}
        feedback={feedback}
        keywords={keywords}
        formalDefinition={formalDef}
        onClose={() => {
          setDefenseSubmitted(false);
          setDefenseText("");
          setThermalState("neutral");
          setFeedback("");
          setKeywords([]);
          setFormalDef("");
          
          // Move to next scenario
          const { nextNode, gameSession } = useArceStore.getState();
          
          // Check if we should end game (5 scenarios completed)
          if (gameSession && gameSession.responses.length >= 5) {
            useArceStore.getState().endGame();
          } else {
            nextNode();
          }
        }}
        autoCloseSeconds={3.5}
      />
    </>
  );
}
