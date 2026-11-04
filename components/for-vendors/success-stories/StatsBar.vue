<template>
  <section class="bg-[#080B10] border-y border-white/5">
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center"
    >
      <div v-for="stat in stats" :key="stat.label" class="min-w-[120px]">
        <p class="text-sm sm:text-base font-extrabold text-primary">{{ stat.value }}</p>
        <p class="text-[11px] text-white/50 font-medium">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: "1,200+", label: "Active venues" },
  { value: "₦120M+", label: "Processed yearly" },
  { value: "+65%", label: "Average efficiency" },
  { value: "4.8 / 5", label: "Owner satisfaction" },
  { value: "100+", label: "Partner planners" },
];
</script>
