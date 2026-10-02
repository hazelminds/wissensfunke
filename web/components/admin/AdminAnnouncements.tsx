import { Megaphone, Trash2 } from "lucide-react";
import { berlinToday, type Announcement } from "@/lib/announcements";
import {
  createAnnouncementAction,
  updateAnnouncementAction,
  setAnnouncementActiveAction,
  deleteAnnouncementAction,
} from "@/lib/actions/announcements";

function statusFor(a: Announcement, today: string): { label: string; className: string } {
  if (!a.active) return { label: "Pausiert", className: "hairline text-muted" };
  if (today < a.startDate) return { label: "Geplant", className: "bg-quiz/15 text-quiz" };
  if (today > a.endDate) return { label: "Abgelaufen", className: "hairline text-muted" };
  return { label: "Läuft jetzt", className: "bg-green-soft text-green" };
}

export function AdminAnnouncements({ announcements }: { announcements: Announcement[] }) {
  const today = berlinToday();

  return (
    <div className="flex flex-col gap-6">
      <div className="hairline rounded-2xl bg-surface p-5">
        <h3 className="mb-1 flex items-center gap-2 font-display font-bold text-ink">
          <Megaphone className="h-4 w-4 text-primary" /> Neue Ankündigung
        </h3>
        <p className="mb-4 text-[12.5px] text-muted">
          Erscheint als Banner auf der Startseite, ab 00:01 des Start-Tages bis 23:59 des End-Tages (deutsche
          Zeit). Wer sie wegklickt, sieht sie danach nicht mehr -- bis du einen neuen Text speicherst.
        </p>
        <form action={createAnnouncementAction} className="flex flex-col gap-3">
          <textarea
            name="message"
            required
            maxLength={200}
            rows={2}
            placeholder="z. B. Neu: Wort des Tages ist da -- jeden Tag ein neues Rätsel! 🔤"
            className="hairline w-full resize-none rounded-xl bg-bg px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary/60"
          />
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-muted">
              Start
              <input
                type="date"
                name="startDate"
                required
                defaultValue={today}
                className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-muted">
              Ende
              <input
                type="date"
                name="endDate"
                required
                defaultValue={today}
                className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
              />
            </label>
            <button
              type="submit"
              className="ml-auto rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
            >
              Erstellen
            </button>
          </div>
        </form>
      </div>

      {announcements.length === 0 ? (
        <div className="hairline rounded-2xl bg-surface p-6 text-center text-sm text-muted">
          Noch keine Ankündigungen angelegt.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {announcements.map((a) => {
            const status = statusFor(a, today);
            return (
              <div key={a.id} className="hairline rounded-2xl bg-surface p-4">
                <form action={updateAnnouncementAction} className="flex flex-col gap-3">
                  <input type="hidden" name="id" value={a.id} />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${status.className}`}>
                      {status.label}
                    </span>
                    <span className="text-[11px] text-muted">
                      Erstellt {new Date(a.createdAt).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    required
                    maxLength={200}
                    rows={2}
                    defaultValue={a.message}
                    className="hairline w-full resize-none rounded-xl bg-bg px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary/60"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-muted">
                      Start
                      <input
                        type="date"
                        name="startDate"
                        required
                        defaultValue={a.startDate}
                        className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
                      />
                    </label>
                    <label className="flex items-center gap-2 text-xs text-muted">
                      Ende
                      <input
                        type="date"
                        name="endDate"
                        required
                        defaultValue={a.endDate}
                        className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
                      />
                    </label>
                    <button
                      type="submit"
                      className="ml-auto rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                    >
                      Speichern
                    </button>
                  </div>
                </form>
                <div className="mt-2 flex items-center gap-2">
                  <form action={setAnnouncementActiveAction}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="active" value={a.active ? "false" : "true"} />
                    <button
                      type="submit"
                      className="hairline rounded-full px-3.5 py-1.5 text-xs font-bold text-ink transition hover:bg-bg"
                    >
                      {a.active ? "Pausieren" : "Aktivieren"}
                    </button>
                  </form>
                  <form action={deleteAnnouncementAction}>
                    <input type="hidden" name="id" value={a.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold text-red transition hover:bg-red-soft"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Löschen
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
