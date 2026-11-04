<template>
  <section class="relative overflow-hidden bg-[#0B0F14] text-white pt-14 pb-12 md2:pt-20 md2:pb-16">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(255,77,23,0.22),transparent_65%)]"
    ></div>

    <div class="relative max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <h1
        class="text-[2.1rem] sm:text-[2.75rem] md2:text-[3.35rem] font-extrabold tracking-tight leading-[1.12] max-w-4xl"
      >
        Plain language.
        <span class="bg-clip-text text-transparent bg-brand-gradient">Real commitments.</span>
        Mutual accountability.
      </h1>
      <p class="mt-5 text-sm sm:text-base text-white/60 leading-relaxed max-w-3xl">
        These Terms of Service govern your commercial partnership with Venpadi Technologies
        Inc. Designed for venue proprietors, hotel management groups, and independent event
        space owners in Nigeria and across Africa. Legal terms should be straightforward,
        sound, and transparent.
      </p>

      <div class="mt-10 grid sm:grid-cols-3 gap-4">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
        >
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            :class="pillar.iconBg"
          >
            <i :class="['pi text-sm', pillar.icon]"></i>
          </div>
          <p class="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40 mb-1">
            {{ pillar.num }}
          </p>
          <h2 class="text-base font-bold text-white">{{ pillar.title }}</h2>
          <p class="mt-2 text-sm text-white/55 leading-relaxed">{{ pillar.body }}</p>
        </article>
      </div>

      <div
        class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-white/45"
      >
        <span>Last updated February 14, 2024 (v1.2.0)</span>
        <span>Available in: English, Hausa, Igbo, Yoruba</span>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
          @click="printPage"
        >
          <i class="pi pi-print text-[11px]"></i>
          Print this policy
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const pillars = [
  {
    num: "01",
    title: "What you agree to",
    body: "List with accurate information, maintain quality and safety standards, honour confirmed bookings, and keep calendars current for your clients.",
    icon: "pi-building",
    iconBg: "bg-[#FF2D55]/15 text-[#FF2D55]",
  },
  {
    num: "02",
    title: "What we agree to",
    body: "Showcase your venue to verified demand, provide booking and calendar tools, and process payments securely — with transparent fees only on successful bookings.",
    icon: "pi-shield",
    iconBg: "bg-primary/20 text-primary",
  },
  {
    num: "03",
    title: "What we expect",
    body: "A 30-day notice period for convenience terminations, and good-faith participation in our mediation channel when guest issues arise.",
    icon: "pi-check-circle",
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
];

function printPage() {
  if (import.meta.client) window.print();
}
</script>
