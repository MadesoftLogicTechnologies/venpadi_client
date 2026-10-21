/*
 * Load API data into a page with loading/error state.
 *
 *   const { data, pending, error, refresh } = useResource(
 *     () => api.get("/bookings", { status: status.value, page: page.value }),
 *     { watch: [status, page], initial: { rows: [], total: 0 } },
 *   );
 *
 * - Fetches on mount (client-side; both portals run with ssr: false).
 * - Re-fetches when any `watch` source changes (debounce search inputs yourself
 *   or pass `debounce: 300`).
 * - `data` keeps its previous value while re-fetching, so tables don't flash empty.
 */
export function useResource(fetcher, { watch: sources = [], initial = null, immediate = true, debounce = 0 } = {}) {
  const data = ref(initial);
  const pending = ref(false);
  const error = ref(null);
  let seq = 0;

  async function refresh() {
    const mine = ++seq;
    pending.value = true;
    error.value = null;
    try {
      const value = await fetcher();
      // Ignore a slow response that a newer request has already superseded.
      if (mine === seq) data.value = value ?? initial;
    } catch (e) {
      if (mine === seq) error.value = e;
    } finally {
      if (mine === seq) pending.value = false;
    }
    return data.value;
  }

  if (sources.length) {
    let t = null;
    watch(
      sources,
      () => {
        if (!debounce) return refresh();
        clearTimeout(t);
        t = setTimeout(refresh, debounce);
      },
      { deep: true },
    );
  }
  if (immediate) onMounted(refresh);

  return { data, pending, error, refresh };
}
