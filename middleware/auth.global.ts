/*
 * Route guard for the client portal. Browsing (landing, search, venue pages,
 * the booking wizard up to submit) is public; account pages need a session.
 */
import { useAuthStore } from "~/store/auth";

const PRIVATE_PREFIXES = ["/dashboards", "/bookings", "/invoices", "/messages", "/notifications", "/settings", "/payments"];

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const isPrivate = PRIVATE_PREFIXES.some((p) => to.path === p || to.path.startsWith(`${p}/`));
  if (isPrivate && !auth.isAuthenticated) {
    return navigateTo({ path: "/auth/login", query: { redirect: to.fullPath } });
  }
  if (auth.isAuthenticated && to.path === "/auth/login") return navigateTo("/dashboards");
});
