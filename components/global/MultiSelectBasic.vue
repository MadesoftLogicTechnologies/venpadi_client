<template>
  <div ref="rootEl" class="relative w-full ">
    <div
      class="border border-border w-full bg-greybg outline-none text-sm text-header placeholder:text-bodytext placeholder:font-normal rounded-md px-3 py-1.5 cursor-pointer flex items-center flex-wrap gap-1"
      @click="toggleOpen"
    >
      <template v-if="selectedOptions.length">
        <template v-if="display === 'chip'">
          <span
            v-for="opt in selectedOptions"
            :key="getOptionId(opt)"
            class="bg-primary/10 text-primary text-xs rounded px-2 py-0.5"
          >
            {{ getOptionLabel(opt) }}
          </span>
        </template>
        <template v-else>
          <span class="text-sm">{{
            selectedOptions.map(getOptionLabel).join(", ")
          }}</span>
        </template>
      </template>
      <template v-else>
        <span class="text-bodytext">{{ placeholder }}</span>
      </template>
      <span class="ml-auto text-bodytext text-xl"><i class="pi pi-chevron-down mr-3"></i></span>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 mb-6 w-full bg-white border border-border rounded-md shadow-sm"
    >
      <div v-if="filterable" class="p-2 border-b border-border">
        <input
          v-model="searchQuery"
          type="text"
          class="w-full bg-greybg border border-border rounded px-2 py-1 text-sm outline-none"
          placeholder="Search..."
          @keydown.stop
        />
      </div>
      <ul class="max-h-64 overflow-auto py-1">
        <li
          v-for="opt in filteredOptions"
          :key="getOptionId(opt)"
          class="px-3 py-2 hover:bg-greybg cursor-pointer flex items-center gap-2"
          @click.stop="toggleOption(opt)"
        >
          <input
            type="checkbox"
            class="cursor-pointer accent-green-600"
            :checked="isSelected(getOptionId(opt))"
            @change.prevent
          />
          <span class="text-sm">{{ getOptionLabel(opt) }}</span>
        </li>
        <li
          v-if="!filteredOptions.length"
          class="px-3 py-2 text-bodytext text-sm"
        >
          No options
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  optionLabel: {
    type: String,
    default: "name",
  },
  optionValue: {
    type: String,
    default: "id",
  },
  placeholder: {
    type: String,
    default: "Select options",
  },
  display: {
    type: String,
    default: "chip", // 'chip' | 'text'
  },
  filterable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const searchQuery = ref("");
const rootEl = ref(null);
const internalValue = ref([]);

function getOptionId(option) {
  return option?.[props.optionValue];
}

function getOptionLabel(option) {
  return option?.[props.optionLabel] ?? "";
}

const selectedOptions = computed(() => {
  const valueSet = new Set(internalValue.value);
  return (props.options || []).filter((opt) => valueSet.has(getOptionId(opt)));
});

const filteredOptions = computed(() => {
  if (!props.filterable || !searchQuery.value) return props.options || [];
  const q = searchQuery.value.toLowerCase();
  return (props.options || []).filter((opt) =>
    getOptionLabel(opt).toLowerCase().includes(q)
  );
});

function toggleOpen() {
  isOpen.value = !isOpen.value;
}

function closeOnClickOutside(e) {
  if (!rootEl.value) return;
  if (!rootEl.value.contains(e.target)) {
    isOpen.value = false;
  }
}

function isSelected(id) {
  return internalValue.value.includes(id);
}

function toggleOption(option) {
  const id = getOptionId(option);
  if (id === undefined || id === null) return;
  const current = [...internalValue.value];
  const idx = current.indexOf(id);
  if (idx >= 0) {
    current.splice(idx, 1);
  } else {
    current.push(id);
  }
  internalValue.value = normalizeIdsToOptionType(current);
  emit("update:modelValue", internalValue.value);
  emit("change", internalValue.value);
}

function normalizeIdsToOptionType(ids) {
  const first = (props.options || [])[0];
  if (!first) return ids;
  const optionId = getOptionId(first);
  const shouldBeString = typeof optionId === "string";
  const shouldBeNumber = typeof optionId === "number";
  return (ids || []).map((id) => {
    if (shouldBeString) return typeof id === "string" ? id : String(id);
    if (shouldBeNumber) return typeof id === "number" ? id : Number(id);
    return id;
  });
}

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = normalizeIdsToOptionType(
      Array.isArray(val) ? val : []
    );
  },
  { immediate: true }
);

watch(
  () => props.options,
  () => {
    internalValue.value = normalizeIdsToOptionType(internalValue.value);
  },
  { deep: true }
);

onMounted(() => {
  document.addEventListener("click", closeOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeOnClickOutside);
});
</script>
