import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const count = ref(0);
  const loading = computed(() => count.value > 0);

  function showLoading() {
    count.value += 1;
  }

  function closeLoading() {
    count.value = Math.max(0, count.value - 1);
  }

  return {
    loading,
    showLoading,
    closeLoading,
  };
});
