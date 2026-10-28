/*
 * Shared display helpers for the My Bookings UI.
 * All values come from API booking objects — nothing is invented here.
 */
import { formatTime, timeRange } from "~/utils/format";

export function bookingImage(b) {
  return b?.venue?.imageUrl || b?.imageUrl || "";
}

export function venueName(b) {
  return b?.venue?.name || b?.venueName || "";
}

export function venueLocation(b) {
  const loc = b?.venue?.location;
  if (!loc) return b?.location || "";
  if (typeof loc === "string") return loc;
  return loc.label || [loc.city, loc.state].filter(Boolean).join(", ") || "";
}

export function bookingStart(b) {
  return b?.startAt || b?.segments?.[0]?.startAt || null;
}

export function bookingEnd(b) {
  const segs = b?.segments;
  return b?.endAt || (segs?.length ? segs[segs.length - 1].endAt : null);
}

export function daysAway(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return null;
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

export function daysAwayLabel(iso) {
  const n = daysAway(iso);
  if (n === null) return "";
  if (n < 0) return "Past";
  if (n === 0) return "Today";
  if (n === 1) return "1 day away";
  return `${n} days away`;
}

export function daysUntilCopy(iso) {
  const n = daysAway(iso);
  if (n === null) return "";
  if (n < 0) return "Overdue";
  if (n === 0) return "Due today";
  if (n === 1) return "Due in 1 day";
  return `Due in ${n} days`;
}

export function durationHours(b) {
  if (b?.hours) return b.hours;
  const segs = b?.segments ?? [];
  const sum = segs.reduce((s, x) => s + (Number(x.hours) || 0), 0);
  return sum || null;
}

export function guestCount(b) {
  return b?.guestCount ?? b?.segments?.[0]?.guestCount ?? null;
}

export function flattenAddons(b) {
  const out = [];
  for (const seg of b?.segments ?? []) {
    for (const line of [...(seg.addons ?? []), ...(seg.fees ?? [])]) {
      out.push(line);
    }
  }
  for (const line of b?.addons ?? []) out.push(line);
  return out;
}

export function hostOf(b) {
  return b?.host || b?.venue?.host || b?.manager || null;
}

export function documentsOf(b) {
  return b?.documents || b?.files || b?.contracts || [];
}

export function notesOf(b) {
  return b?.clientNotes || b?.notes || b?.specialRequests || b?.policy?.note || "";
}

/** Featured-card payment stepper for confirmed/upcoming bookings. */
export function paymentProgress(b) {
  const paid = Number(b?.amountPaidMinor) > 0;
  const due = Number(b?.outstandingMinor) > 0;
  const done = b?.status === "completed";
  return [
    { key: "requested", label: "Requested", done: true },
    { key: "deposit", label: paid ? "Deposit Paid" : "Deposit", done: paid, current: paid && due },
    { key: "balance", label: due ? "Balance Due" : "Balance", done: paid && !due, current: due },
    { key: "event", label: "Event Day", done, current: paid && !due && !done },
  ];
}

/** Pending-request stepper. */
export function pendingProgress(b) {
  const sent = true;
  const accepted = ["approved", "confirmed", "completed"].includes(b?.status);
  const deposit = Number(b?.amountPaidMinor) > 0;
  const confirmed = ["confirmed", "completed"].includes(b?.status);
  return [
    { key: "sent", label: "Request Sent", done: sent },
    { key: "accept", label: "Awaiting Owner Acceptance", done: accepted, current: !accepted },
    { key: "deposit", label: "Deposit Payment", done: deposit, current: accepted && !deposit },
    { key: "confirmed", label: "Confirmed", done: confirmed, current: deposit && !confirmed },
  ];
}

export function downloadIcs(b) {
  const start = bookingStart(b);
  if (!start || !import.meta.client) return;
  const end = bookingEnd(b) || start;
  const stamp = (iso) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const esc = (s) => String(s || "").replace(/[,;]/g, " ");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Venpadi//Bookings//EN",
    "BEGIN:VEVENT",
    `UID:${esc(b.reference)}@venpadi`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(b.eventName || venueName(b))}`,
    `LOCATION:${esc(venueLocation(b))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${b.reference || "booking"}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function countdownTo(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return "";
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "response overdue";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m left to respond`;
}

export function formatTimeRange(b) {
  if (b?.timeLabel) return b.timeLabel;
  const start = bookingStart(b);
  const end = bookingEnd(b);
  if (start && end) return timeRange(start, end);
  if (start) return formatTime(start);
  return "";
}
