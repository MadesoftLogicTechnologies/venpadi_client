<template>
  <section class="bg-[#0B0F14] text-white py-16 md2:py-24">
    <div class="max-w-[860px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        What we believe
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight"
      >
        Our beliefs are not slogans. They are decisions.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl">
        When we design code, draft commercial agreements, or deploy customer support,
        these five non-negotiables steer every trade-off.
      </p>

      <div class="mt-10 space-y-4">
        <article
          v-for="(belief, i) in beliefs"
          :key="belief.title"
          class="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-7 sm:py-6"
        >
          <div class="flex items-start justify-between gap-4">
            <p class="text-[11px] font-bold tracking-[0.12em] uppercase text-primary">
              Belief {{ String(i + 1).padStart(2, "0") }}
            </p>
            <p class="text-[11px] font-semibold text-white/35 tabular-nums">
              {{ String(i + 1).padStart(2, "0") }} / 05
            </p>
          </div>
          <h3 class="mt-3 text-lg sm:text-xl font-extrabold tracking-tight">
            {{ belief.title }}
          </h3>
          <p class="mt-2 text-sm text-white/55 leading-relaxed">
            {{ belief.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const beliefs = [
  {
    title: "Venue owners are the product.",
    body: "Aggregators commoditize spaces behind generic templates. We engineer Venpadi to amplify your brand, pricing power, and enterprise software — so guests book you, not a marketplace logo.",
  },
  {
    title: "Opacity is the enemy of a good deal.",
    body: "Fees, payout timing, and commissions stay visible for guests and proprietors alike. Surprises erode trust faster than any marketing page can rebuild it.",
  },
  {
    title: "Speed is a form of respect.",
    body: "Sub-second calendar syncs, mobile push alerts, and direct bank rails honor the tempo of real-world celebrations — not the cadence of a ticket queue.",
  },
  {
    title: "Global ambition, local intelligence.",
    body: "A worldwide hospitality OS still has to reflect fuel surcharges, multi-tier wedding timetables, and local bank rails in Lagos, Nairobi, London, and Dubai.",
  },
  {
    title: "Trust is the product nobody lists on their features page.",
    body: "Dedicated Venue Success Managers, biometric host verification, and secure automated escrow are how we earn the right to run your bookings.",
  },
];
</script>
