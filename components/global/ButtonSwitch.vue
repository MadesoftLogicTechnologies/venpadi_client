<template>
  <div
    :class="[
      'w-full bg-white min-h-[calc(100vh-200px)]',
      kind === 1 ? 'rounded-2xl shadow-md ' : 'rounded-b-2xl',
    ]"
  >
    <div :class="['w-full shadow-sm', kind === 1 ? 'rounded-tl-2xl' : '']">
      <button
        :class="[
          'font-semibold px-5  relative overflow-hidden text-sm transition-all duration-200',
          index === 0 && kind === 1 ? 'rounded-tl-2xl' : '',
          kind === 1 ? 'py-3.5' : 'py-2.5',
          tabStore.activeButtonIndex === index
            ? ' text-primary font-medium bg-button-switch'
            : 'text-bodytext hover:bg-gray-50',
        ]"
        v-for="(button, index) in buttons"
        :key="index"
        @click="toggleContent(index)"
        @change-tab="emitTabChange(button.label)"
      >
        {{ button.label }}

        <!-- Pseudo-element for the rounded top border -->
        <div
          v-if="tabStore.activeButtonIndex === index && kind === 1"
          :class="[
            'absolute top-0  right-0 h-[4px] bg-primary transition-all duration-200',
            index === 0 ? 'left-2' : 'left-0',
          ]"
          :style="{
            borderRadius: index === 0 ? '8px 0 0 0' : '0 0 0 0',
            clipPath: index === 0 ? 'inset(0 0 50% 0)' : 'inset(0 0 50% 0)',
          }"
        ></div>
        <div
          v-if="tabStore.activeButtonIndex === index && kind === 2"
          :class="[
            'absolute top-0  right-0 h-[4px] bg-primary left-0 transition-all duration-200',
          ]"
          :style="{
            borderRadius: index === 0 ? '0 0 0 0' : '0 0 0 0',
            clipPath: index === 0 ? 'inset(0 0 50% 0)' : 'inset(0 0 50% 0)',
          }"
        ></div>
      </button>
    </div>

    <div :class="[kind === 1 ? 'px-5 py-4' : 'py-5']">
      <Transition name="tab-content" mode="out-in">
        <component :is="activeComponent" :key="tabStore.activeButtonIndex" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { useTabStore } from "~/store/tab";

const tabStore = useTabStore();

const emit = defineEmits(["change-tab"]);

const toggleContent = (index) => {
  tabStore.setActiveButton(index);
  tabStore.setTabsLength(props.buttons.length);
  emit("change-tab", props.buttons[index].label);
};

const props = defineProps({
  buttons: Array,
  kind: {
    type: Number,
    default: 1,
  },
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
/* Tab content transition */
.tab-content-enter-active,
.tab-content-leave-active {
  transition: all 0.3s ease;
}

.tab-content-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tab-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.tab-content-enter-to,
.tab-content-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>