/*
 * Authentication calls. PORTAL is set per portal ("vendor" or "client"): the
 * API refuses a client account on the vendor portal and vice versa.
 */
import { useAuthStore } from "~/store/auth";

export const PORTAL = "client";

export async function loginUser(email, password) {
  try {
    const data = await api.post("/auth/login", { email, password, portal: PORTAL });
    useAuthStore().setSession(data);
    notifySuccess("Login successful");
    return true;
  } catch {
    return false;
  }
}

/** Client signup: { fullName, email, password, acceptTerms } */
export async function registerClient(payload) {
  const data = await api.post("/auth/register", payload);
  useAuthStore().setSession(data);
  return data;
}

/** Vendor signup: { fullName, email, password, acceptTerms, business: {...} } */
export async function registerVendor(payload) {
  const data = await api.post("/auth/register/vendor", payload);
  useAuthStore().setSession(data);
  return data;
}

export async function requestResetPassword(email) {
  try {
    await api.post("/auth/reset-password", { email });
    notifySuccess("If an account exists, you will receive reset instructions.");
    return true;
  } catch {
    return false;
  }
}

export async function confirmResetPassword(token, password) {
  await api.post("/auth/reset-password/confirm", { token, password });
  notifySuccess("Password updated. Please sign in.");
}

export async function changePassword(currentPassword, newPassword) {
  const data = await api.post("/auth/change-password", { currentPassword, newPassword });
  useAuthStore().setSession(data);
  notifySuccess("Password changed");
  return data;
}

export async function fetchUser() {
  try {
    const data = await api.get("/auth/user", undefined, { toast: false });
    useAuthStore().setUser(data.user);
    return data.user;
  } catch {
    return null;
  }
}

export async function logoutAll() {
  await api.post("/auth/logout-all");
  useAuthStore().clearSession();
  navigateTo("/auth/login");
}

export function previewInvitation(token) {
  return api.get(`/auth/invitations/${encodeURIComponent(token)}`, undefined, { toast: false });
}

export async function acceptInvitation(payload) {
  const data = await api.post("/auth/invitations/accept", payload);
  useAuthStore().setSession(data);
  return data;
}
