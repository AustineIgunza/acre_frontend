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
 * 7-band gradient: Light Orange → Deep Orange → Dark Orange → Light Red → Dark Red (50-70) → Darker Red → Bright Searing Red (90-100)
 * 0-10: Light Orange | 10-30: Deep Orange | 30-50: Dark Orange | 50-70: Dark Red | 70-80: Darker Red | 80-90: Even Darker Red | 90-100: Bright Searing Red
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
    // Dark Red (50-70)
    const intensity = (score - 50) / 20;
    return `hsl(0, 100%, ${50 - intensity * 10}%)`;
  } else if (score <= 80) {
    // Darker Red (70-80)
    const intensity = (score - 70) / 10;
    return `hsl(0, 100%, ${40 - intensity * 8}%)`;
  } else if (score <= 90) {
    // Even Darker Red (80-90)
    const intensity = (score - 80) / 10;
    return `hsl(0, 100%, ${32 - intensity * 8}%)`;
  } else {
    // Bright Searing Red (90-100) - BRIGHT RED!
    const intensity = (score - 90) / 10;
    return `hsl(0, 100%, ${60 - intensity * 20}%)`;
  }
}

interface TooltipState {
  cellIndex: number | null;
  x: number;
  y: number;
}

export default function HeatmapGrid({ results, masteryScores = [], battleLog = [] }: HeatmapGridProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({ cellIndex: null, x: 0, y: 0 });

  // Aggregate questions into 9 cells (3x3 grid)
  // If we have 9 or fewer questions, pad to 9
  // If we have 10-27 questions, aggregate multiple questions per cell
  const totalQuestions = Math.max(results.length, masteryScores.length);
  const questionsPerCell = Math.ceil(totalQuestions / 9);
  
  // Create 9 aggregated cells
  const gridResults: Array<{
    results: ("correct" | "wrong" | "close")[];
    masteryScores: number[];
    questionIndices: number[];
  }> = [];
  
  for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
    const startIdx = cellIndex * questionsPerCell;
    const endIdx = Math.min((cellIndex + 1) * questionsPerCell, totalQuestions);
    
    gridResults.push({
      results: results.slice(startIdx, endIdx),
      masteryScores: masteryScores.slice(startIdx, endIdx),
      questionIndices: Array.from({ length: endIdx - startIdx }, (_, i) => startIdx + i + 1)
    });
  }

  // Calculate aggregated score for each cell (average mastery)
  const gridMasteryScores = gridResults.map(cell => {
    if (cell.masteryScores.length === 0) return 0;
    return Math.round(cell.masteryScores.reduce((a, b) => a + b, 0) / cell.masteryScores.length);
  });

  // Calculate result type for each cell (majority vote)
  const gridCellResults = gridResults.map(cell => {
    if (cell.results.length === 0) return "wrong";
    const correctCount = cell.results.filter(r => r === "correct").length;
    const closeCount = cell.results.filter(r => r === "close").length;
    if (correctCount > cell.results.length / 2) return "correct";
    if (closeCount + correctCount > cell.results.length / 2) return "close";
    return "wrong";
  });

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
        Performance Heatmap (Concept Areas)
      </h3>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "6px",
        marginBottom: "10px",
        position: "relative",
        maxWidth: "180px",
      }}>
        {gridResults.map((cell, index) => {
          const masteryScore = gridMasteryScores[index];
          const bgColor = getMasteryColor(masteryScore);
          const result = gridCellResults[index];

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
              <strong>Concept Area {tooltip.cellIndex + 1}</strong>
            </div>

            <div style={{ marginBottom: "6px", fontSize: "10px", color: "#9ca3af" }}>
              Questions: {gridResults[tooltip.cellIndex].questionIndices.join(", ")}
            </div>
            
            <div style={{ marginBottom: "6px", display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{
                fontSize: "14px",
              }}>
                {gridCellResults[tooltip.cellIndex] === "correct" ? "✓" : gridCellResults[tooltip.cellIndex] === "close" ? "◐" : "✕"}
              </span>
              <span style={{ fontSize: "11px" }}>
                {gridCellResults[tooltip.cellIndex] === "correct" 
                  ? "Mastered" 
                  : gridCellResults[tooltip.cellIndex] === "close" 
                  ? "Progressing" 
                  : "Needs Work"}
              </span>
            </div>

            <div style={{
              fontSize: "11px",
              color: "#9ca3af",
              paddingTop: "6px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              Avg Mastery: <strong>{gridMasteryScores[tooltip.cellIndex]}%</strong>
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
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Dark Red</span>
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
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Even Darker</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--text-muted)", marginLeft: "24px" }}>80-90%</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "3px", backgroundColor: getMasteryColor(95), border: "1px solid rgba(0, 0, 0, 0.2)" }} />
            <span style={{ fontWeight: "600", fontSize: "10px" }}>Bright Searing</span>
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
          background: "linear-gradient(90deg, hsl(38, 100%, 88%) 0%, hsl(32, 100%, 80%) 15%, hsl(24, 100%, 68%) 30%, hsl(0, 100%, 50%) 50%, hsl(0, 100%, 40%) 70%, hsl(0, 100%, 32%) 80%, hsl(0, 100%, 20%) 95%, hsl(0, 100%, 6%) 100%)",
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
