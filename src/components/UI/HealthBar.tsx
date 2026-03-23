"use client";

interface HealthBarProps {
  percentage: number;
  color?: "blue" | "red" | "green";
}

export default function HealthBar({
  percentage,
  color = "blue",
}: HealthBarProps) {
  const colorStyles = {
    blue: {
      background: "linear-gradient(90deg, var(--primary), var(--secondary))",
      shadow: "0 0 12px rgba(99, 102, 241, 0.3)"
    },
    red: {
      background: "linear-gradient(90deg, var(--error), var(--accent-warm))",
      shadow: "0 0 12px rgba(239, 68, 68, 0.3)"
    },
    green: {
      background: "linear-gradient(90deg, var(--success), var(--primary))",
      shadow: "0 0 12px rgba(16, 185, 129, 0.3)"
    }
  };

  const styles = colorStyles[color];

  return (
    <div 
      className="w-full rounded-full p-1 shadow-lg"
      style={{
        backgroundColor: "var(--surface-alt)",
        border: `2px solid var(--border)`
      }}
    >
      <div
        className="h-6 sm:h-8 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden font-semibold text-xs sm:text-sm"
        style={{
          width: `${Math.max(5, percentage)}%`,
          background: styles.background,
          boxShadow: styles.shadow,
          color: "white",
          textShadow: "0 1px 3px rgba(0,0,0,0.3)"
        }}
      >
        {percentage > 10 && (
          <span>{Math.round(percentage)}%</span>
        )}
      </div>
    </div>
  );
}
