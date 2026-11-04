<template>
  <section id="step-04" class="bg-[#F7F5F2] py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-center">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-2 -top-8 text-[7rem] sm:text-[9rem] font-extrabold leading-none text-header/[0.05] select-none"
          >
            04
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide"
          >
            STEP 04
          </span>
          <h2
            class="relative mt-4 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
          >
            Your calendar. Your control.
            <span class="text-primary">No surprises.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
            Sync bidirectionally with Google Calendar so your venue stays accurate across
            channels — and double-bookings stay off the table while hosts see real-time
            availability 24/7.
          </p>

          <ul class="relative mt-6 space-y-4">
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
          class="rounded-[1.5rem] border border-border bg-white p-4 sm:p-5 shadow-[0_20px_50px_rgba(15,23,42,0.07)]"
        >
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-extrabold text-header">October 2025</p>
            <div class="flex gap-3 text-[10px] font-semibold">
              <span class="flex items-center gap-1 text-emerald-600"
                ><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Open</span
              >
              <span class="flex items-center gap-1 text-amber-600"
                ><span class="w-2 h-2 rounded-full bg-amber-400"></span> Pending</span
              >
              <span class="flex items-center gap-1 text-red-600"
                ><span class="w-2 h-2 rounded-full bg-red-500"></span> Blocked</span
              >
            </div>
          </div>

          <div class="grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold text-bodytext mb-1.5">
            <span v-for="d in days" :key="d">{{ d }}</span>
          </div>
          <div class="grid grid-cols-7 gap-1.5">
            <div
              v-for="(cell, i) in cells"
              :key="i"
              class="aspect-square rounded-lg flex items-center justify-center text-xs font-semibold"
              :class="cellClass(cell)"
            >
              {{ cell.n || "" }}
            </div>
          </div>

          <div
            class="mt-4 rounded-2xl bg-header text-white px-4 py-3 flex items-center justify-between gap-3"
          >
            <p class="text-xs leading-snug">
              Sync external calendars and never miss a beat.
            </p>
            <span class="shrink-0 text-[11px] font-bold text-primary">Book demo</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: "pi pi-sync",
    title: "Two-way auto-sync",
    text: "Always up to date — changes reflect across Venpadi and your connected calendars.",
  },
  {
    icon: "pi pi-sliders-h",
    title: "Custom booking preferences",
    text: "Decide when you’re available and how you want to manage incoming requests.",
  },
  {
    icon: "pi pi-users",
    title: "Internal partner scheduling",
    text: "Let your team view availability and block events without stepping on each other.",
  },
  {
    icon: "pi pi-clock",
    title: "Custom turnaround buffers",
    text: "Set time between bookings to prep the space for the next guest.",
  },
];

const days = ["S", "M", "T", "W", "T", "F", "S"];

const cells = [
  { n: null },
  { n: null },
  { n: 1, tone: "open" },
  { n: 2, tone: "open" },
  { n: 3, tone: "pending" },
  { n: 4, tone: "blocked" },
  { n: 5, tone: "open" },
  { n: 6, tone: "open" },
  { n: 7, tone: "blocked" },
  { n: 8, tone: "open" },
  { n: 9, tone: "pending" },
  { n: 10, tone: "open" },
  { n: 11, tone: "open" },
  { n: 12, tone: "blocked" },
  { n: 13, tone: "pending" },
  { n: 14, tone: "open" },
  { n: 15, tone: "open" },
  { n: 16, tone: "blocked" },
  { n: 17, tone: "open" },
  { n: 18, tone: "pending" },
  { n: 19, tone: "open" },
  { n: 20, tone: "open" },
  { n: 21, tone: "open" },
  { n: 22, tone: "blocked" },
  { n: 23, tone: "open" },
  { n: 24, tone: "pending" },
  { n: 25, tone: "open" },
  { n: 26, tone: "open" },
  { n: 27, tone: "blocked" },
  { n: 28, tone: "open" },
  { n: 29, tone: "open" },
  { n: 30, tone: "pending" },
  { n: 31, tone: "open" },
  { n: null },
  { n: null },
];

function cellClass(cell) {
  if (!cell.n) return "bg-transparent";
  if (cell.tone === "open") return "bg-emerald-50 text-emerald-700";
  if (cell.tone === "pending") return "bg-amber-50 text-amber-700";
  if (cell.tone === "blocked") return "bg-red-50 text-red-700";
  return "bg-greybg text-header";
}
</script>
