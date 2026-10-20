<template>
  <Transition name="toast-slide" mode="out-in">
    <div
      v-if="isToastVisible"
      class="fixed z-50 top-4 right-4 flex space-x-3 shadow-2xl text-white px-6 py-4 rounded-xl transform transition-all duration-300 ease-out opacity-100 border-l-4 ml-4 max-w-sm animate-notification-slide"
      :class="[
        'toast',
        {
          'bg-red-50 border-red-500 shadow-red-100': message.type === 'error',
          'bg-green-50 border-green-500 shadow-green-100':
            message.type === 'success',
          'bg-blue-50 border-blue-500 shadow-blue-100': message.type === 'info',
          'bg-yellow-50 border-yellow-500 shadow-yellow-100':
            message.type === 'warning',
        },
      ]"
    >
      <div class="flex items-start space-x-3 w-full">
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
          <div
            v-if="message.type === 'success'"
            class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-scale-in"
          >
            <i class="pi pi-check text-white text-[8px]"></i>
          </div>
          <div
            v-else-if="message.type === 'error'"
            class="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-scale-in"
          >
            <i class="pi pi-times text-white text-[8px]"></i>
          </div>
          <div
            v-else-if="message.type === 'info'"
            class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-scale-in"
          >
            <i class="pi pi-info-circle text-white text-[8px]"></i>
          </div>
          <div
            v-else-if="message.type === 'warning'"
            class="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center animate-scale-in"
          >
            <i class="pi pi-exclamation-triangle text-white text-[8px]"></i>
          </div>
        </div>

        <!-- Message -->
        <p
          :class="[
            message.type === 'error'
              ? 'text-red-700'
              : message.type === 'success'
              ? 'text-green-700'
              : message.type === 'info'
              ? 'text-blue-700'
              : 'text-yellow-700',
            'w-full text-sm font-medium leading-relaxed',
          ]"
        >
          {{ message.text }}
        </p>

        <!-- Close button -->
        <button
          @click="clearMessage"
          :class="[
            message.type === 'error'
              ? 'text-red-500 hover:bg-red-100'
              : message.type === 'success'
              ? 'text-green-500 hover:bg-green-100'
              : message.type === 'info'
              ? 'text-blue-500 hover:bg-blue-100'
              : 'text-yellow-500 hover:bg-yellow-100',
            'flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2',
          ]"
        >
        <i class="pi pi-times text-sm mt-1"></i>
        </button>
      </div>

      <!-- Progress bar -->
      <div
        v-if="autoClose"
        class="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-xl transition-all duration-300 ease-out"
        :style="{ width: `${progressWidth}%` }"
      ></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useToastStore } from "~/store/toast";

const toastStore = useToastStore();
const message = toastStore.message;
const isToastVisible = toastStore.isToastVisible;

const autoClose = ref(true);
const progressWidth = ref(100);
let progressInterval = null;

const clearMessage = () => {
  toastStore.clearMessage();
};

// Auto-close functionality with progress bar
onMounted(() => {
  if (autoClose.value && isToastVisible) {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const decrement = 100 / steps;

    progressInterval = setInterval(() => {
      progressWidth.value -= decrement;

      if (progressWidth.value <= 0) {
        clearInterval(progressInterval);
        clearMessage();
      }
    }, interval);
  }
});

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-slide-enter-to,
.toast-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Pulse animation for important notifications */
.toast.important {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Shake animation for error notifications */
.toast.error {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
</style>
