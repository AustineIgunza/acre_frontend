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
 * 7-band gradient: Light Orange → Deep Orange → Dark Orange → Light Red → Dark Red → Darker Red → Searing Red
 * 0-10: Light Orange | 10-30: Deep Orange | 30-50: Dark Orange | 50-70: Light Red | 70-80: Darker Red | 80-90: Dark Red | 90-100: Searing Red
 */
export function getMasteryColor(score: number): string {
  if (score <= 10) {
    // Light Orange (0-10)
    const intensity = score / 10;
    return `hsl(38, 100%, ${88 - intensity * 8}%)`;
  } else if (score <= 30) {
    // Deep Orange (10-30)
    const intensity = (score - 10) / 20;
    return `hsl(32, 100%, ${80 - intensity * 12}%)`;
  } else if (score <= 50) {
    // Dark Orange (30-50)
    const intensity = (score - 30) / 20;
    return `hsl(24, 100%, ${68 - intensity * 15}%)`;
  } else if (score <= 70) {
    // Light Red (50-70)
    const intensity = (score - 50) / 20;
    return `hsl(10, 100%, ${53 - intensity * 10}%)`;
  } else if (score <= 80) {
    // Darker Red (70-80)
    const intensity = (score - 70) / 10;
    return `hsl(0, 95%, ${35 - intensity * 8}%)`;
  } else if (score <= 90) {
    // Dark Red (80-90)
    const intensity = (score - 80) / 10;
    return `hsl(4, 100%, ${43 - intensity * 8}%)`;
  } else {
    // Searing Red (90-100) - Most intense, brightest red
    const intensity = (score - 90) / 10;
    return `hsl(0, 100%, ${25 - intensity * 15}%)`;
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
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "8px",
        color: "var(--foreground)",
      }}>
        Performance Heatmap (Hover for Details)
      </h3>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "6px",
        marginBottom: "10px",
        position: "relative",
        maxWidth: "180px",
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
            padding: "10px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            maxWidth: "260px",
            minWidth: "240px",
            zIndex: 10000,
            pointerEvents: "none",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            lineHeight: "1.4",
            animation: "popupEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}>
            <div style={{ marginBottom: "6px" }}>
              <strong>Question {tooltip.cellIndex + 1}</strong>
            </div>
            
            <div style={{ marginBottom: "6px", display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{
                fontSize: "14px",
              }}>
                {results[tooltip.cellIndex] === "correct" ? "✓" : results[tooltip.cellIndex] === "close" ? "◐" : "✕"}
              </span>
              <span style={{ fontSize: "11px" }}>
                {results[tooltip.cellIndex] === "correct" 
                  ? "Correct" 
                  : results[tooltip.cellIndex] === "close" 
                  ? "Close/Partial" 
                  : "Wrong"}
              </span>
            </div>

            <div style={{
              padding: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              marginBottom: "6px",
              fontSize: "11px",
              fontStyle: "italic",
            }}>
              {battleLog[tooltip.cellIndex]?.feedback || "No feedback available"}
            </div>

            <div style={{
              fontSize: "11px",
              color: "#9ca3af",
              paddingTop: "6px",
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
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "6px",
        padding: "8px",
        backgroundColor: "var(--surface)",
        borderRadius: "6px",
        fontSize: "11px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(5), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Light Orange</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>0-10%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(20), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Deep Orange</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>10-30%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(40), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Dark Orange</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>30-50%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(60), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Light Red</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>50-70%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(75), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Darker Red</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>70-80%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(85), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Dark Red</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>80-90%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(95), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Searing Red</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>90-100%</span>
        </div>
      </div>

      {/* Gradient Preview */}
      <div style={{
        marginTop: "6px",
        padding: "8px",
        backgroundColor: "var(--surface)",
        borderRadius: "6px",
        fontSize: "10px",
        color: "var(--text-muted)",
      }}>
        <div style={{ marginBottom: "4px", fontWeight: "600", fontSize: "10px" }}>Gradient:</div>
        <div style={{
          height: "20px",
          borderRadius: "4px",
          background: "linear-gradient(90deg, hsl(38, 100%, 88%) 0%, hsl(38, 100%, 80%) 10%, hsl(32, 100%, 80%) 14%, hsl(32, 100%, 68%) 30%, hsl(24, 100%, 68%) 35%, hsl(24, 100%, 53%) 50%, hsl(10, 100%, 53%) 70%, hsl(0, 95%, 35%) 80%, hsl(4, 100%, 43%) 85%, hsl(0, 100%, 25%) 100%)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }} />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2px",
          fontSize: "8px",
          fontWeight: "500",
        }}>
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
