import { Crown } from "lucide-react";
import { games, gameTypeMeta } from "@/content/games";

/**
 * Zeigt die aktuelle Spiele-Registry (aus content/games.ts) -- noch
 * schreibgeschützt, weil Spiele/Fragen bisher als Code-Datei statt in
 * Supabase liegen. Sobald die games/questions-Tabellen stehen, wird das
 * hier ein echter Editor (anlegen/bearbeiten/Fragen importieren).
 */
export function AdminGamesTable() {
  const sorted = [...games].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <div className="hairline mb-4 rounded-2xl bg-surface p-4 text-sm text-ink-soft">
        Noch schreibgeschützt: Spiele &amp; Fragen liegen aktuell im Code (
        <code className="text-ink">content/games.ts</code>). Anlegen, Bearbeiten und der
        Datei-Import für Fragen kommen mit der Datenbank-Anbindung.
      </div>

      <div className="hairline overflow-hidden rounded-2xl bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Titel</th>
                <th className="px-4 py-3 font-semibold">Typ</th>
                <th className="px-4 py-3 font-semibold">Kategorie</th>
                <th className="px-4 py-3 font-semibold">Dauer</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((g) => (
                <tr key={g.slug} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{g.title}</td>
                  <td className="px-4 py-3 text-muted">{gameTypeMeta[g.type].label}</td>
                  <td className="px-4 py-3 text-muted">{g.category}</td>
                  <td className="px-4 py-3 text-muted">{g.estMinutes} Min</td>
                  <td className="px-4 py-3">
                    {g.isPremium ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                        <Crown className="h-3 w-3" /> Plus
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-soft px-2 py-0.5 text-xs font-medium text-green-dark">
                        Gratis
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
