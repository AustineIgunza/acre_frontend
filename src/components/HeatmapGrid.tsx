"use client";

interface HeatmapGridProps {
  results: ("correct" | "wrong" | "close")[];
  masteryScores?: number[]; // 0-100 for gradient coloring
}

/**
 * Heatmap gradient colors based on mastery level (0-100)
 * Blue (Hold/Cold): 0-33%
 * Orange (Warm): 34-66%
 * Red (Hot): 67-100%
 */
export function getMasteryColor(score: number): string {
  if (score < 34) {
    // Blue gradient: cold/hold phase
    const intensity = score / 33;
    return `hsl(210, 100%, ${70 - intensity * 20}%)`;
  } else if (score < 67) {
    // Orange gradient: warm phase
    const intensity = (score - 33) / 33;
    return `hsl(38, 100%, ${65 - intensity * 15}%)`;
  } else {
    // Red gradient: hot/ignition phase
    const intensity = (score - 66) / 34;
    return `hsl(0, 100%, ${65 - intensity * 20}%)`;
  }
}

export default function HeatmapGrid({ results, masteryScores = [] }: HeatmapGridProps) {
  // Pad results to 9 cells (3x3 grid)
  const gridResults = [...results];
  while (gridResults.length < 9) {
    gridResults.push("wrong");
  }

  return (
    <div className="w-full">
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "16px",
        color: "var(--foreground)",
      }}>
        Mastery Heatmap
      </h3>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        marginBottom: "24px",
      }}>
        {gridResults.slice(0, 9).map((result, index) => {
          const masteryScore = masteryScores[index] || (result === "correct" ? 90 : result === "close" ? 50 : 20);
          const bgColor = getMasteryColor(masteryScore);
          const icon = result === "correct" ? "✓" : result === "close" ? "◐" : "✕";
          const textColor = masteryScore > 50 ? "white" : "var(--foreground)";

          return (
            <div
              key={index}
              style={{
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
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
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{
                fontSize: "28px",
                fontWeight: "700",
                color: textColor,
              }}>
                {icon}
              </div>
              <div style={{
                fontSize: "12px",
                fontWeight: "600",
                color: textColor,
              }}>
                {masteryScore}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex",
        gap: "24px",
        padding: "16px",
        backgroundColor: "var(--surface)",
        borderRadius: "8px",
        fontSize: "14px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            backgroundColor: getMasteryColor(20),
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }} />
          <span>Hold (0-33%)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            backgroundColor: getMasteryColor(50),
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }} />
          <span>Warm (34-66%)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            backgroundColor: getMasteryColor(85),
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }} />
          <span>Hot (67-100%)</span>
        </div>
      </div>
    </div>
  );
}
