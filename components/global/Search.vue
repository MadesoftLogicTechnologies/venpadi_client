<template>
  <label for="table-search" class="sr-only">Search</label>
  <div class="relative w-full">
    <div
      v-if="showIcon"
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <i class="pi pi-search text-bodytext2 text-sm"></i>
    </div>
    <input
      id="table-search"
      type="search"
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      class="block w-full min-h-[40px] py-2 text-sm rounded-xl outline-none text-header placeholder:text-bodytext2 focus:border-primary transition-colors"
      :class="{
        'pl-9': showIcon,
        'pl-4': !showIcon,
        'border border-border bg-[#F3F4F6]': kind === 'grey',
        'border border-border bg-white': kind === 'white',
      }"
      @input="handleEmit"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "startSearch"]);

defineProps({
  useButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  kind: {
    type: String,
    default: "grey",
  },
  placeholder: {
    type: String,
    required: false,
    default: "Search",
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const handleEmit = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>
