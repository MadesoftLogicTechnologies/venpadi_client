import { useDialogStore } from "~/store/dialog";

/**
 * Promise-based confirm / alert popups (replaces window.confirm / window.alert).
 *
 * await confirm({ title, message, confirmLabel, cancelLabel, variant })
 * await alert({ title, message, confirmLabel })  // or alert("message")
 */
export function useDialog() {
  const store = useDialogStore();

  function confirm(options = {}) {
    return store.openDialog({
      mode: "confirm",
      title: "Are you sure?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      variant: "danger",
      ...options,
    });
  }

  function alert(options = {}) {
    const opts = typeof options === "string" ? { message: options } : options;
    return store.openDialog({
      mode: "alert",
      title: "",
      confirmLabel: "OK",
      variant: "primary",
      ...opts,
    });
  }

  return { confirm, alert };
}
