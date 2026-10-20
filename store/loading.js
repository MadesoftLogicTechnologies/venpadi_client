import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);

  function showLoading() {
    loading.value = true;
  }

  function closeLoading() {
    loading.value = false;
  }

  return {
    loading,
    showLoading,
    closeLoading,
  };
});
