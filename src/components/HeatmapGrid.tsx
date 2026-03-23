"use client";

import { useState } from "react";

interface HeatmapGridProps {
  results: ("correct" | "wrong" | "close")[];
  masteryScores?: number[]; // 0-100 for gradient coloring
  battleLog?: Array<{
    encounter_id: number;
    feedback: string;
    was_correct: boolean;
    damage_dealt: number;
  }>;
}

/**
 * Heatmap gradient colors based on mastery level (0-100)
 * Light Orange (0-33%) → Orange (34-66%) → Searing Red (67-100%)
 */
export function getMasteryColor(score: number): string {
  if (score < 34) {
    // Light Orange gradient: 0-33%
    const intensity = score / 33;
    return `hsl(32, 100%, ${85 - intensity * 15}%)`;
  } else if (score < 67) {
    // Orange to Red gradient: 34-66%
    const intensity = (score - 33) / 33;
    const hue = 32 - intensity * 15; // 32 (orange) → 17 (red-orange)
    return `hsl(${hue}, 100%, ${70 - intensity * 15}%)`;
  } else {
    // Searing Red gradient: 67-100%
    const intensity = (score - 66) / 34;
    return `hsl(0, 100%, ${55 - intensity * 20}%)`;
  }
}

interface TooltipState {
  cellIndex: number | null;
  x: number;
  y: number;
}

export default function HeatmapGrid({ results, masteryScores = [], battleLog = [] }: HeatmapGridProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({ cellIndex: null, x: 0, y: 0 });

  // Pad results to 9 cells (3x3 grid)
  const gridResults = [...results];
  while (gridResults.length < 9) {
    gridResults.push("wrong");
  }

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      cellIndex: index,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ cellIndex: null, x: 0, y: 0 });
  };

  return (
    <div className="w-full">
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "16px",
        color: "var(--foreground)",
      }}>
        Performance Heatmap (Hover for Details)
      </h3>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        marginBottom: "24px",
        position: "relative",
      }}>
        {gridResults.slice(0, 9).map((result, index) => {
          const masteryScore = masteryScores[index] || (result === "correct" ? 90 : result === "close" ? 50 : 20);
          const bgColor = getMasteryColor(masteryScore);

          return (
            <div
              key={index}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bgColor,
                borderRadius: "12px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "scale(1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                animation: `smoothScale 0.5s ease-out ${index * 0.05}s both`,
              }}
              onMouseEnter={(e) => {
                handleMouseEnter(index, e);
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                handleMouseLeave();
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Empty box - content shown in tooltip on hover */}
            </div>
          );
        })}

        {/* Tooltip */}
        {tooltip.cellIndex !== null && (
          <div style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 20}px`,
            transform: "translate(-50%, -100%)",
            backgroundColor: "#1f2937",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "500",
            maxWidth: "280px",
            zIndex: 1000,
            pointerEvents: "none",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            lineHeight: "1.4",
          }}>
            <div style={{ marginBottom: "8px" }}>
              <strong>Question {tooltip.cellIndex + 1}</strong>
            </div>
            
            <div style={{ marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{
                fontSize: "16px",
              }}>
                {results[tooltip.cellIndex] === "correct" ? "✓" : results[tooltip.cellIndex] === "close" ? "◐" : "✕"}
              </span>
              <span>
                {results[tooltip.cellIndex] === "correct" 
                  ? "Correct" 
                  : results[tooltip.cellIndex] === "close" 
                  ? "Close/Partial" 
                  : "Wrong"}
              </span>
            </div>

            <div style={{
              padding: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              marginBottom: "8px",
              fontSize: "12px",
              fontStyle: "italic",
            }}>
              {battleLog[tooltip.cellIndex]?.feedback || "No feedback available"}
            </div>

            <div style={{
              fontSize: "12px",
              color: "#9ca3af",
              paddingTop: "8px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              Mastery: <strong>{masteryScores[tooltip.cellIndex] || 50}%</strong>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "12px",
        padding: "16px",
        backgroundColor: "var(--surface)",
        borderRadius: "8px",
        fontSize: "13px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: getMasteryColor(15),
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }} />
            <span style={{ fontWeight: "600" }}>Light Orange (0-33%)</span>
          </div>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>🍊 Early learning</span>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: getMasteryColor(50),
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }} />
            <span style={{ fontWeight: "600" }}>Orange (34-66%)</span>
          </div>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>🟠 Building competence</span>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: getMasteryColor(85),
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }} />
            <span style={{ fontWeight: "600" }}>Searing Red (67-100%)</span>
          </div>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>� Expert mastery</span>
        </div>
      </div>

      {/* Gradient Preview */}
      <div style={{
        marginTop: "16px",
        padding: "16px",
        backgroundColor: "var(--surface)",
        borderRadius: "8px",
        fontSize: "12px",
        color: "var(--text-muted)",
      }}>
        <div style={{ marginBottom: "8px", fontWeight: "600" }}>Color Gradient:</div>
        <div style={{
          height: "30px",
          borderRadius: "6px",
          background: "linear-gradient(90deg, hsl(210, 85%, 45%) 0%, hsl(210, 85%, 75%) 16%, hsl(252, 92%, 60%) 33%, hsl(252, 95%, 55%) 50%, hsl(36, 95%, 55%) 66%, hsl(24, 95%, 45%) 100%)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }} />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4px",
          fontSize: "11px",
          fontWeight: "500",
        }}>
          <span>0%</span>
          <span>33%</span>
          <span>50%</span>
          <span>66%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
