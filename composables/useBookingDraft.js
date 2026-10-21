/*
 * The booking wizard's draft (setup → add-ons → review). Kept in one shared
 * reactive object and mirrored to localStorage so it survives a reload and the
 * detour through sign-up before "Submit Booking Proposal".
 *
 *   const { draft, startFor, reset, quoteBody, bookingBody } = useBookingDraft();
 */
const KEY = "venpadi.bookingDraft";

const blank = () => ({
  venueSlug: "",
  venueId: "",
  venueName: "",
  eventName: "",
  eventType: "",
  guests: 100,
  days: [],
  addons: [],
});

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    return { ...blank(), ...JSON.parse(raw) };
  } catch {
    return blank();
  }
}

let state = null;

export const DEFAULT_START = "10:00";
export const DEFAULT_END = "22:00";

/** YYYY-MM-DD, `days` from today (local clock — the venue's timezone is WAT). */
export function dateFromToday(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const makeDay = (index, spaceId = "", date = "") => ({
  title: `Day ${index + 1}`,
  spaceId,
  date: date || dateFromToday(14 + index),
  startTime: DEFAULT_START,
  endTime: DEFAULT_END,
});

export function useBookingDraft() {
  if (!state) {
    state = reactive(import.meta.client ? read() : blank());
    if (import.meta.client) {
      // A detached scope: the watcher must outlive whichever page created it.
      effectScope(true).run(() =>
        watch(
          state,
          (v) => {
            try {
              localStorage.setItem(KEY, JSON.stringify(v));
            } catch {
              /* storage unavailable — the draft still lives for this page load */
            }
          },
          { deep: true },
        ),
      );
    }
  }
  const draft = state;

  function reset() {
    Object.assign(draft, blank());
  }

  /** Point the draft at a venue; a different venue starts a fresh draft. */
  function startFor(venue, { spaceId } = {}) {
    if (!venue) return;
    if (draft.venueSlug !== venue.slug || draft.venueId !== venue.id) {
      reset();
      draft.venueSlug = venue.slug;
      draft.venueId = venue.id;
    }
    draft.venueName = venue.name;
    const spaces = venue.spaces ?? [];
    const fallback = spaceId || spaces.find((s) => s.isPrimary)?.id || spaces[0]?.id || "";
    if (!draft.days.length) draft.days.push(makeDay(0, fallback));
    // Drop days pointing at a space the venue no longer offers.
    for (const day of draft.days) {
      if (!spaces.some((s) => s.id === day.spaceId)) day.spaceId = fallback;
    }
    if (spaceId && draft.days.length === 1) draft.days[0].spaceId = spaceId;
  }

  const segments = () =>
    draft.days.map((d) => ({
      spaceId: d.spaceId,
      date: d.date,
      startTime: d.startTime,
      endTime: d.endTime,
      guestCount: Math.max(1, Number(draft.guests) || 1),
      ...(d.title ? { title: d.title } : {}),
    }));

  const addonLines = () =>
    draft.addons
      .filter((a) => a.segmentIndex < draft.days.length)
      .map((a) => ({
        addonId: a.addonId,
        segmentIndex: a.segmentIndex,
        ...(a.quantity ? { quantity: Number(a.quantity) } : {}),
      }));

  const quoteBody = () => ({ venueId: draft.venueId, segments: segments(), addons: addonLines() });

  const bookingBody = () => ({
    venueId: draft.venueId,
    eventName: draft.eventName.trim(),
    eventType: draft.eventType,
    guestCount: Math.max(1, Number(draft.guests) || 1),
    segments: segments(),
    addons: addonLines(),
    specialRequests: [],
    acceptTerms: true,
  });

  /** Is the draft complete enough to quote? (endTime ≤ startTime = ends next day.) */
  const quotable = () =>
    !!draft.venueId &&
    draft.days.length > 0 &&
    draft.days.every((d) => d.spaceId && d.date && d.startTime && d.endTime);

  return { draft, reset, startFor, quoteBody, bookingBody, quotable };
}
