<template>
  <section class="bg-white border-y border-border">
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

const count = (n) => (n === null || n === undefined ? "—" : Number(n).toLocaleString("en-US"));

const items = computed(() => {
  const s = props.stats;
  return [
    { value: count(s?.verifiedVenues), label: "Verified Venues Listed" },
    { value: count(s?.eventsHosted), label: "Events Booked & Hosted" },
    { value: count(s?.cities), label: "Cities Covered" },
    {
      value:
        s?.averageRating === null || s?.averageRating === undefined
          ? "—"
          : Number(s.averageRating).toFixed(1),
      label: "Average Planner Rating",
      star: true,
    },
  ];
});
</script>
