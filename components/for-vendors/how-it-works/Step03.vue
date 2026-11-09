<template>
  <section id="step-3" class="scroll-mt-36 bg-[#0B0F14] py-16 md:py-24 text-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-1 -top-10 text-[8rem] sm:text-[10rem] font-extrabold leading-none text-white/[0.05] select-none"
          >
            03
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full border border-primary/30 bg-primary/15 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Step 3 of 7
          </span>
          <h2
            class="relative mt-5 text-2xl sm:text-3xl md2:text-[2.45rem] font-extrabold tracking-tight leading-[1.15]"
          >
            One venue. Multiple spaces.
            <span class="text-transparent bg-clip-text bg-brand-gradient-soft">
              Multiple income streams.
            </span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
            Don’t lock your property into an all-or-nothing proposition. Subdivide your
            venue into distinct bookable entities—from intimate VIP penthouses to expansive
            outdoor lawns.
          </p>

          <div class="relative mt-7 grid sm:grid-cols-3 gap-3">
            <div
              v-for="(space, i) in spaces"
              :key="space.title"
              class="relative rounded-2xl border p-3.5"
              :class="
                i === 1
                  ? 'border-primary/60 bg-white/[0.04]'
                  : 'border-white/10 bg-white/[0.03]'
              "
            >
              <span
                v-if="i === 1"
                class="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-[9px] font-bold tracking-wide uppercase whitespace-nowrap"
              >
                Most Popular
              </span>
              <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-white/45">
                {{ space.title }}
              </p>
              <p class="mt-1.5 text-sm font-extrabold">{{ space.price }}</p>
              <p class="mt-1.5 text-[11px] text-white/45 leading-snug">{{ space.text }}</p>
            </div>
          </div>

          <p class="relative mt-5 flex items-start gap-2 text-[11px] sm:text-xs text-white/50 leading-relaxed max-w-md">
            <i class="pi pi-sync text-primary text-xs mt-0.5"></i>
            Venpadi automatically recalculates dynamic currency conversions for global
            overseas event producers.
          </p>
        </div>

        <div
          class="rounded-[1.35rem] border border-white/10 bg-[#141A22] p-4 sm:p-5 shadow-[0_28px_70px_rgba(0,0,0,0.4)]"
        >
          <div class="flex items-start justify-between gap-3 mb-5">
            <div>
              <p class="text-sm font-extrabold">Active Venue Ecosystem</p>
              <p class="text-[11px] text-white/45">3 Spaces Listed · Real-time Occupancy</p>
            </div>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[11px] font-semibold text-white/80"
            >
              <i class="pi pi-plus text-[9px]"></i>
              Add Sub-space
            </span>
          </div>

          <div class="space-y-3">
            <div
              v-for="row in rows"
              :key="row.name"
              class="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
            >
              <div class="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p class="text-sm font-semibold">{{ row.name }}</p>
                  <p class="text-[11px] text-white/45">{{ row.meta }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xs font-bold">{{ row.price }}</p>
                  <p
                    class="text-[11px] font-semibold mt-0.5"
                    :class="row.available ? 'text-amber-300' : 'text-emerald-400'"
                  >
                    {{ row.status }}
                  </p>
                </div>
              </div>
              <div class="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  class="h-full rounded-full bg-brand-gradient-soft"
                  :style="{ width: row.bar }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const spaces = [
  {
    title: "Hourly Rate",
    price: "₦45,000/hr",
    text: "Ideal for corporate workshops, board meetings & photo sessions.",
  },
  {
    title: "Daily Rate",
    price: "₦600,000/day",
    text: "Full 12-hour exclusive access with backstage setup grace periods.",
  },
  {
    title: "Package Bundle",
    price: "₦1,400,000",
    text: "Main Hall + VIP Suite + Rooftop Terrace weekend buyout bundle.",
  },
];

const rows = [
  {
    name: "The Grand Ballroom",
    meta: "Max Cap: 850 guests · 1,200 m²",
    price: "₦1,200,000 /day",
    status: "78% Occupied this month",
    bar: "78%",
  },
  {
    name: "Sunset Terrace & Garden",
    meta: "Max Cap: 250 guests · Open Air",
    price: "₦480,000 /day",
    status: "62% Occupied",
    bar: "62%",
  },
  {
    name: "Executive Boardroom Suite",
    meta: "Max Cap: 30 guests · A/V Synced",
    price: "₦75,000 /hr",
    status: "Available for Instant Booking",
    bar: "40%",
    available: true,
  },
];
</script>
