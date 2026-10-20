import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
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
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setNotifications(notification) {
      this.notifications = notification;
    },
    logout() {
      const router = useRouter();
      this.token = null;
      this.isLoggedIn = false;
      this.user = null;
      this.role = null;
      const accessToken = useCookie("accessToken");
      accessToken.value = null;
      if (import.meta.client) {
        localStorage.clear();
      }
      router.push("/auth/login");
    },
    setSelectedRow(row) {
      this.selectedRow = row;
    },
  },
  persist: true,
});
