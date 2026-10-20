<template>
  <div
    v-if="loadingStore.loading"
    class="flex justify-center items-center w-full h-screen fixed top-0 left-0"
    style="background: rgba(0, 0, 0, 0.345); z-index: 9999"
  >
    <ProgressSpinner />
  </div>
</template>
<script setup>
import { useLoadingStore } from "~/store/loading";
const loadingStore = useLoadingStore();
</script>
