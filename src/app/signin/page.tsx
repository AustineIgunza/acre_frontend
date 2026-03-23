"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/UI/Toast";

export default function SignInPage() {
  const [email, setEmail] = useState("demo@acre.com");
  const [password, setPassword] = useState("demo123456");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Demo login - simulate auth success
      if (email === "demo@acre.com" && password === "demo123456") {
        setShowToast(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError("Invalid credentials. Try demo@acre.com / demo123456");
      }
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "var(--background)", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      padding: "24px"
    }}>
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--primary)",
            opacity: 0.1,
            animation: "floatUp 6s ease-in-out infinite"
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--secondary)",
            opacity: 0.1,
            animation: "floatUp 8s ease-in-out infinite 1s"
          }}
        />
      </div>

      {/* Brand Header */}
      <div style={{ marginBottom: "40px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", textDecoration: "none" }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 400, color: "var(--primary)", letterSpacing: "-0.5px" }}>
            ACRE
          </span>
        </Link>
      </div>

      {/* Card */}
      <div style={{ 
        width: "100%", 
        maxWidth: "400px", 
        padding: "40px 32px",
        borderRadius: "20px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--surface)",
        position: "relative",
        zIndex: 10,
        animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px", textAlign: "center" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "center", marginBottom: "32px" }}>
          Sign in to pick up where you left off. Demo: demo@acre.com / demo123456
        </p>

        {error && (
          <div style={{ 
            marginBottom: "20px", 
            padding: "12px", 
            backgroundColor: "var(--error-soft)",
            color: "var(--error)", 
            borderRadius: "12px", 
            fontSize: "14px", 
            textAlign: "center",
            border: "1px solid var(--error)",
            animation: "slideInFromLeft 0.3s ease-out"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--foreground)", marginBottom: "6px" }}>
              Email address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              style={{ 
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "2px solid var(--border)",
                backgroundColor: "var(--surface-alt)",
                color: "var(--foreground)",
                fontSize: "16px",
                fontFamily: "inherit",
                transition: "all 0.2s"
              }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>
                Password
              </label>
              <a href="#" style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                Forgot?
              </a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ 
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "2px solid var(--border)",
                backgroundColor: "var(--surface-alt)",
                color: "var(--foreground)",
                fontSize: "16px",
                fontFamily: "inherit",
                transition: "all 0.2s"
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: "100%", 
              marginTop: "12px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "var(--primary)",
              color: "white",
              fontWeight: 600,
              fontSize: "16px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.2s"
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          
        </form>
      </div>

      <p style={{ 
        marginTop: "32px", 
        fontSize: "14px", 
        color: "var(--text-secondary)",
        position: "relative",
        zIndex: 10 
      }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
          Sign up
        </Link>
      </p>

      <Toast 
        message="✅ Sign in successful!" 
        isCorrect={true} 
        isVisible={showToast} 
        onDismiss={() => setShowToast(false)} 
      />
    </div>
  );
}
