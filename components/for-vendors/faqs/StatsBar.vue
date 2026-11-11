<template>
  <!-- Marketplace figures from GET /public/stats (zero/missing tiles hide);
       the "190+ countries", "48 hrs" and "4.8 / 5 owner satisfaction" it
       replaced were invented. -->
  <section class="bg-brand-gradient-soft text-white py-10 md2:py-12">
    <div
      class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8 grid grid-cols-2 md2:grid-cols-4 gap-6 md2:gap-4"
    >
      <div v-for="stat in stats" :key="stat.label" class="text-center md2:text-left">
        <p class="text-2xl sm:text-3xl font-extrabold tracking-tight">{{ stat.value }}</p>
        <p class="mt-1 text-xs sm:text-sm text-white/80">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { faqCategories } from "./data.js";

const questionCount = faqCategories.reduce((n, c) => n + c.items.length, 0);
const { stats: live } = usePublicStats();
const stats = computed(() => [
  { key: "questions", value: String(questionCount), label: "questions answered" },
  ...statTiles(live.value, ["liveVenues", "cities", "averageRating"], {
    liveVenues: "venues live on Venpadi",
    cities: "cities with live venues",
    averageRating: "average planner rating",
  }),
]);
</script>
