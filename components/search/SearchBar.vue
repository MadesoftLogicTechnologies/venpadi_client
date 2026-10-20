<template>
  <section class="bg-white border-b border-border">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-5">
      <form
        class="flex flex-col md2:flex-row md2:items-stretch gap-3"
        @submit.prevent="$emit('search')"
      >
        <div
          class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md2:grid-cols-6 gap-2 bg-white border border-border rounded-2xl p-2 shadow-sm"
        >
          <label
            v-for="field in fields"
            :key="field.key"
            class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-greybg min-w-0"
          >
            <i :class="['pi text-primary text-sm shrink-0', field.icon]"></i>
            <div class="min-w-0 flex-1">
              <span
                class="block text-[10px] font-semibold uppercase tracking-wide text-bodytext2"
              >
                {{ field.label }}
              </span>
              <input
                v-if="field.type !== 'select'"
                v-model="model[field.key]"
                type="text"
                :placeholder="field.placeholder"
                class="w-full bg-transparent border-0 outline-none text-sm text-header placeholder:text-bodytext2 p-0 truncate"
              />
              <select
                v-else
                v-model="model[field.key]"
                class="w-full bg-transparent border-0 outline-none text-sm text-header p-0 appearance-none cursor-pointer truncate"
              >
                <option
                  v-for="opt in field.options"
                  :key="opt"
                  :value="opt"
                >
                  {{ opt }}
                </option>
              </select>
            </div>
          </label>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            class="relative inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-white text-sm font-medium text-header hover:bg-greybg"
            @click="$emit('toggle-filters')"
          >
            <i class="pi pi-sliders-h text-sm"></i>
            Filters
            <span
              v-if="filterCount"
              class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center"
            >
              {{ filterCount }}
            </span>
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 flex-1 md2:flex-none"
          >
            <i class="pi pi-search text-sm"></i>
            Search
          </button>
        </div>
      </form>

      <div
        v-if="chips.length"
        class="mt-4 flex flex-wrap items-center gap-2"
      >
        <button
          v-for="chip in chips"
          :key="chip.id"
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
          :class="
            chip.active
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-header border-border hover:bg-greybg'
          "
          @click="$emit('toggle-chip', chip.id)"
        >
          {{ chip.label }}
          <i
            class="pi pi-times text-[10px] opacity-70"
            @click.stop="$emit('remove-chip', chip.id)"
          ></i>
        </button>
        <button
          type="button"
          class="text-xs font-semibold text-primary hover:opacity-80 ml-1"
          @click="$emit('clear-chips')"
        >
          Clear All
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  model: { type: Object, required: true },
  chips: { type: Array, default: () => [] },
  filterCount: { type: Number, default: 0 },
});

defineEmits(["search", "toggle-filters", "toggle-chip", "remove-chip", "clear-chips"]);

const fields = [
  {
    key: "location",
    label: "Location",
    placeholder: "Lekki & Victoria Island...",
    icon: "pi-map-marker",
  },
  {
    key: "city",
    label: "City",
    placeholder: "Lagos, Nigeria",
    icon: "pi-globe",
  },
  {
    key: "eventType",
    label: "Event Type",
    type: "select",
    icon: "pi-calendar",
    options: [
      "Weddings, Galas & Dinners",
      "Conferences & Corporate",
      "Birthdays & Celebrations",
      "Workshops & Training",
    ],
  },
  {
    key: "guests",
    label: "Guests",
    type: "select",
    icon: "pi-users",
    options: ["Any", "1–50", "51–150", "151–300", "200–500", "500+"],
  },
  {
    key: "budget",
    label: "Budget",
    type: "select",
    icon: "pi-wallet",
    options: ["Any", "Under ₦500k", "₦500k – ₦1.5M", "₦1.5M – ₦3M", "₦3M+"],
  },
  {
    key: "style",
    label: "Venue Style",
    type: "select",
    icon: "pi-building",
    options: ["Any", "Modern", "Classic", "Outdoor", "Immersive", "Industrial"],
  },
];
</script>
