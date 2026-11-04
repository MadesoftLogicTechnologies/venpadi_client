<template>
  <section class="bg-[#0B0F14] py-14 md2:py-20 text-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <article
        class="grid md2:grid-cols-2 gap-0 rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#141A22]"
      >
        <div class="p-6 sm:p-8 md2:p-10 flex flex-col justify-center">
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            Hospitality leaders case study
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
          >
            Accra Luxury Grand Ballroom: Automating 45 corporate summits annually
          </h2>
          <p class="mt-3 text-sm text-white/60 leading-relaxed">
            How one ballroom turned spreadsheet chaos into a repeatable summit machine —
            with fewer staff hours and more confirmed contracts.
          </p>
          <div class="mt-5 flex flex-wrap gap-4 text-sm">
            <div v-for="s in heroStats" :key="s.label">
              <p class="text-[10px] font-bold uppercase tracking-wider text-white/45">
                {{ s.label }}
              </p>
              <p class="font-extrabold text-primary">{{ s.value }}</p>
            </div>
          </div>
          <a
            href="#deep-dive"
            class="mt-6 inline-flex self-start items-center px-5 py-2.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
          >
            Read the full story
          </a>
        </div>
        <div class="relative min-h-[240px] md2:min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f29da8c2c4?w=900&h=700&fit=crop"
            alt="Luxury ballroom"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </article>

      <div class="mt-4 grid sm:grid-cols-3 gap-4">
        <article
          v-for="card in secondary"
          :key="card.title"
          class="rounded-2xl border border-white/10 bg-[#141A22] p-5"
          :class="card.cta ? 'flex flex-col justify-between' : ''"
        >
          <template v-if="card.cta">
            <div>
              <AuthVenpadiLogo dark text-class="text-lg" :icon-size="24" />
              <p class="mt-4 text-sm text-white/70 leading-relaxed">{{ card.title }}</p>
            </div>
            <NuxtLink
              to="/auth/signup/venue"
              class="mt-5 inline-flex self-start px-4 py-2 rounded-full bg-white text-header text-sm font-semibold hover:opacity-95"
            >
              List your venue
            </NuxtLink>
          </template>
          <template v-else>
            <p class="text-[11px] font-bold uppercase tracking-wider text-primary">
              {{ card.tag }}
            </p>
            <h3 class="mt-2 text-base font-extrabold leading-snug">{{ card.title }}</h3>
            <p class="mt-2 text-xs text-white/50 leading-relaxed">{{ card.text }}</p>
          </template>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const heroStats = [
  { label: "Revenue boost", value: "+₦22.5M" },
  { label: "Efficiency", value: "18 hrs/wk" },
  { label: "Inquiries", value: "+41%" },
];

const secondary = [
  {
    tag: "Rooftop",
    title: "The Rooftop Garden Terrace",
    text: "High-intent leads replaced cold walk-ins — with deposits locked before the event week.",
  },
  {
    tag: "Lounge",
    title: "Skyline Lounge & Bar",
    text: "Automated booking rules cut double-bookings and freed the floor manager for guests.",
  },
  {
    cta: true,
    title: "Join 1,200+ venue owners. List your venue and start growing today.",
  },
];
</script>
