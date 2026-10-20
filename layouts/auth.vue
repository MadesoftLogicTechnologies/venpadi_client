<template>
  <div class="min-h-screen w-full bg-[#F5F5F5] flex flex-col">
    <header class="w-full bg-white flex-shrink-0 border-b border-gray-200">
      <div class="flex items-center justify-center py-3">
        <span class="text-lg font-semibold text-header">Your App</span>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center p-6">
      <slot />
    </main>

    <Toast v-if="showToast" />
  </div>
</template>

<script setup>
import Toast from "~/components/global/Toast.vue";
import { useToastStore } from "~/store/toast";

const toastStore = useToastStore();
const showToast = ref(false);

watchEffect(() => {
  showToast.value = toastStore.message !== null;
});
</script>
