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
        <div class="flex items-center gap-3 shrink-0">
          <div
            class="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold"
          >
            FI
          </div>
          <div>
            <p class="text-sm font-bold text-header">Faith Imade</p>
            <p class="text-xs text-bodytext">Founder & CEO</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const commitments = [
  {
    num: "01",
    title: "We will never charge you to list.",
    body: "Every physical venue owner can publish an unlimited number of halls, gardens, or suites without subscription fees or setup expenses — we earn only when you earn.",
  },
  {
    num: "02",
    title: "We will always be transparent about fees.",
    body: "No surprise reconciliation deductibles or disguised handling penalties. What you see in the booking summary is what settles to your account.",
  },
  {
    num: "03",
    title: "We will pay you on time, every time.",
    body: "Automated financial corridors settle funds within 24 hours of successful event check-in — so cash flow matches the tempo of your calendar.",
  },
  {
    num: "04",
    title: "We will keep getting better at what matters to you.",
    body: "Engineering updates designed to make inquiries easier, prevent double-bookings, and protect damage deposits — measured against owner outcomes.",
  },
];
</script>
