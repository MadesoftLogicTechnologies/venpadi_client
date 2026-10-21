import { defineStore } from "pinia";

/*
 * The signed-in session. Persisted (pinia-plugin-persistedstate) so a reload
 * keeps the user signed in; the access token is short-lived and is renewed
 * with the refresh token by utils/api.js.
 */
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    refreshToken: null,
    sessionId: null,
    isLoggedIn: false,
    user: null,
    role: null,
    selectedRow: {},
    notifications: null,
  }),
  getters: {
    isAuthenticated() {
      return this.token !== null;
    },
    displayName() {
      const u = this.user;
      return u?.name || [u?.firstName, u?.lastName].filter(Boolean).join(" ") || "";
    },
    firstName() {
      return this.user?.firstName || this.displayName.split(" ")[0] || "";
    },
    permissions() {
      return this.user?.permissions ?? [];
    },
  },
  actions: {
    /** Store the payload of /auth/login, /auth/register*, /auth/refresh. */
    setSession(payload) {
      if (payload?.access_token) this.token = payload.access_token;
      if (payload?.refresh_token) this.refreshToken = payload.refresh_token;
      if (payload?.session_id) this.sessionId = payload.session_id;
      if (payload?.user) this.setUser(payload.user);
      this.isLoggedIn = !!this.token;
    },
    setUser(user) {
      this.user = user;
      this.role = user?.role ?? null;
    },
    can(permission) {
      return this.permissions.includes(permission);
    },
    setNotifications(notification) {
      this.notifications = notification;
    },
    clearSession() {
      this.token = null;
      this.refreshToken = null;
      this.sessionId = null;
      this.isLoggedIn = false;
      this.user = null;
      this.role = null;
    },
    /** Sign out on the server (revokes this session), then locally. */
    async logout() {
      const refresh = this.refreshToken;
      if (refresh) {
        try {
          await api.post("/auth/logout", { refresh_token: refresh }, { toast: false });
        } catch {
          /* already invalid — signing out locally is what matters */
        }
      }
      this.clearSession();
      if (import.meta.client) localStorage.removeItem("token");
      navigateTo("/auth/login");
    },
    setSelectedRow(row) {
      this.selectedRow = row;
    },
  },
  // localStorage, not the plugin's default cookie: localhost cookies are shared
  // across ports, so the vendor (3001) and client (3002) portals would read each
  // other's session, and tokens + the user object can exceed the 4 KB cookie cap.
  // The key is per portal for the same reason.
  persist: { key: "venpadi-client-auth", storage: persistedState.localStorage },
});
