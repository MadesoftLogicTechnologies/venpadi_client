/*
 * The marketplace's real figures for marketing pages (GET /public/stats).
 *
 *   const { stats, rates, loaded } = usePublicStats();
 *   stats.value?.liveVenues            // number | undefined until loaded
 *   hostFeeLabel(rates.value)          // "9%" — the live host fee, never a literal
 *   statTiles(stats.value, ["liveVenues", "eventsHosted", "cities"])
 *                                       // [{ key, value, label }] — zero/missing dropped
 *
 * Every number a marketing page shows comes from here or is removed (audit
 * WP2). Fetched once per page load and shared, like useCatalog. On failure the
 * figures stay null and every tile hides — an invented fallback is exactly
 * what the audit removed.
 *
 * Payload: { stats: { verifiedVenues, liveVenues, hosts, eventsHosted, cities,
 *   averageRating, reviewCount, planners, gmvProcessedMinor },
 *   rates: { serviceFeeBps, hostFeeBps } }. Money is kobo, rates basis points.
 */
let pending = null;
const state = ref(null);

export function usePublicStats() {
  if (!state.value && !pending) {
    pending = api
      .get("/public/stats", undefined, { toast: false })
      .then((data) => (state.value = data ?? null))
      .catch(() => {
        pending = null;
      });
  }
  return {
    data: state,
    stats: computed(() => state.value?.stats ?? null),
    rates: computed(() => state.value?.rates ?? null),
    loaded: computed(() => !!state.value),
  };
}

/** True for a figure worth printing: a finite number above zero. */
export const hasFigure = (n) => n !== null && n !== undefined && Number.isFinite(Number(n)) && Number(n) > 0;

/** 1250 -> "1,250". */
export const statCount = (n) => Number(n).toLocaleString("en-US");

/** Basis points -> percent text: 500 -> "5%", 750 -> "7.5%", null -> null. */
export const bpsToPct = (bps) => {
  const n = Number(bps);
  if (bps === null || bps === undefined || !Number.isFinite(n)) return null;
  return `${(n / 100).toFixed(2).replace(/\.?0+$/, "")}%`;
};

/** The live host (venue) fee, e.g. "9%"; null until loaded. */
export const hostFeeLabel = (rates) => bpsToPct(rates?.hostFeeBps);

/** The live planner service fee, e.g. "5%"; null until loaded. */
export const serviceFeeLabel = (rates) => bpsToPct(rates?.serviceFeeBps);

const TILES = {
  liveVenues: { label: "Live venues", fmt: statCount },
  verifiedVenues: { label: "Verified venues", fmt: statCount },
  hosts: { label: "Venue hosts", fmt: statCount },
  eventsHosted: { label: "Events booked", fmt: statCount },
  cities: { label: "Cities", fmt: statCount },
  planners: { label: "Planners", fmt: statCount },
  reviewCount: { label: "Verified reviews", fmt: statCount },
  // A rating from no reviews is not a rating: it needs reviewCount too.
  averageRating: { label: "Average rating", fmt: (n) => `${Number(n).toFixed(1)}/5`, needs: "reviewCount" },
  gmvProcessedMinor: { label: "Paid through Venpadi", fmt: (n) => nairaCompact(n) },
};

/**
 * Stat tiles for the given keys, in order, dropping any zero or missing figure.
 * `labels` overrides the default label per key.
 */
export function statTiles(stats, keys, labels = {}) {
  if (!stats) return [];
  return keys
    .map((key) => {
      const t = TILES[key];
      const v = stats[key];
      if (!t || !hasFigure(v)) return null;
      if (t.needs && !hasFigure(stats[t.needs])) return null;
      return { key, value: t.fmt(v), label: labels[key] ?? t.label };
    })
    .filter(Boolean);
}
