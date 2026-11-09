<template>
  <section id="bookings" class="bg-[#F7F5F0] py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="max-w-2xl">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-emerald-600">
          02 — Bookings
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight"
        >
          Every booking. Every stage. Never lost.
        </h2>
        <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
          Move away from chaotic notes and double bookings. Track events seamlessly
          across their natural timeline.
        </p>
      </div>

      <div class="mt-10 overflow-x-auto pb-2">
        <ol class="flex min-w-[720px] gap-2">
          <li
            v-for="(stage, i) in stages"
            :key="stage.title"
            class="flex-1 rounded-xl border border-border bg-white px-3 py-4 text-center"
          >
            <p class="text-[10px] font-bold tracking-wider uppercase text-bodytext2">
              Stage {{ i + 1 }}
            </p>
            <p class="mt-1 text-sm font-extrabold text-header">{{ stage.title }}</p>
            <p class="mt-1 text-[11px] text-bodytext">{{ stage.sub }}</p>
          </li>
        </ol>
      </div>

      <div class="mt-8 grid md2:grid-cols-2 gap-6">
        <div class="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <p class="text-sm font-bold text-header mb-4">Active bookings queue</p>
          <ul class="space-y-3">
            <li
              v-for="booking in bookings"
              :key="booking.title"
              class="rounded-xl border border-border px-4 py-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-sm font-bold text-header truncate">{{ booking.title }}</p>
                  <p class="mt-0.5 text-xs text-bodytext">{{ booking.space }}</p>
                </div>
                <span
                  class="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full shrink-0"
                  :class="booking.badgeClass"
                >
                  {{ booking.status }}
                </span>
              </div>
              <p class="mt-2 text-sm font-extrabold text-header">{{ booking.amount }}</p>
            </li>
          </ul>
        </div>

        <ul class="space-y-4">
          <li v-for="item in features" :key="item.title" class="flex gap-3">
            <span
              class="mt-0.5 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"
            >
              <i :class="['pi text-xs', item.icon]"></i>
            </span>
            <div>
              <p class="text-sm font-bold text-header">{{ item.title }}</p>
              <p class="mt-1 text-sm text-bodytext leading-relaxed">{{ item.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const stages = [
  { title: "Enquiry", sub: "Lead captured" },
  { title: "Tentative hold", sub: "48-hr block applied" },
  { title: "Deposit paid", sub: "Slot secured" },
  { title: "Confirmed", sub: "Full details collected" },
  { title: "In progress", sub: "Event day active" },
  { title: "Completed", sub: "Funds released" },
];

const bookings = [
  {
    title: "Kemi & Tunde Wedding Reception",
    space: "The Grand Hall",
    status: "Confirmed",
    amount: "₦1,250,000",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Zenith Bank Q4 Strategy Conf",
    space: "Executive Boardroom",
    status: "Deposit paid",
    amount: "₦340,000",
    badgeClass: "bg-sky-50 text-sky-700",
  },
  {
    title: "Adora’s 30th Birthday Soirée",
    space: "Sunset Rooftop",
    status: "Tentative hold",
    amount: "₦180,000",
    badgeClass: "bg-amber-50 text-amber-700",
  },
];

const features = [
  {
    title: "Smart sorting inbox",
    body: "Filters urgent date requests automatically from general inquiries.",
    icon: "pi-inbox",
  },
  {
    title: "Tentative hold auto-expiry",
    body: "Set 24, 48, or 72-hour limits. If no payment is made, the date unlocks.",
    icon: "pi-clock",
  },
  {
    title: "Custom booking add-ons",
    body: "Attach drinks packages, sound systems, or cleaning deposits inside the invoice.",
    icon: "pi-plus-circle",
  },
  {
    title: "Automated deadline reminders",
    body: "Gentle WhatsApp and SMS notifications sent for final balance payments.",
    icon: "pi-bell",
  },
  {
    title: "Cancellation policy enforcement",
    body: "Select non-refundable windows to prevent revenue loss from last-minute cancellations.",
    icon: "pi-ban",
  },
];
</script>
