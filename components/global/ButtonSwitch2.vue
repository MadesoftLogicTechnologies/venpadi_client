<template>
  <div
    :class="['w-full bg-white min-h-[calc(100vh-200px)] rounded-xl shadow-md']"
  >
    <div
      class="w-full flex justify-between items-center border-b border-[#D1D5DB] rounded-tl-2xl"
    >
      <p class="pl-4 text-header texct-sm font-semibold">{{ title }}</p>
      <div>
        <button
          :class="[
            'font-semibold px-3 relative overflow-hidden text-sm py-2.5 transition-all duration-200',
            index === -1 ? 'rounded-tl-2xl' : '',
            activeButtonIndex === index
              ? ' text-primary font-medium  border-b border-b-primary'
              : 'text-bodytext hover:bg-gray-50',
          ]"
          v-for="(button, index) in buttons"
          :key="index"
          @click="toggleContent(index)"
          @change-tab="emitTabChange(button.label)"
        >
          {{ button.label }}
        </button>
      </div>
    </div>

    <div class="p-4">
      <Transition name="tab-content" mode="out-in">
        <component
          :is="activeComponent"
          :key="activeButtonIndex"
          v-on="attrs"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  defineEmits,
  defineProps,
  onMounted,
  watch,
  useAttrs,
} from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const emit = defineEmits(["change-tab", "update:activeIndex"]);

const props = defineProps({
  buttons: Array,
  title: String,
  activeIndex: {
    type: Number,
    default: undefined,
  },
});

const activeButtonIndex = ref(props.activeIndex ?? 0);

const toggleContent = (index) => {
  activeButtonIndex.value = index;
  emit("update:activeIndex", index);
  emit("change-tab", props.buttons[index].label);
};

const activeComponent = computed(() => {
  if (!props.buttons || props.buttons.length === 0) {
    return null;
  }
  return props.buttons[activeButtonIndex.value]?.component || null;
});

onMounted(() => {
  if (props.activeIndex !== undefined) {
    activeButtonIndex.value = props.activeIndex;
  }
});

watch(
  () => props.activeIndex,
  (newVal) => {
    if (newVal !== undefined && newVal !== activeButtonIndex.value) {
      activeButtonIndex.value = newVal;
    }
  }
);

watch(
  () => props.buttons,
  (newButtons) => {
    if (activeButtonIndex.value >= newButtons.length) {
      activeButtonIndex.value = 0;
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
