import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => ({
    message: null,
    isToastVisible: false,
  }),
  actions: {
    setMessage(message) {
      this.message = message;
      this.isToastVisible = true;
      setTimeout(() => {
        this.clearMessage();
      }, 3000);
    },
    clearMessage() {
      this.message = null;
      this.isToastVisible = false;
    },
  },
});
