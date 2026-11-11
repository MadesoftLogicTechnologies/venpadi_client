<template>
  <section id="analytics" class="bg-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="max-w-2xl">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-sky-600">
          04 — Analytics
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight"
        >
          Know your venue as well as you know your best event.
        </h2>
        <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
          See what your bookings earn, which spaces and event types earn it, and which
          dates sit empty — all computed from your own bookings.
        </p>
      </div>

      <div class="mt-10 grid md2:grid-cols-2 gap-6">
        <div class="rounded-2xl border border-border bg-[#F7F8FA] p-5 sm:p-6">
          <!-- An illustration of the revenue chart: no invented totals or growth rates. -->
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-bold text-header">Monthly revenue</p>
            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-white text-bodytext">Example</span>
          </div>
          <div class="mt-6 flex items-end gap-2 h-36">
            <div
              v-for="(bar, i) in bars"
              :key="i"
              class="flex-1 rounded-t-md"
              :style="{ height: bar + '%', background: barColor(i) }"
            ></div>
          </div>
        </div>

        <div class="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <div class="flex items-center justify-between gap-3 mb-4">
            <p class="text-sm font-bold text-header">Revenue by source</p>
            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-greybg text-bodytext">Example</span>
          </div>
          <ul class="space-y-3">
            <li v-for="ch in channels" :key="ch.label">
              <div class="flex justify-between text-sm mb-1.5">
                <span class="text-bodytext">{{ ch.label }}</span>
              </div>
              <div class="h-2 rounded-full bg-greybg overflow-hidden">
                <div
                  class="h-full rounded-full bg-sky-500"
                  :style="{ width: ch.pct + '%' }"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <article
          v-for="item in features"
          :key="item.title"
          class="rounded-2xl border border-border bg-white p-4 sm:p-5"
        >
          <div
            class="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center"
          >
            <i :class="['pi text-xs', item.icon]"></i>
          </div>
          <h3 class="mt-3 text-sm font-extrabold text-header">{{ item.title }}</h3>
          <p class="mt-1.5 text-xs text-bodytext leading-relaxed">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const bars = [35, 48, 42, 55, 62, 58, 70, 66, 78, 74, 88, 92];

function barColor(i) {
  const t = i / (bars.length - 1);
  return `color-mix(in srgb, #38BDF8 ${Math.round((1 - t) * 100)}%, #FF4D17 ${Math.round(t * 100)}%)`;
}

// The sources the API reports (online = marketplace + proposals, direct =
// bookings you record). Bar widths are illustrative, not data.
const channels = [
  { label: "Marketplace bookings", pct: 60 },
  { label: "Proposals sent from enquiries", pct: 25 },
  { label: "Direct bookings you record", pct: 15 },
];

const features = [
  {
    title: "Revenue by source",
    body: "Marketplace and proposal bookings side by side with the bookings you record yourself.",
    icon: "pi-compass",
  },
  {
    title: "Space performance",
    body: "Revenue split by space, event type and booking duration.",
    icon: "pi-chart-line",
  },
  {
    title: "Occupancy",
    body: "See which days of each month every venue is booked — and which sit empty.",
    icon: "pi-calendar",
  },
  {
    title: "Client history",
    body: "Every client's bookings and spend with you in one record.",
    icon: "pi-star",
  },
];
</script>
