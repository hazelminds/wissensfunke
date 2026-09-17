"use client";

import { useState, type ReactNode } from "react";

const TABS = [
  { id: "games", label: "Spiele & Fragen" },
  { id: "users", label: "Benutzer" },
  { id: "support", label: "Support" },
  { id: "dashboard", label: "Dashboard" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminTabs({
  dashboard,
  games,
  users,
  support,
  supportUnread = 0,
}: {
  dashboard: ReactNode;
  games: ReactNode;
  users: ReactNode;
  support: ReactNode;
  supportUnread?: number;
}) {
  const [tab, setTab] = useState<TabId>("games");
  const content: Record<TabId, ReactNode> = { dashboard, games, users, support };

  return (
    <div className="mt-8">
      <div className="hairline inline-flex rounded-full bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
            {t.id === "support" && supportUnread > 0 && (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                  tab === "support" ? "bg-white text-primary" : "bg-primary text-white"
                }`}
              >
                {supportUnread}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-6">{content[tab]}</div>
    </div>
  );
}
