<template>
  <aside class="space-y-8">
    <div>
      <h3 class="text-sm font-bold text-header mb-3">Sort Results By</h3>
      <div class="space-y-2.5">
        <label
          v-for="option in sortOptions"
          :key="option.value"
          class="flex items-center gap-2.5 cursor-pointer text-sm text-header"
        >
          <input
            v-model="sortModel"
            type="radio"
            :value="option.value"
            class="accent-primary w-4 h-4"
          />
          {{ option.label }}
        </label>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-bold text-header mb-3">Venue Category</h3>
      <div class="space-y-2.5">
        <label
          v-for="cat in categoryList"
          :key="cat.key"
          class="flex items-center justify-between gap-3 cursor-pointer text-sm text-header"
        >
          <span class="flex items-center gap-2.5 min-w-0">
            <input
              v-model="categoryModel"
              type="checkbox"
              :value="cat.key"
              class="accent-primary w-4 h-4 rounded"
            />
            <span class="truncate">{{ cat.label }}</span>
          </span>
          <span class="text-xs text-bodytext2 shrink-0">
            {{ counts[cat.key] ?? "—" }}
          </span>
        </label>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-bold text-header mb-3">Guest Capacity</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="range in capacityRanges"
          :key="range.value"
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
          :class="
            capacityModel === range.value
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-header border-border hover:bg-greybg'
          "
          @click="capacityModel = capacityModel === range.value ? '' : range.value"
        >
          {{ range.label }}
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  /** catalog.searchCategories: [{ key, label }] */
  categoryOptions: { type: Array, default: () => [] },
  /** search response categoryCounts: [{ key, label, count }] */
  categoryCounts: { type: Array, default: () => [] },
});

const sortModel = defineModel("sort", { type: String, default: "recommended" });
const categoryModel = defineModel("categories", { type: Array, default: () => [] });
const capacityModel = defineModel("capacity", { type: String, default: "" });

const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Top Rated", value: "rating" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Distance to Center", value: "distance" },
];

const categoryList = computed(() => props.categoryOptions);

const counts = computed(() =>
  Object.fromEntries(props.categoryCounts.map((c) => [c.key, Number(c.count).toLocaleString("en-US")]))
);

// Sent as the API's `capacity` range ("200-500" / "500+").
const capacityRanges = [
  { value: "1-50", label: "1–50" },
  { value: "51-150", label: "51–150" },
  { value: "151-300", label: "151–300" },
  { value: "301-500", label: "301–500" },
  { value: "500+", label: "500+" },
];
</script>
