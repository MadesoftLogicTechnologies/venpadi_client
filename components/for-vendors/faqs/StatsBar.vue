<template>
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
const stats = [
  { value: "34", label: "questions answered" },
  { value: "190+", label: "countries where clients search" },
  { value: "48 hrs", label: "avg. time to first booking" },
  { value: "4.8 / 5", label: "owner satisfaction score" },
];
</script>
