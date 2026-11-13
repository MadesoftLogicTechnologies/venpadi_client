<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="store.open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="store.title ? 'venpadi-dialog-title' : undefined"
        :aria-describedby="store.message ? 'venpadi-dialog-message' : undefined"
      >
        <div
          class="absolute inset-0 bg-black/50"
          @click="onDismiss"
        />

        <div
          class="relative w-full max-w-[400px] rounded-2xl bg-white shadow-2xl border border-border overflow-hidden"
        >
          <div class="px-6 pt-6 pb-2 text-center">
            <div
              class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
              :class="iconWrapClass"
            >
              <i :class="['pi text-lg', iconClass]"></i>
            </div>

            <h2
              v-if="store.title"
              id="venpadi-dialog-title"
              class="text-lg font-extrabold text-header tracking-tight"
            >
              {{ store.title }}
            </h2>
            <p
              v-if="store.message"
              id="venpadi-dialog-message"
              class="mt-2 text-sm text-bodytext leading-relaxed whitespace-pre-line"
              :class="{ 'mt-0': !store.title }"
            >
              {{ store.message }}
            </p>
          </div>

          <div
            class="px-6 pb-6 pt-4 flex gap-3"
            :class="store.mode === 'alert' ? 'justify-center' : 'justify-stretch'"
          >
            <button
              v-if="store.mode === 'confirm'"
              type="button"
              class="flex-1 h-11 rounded-xl border border-border text-sm font-semibold text-header hover:bg-greybg transition-colors"
              @click="store.close(false)"
            >
              {{ store.cancelLabel }}
            </button>
            <button
              type="button"
              class="h-11 rounded-xl bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-95"
              :class="store.mode === 'alert' ? 'min-w-[140px] px-6' : 'flex-1'"
              @click="store.close(true)"
            >
              {{ store.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useDialogStore } from "~/store/dialog";

const store = useDialogStore();

const iconWrapClass = computed(() =>
  store.variant === "danger" ? "bg-red-50 text-red-600" : "bg-primary/10 text-primary"
);

const iconClass = computed(() => {
  if (store.mode === "alert") return "pi-info-circle";
  return store.variant === "danger" ? "pi-exclamation-triangle" : "pi-question-circle";
});

function onDismiss() {
  store.close(store.mode === "alert");
}

function onKeydown(e) {
  if (!store.open) return;
  if (e.key === "Escape") onDismiss();
  if (e.key === "Enter") store.close(true);
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.18s ease;
}
.dialog-fade-enter-active > .relative,
.dialog-fade-leave-active > .relative {
  transition: transform 0.18s ease, opacity 0.18s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
.dialog-fade-enter-from > .relative,
.dialog-fade-leave-to > .relative {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
