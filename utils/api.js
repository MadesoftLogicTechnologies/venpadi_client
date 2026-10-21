/*
 * The one way this portal talks to the Venpadi API.
 *
 * Every response from the API is the envelope { status, message, data, action }.
 * These helpers return `data` on success and throw an ApiError (with the
 * envelope's message, status token and per-field errors) on failure, so pages
 * never unwrap the envelope themselves.
 *
 * Session handling lives here too: a 401 triggers ONE refresh with the stored
 * refresh token (concurrent 401s share the same refresh), then the request is
 * retried; if the refresh fails the session is cleared and the user is sent to
 * the login page.
 *
 * Usage:
 *   const rows = await api.get("/bookings", { status: "pending" });
 *   await api.post(`/bookings/${id}/approve`);
 *   await apiUpload("/media", files, { venueId });
 *   await apiDownload("/bookings/export", { status: "pending" }, "bookings.csv");
 */
import { useAuthStore } from "~/store/auth";
import { useToastStore } from "~/store/toast";

export class ApiError extends Error {
  constructor(message, { status = 0, code = "", fields = null, action = "" } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status; // HTTP status
    this.code = code; // envelope status token, e.g. "Validation_Error"
    this.fields = fields && typeof fields === "object" ? fields : null; // 422 field -> message
    this.action = action;
  }
}

const baseURL = () => useRuntimeConfig().public.API_URL;

/** Drop undefined/null/"" so they don't arrive as "undefined" query strings. */
const cleanQuery = (query) => {
  if (!query) return undefined;
  const out = {};
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = Array.isArray(v) ? v.join(",") : v;
  }
  return out;
};

let refreshing = null;

async function refreshSession() {
  const auth = useAuthStore();
  if (!auth.refreshToken) return false;
  refreshing ??= $fetch("/auth/refresh", {
    baseURL: baseURL(),
    method: "POST",
    body: { refresh_token: auth.refreshToken },
  })
    .then((res) => {
      auth.setSession(res?.data ?? {});
      return true;
    })
    .catch(() => false)
    .finally(() => {
      setTimeout(() => (refreshing = null), 0);
    });
  return refreshing;
}

function toast(text, type = "error") {
  try {
    useToastStore().setMessage({ text, type });
  } catch {
    /* toast store unavailable outside a component context */
  }
}

/**
 * @param {string} path      API path, e.g. "/bookings"
 * @param {object} opts      { method, body, query, toast (show error toast, default true), raw (blob) }
 */
export async function apiRequest(path, opts = {}, retried = false) {
  const auth = useAuthStore();
  const { method = "GET", body, query, raw = false, headers = {} } = opts;
  const showToast = opts.toast !== false;
  try {
    const res = await $fetch(path, {
      baseURL: baseURL(),
      method,
      body,
      query: cleanQuery(query),
      responseType: raw ? "blob" : "json",
      headers: {
        Accept: raw ? "*/*" : "application/json",
        ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
        ...headers,
      },
    });
    return raw ? res : res?.data;
  } catch (err) {
    const status = err?.response?.status ?? err?.statusCode ?? 0;
    const env = err?.data ?? err?.response?._data ?? null;
    const isAuthCall = path.startsWith("/auth/login") || path.startsWith("/auth/refresh") || path.startsWith("/auth/register");

    if (status === 401 && !retried && !isAuthCall && auth.refreshToken) {
      if (await refreshSession()) return apiRequest(path, opts, true);
    }
    if (status === 401 && !isAuthCall) {
      auth.clearSession();
      if (import.meta.client) {
        const current = useRouter().currentRoute.value.fullPath;
        navigateTo({ path: "/auth/login", query: { redirect: current } });
      }
    }

    const message =
      (env && typeof env.message === "string" && env.message) ||
      (status === 0 ? "Could not reach the Venpadi API. Check your connection." : "Something went wrong");
    const error = new ApiError(message, { status, code: env?.status ?? "", fields: env?.data ?? null, action: env?.action ?? "" });
    if (showToast && status !== 401) {
      const firstField = error.fields && status === 422 ? Object.values(error.fields)[0] : null;
      toast(firstField ? `${message}: ${firstField}` : message, "error");
    }
    throw error;
  }
}

export const api = {
  get: (path, query, opts = {}) => apiRequest(path, { ...opts, method: "GET", query }),
  post: (path, body = {}, opts = {}) => apiRequest(path, { ...opts, method: "POST", body }),
  put: (path, body = {}, opts = {}) => apiRequest(path, { ...opts, method: "PUT", body }),
  patch: (path, body = {}, opts = {}) => apiRequest(path, { ...opts, method: "PATCH", body }),
  del: (path, opts = {}) => apiRequest(path, { ...opts, method: "DELETE" }),
};

/** Multipart upload. `files` is a File, FileList or array of File; field name "files". */
export function apiUpload(path, files, fields = {}, opts = {}) {
  const form = new FormData();
  const list = files instanceof File ? [files] : Array.from(files ?? []);
  for (const f of list) form.append("files", f);
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null && v !== "") form.append(k, String(v));
  }
  return apiRequest(path, { ...opts, method: "POST", body: form });
}

/** Download a CSV/file endpoint and save it in the browser. */
export async function apiDownload(path, query, filename = "export.csv") {
  const blob = await apiRequest(path, { query, raw: true });
  if (!import.meta.client) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Show a success toast (for mutations). */
export function notifySuccess(text) {
  toast(text, "success");
}
