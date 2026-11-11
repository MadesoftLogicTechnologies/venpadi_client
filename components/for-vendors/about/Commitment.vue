<template>
  <section class="bg-white py-16 md2:py-24">
    <div class="max-w-[960px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        Our commitment
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
      >
        What we will always be true to.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl">
        No bait-and-switch pricing. No algorithm changes that bury your listing to
        force ad spend.
      </p>

      <div class="mt-10 grid sm:grid-cols-2 gap-8 md2:gap-10">
        <article v-for="item in commitments" :key="item.title">
          <p class="text-sm font-bold text-primary tabular-nums">{{ item.num }}</p>
          <h3 class="mt-2 text-lg font-extrabold text-header">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">{{ item.body }}</p>
        </article>
      </div>

      <div
        class="mt-12 pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <p
          class="text-xl sm:text-2xl font-extrabold text-header tracking-tight leading-snug flex-1"
        >
          “Built with you in mind. Kept honest by your trust.”
        </p>
        <p class="text-sm font-bold text-header shrink-0">— The Venpadi team</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const commitments = [
  {
    num: "01",
    title: "We will never charge you to list.",
    body: "Publishing your halls, gardens or suites costs nothing — our fee applies to completed bookings. Optional visibility campaigns are always priced up front.",
  },
  {
    num: "02",
    title: "We will always be transparent about fees.",
    body: "No surprise reconciliation deductibles or disguised handling penalties. What you see in the booking summary is what settles to your account.",
  },
  {
    num: "03",
    title: "We will be clear about when you get paid.",
    body: "Guest payments are held in escrow and become available for payout once the event is completed and the 48-hour window has passed — the timing is shown in your dashboard.",
  },
  {
    num: "04",
    title: "We will keep getting better at what matters to you.",
    body: "Engineering updates designed to make inquiries easier, prevent double-bookings, and protect damage deposits — measured against owner outcomes.",
  },
];
</script>
