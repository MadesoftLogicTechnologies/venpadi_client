import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    open: false,
    mode: "confirm",
    title: "",
    message: "",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "primary",
    resolve: null,
  }),
  actions: {
    openDialog(options = {}) {
      return new Promise((resolve) => {
        this.mode = options.mode || "confirm";
        this.title = options.title || "";
        this.message = options.message || "";
        this.confirmLabel = options.confirmLabel || (this.mode === "alert" ? "OK" : "Confirm");
        this.cancelLabel = options.cancelLabel || "Cancel";
        this.variant = options.variant || "primary";
        this.resolve = resolve;
        this.open = true;
      });
    },
    close(result) {
      const resolve = this.resolve;
      this.open = false;
      this.resolve = null;
      resolve?.(result);
    },
  },
});
