/*
 * The API's shared vocabularies (GET /catalog): event types, space types,
 * layouts, amenities, add-on categories, block reasons, banks, cancellation
 * policies, permission groups … Fetched once per page load and cached, so every
 * dropdown in the portal shows the same keys and labels the API validates.
 *
 *   const catalog = useCatalog();          // reactive, null until loaded
 *   catalog.value?.eventTypes              // [{ key, label }]
 *   labelFor(catalog.value?.eventTypes, "wedding") // "Wedding"
 */
let pending = null;
const state = ref(null);

export function useCatalog() {
  if (!state.value && !pending) {
    pending = api
      .get("/catalog", undefined, { toast: false })
      .then((data) => (state.value = data))
      .catch(() => {
        pending = null;
      });
  }
  return state;
}

export const labelFor = (list, key) => (list ?? []).find((x) => x.key === key)?.label ?? key ?? "";
