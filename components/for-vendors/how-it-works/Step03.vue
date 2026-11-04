<template>
  <section id="step-03" class="bg-[#0B0F14] py-14 md2:py-20 text-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-center">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-2 -top-8 text-[7rem] sm:text-[9rem] font-extrabold leading-none text-white/[0.06] select-none"
          >
            03
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-bold tracking-wide"
          >
            STEP 03
          </span>
          <h2
            class="relative mt-4 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight"
          >
            One venue. Multiple spaces.
            <span class="text-primary">Multiple income streams.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-white/65 leading-relaxed max-w-md">
            Price each hall, terrace, or boardroom separately. Hosts book the space that
            fits — you stack revenue across the same property.
          </p>

          <div class="relative mt-6 grid sm:grid-cols-3 gap-3">
            <div
              v-for="space in spaces"
              :key="space.name"
              class="rounded-2xl border border-white/10 bg-white/5 p-3.5"
            >
              <p class="text-[11px] text-white/50 font-medium">{{ space.name }}</p>
              <p class="mt-1 text-sm font-extrabold text-white">{{ space.price }}</p>
              <p class="mt-0.5 text-[11px] text-white/45">{{ space.meta }}</p>
            </div>
          </div>
        </div>

        <div
          class="rounded-[1.5rem] border border-white/10 bg-[#141A22] p-4 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        >
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-extrabold">Unit price position</p>
              <p class="text-[11px] text-white/45">Revenue share by space · this month</p>
            </div>
            <span class="text-[11px] font-semibold text-primary">₦2.4M total</span>
          </div>

          <div class="space-y-3">
            <div
              v-for="row in rows"
              :key="row.name"
              class="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
            >
              <div class="flex items-center justify-between gap-3 mb-2">
                <p class="text-sm font-semibold">{{ row.name }}</p>
                <p class="text-xs font-bold text-white/80">{{ row.share }}</p>
              </div>
              <div class="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  class="h-full rounded-full bg-primary"
                  :style="{ width: row.bar }"
                ></div>
              </div>
              <p class="mt-2 text-[11px] text-white/45">{{ row.meta }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const spaces = [
  { name: "Main hall", price: "₦450,000", meta: "Up to 400 guests" },
  { name: "Garden", price: "₦180,000", meta: "Outdoor · 150" },
  { name: "Boardroom", price: "₦85,000", meta: "Corporate · 24" },
];

const rows = [
  {
    name: "The Grand Ballroom",
    share: "52%",
    bar: "52%",
    meta: "Occupancy 78% · ₦1.25M",
  },
  {
    name: "Garden Terrace & Atrium",
    share: "31%",
    bar: "31%",
    meta: "Occupancy 64% · ₦740k",
  },
  {
    name: "Executive Boardroom",
    share: "17%",
    bar: "17%",
    meta: "Occupancy 81% · ₦410k",
  },
];
</script>
