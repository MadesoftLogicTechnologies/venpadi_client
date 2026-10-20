import { HTTP_METHODS } from "~/utils/constants";
import {
  useErrorHandler,
  noError,
  useSuccessHandler,
} from "~/utils/handle-errors";
import { useAuthStore } from "~/store/auth";

export async function requestResetPassword(email) {
  const { error } = await useHttpRequest(
    "/auth/reset-password",
    HTTP_METHODS.POST,
    { email }
  );
  if (noError(error)) {
    useSuccessHandler(
      "If an account exists, you will receive reset instructions."
    );
    return true;
  }
  useErrorHandler(error);
  return false;
}

export async function loginUser(email, password) {
  const { error, data } = await useHttpRequest(
    "/auth/login",
    HTTP_METHODS.POST,
    { email, password }
  );

  if (noError(error)) {
    const response = data._rawValue.data;
    const token = response.access_token;
    const user = response.user;

    // Adjust role checks for your API
    if (user?.role && user.role !== "admin" && user.role !== "super") {
      const { useToastStore } = await import("~/store/toast");
      useToastStore().setMessage({ text: "Not authorized", type: "error" });
      return false;
    }

    const authStore = useAuthStore();
    const accessToken = useCookie("accessToken");
    accessToken.value = token;

    authStore.token = token;
    authStore.isLoggedIn = true;
    authStore.role = user?.role ?? null;
    authStore.setUser(user);
    if (import.meta.client) {
      localStorage.setItem("token", token);
    }
    useSuccessHandler("Login successful");
    return true;
  }

  useErrorHandler(error);
  return false;
}

export async function fetchUser() {
  const { error, data } = await useHttpRequest("/auth/user", HTTP_METHODS.GET);

  if (noError(error)) {
    const authStore = useAuthStore();
    authStore.setUser(data._rawValue.data.user);
    return data;
  }

  useErrorHandler(error);
  return null;
}
