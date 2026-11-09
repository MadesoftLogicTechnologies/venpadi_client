<template>
  <section id="listings" class="bg-[#0B0F14] text-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-start">
        <div>
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-violet-400">
            01 — Listings
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold tracking-tight leading-tight"
          >
            Your venue deserves to be seen properly.
          </h2>
          <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
            Generic form builders strip away character. Venpadi showcases individual
            halls, gardens, and suites with real-time availability — so guests book the
            space they actually want.
          </p>

          <ul class="mt-8 space-y-5">
            <li v-for="item in features" :key="item.title" class="flex gap-3">
              <span
                class="mt-0.5 w-8 h-8 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center shrink-0"
              >
                <i :class="['pi text-xs', item.icon]"></i>
              </span>
              <div>
                <p class="text-sm font-bold">{{ item.title }}</p>
                <p class="mt-1 text-sm text-white/50 leading-relaxed">{{ item.body }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
        >
          <div class="flex items-center justify-between gap-3 mb-5">
            <div>
              <p class="text-xs text-white/40">Properties</p>
              <p class="text-sm font-bold">Grand Plaza Pavilion</p>
            </div>
            <span
              class="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400"
            >
              Live
            </span>
          </div>

          <ul class="space-y-3">
            <li
              v-for="space in spaces"
              :key="space.name"
              class="rounded-xl border border-white/10 bg-black/30 px-4 py-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-bold">{{ space.name }}</p>
                  <p class="mt-0.5 text-xs text-white/45">{{ space.meta }}</p>
                </div>
                <p class="text-sm font-extrabold text-primary shrink-0">{{ space.price }}</p>
              </div>
              <p class="mt-2 text-[11px] text-white/40">{{ space.status }}</p>
            </li>
          </ul>

          <div
            class="mt-4 rounded-xl border border-dashed border-white/20 px-4 py-6 text-center text-xs text-white/40"
          >
            Drop high-resolution event photos here
            <p class="mt-1 text-[10px] text-white/30">RAW · WebP · JPG · PNG</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: "Rich media gallery",
    body: "Upload 50+ ultra-high-resolution images with tags per room style.",
    icon: "pi-image",
  },
  {
    title: "Multi-space inventory",
    body: "Manage ballrooms, rooftops, and suites with independent dynamic pricing.",
    icon: "pi-th-large",
  },
  {
    title: "Real-time availability",
    body: "Public calendar that syncs instantly with iCal, Google Calendar, and Outlook.",
    icon: "pi-calendar",
  },
  {
    title: "Capacity configurations",
    body: "State standing, theatre, banquet, or classroom attendee thresholds.",
    icon: "pi-users",
  },
  {
    title: "Custom amenity tags",
    body: "Display parking, generators, prep kitchens, staging, and dressing rooms.",
    icon: "pi-tags",
  },
  {
    title: "Google Schema.org SEO",
    body: "Automated venue structured data so your spaces are visible on Google.",
    icon: "pi-search",
  },
];

const spaces = [
  {
    name: "The Grand Hall",
    meta: "1,500 banquet · 450 standing",
    price: "₦650,000/day",
    status: "125 bookings in Q4",
  },
  {
    name: "Sunset Rooftop Terrace",
    meta: "150 cocktail",
    price: "₦180,000/day",
    status: "48 bookings in Q4",
  },
  {
    name: "Executive Boardroom Suite",
    meta: "25 seated",
    price: "₦85,000/day",
    status: "Exclusive",
  },
];
</script>
