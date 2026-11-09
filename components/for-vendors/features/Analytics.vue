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
          Transform occupancy data into future profitability. Identify dead dates and
          plug revenue leaks instantly.
        </p>
      </div>

      <div class="mt-10 grid md2:grid-cols-2 gap-6">
        <div class="rounded-2xl border border-border bg-[#F7F8FA] p-5 sm:p-6">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs text-bodytext2">90-day gross revenue</p>
              <p class="mt-1 text-2xl font-extrabold text-header">₦48.2M</p>
            </div>
            <span class="text-xs font-bold text-emerald-600">+22% vs previous Q</span>
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
          <p class="text-sm font-bold text-header mb-4">Channel attribution</p>
          <ul class="space-y-3">
            <li v-for="ch in channels" :key="ch.label">
              <div class="flex justify-between text-sm mb-1.5">
                <span class="text-bodytext">{{ ch.label }}</span>
                <span class="font-bold text-header">{{ ch.pct }}%</span>
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

      <div class="mt-6 grid sm:grid-cols-2 md2:grid-cols-5 gap-4">
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

const channels = [
  { label: "Venpadi marketplace search", pct: 54 },
  { label: "Direct venue link / social bio", pct: 24 },
  { label: "Google search index", pct: 12 },
  { label: "Vendor / assistant referrals", pct: 10 },
];

const features = [
  {
    title: "Source attribution",
    body: "Identify where high-budget hosts and planners discover you.",
    icon: "pi-compass",
  },
  {
    title: "Space performance",
    body: "Compare yield per square meter across halls and gardens.",
    icon: "pi-chart-line",
  },
  {
    title: "Demand heatmap",
    body: "Visual capacity heatmap identifying pricing sweet spots.",
    icon: "pi-map",
  },
  {
    title: "Revenue forecast",
    body: "Predict forward-year earnings from collected deposits.",
    icon: "pi-calendar",
  },
  {
    title: "Client lifetime value",
    body: "Track repeat corporate bookings and executive retainers.",
    icon: "pi-star",
  },
];
</script>
