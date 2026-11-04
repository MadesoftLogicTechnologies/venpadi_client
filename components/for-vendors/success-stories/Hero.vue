<template>
  <section class="bg-[#0B0F14] text-white pt-14 pb-28 md2:pt-20 md2:pb-36">
    <div class="max-w-[820px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <span
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-[11px] font-bold tracking-[0.1em] uppercase text-primary"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Owner stories · Real venues. Real numbers.
      </span>

      <h1
        class="mt-5 text-[2.15rem] sm:text-[2.75rem] md2:text-[3.35rem] font-extrabold tracking-tight leading-[1.1]"
      >
        Behind every fully booked calendar is a
        <span class="text-primary">decision.</span>
      </h1>

      <p class="mt-5 text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
        Explore unvarnished financial breakdowns, operations shifts, and tactical growth
        chronicles written with the venue operators who built destination businesses on
        Venpadi.
      </p>

      <div
        class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/75"
      >
        <span
          v-for="item in proofs"
          :key="item"
          class="inline-flex items-center gap-2"
        >
          <span
            class="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center"
          >
            <i class="pi pi-check text-[9px] font-bold"></i>
          </span>
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const proofs = [
  "12 deep-dive stories",
  "Full ops & profit metrics",
  "₦140M+ verified revenue",
];
</script>
