<template>
  <section class="relative overflow-hidden bg-[#0B0F14] text-white pt-14 pb-10 md2:pt-20 md2:pb-12">
    <div
      class="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[100px]"
    ></div>

    <div class="relative max-w-[920px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <span
        class="inline-flex items-center px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-bold tracking-[0.14em] uppercase text-primary"
      >
        How Venpadi works
      </span>

      <h1
        class="mt-5 text-[2.15rem] sm:text-[2.75rem] md2:text-[3.35rem] font-extrabold tracking-tight leading-[1.1]"
      >
        From empty calendar to fully booked —
        <span class="text-primary">here's exactly how.</span>
      </h1>

      <p class="mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-2xl mx-auto">
        A step-by-step blueprint designed for hotel ballrooms, restaurant private dining,
        event centres, and unique spaces — so you can fill quiet dates with verified hosts
        and get paid without the chase.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
        >
          Get Started Free
        </NuxtLink>
        <a
          href="#step-01"
          class="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          Watch it in action
        </a>
      </div>
    </div>

    <div class="relative max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8 mt-12 md2:mt-14">
      <div
        class="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
      >
        <a
          v-for="(step, i) in steps"
          :key="step.id"
          :href="`#${step.id}`"
          class="snap-start shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-colors"
          :class="
            i === 0
              ? 'bg-primary/15 border-primary/40 text-white'
              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
          "
        >
          <span
            class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold"
            :class="i === 0 ? 'bg-primary text-white' : 'bg-white/10 text-white/80'"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </span>
          <span class="text-xs sm:text-sm font-semibold whitespace-nowrap">{{ step.label }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { id: "step-01", label: "Create Account" },
  { id: "step-02", label: "Build Profile" },
  { id: "step-03", label: "Set Pricing" },
  { id: "step-04", label: "Calendar" },
  { id: "step-05", label: "Go Live" },
  { id: "step-06", label: "Promote" },
  { id: "step-07", label: "Profit" },
];
</script>
