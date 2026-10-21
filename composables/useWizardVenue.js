/*
 * The venue the booking wizard is working on, read by slug from
 * GET /public/venues/:slug and cached for the page load so moving between
 * setup → add-ons → review does not refetch it.
 */
const cache = new Map();

export function useWizardVenue(slugRef) {
  const venue = ref(null);
  const pending = ref(false);
  const error = ref(null);

  async function load() {
    const slug = unref(slugRef);
    if (!slug) {
      venue.value = null;
      return null;
    }
    if (cache.has(slug)) {
      venue.value = cache.get(slug);
      return venue.value;
    }
    pending.value = true;
    error.value = null;
    try {
      const data = await api.get(`/public/venues/${encodeURIComponent(slug)}`, undefined, { toast: false });
      cache.set(slug, data);
      venue.value = data;
    } catch (e) {
      error.value = e;
      venue.value = null;
    } finally {
      pending.value = false;
    }
    return venue.value;
  }

  const spaceById = (id) => venue.value?.spaces?.find((s) => s.id === id) ?? null;
  const coverImage = computed(
    () => venue.value?.gallery?.[0]?.url || venue.value?.spaces?.[0]?.imageUrl || ""
  );

  return { venue, pending, error, load, spaceById, coverImage };
}
