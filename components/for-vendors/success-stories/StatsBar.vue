<template>
  <!-- Live figures from GET /public/stats; zero or missing figures are dropped
       and the bar hides with none (the former 1,200+, ₦120M+, +65%, 4.8/5 and
       100+ were invented). -->
  <section v-if="tiles.length" class="bg-[#080B10] border-y border-white/5">
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center"
    >
      <div v-for="stat in tiles" :key="stat.key" class="min-w-[120px]">
        <p class="text-sm sm:text-base font-extrabold text-primary">{{ stat.value }}</p>
        <p class="text-[11px] text-white/50 font-medium">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const { stats } = usePublicStats();
const tiles = computed(() =>
  statTiles(stats.value, ["liveVenues", "gmvProcessedMinor", "eventsHosted", "averageRating", "planners"])
);
</script>
