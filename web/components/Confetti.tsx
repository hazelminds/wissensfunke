"use client";

import { useEffect, useState } from "react";

const COLORS = ["var(--nog-primary)", "var(--nog-gold)", "var(--nog-coral)", "var(--nog-green)"];
const PIECE_COUNT = 70;

interface Piece {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  size: number;
  color: string;
  rounded: boolean;
}

function randomPieces(): Piece[] {
  return Array.from({ length: PIECE_COUNT }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 2.2 + Math.random() * 1.2,
    drift: Math.random() * 160 - 80,
    spin: 360 + Math.random() * 540,
    size: 6 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rounded: Math.random() > 0.5,
  }));
}

/** Kurzer Konfetti-Regen für den Moment einer echten neuen Bestleistung --
 * rein CSS-animiert (keine neue Abhängigkeit), montiert sich selbst ab,
 * damit nach dem Fall keine toten DOM-Knoten übrig bleiben. Die Zufallswerte
 * entstehen erst im Effect (nicht beim Rendern), sonst wäre die Komponente
 * nicht pure. */
export function Confetti() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPieces(randomPieces());
    const timer = setTimeout(() => setPieces(null), 3600);
    return () => clearTimeout(timer);
  }, []);

  if (!pieces) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 0.4,
            backgroundColor: piece.color,
            borderRadius: piece.rounded ? "9999px" : "2px",
            animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            ["--confetti-drift" as string]: `${piece.drift}px`,
            ["--confetti-spin" as string]: `${piece.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}
