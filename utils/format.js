/*
 * Display formatting for API values.
 *
 * MONEY: the API sends every amount as an integer of KOBO in fields ending
 * `Minor` (e.g. totalMinor: 45000000 = ₦450,000). Always format through these
 * helpers — never divide by 100 by hand in a template.
 *
 * DATES: the API sends ISO 8601 strings in UTC. Venues operate in West Africa
 * Time, so everything is displayed in Africa/Lagos.
 */
const TZ = "Africa/Lagos";

export const fromMinor = (minor) => (Number(minor) || 0) / 100;

/** Naira typed by a user -> kobo for the API. Accepts "150,000" or 150000. */
export const toMinor = (naira) => {
  const n = Number(String(naira ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
};

/** 45000000 -> "₦450,000"; with { decimals: true } -> "₦450,000.00". */
export function naira(minor, { decimals = false } = {}) {
  if (minor === null || minor === undefined) return "—";
  const v = fromMinor(minor);
  return `${v < 0 ? "-" : ""}₦${Math.abs(v).toLocaleString("en-NG", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  })}`;
}

/** Signed with an explicit plus: "+₦400,000" / "-₦100,000". */
export const nairaSigned = (minor, opts) => (Number(minor) > 0 ? `+${naira(minor, opts)}` : naira(minor, opts));

/** 120000000 -> "₦1.2M", 85000000 -> "₦850K". */
export function nairaCompact(minor) {
  if (minor === null || minor === undefined) return "—";
  const v = fromMinor(minor);
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}₦${(abs / 1_000_000_000).toFixed(abs >= 10_000_000_000 ? 0 : 1).replace(/\.0$/, "")}B`;
  if (abs >= 1_000_000) return `${sign}₦${(abs / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (abs >= 1_000) return `${sign}₦${Math.round(abs / 1_000)}K`;
  return `${sign}₦${abs.toLocaleString("en-NG")}`;
}

/** 12 -> "12%", null -> "—". */
export const pct = (v, digits = 0) => (v === null || v === undefined ? "—" : `${Number(v).toFixed(digits).replace(/\.0+$/, "")}%`);

/** A trend: 12.5 -> "+12.5%", -3 -> "-3%", null -> "—" (no base to compare). */
export const trend = (v) => (v === null || v === undefined ? "—" : `${v > 0 ? "+" : ""}${Number(v).toFixed(1).replace(/\.0$/, "")}%`);

export const compactNumber = (n) =>
  n === null || n === undefined ? "—" : Number(n) >= 1000 ? `${(Number(n) / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

const d = (iso) => (iso instanceof Date ? iso : new Date(iso));
const valid = (iso) => iso && !Number.isNaN(d(iso).getTime());

/** "5 Jul 2025" */
export const formatDate = (iso) => (valid(iso) ? d(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: TZ }) : "—");
/** "Oct 12, 2023" */
export const formatDateUS = (iso) => (valid(iso) ? d(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: TZ }) : "—");
/** "Sat, 14 Jun 2025" */
export const formatDateLong = (iso) => (valid(iso) ? d(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: TZ }) : "—");
/** "Saturday, 24 August 2025" */
export const formatDateFull = (iso) => (valid(iso) ? d(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ }) : "—");
/** "10:00 AM" */
export const formatTime = (iso) => (valid(iso) ? d(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ }) : "—");
/** "12 Mar 2025, 2:30 PM" */
export const formatDateTime = (iso) => (valid(iso) ? `${formatDate(iso)}, ${formatTime(iso)}` : "—");
/** "10:00 AM – 10:00 PM" */
export const timeRange = (startIso, endIso) => (valid(startIso) && valid(endIso) ? `${formatTime(startIso)} – ${formatTime(endIso)}` : "—");
/** "Oct 2023" */
export const formatMonthYear = (iso) => (valid(iso) ? d(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: TZ }) : "—");
/** "YYYY-MM-DD" in WAT, for <input type="date"> */
export const toDateInput = (iso) => (valid(iso) ? new Date(d(iso).getTime() + 3600_000).toISOString().slice(0, 10) : "");

/** "Just now", "24m ago", "3h ago", "Yesterday", "5 days ago", then a date. */
export function timeAgo(iso) {
  if (!valid(iso)) return "—";
  const diff = Date.now() - d(iso).getTime();
  const future = diff < 0;
  const s = Math.abs(diff) / 1000;
  const fmt = (n, unit) => (future ? `in ${n}${unit}` : `${n}${unit} ago`);
  if (s < 60) return future ? "in a moment" : "Just now";
  if (s < 3600) return fmt(Math.floor(s / 60), "m");
  if (s < 86400) return fmt(Math.floor(s / 3600), "h");
  const days = Math.floor(s / 86400);
  if (days === 1) return future ? "Tomorrow" : "Yesterday";
  if (days < 30) return future ? `in ${days} days` : `${days} days ago`;
  return formatDate(iso);
}

/** "Tunde Adeyemi" -> "TA" */
export const initials = (name) =>
  String(name ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "?";
