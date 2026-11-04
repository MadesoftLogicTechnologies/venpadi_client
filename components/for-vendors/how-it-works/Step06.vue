<template>
  <section id="step-06" class="bg-[#0B0F14] py-14 md2:py-20 text-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-center">
        <div
          class="order-2 md2:order-1 rounded-[1.5rem] border border-white/10 bg-[#141A22] p-4 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        >
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-extrabold">Client inbox</p>
            <span class="text-[11px] font-semibold text-primary">3 new</span>
          </div>

          <div class="space-y-2.5 mb-4">
            <div
              v-for="row in inbox"
              :key="row.name"
              class="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 flex items-center justify-between gap-3"
            >
              <div>
                <p class="text-sm font-semibold">{{ row.name }}</p>
                <p class="text-[11px] text-white/45">{{ row.meta }}</p>
              </div>
              <span
                class="shrink-0 text-[10px] font-bold px-2 py-1 rounded-full"
                :class="row.statusClass"
              >
                {{ row.status }}
              </span>
            </div>
          </div>

          <div class="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <p class="text-[11px] font-semibold text-white/50 mb-2">Kate Williams</p>
            <p class="text-sm text-white/85 leading-relaxed">
              Hi — looking at your ballroom for a 280-guest wedding on Nov 22. Can you
              share weekend packages?
            </p>
            <div class="mt-3 flex gap-2">
              <span
                class="px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-semibold"
              >
                Reply
              </span>
              <span
                class="px-3 py-1.5 rounded-full border border-white/20 text-white/80 text-[11px] font-semibold"
              >
                Quote
              </span>
            </div>
          </div>
        </div>

        <div class="order-1 md2:order-2 relative">
          <span
            class="pointer-events-none absolute -right-2 -top-8 text-[7rem] sm:text-[9rem] font-extrabold leading-none text-white/[0.06] select-none"
          >
            06
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Enquiries
          </span>
          <h2
            class="relative mt-4 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight"
          >
            The enquiries arrive.
            <span class="text-primary">You stay in control.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-white/65 leading-relaxed max-w-md">
            No endless spam. Every request includes verified guest counts, date fit,
            required services, and a clear event description — so you only work real leads.
          </p>

          <ol class="relative mt-6 space-y-4">
            <li v-for="(item, i) in points" :key="item.title" class="flex items-start gap-3">
              <span
                class="w-7 h-7 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center shrink-0"
              >
                {{ i + 1 }}
              </span>
              <div>
                <p class="text-sm font-bold">{{ item.title }}</p>
                <p class="mt-0.5 text-xs sm:text-sm text-white/55 leading-relaxed">
                  {{ item.text }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const inbox = [
  {
    name: "Adaeze Okonkwo",
    meta: "Wedding · 280 guests · Nov 22",
    status: "Deposit paid",
    statusClass: "bg-emerald-500/20 text-emerald-300",
  },
  {
    name: "Tunde Bello",
    meta: "Corporate offsite · 90 guests",
    status: "Pending enquiry",
    statusClass: "bg-amber-500/20 text-amber-300",
  },
  {
    name: "Chioma Eze",
    meta: "Product launch · Terrace",
    status: "Confirmed",
    statusClass: "bg-primary/25 text-primary",
  },
];

const points = [
  {
    title: "Pre-vetted enquiry filtering",
    text: "Focus on leads that fit your capacity, dates, and event types.",
  },
  {
    title: "Instant messaging & custom quotes",
    text: "Chat in-portal to finalize details, pricing, and extras in one place.",
  },
  {
    title: "Single-click instant bookings",
    text: "Accept confirmed leads in one tap — documentation stays organized.",
  },
];
</script>
