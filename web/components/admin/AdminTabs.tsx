"use client";

import { useState, type ReactNode } from "react";

const TABS = [
  { id: "games", label: "Spiele & Fragen" },
  { id: "users", label: "Benutzer" },
  { id: "dashboard", label: "Dashboard" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminTabs({
  dashboard,
  games,
  users,
}: {
  dashboard: ReactNode;
  games: ReactNode;
  users: ReactNode;
}) {
  const [tab, setTab] = useState<TabId>("games");
  const content: Record<TabId, ReactNode> = { dashboard, games, users };

  return (
    <div className="mt-8">
      <div className="hairline inline-flex rounded-full bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{content[tab]}</div>
    </div>
  );
}
