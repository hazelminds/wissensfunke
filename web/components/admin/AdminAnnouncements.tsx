"use client";

import { useActionState } from "react";
import { Megaphone, Trash2 } from "lucide-react";
import type { Announcement } from "@/lib/announcements";
import { berlinToday } from "@/lib/berlinDate";
import {
  createAnnouncementAction,
  updateAnnouncementAction,
  setAnnouncementActiveAction,
  deleteAnnouncementAction,
} from "@/lib/actions/announcements";

type FormState = { error: string | null; success: boolean };
const INITIAL_STATE: FormState = { error: null, success: false };

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
      <CreateAnnouncementForm today={today} />

      {announcements.length === 0 ? (
        <div className="hairline rounded-2xl bg-surface p-6 text-center text-sm text-muted">
          Noch keine Ankündigungen angelegt.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {announcements.map((a) => (
            <AnnouncementRow key={a.id} announcement={a} today={today} />
          ))}
        </div>
      )}
    </div>
  );
}

function CreateAnnouncementForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (_prev, formData) => {
    try {
      await createAnnouncementAction(formData);
      return { error: null, success: true };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Fehler beim Speichern.", success: false };
    }
  }, INITIAL_STATE);

  return (
    <div className="hairline rounded-2xl bg-surface p-5">
      <h3 className="mb-1 flex items-center gap-2 font-display font-bold text-ink">
        <Megaphone className="h-4 w-4 text-primary" /> Neue Ankündigung
      </h3>
      <p className="mb-4 text-[12.5px] text-muted">
        Erscheint als Banner auf der Startseite, ab 00:01 des Start-Tages bis 23:59 des End-Tages (deutsche
        Zeit). Wer sie wegklickt, sieht sie danach nicht mehr -- bis du einen neuen Text speicherst.
      </p>
      <form action={formAction} className="flex flex-col gap-3">
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
            disabled={pending}
            className="ml-auto rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Speichert…" : "Erstellen"}
          </button>
        </div>
        {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
        {state.success && !state.error && (
          <p className="text-[12.5px] font-semibold text-green-dark">✅ Angelegt.</p>
        )}
      </form>
    </div>
  );
}

function AnnouncementRow({ announcement, today }: { announcement: Announcement; today: string }) {
  const status = statusFor(announcement, today);

  const [updateState, updateFormAction, updatePending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      try {
        await updateAnnouncementAction(formData);
        return { error: null, success: true };
      } catch (err) {
        return { error: err instanceof Error ? err.message : "Fehler beim Speichern.", success: false };
      }
    },
    INITIAL_STATE,
  );

  const toggle = useSimpleAction(setAnnouncementActiveAction);
  const del = useSimpleAction(deleteAnnouncementAction);

  return (
    <div className="hairline rounded-2xl bg-surface p-4">
      <form action={updateFormAction} className="flex flex-col gap-3">
        <input type="hidden" name="id" value={announcement.id} />
        <div className="flex items-start justify-between gap-3">
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${status.className}`}>
            {status.label}
          </span>
          <span className="text-[11px] text-muted">
            Erstellt {new Date(announcement.createdAt).toLocaleDateString("de-DE")}
          </span>
        </div>
        <textarea
          name="message"
          required
          maxLength={200}
          rows={2}
          defaultValue={announcement.message}
          className="hairline w-full resize-none rounded-xl bg-bg px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary/60"
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-muted">
            Start
            <input
              type="date"
              name="startDate"
              required
              defaultValue={announcement.startDate}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-muted">
            Ende
            <input
              type="date"
              name="endDate"
              required
              defaultValue={announcement.endDate}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
          </label>
          <button
            type="submit"
            disabled={updatePending}
            className="ml-auto rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {updatePending ? "Speichert…" : "Speichern"}
          </button>
        </div>
        {updateState.error && <p className="text-[12.5px] font-semibold text-red">{updateState.error}</p>}
        {updateState.success && !updateState.error && (
          <p className="text-[12.5px] font-semibold text-green-dark">✅ Gespeichert.</p>
        )}
      </form>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <form action={toggle.dispatch}>
          <input type="hidden" name="id" value={announcement.id} />
          <input type="hidden" name="active" value={announcement.active ? "false" : "true"} />
          <button
            type="submit"
            disabled={toggle.pending}
            className="hairline rounded-full px-3.5 py-1.5 text-xs font-bold text-ink transition hover:bg-bg disabled:opacity-60"
          >
            {toggle.pending ? "…" : announcement.active ? "Pausieren" : "Aktivieren"}
          </button>
        </form>
        <form action={del.dispatch}>
          <input type="hidden" name="id" value={announcement.id} />
          <button
            type="submit"
            disabled={del.pending}
            className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold text-red transition hover:bg-red-soft disabled:opacity-60"
          >
            <Trash2 className="h-3.5 w-3.5" /> {del.pending ? "Löscht…" : "Löschen"}
          </button>
        </form>
        {toggle.error && <span className="text-[12.5px] font-semibold text-red">{toggle.error}</span>}
        {del.error && <span className="text-[12.5px] font-semibold text-red">{del.error}</span>}
      </div>
    </div>
  );
}

/** Für Aktionen, bei denen die sichtbare Änderung selbst die Bestätigung ist
 * (Status-Badge wechselt, Zeile verschwindet bei Löschen) -- der Lade-Status
 * im Button reicht, nur ein Fehler bekommt einen eigenen Hinweistext. */
function useSimpleAction(action: (formData: FormData) => Promise<void>) {
  const [error, dispatch, pending] = useActionState<string | null, FormData>(async (_prev, formData) => {
    try {
      await action(formData);
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : "Fehler.";
    }
  }, null);
  return { error, dispatch, pending };
}
