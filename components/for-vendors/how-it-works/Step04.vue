<template>
  <section id="step-4" class="scroll-mt-36 bg-[#F7F5F2] py-16 md:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-1 -top-10 text-[8rem] sm:text-[10rem] font-extrabold leading-none text-primary/[0.08] select-none"
          >
            04
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Step 4 of 7
          </span>
          <h2
            class="relative mt-5 text-2xl sm:text-3xl md2:text-[2.45rem] font-extrabold text-header tracking-tight leading-[1.15]"
          >
            Your calendar. Your control.
            <span class="text-primary">No surprises.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
            Sync bidirectionally with Google Calendar and iCal so your venue stays accurate
            across channels — double-bookings stay off the table while hosts see real-time
            availability 24/7.
          </p>

          <ul class="relative mt-7 space-y-4">
            <li v-for="item in features" :key="item.title" class="flex items-start gap-3">
              <span
                class="mt-0.5 w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"
              >
                <i :class="item.icon" class="text-xs"></i>
              </span>
              <div>
                <p class="text-sm font-bold text-header">{{ item.title }}</p>
                <p class="mt-0.5 text-xs sm:text-sm text-bodytext leading-relaxed">
                  {{ item.text }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="rounded-[1.35rem] border border-border bg-white p-4 sm:p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <span
                class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
              >
                <i class="pi pi-calendar text-sm"></i>
              </span>
              <p class="text-sm font-extrabold text-header">October 2025</p>
            </div>
            <div class="flex gap-1.5">
              <span
                class="w-7 h-7 rounded-lg border border-border text-bodytext flex items-center justify-center"
              >
                <i class="pi pi-chevron-left text-[10px]"></i>
              </span>
              <span
                class="w-7 h-7 rounded-lg border border-border text-bodytext flex items-center justify-center"
              >
                <i class="pi pi-chevron-right text-[10px]"></i>
              </span>
            </div>
          </div>

          <div
            class="grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold text-bodytext mb-1.5"
          >
            <span v-for="d in days" :key="d">{{ d }}</span>
          </div>
          <div class="grid grid-cols-7 gap-1.5">
            <div
              v-for="(cell, i) in cells"
              :key="i"
              class="aspect-[4/1] rounded-md flex items-center justify-center text-[11px] font-semibold border"
              :class="cellClass(cell)"
            >
              <span v-if="cell.today" class="text-[9px] font-bold">Today</span>
              <template v-else>{{ cell.n || "" }}</template>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold text-bodytext">
            <span class="inline-flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span> Confirmed
            </span>
            <span class="inline-flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-sm bg-amber-400"></span> 72h Hold
            </span>
            <span class="inline-flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-sm bg-red-400"></span> Blocked
            </span>
            <span class="inline-flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full border-2 border-primary"></span> Current Day
            </span>
          </div>

          <div
            class="mt-4 rounded-2xl bg-[#1A1F27] text-white px-4 py-3.5 flex flex-wrap items-center justify-between gap-3"
          >
            <p class="text-xs leading-snug flex items-center gap-2">
              <i class="pi pi-info-circle text-primary text-sm"></i>
              Click any calendar cell to toggle instant rates or block dates.
            </p>
            <span class="shrink-0 text-[11px] font-semibold underline underline-offset-2">
              Open Settings
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: "pi pi-ban",
    title: "Blackout Dates & Teardown Windows",
    text: "Block maintenance days and post-event reset windows so nothing slips through.",
  },
  {
    icon: "pi pi-clock",
    title: "Custom Advance Notice Rules",
    text: "Require lead time that matches your ops team — no last-minute chaos.",
  },
  {
    icon: "pi pi-hourglass",
    title: "Automatic 72-Hour Tentative Holds",
    text: "Give serious buyers breathing room without locking inventory forever.",
  },
  {
    icon: "pi pi-th-large",
    title: "Unified Multi-Space Schedule",
    text: "See every hall, terrace, and suite on one master calendar view.",
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mon-start October 2025: Wed=1
const cells = [
  { n: 29 },
  { n: 30 },
  { n: 1, tone: "booked" },
  { n: 2, tone: "booked" },
  { n: 3, tone: "hold" },
  { n: 4, tone: "booked" },
  { n: 5, tone: "blocked" },
  { n: 6 },
  { n: 7 },
  { n: 8 },
  { n: 9 },
  { n: 10, today: true },
  { n: 11, tone: "booked" },
  { n: 12, tone: "booked" },
  { n: 13 },
  { n: 14 },
  { n: 15, tone: "hold" },
  { n: 16 },
  { n: 17 },
  { n: 18, tone: "booked" },
  { n: 19, tone: "booked" },
  { n: 20 },
  { n: 21 },
  { n: 22 },
  { n: 23 },
  { n: 24 },
  { n: 25 },
  { n: 26 },
  { n: 27 },
  { n: 28 },
  { n: 29 },
  { n: 30 },
  { n: 31 },
  { n: 1 },
  { n: 2 },
];

function cellClass(cell) {
  if (cell.today) return "bg-white border-primary text-primary";
  if (cell.tone === "booked") return "bg-emerald-50 border-emerald-200 text-emerald-700";
  if (cell.tone === "hold") return "bg-amber-50 border-amber-200 text-amber-700";
  if (cell.tone === "blocked") return "bg-red-50 border-red-200 text-red-700";
  return "bg-transparent border-transparent text-bodytext";
}
</script>
