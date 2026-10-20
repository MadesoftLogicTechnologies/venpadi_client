import { useToastStore } from "~/store/toast";
import { useAuthStore } from "~/store/auth";

export const useErrorHandler = (error) => {
  const toastStore = useToastStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const errorMessage = error?.value?.message || "Something went wrong";

  if (error?.value?.data) {
    const dataErrorMessage = error.value.data.errors
      ? error.value.data.errors
      : error.value.data?.message?.error?.message ||
        error.value.data?.message ||
        errorMessage;

    if (dataErrorMessage === "Unauthorized") {
      authStore.logout();
      toastStore.setMessage({
        text: "You have been logged out due to unauthorized access.",
        type: "error",
      });
      router.push("/auth/login");
    } else {
      toastStore.setMessage({ text: String(dataErrorMessage), type: "error" });
    }
    return dataErrorMessage;
  }

  if (errorMessage === "Unauthorized") {
    authStore.logout();
    toastStore.setMessage({
      text: "You have been logged out due to unauthorized access.",
      type: "error",
    });
    router.push("/auth/login");
  } else {
    toastStore.setMessage({ text: errorMessage, type: "error" });
  }
  return errorMessage;
};

export const useStringErrorHandler = (message) => {
  const toastStore = useToastStore();
  toastStore.setMessage({ text: message, type: "error" });
};

export const noError = (error) => {
  return error?.value == null;
};

export const useSuccessHandler = (successMessage) => {
  const toastStore = useToastStore();
  toastStore.setMessage({ text: successMessage, type: "success" });
};
