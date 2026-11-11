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

      <!-- grid-cols-1 + min-w-0: a grid item's min width is its content, so the
           truncated (nowrap) titles below widened the page to 408px at 375px. -->
      <div class="mt-8 grid grid-cols-1 md2:grid-cols-2 gap-6">
        <div class="min-w-0 rounded-2xl border border-border bg-white p-5 sm:p-6">
          <!-- An illustration: example bookings, no invented amounts or real company names. -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <p class="text-sm font-bold text-header">Active bookings queue</p>
            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-greybg text-bodytext">Example</span>
          </div>
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
// The booking states the API actually moves through (API DECISIONS §3).
const stages = [
  { title: "Request", sub: "Date held while you review" },
  { title: "Approved", sub: "Client has 48h to pay" },
  { title: "Confirmed", sub: "First payment received" },
  { title: "Balance", sub: "Due before the event" },
  { title: "Completed", sub: "Event has ended" },
  { title: "Paid out", sub: "After the 48h dispute window" },
];

const bookings = [
  {
    title: "Kemi & Tunde Wedding Reception",
    space: "The Grand Hall",
    status: "Confirmed",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Quarterly Strategy Offsite",
    space: "Executive Boardroom",
    status: "Balance due",
    badgeClass: "bg-sky-50 text-sky-700",
  },
  {
    title: "Adora’s 30th Birthday Soirée",
    space: "Sunset Rooftop",
    status: "Approved",
    badgeClass: "bg-amber-50 text-amber-700",
  },
];

const features = [
  {
    title: "One inbox for requests",
    body: "Booking requests and general enquiries arrive together, each with its dates and guest count.",
    icon: "pi-inbox",
  },
  {
    title: "Hold auto-expiry",
    body: "A request holds the date while you decide; an approved booking left unpaid expires and the date unlocks.",
    icon: "pi-clock",
  },
  {
    title: "Custom booking add-ons",
    body: "Attach drinks packages, sound systems, or refundable caution deposits to the booking's invoice.",
    icon: "pi-plus-circle",
  },
  {
    title: "Payment reminders",
    body: "Clients get email and in-app reminders before their balance is due.",
    icon: "pi-bell",
  },
  {
    title: "Cancellation policy enforcement",
    body: "Choose a flexible, moderate or strict policy; refunds on cancellation are calculated from it.",
    icon: "pi-ban",
  },
];
</script>
