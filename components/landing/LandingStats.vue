<template>
  <section v-if="items.length" class="bg-white border-y border-border">
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-10 grid grid-cols-2 md2:grid-cols-4 gap-8 md2:gap-6"
    >
      <div v-for="stat in items" :key="stat.label" class="text-center md2:text-left">
        <p class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
          {{ stat.value }}
          <i
            v-if="stat.star"
            class="pi pi-star-fill text-primary text-base align-middle ml-0.5"
          ></i>
        </p>
        <p class="mt-1 text-sm text-bodytext">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  stats: { type: Object, default: null },
});

const count = (n) => Number(n).toLocaleString("en-US");
// A zero or missing figure hides its tile: "0 cities covered" is not a claim
// worth making, and "—" reads as a broken page.
const has = (n) => n !== null && n !== undefined && Number(n) > 0;

const items = computed(() => {
  const s = props.stats;
  return [
    has(s?.verifiedVenues) && { value: count(s.verifiedVenues), label: "Verified Venues Listed" },
    has(s?.eventsHosted) && { value: count(s.eventsHosted), label: "Events Booked & Hosted" },
    has(s?.cities) && { value: count(s.cities), label: "Cities Covered" },
    has(s?.averageRating) && { value: Number(s.averageRating).toFixed(1), label: "Average Planner Rating", star: true },
  ].filter(Boolean);
});
</script>
