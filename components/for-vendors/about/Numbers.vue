<template>
  <section class="bg-[#141414] text-white py-16 md2:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        System performance
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight max-w-3xl"
      >
        Numbers that reflect real economic volume.
      </h2>

      <div class="mt-12 grid sm:grid-cols-2 md2:grid-cols-4 gap-8 md2:gap-6">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-sm font-bold">{{ stat.label }}</p>
          <p class="mt-1 text-xs text-white/45">{{ stat.sub }}</p>
        </div>
      </div>

      <div
        class="mt-12 pt-10 border-t border-white/10 grid sm:grid-cols-3 gap-6"
      >
        <div
          v-for="item in secondary"
          :key="item.label"
          class="flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0"
          >
            <i :class="['pi text-sm', item.icon]"></i>
          </div>
          <div>
            <p class="text-lg font-extrabold tracking-tight">{{ item.value }}</p>
            <p class="mt-1 text-xs text-white/50 leading-relaxed">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    value: "₦420M+",
    label: "Total earned by owners",
    sub: "Over the last 12 months",
  },
  {
    value: "1,200+",
    label: "Active venue owners",
    sub: "Across 4 regions, globally in view",
  },
  {
    value: "190+",
    label: "Countries with searches",
    sub: "Global demand, local results",
  },
  {
    value: "4.8 / 5",
    label: "Satisfaction score",
    sub: "From 2,500+ completed events",
  },
];

const secondary = [
  {
    value: "48 hrs",
    label: "Average timeline from listing creation to first confirmed booking inquiry",
    icon: "pi-clock",
  },
  {
    value: "24 hrs",
    label: "Guaranteed settlement window to owner accounts after event completion",
    icon: "pi-wallet",
  },
  {
    value: "3 minutes",
    label: "Fast check-in and calendar booking time for qualified international guests",
    icon: "pi-bolt",
  },
];
</script>
