<template>
    <div
      class="flex flex-col sm:flex-row pb-4 sm:space-x-5 sm:min-h-[calc(100vh-200px)]"
    >
      <div
        class="w-full sm:w-[20%] bg-white rounded-md shadow-md p-4 sm:h-[550px]"
      >
        <div class="space-y-4">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            @click="toggleContent(index)"
            :class="[
              'w-full text-center py-2 rounded-lg transition-all duration-200 text-sm hover:scale-[1.02]',
              tabStore.activeButtonIndex === index
                ? 'bg-primary text-white shadow-md'
                : 'text-bodytext bg-[#F3F4F6] hover:bg-[#E5E7EB]',
            ]"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="bg-white rounded-md sm:w-[80%] shadow-md mt-4 sm:mt-0">
        <div class="">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useTabStore } from "~/store/tab";
  import Card from "./Card.vue";
  
  const tabStore = useTabStore();
  
  const emit = defineEmits(["change-tab"]);
  
  const toggleContent = (index) => {
    tabStore.setActiveButton(index);
    tabStore.setTabsLength(props.buttons.length);
    emit("change-tab", props.buttons[index].label);
  };
  
  const props = defineProps({
    buttons: Array,
  });
  
  const activeComponent = computed(() => {
    if (!props.buttons || props.buttons.length === 0) {
      return null; // or a loading component
    }
    return props.buttons[tabStore.activeButtonIndex]?.component || null;
  });
  
  onMounted(() => {
    if (tabStore.tabsLength === props.buttons.length) {
      return;
    } else {
      tabStore.setActiveButton(0);
    }
  });
  
  watch(
    () => props.buttons,
    (newButtons) => {
      if (tabStore.tabsLength !== newButtons.length) {
        tabStore.setActiveButton(0);
      }
    },
    { immediate: true }
  );
  </script>
  
  <style scoped>
  /* Side content transition */
  .side-content-enter-active,
  .side-content-leave-active {
    transition: all 0.3s ease;
  }
  
  .side-content-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }
  
  .side-content-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .side-content-enter-to,
  .side-content-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  </style>
  