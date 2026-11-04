<template>
  <section class="bg-white">
    <!-- logo strip -->
    <div class="border-y border-border bg-greybg/80">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-6">
        <p class="text-center text-[11px] font-semibold tracking-[0.14em] uppercase text-bodytext2 mb-5">
          Trusted by leading venues across Nigeria
        </p>
        <div
          class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-bodytext2/80 tracking-tight"
        >
          <span v-for="name in logos" :key="name">{{ name }}</span>
        </div>
      </div>
    </div>

    <!-- testimonials -->
    <div id="case-studies" class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-14 md2:py-16">
      <div class="grid sm:grid-cols-2 gap-5">
        <article
          v-for="(t, i) in testimonials"
          :key="i"
          class="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm flex gap-4"
        >
          <img
            :src="t.avatar"
            :alt="t.name"
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
          />
          <div class="min-w-0">
            <p class="text-sm sm:text-[15px] text-header font-medium leading-relaxed">
              “{{ t.quote }}”
            </p>
            <p class="mt-3 text-sm font-semibold text-header">{{ t.name }}</p>
            <p class="text-xs text-bodytext">{{ t.role }}</p>
            <button type="button" class="mt-2 text-xs font-semibold text-primary hover:opacity-80">
              Read story →
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- advantage -->
    <div id="features" class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pb-14 md2:pb-20">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          The Venpadi Advantage
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          Built for venue owners who think like businesses.
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <article
          v-for="card in advantage"
          :key="card.title"
          class="rounded-2xl border border-border p-5 sm:p-6"
          :class="card.dark ? 'bg-dark text-white border-dark' : 'bg-white'"
        >
          <p class="text-3xl font-extrabold" :class="card.dark ? 'text-white' : 'text-header'">
            {{ card.metric }}
          </p>
          <p class="mt-1 text-sm font-semibold" :class="card.dark ? 'text-white/90' : 'text-header'">
            {{ card.title }}
          </p>
          <p class="mt-2 text-xs leading-relaxed" :class="card.dark ? 'text-white/55' : 'text-bodytext'">
            {{ card.text }}
          </p>
          <div class="mt-5 h-16 flex items-end" :class="card.dark ? 'opacity-90' : ''">
            <div
              v-if="card.chart === 'ring'"
              class="w-14 h-14 rounded-full border-[5px] border-primary/25 border-t-primary"
            ></div>
            <svg v-else-if="card.chart === 'line'" viewBox="0 0 120 48" class="w-full h-12 text-primary">
              <path
                d="M0 40 C20 38 30 28 45 26 C60 24 70 34 85 18 C95 8 110 12 120 4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              />
            </svg>
            <div v-else-if="card.chart === 'steps'" class="flex items-center gap-1.5 w-full text-[10px]">
              <span class="px-2 py-1 rounded-full bg-greybg text-bodytext">Lead</span>
              <i class="pi pi-arrow-right text-[8px] text-bodytext2"></i>
              <span class="px-2 py-1 rounded-full bg-greybg text-bodytext">Pending</span>
              <i class="pi pi-arrow-right text-[8px] text-bodytext2"></i>
              <span class="px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">Booked</span>
            </div>
            <div v-else class="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <i class="pi pi-shield text-lg"></i>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  "The Civic Center",
  "Lagos Oriental",
  "Glover Memorial",
  "Eko Convention",
  "Terra Kulture",
  "The Landmark",
];

const testimonials = [
  {
    quote: "Over the past year, we have increased our bookings by $50K with Venpadi.",
    name: "Ivana Katunne",
    role: "Owner, Garden Estate Hall",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
  },
  {
    quote: "Empty midweek slots finally fill. Payouts land on time — every single booking.",
    name: "Tunde Adebayo",
    role: "Manager, Lekki Rooftop",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
  },
];

const advantage = [
  {
    metric: "68%",
    title: "Occupancy Growth",
    text: "Average lift in booked nights within the first 90 days on Venpadi.",
    chart: "ring",
  },
  {
    metric: "3.2x",
    title: "More Visibility",
    text: "Discovery traffic vs listing on classifieds or social alone.",
    chart: "line",
  },
  {
    metric: "48 hrs",
    title: "Fastest First Booking",
    text: "Most new venues see a qualified lead within two days of going live.",
    chart: "steps",
  },
  {
    metric: "100%",
    title: "Guaranteed Payouts",
    text: "Secure escrow and instant settlement once events complete.",
    chart: "shield",
    dark: true,
  },
];
</script>
