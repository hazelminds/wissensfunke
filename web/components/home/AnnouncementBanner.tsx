"use client";

import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

const DISMISSED_KEY = "nog_announcement_dismissed_ids";
const ROTATE_MS = 5000;

function readDismissedIds(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function addDismissedId(id: string) {
  try {
    const current = readDismissedIds();
    if (!current.includes(id)) {
      localStorage.setItem(DISMISSED_KEY, JSON.stringify([...current, id]));
    }
  } catch {
    // localStorage kann blockiert sein (privater Modus etc.) -- dann bleibt die
    // Ankündigung für diese Sitzung einfach nur per Klick weg, nicht dauerhaft.
  }
}

/** Zeigt alle heute gültigen Admin-Ankündigungen, eine nach der anderen
 * (rotiert alle 5s, falls mehrere da sind), bis sie jeweils für diese
 * Person weggeklickt wurde. Start unsichtbar statt zeigen-dann-wegklappen,
 * damit wer schon alles weggeklickt hat keinen kurzen Flackereffekt sieht
 * -- der Abgleich mit localStorage kann erst nach der Hydration laufen. */
export function AnnouncementBanner({
  announcements,
}: {
  announcements: { id: string; message: string }[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissedIds(readDismissedIds());
    setHydrated(true);
  }, []);

  const visible = hydrated ? announcements.filter((a) => !dismissedIds.includes(a.id)) : [];

  useEffect(() => {
    if (visible.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % visible.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [visible.length]);

  if (visible.length === 0) return null;
  const current = visible[index % visible.length];

  return (
    <div className="bg-gradient-to-r from-primary to-coral">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-5 py-2.5">
        <Sparkles className="h-4 w-4 shrink-0 text-white" />
        <p className="text-center text-[13.5px] font-bold text-white">{current.message}</p>
        {visible.length > 1 && (
          <div className="flex shrink-0 items-center gap-1">
            {visible.map((a, i) => (
              <span
                key={a.id}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index % visible.length ? "bg-white" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            addDismissedId(current.id);
            setDismissedIds((prev) => [...prev, current.id]);
            setIndex(0);
          }}
          aria-label="Ankündigung schließen"
          className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
