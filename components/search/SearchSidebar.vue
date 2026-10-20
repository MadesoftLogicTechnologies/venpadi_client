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
          v-for="cat in categories"
          :key="cat.id"
          class="flex items-center justify-between gap-3 cursor-pointer text-sm text-header"
        >
          <span class="flex items-center gap-2.5 min-w-0">
            <input
              v-model="categoryModel"
              type="checkbox"
              :value="cat.id"
              class="accent-primary w-4 h-4 rounded"
            />
            <span class="truncate">{{ cat.label }}</span>
          </span>
          <span class="text-xs text-bodytext2 shrink-0">{{ cat.count }}</span>
        </label>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-bold text-header mb-3">Guest Capacity</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="range in capacityRanges"
          :key="range"
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
          :class="
            capacityModel === range
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-header border-border hover:bg-greybg'
          "
          @click="capacityModel = capacityModel === range ? '' : range"
        >
          {{ range }}
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
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

const categories = [
  { id: "hotel", label: "Hotel & Resorts", count: "752" },
  { id: "rooftop", label: "Rooftop & Terraces", count: "418" },
  { id: "conference", label: "Conference Center", count: "631" },
  { id: "banquet", label: "Banquet & Ballroom", count: "894" },
  { id: "garden", label: "Garden & Botanical", count: "326" },
  { id: "warehouse", label: "Warehouse & Loft", count: "187" },
  { id: "beach", label: "Beachfront", count: "142" },
];

const capacityRanges = ["1–50", "51–150", "151–300", "301–500", "500+"];
</script>
