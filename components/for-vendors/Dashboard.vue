<template>
  <section class="bg-[#121212] text-white py-16 md2:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-[0.95fr_1.05fr] gap-12 md2:gap-14 items-center">
        <div>
          <span
            class="inline-flex items-center px-3 py-1.5 rounded-full border border-primary/50 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Your command centre
          </span>
          <h2
            class="mt-4 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight"
          >
            Everything you need. One clean dashboard.
          </h2>
          <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
            Ditch fragmented WhatsApp messages, double-booked spreadsheets, and manual
            wire checks. Manage availability, issue contracts, and track multi-space
            yields with surgical precision.
          </p>

          <ul class="mt-8 space-y-4">
            <li v-for="item in features" :key="item.title" class="flex gap-3">
              <span
                class="mt-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0"
              >
                <i class="pi pi-check text-[10px] font-bold"></i>
              </span>
              <div>
                <p class="text-sm font-bold">{{ item.title }}</p>
                <p class="mt-1 text-sm text-white/50 leading-relaxed">{{ item.body }}</p>
              </div>
            </li>
          </ul>

          <a
            href="mailto:hello@venpadi.com"
            class="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-primary"
          >
            See a live demo
            <i class="pi pi-arrow-right text-xs"></i>
          </a>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-[#1A1A1A] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
            <span class="ml-3 text-[11px] text-white/40 truncate">
              dashboard.venpadi.com/venues/faith-grandeur
            </span>
            <span
              class="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Live
            </span>
          </div>

          <div class="grid md2:grid-cols-[170px_1fr]">
            <aside class="hidden md2:block border-r border-white/10 p-4 space-y-1">
              <div
                v-for="item in sidebar"
                :key="item"
                class="px-3 py-2 rounded-lg text-sm"
                :class="
                  item === 'Overview'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/45'
                "
              >
                {{ item }}
              </div>
            </aside>

            <div class="p-4 sm:p-5">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p class="text-base font-bold">Good afternoon, Faith 👋</p>
                  <p class="mt-1 text-xs text-white/45">
                    Grandeur Hall &amp; Glass Garden are 88% reserved this month
                  </p>
                </div>
                <button
                  type="button"
                  class="px-3.5 py-2 rounded-full bg-primary text-white text-xs font-semibold"
                >
                  + Add New Space
                </button>
              </div>

              <div class="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                <p class="text-[10px] font-bold tracking-wider uppercase text-white/40">
                  This month earnings
                </p>
                <div class="mt-1 flex items-end gap-3">
                  <p class="text-2xl font-extrabold tracking-tight">₦4,820,000</p>
                  <span class="text-xs font-semibold text-emerald-400 mb-1"
                    >+23% vs last month</span
                  >
                </div>
                <svg viewBox="0 0 280 64" class="mt-3 w-full h-14 text-primary">
                  <path
                    d="M0 50 C30 48 50 40 70 36 C100 30 120 44 150 28 C180 12 210 20 240 10 C255 6 270 12 280 8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  />
                </svg>
                <div class="flex justify-between text-[9px] text-white/30 uppercase tracking-wider">
                  <span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span>
                </div>
              </div>

              <div class="mt-4 space-y-2.5">
                <div
                  v-for="b in bookings"
                  :key="b.title"
                  class="rounded-xl border border-white/10 px-3.5 py-3 flex items-start justify-between gap-3"
                >
                  <div class="min-w-0">
                    <p class="text-sm font-bold truncate">{{ b.title }}</p>
                    <p class="mt-0.5 text-[11px] text-white/40">{{ b.meta }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-sm font-extrabold">{{ b.amount }}</p>
                    <p class="mt-0.5 text-[10px] font-semibold" :class="b.statusClass">
                      {{ b.status }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-2.5">
        <span
          v-for="tag in tags"
          :key="tag"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/65"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: "Real-time Booking Calendar",
    body: "Sync seamlessly across multiple event halls, day-blocks, and hourly holds.",
  },
  {
    title: "Earnings & Multi-Currency Payouts",
    body: "Direct local settlements via Paystack, Flutterwave, or Stripe in 40+ currencies.",
  },
  {
    title: "Direct Client Messaging & Contract Signing",
    body: "Pre-screen guest capacities, verify company identities, and enforce house policies.",
  },
  {
    title: "Dynamic Venue Analytics",
    body: "Monitor page impressions, corporate enquiry conversion rates, and revenue per sq meter.",
  },
];

const sidebar = ["Overview", "Calendar", "Enquiries", "My Venues", "Payouts", "Settings"];

const bookings = [
  {
    title: "Corporate Gala — Grandeur Hall",
    meta: "Oct 28 · 350 Guests · ID Verified",
    amount: "₦1,200,000",
    status: "Confirmed & Escrowed",
    statusClass: "text-emerald-400",
  },
  {
    title: "Wedding Reception — Garden Pavilion",
    meta: "Nov 3 · 200 Guests · Deposit Paid",
    amount: "₦880,000",
    status: "Hold Pending Terms",
    statusClass: "text-amber-400",
  },
];

const tags = [
  "⚡ Real-time updates",
  "📱 Mobile-ready management",
  "🏢 Multi-venue support",
  "🔒 Secure Escrow release",
];
</script>
