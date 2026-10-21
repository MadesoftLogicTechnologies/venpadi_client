/*
 * Saved venues (the heart buttons). One shared set of saved venue ids per page
 * load, fetched from GET /me/favorites/ids when the user is signed in. Toggling
 * calls POST/DELETE /me/favorites/:venueId; a signed-out visitor is sent to
 * the login page and comes back to where they were.
 */
import { useAuthStore } from "~/store/auth";

const ids = ref(new Set());
const busy = ref(new Set());
let loadedFor = null;

export function useFavorites() {
  const auth = useAuthStore();
  const route = useRoute();

  async function load(force = false) {
    if (!auth.isAuthenticated) {
      ids.value = new Set();
      loadedFor = null;
      return;
    }
    const who = auth.user?.id ?? "me";
    if (!force && loadedFor === who) return;
    loadedFor = who;
    try {
      const data = await api.get("/me/favorites/ids", undefined, { toast: false });
      ids.value = new Set(data?.venueIds ?? []);
    } catch {
      loadedFor = null;
    }
  }

  const isSaved = (venueId) => !!venueId && ids.value.has(venueId);
  const isBusy = (venueId) => busy.value.has(venueId);

  async function toggle(venueId) {
    if (!venueId) return;
    if (!auth.isAuthenticated) {
      return navigateTo({ path: "/auth/login", query: { redirect: route.fullPath } });
    }
    if (busy.value.has(venueId)) return;
    busy.value = new Set([...busy.value, venueId]);
    const saved = ids.value.has(venueId);
    try {
      if (saved) {
        await api.del(`/me/favorites/${venueId}`);
        const next = new Set(ids.value);
        next.delete(venueId);
        ids.value = next;
        notifySuccess("Removed from saved venues");
      } else {
        await api.post(`/me/favorites/${venueId}`);
        ids.value = new Set([...ids.value, venueId]);
        notifySuccess("Saved to your venues");
      }
    } catch {
      /* toast already shown */
    } finally {
      const next = new Set(busy.value);
      next.delete(venueId);
      busy.value = next;
    }
  }

  onMounted(() => load());

  return { ids, load, isSaved, isBusy, toggle };
}
