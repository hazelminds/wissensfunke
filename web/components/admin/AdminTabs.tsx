"use client";

import { useState, type ReactNode } from "react";

const TABS = [
  { id: "games", label: "Spiele & Fragen" },
  { id: "users", label: "Benutzer" },
  { id: "support", label: "Support" },
  { id: "questionReports", label: "Fragen-Feedback" },
  { id: "dashboard", label: "Dashboard" },
  { id: "funnel", label: "Trichter" },
  { id: "cohort", label: "Kohorten" },
  { id: "announcements", label: "Ankündigung" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminTabs({
  dashboard,
  games,
  users,
  support,
  questionReports,
  funnel,
  cohort,
  announcements,
  supportUnread = 0,
  questionReportsUnread = 0,
}: {
  dashboard: ReactNode;
  games: ReactNode;
  users: ReactNode;
  support: ReactNode;
  questionReports: ReactNode;
  funnel: ReactNode;
  cohort: ReactNode;
  announcements: ReactNode;
  supportUnread?: number;
  questionReportsUnread?: number;
}) {
  const [tab, setTab] = useState<TabId>("games");
  const content: Record<TabId, ReactNode> = {
    dashboard,
    games,
    users,
    support,
    questionReports,
    funnel,
    cohort,
    announcements,
  };
  const unreadByTab: Partial<Record<TabId, number>> = {
    support: supportUnread,
    questionReports: questionReportsUnread,
  };

  return (
    <div className="mt-8">
      <div className="hairline inline-flex flex-wrap rounded-full bg-surface p-1">
        {TABS.map((t) => {
          const unread = unreadByTab[t.id] ?? 0;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                tab === t.id ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {t.label}
              {unread > 0 && (
                <span
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                    tab === t.id ? "bg-white text-primary" : "bg-primary text-white"
                  }`}
                >
                  {unread}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6">{content[tab]}</div>
    </div>
  );
}
