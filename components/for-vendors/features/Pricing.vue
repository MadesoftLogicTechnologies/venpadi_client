<template>
  <section id="pricing" class="bg-[#F7F5F0] pb-16 md2:pb-24 scroll-mt-28">
    <div class="max-w-[720px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
          Simple pricing
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight"
        >
          One number. No surprises.
        </h2>
      </div>

      <div
        class="mt-10 rounded-3xl bg-white border border-border shadow-[0_24px_60px_rgba(15,23,42,0.08)] p-8 sm:p-10 text-center"
      >
        <p
          class="text-[11px] font-bold tracking-[0.14em] uppercase text-bodytext2"
        >
          Host fee on bookings
        </p>
        <!-- The live host fee (rates.hostFeeBps from GET /public/stats). Until it
             loads the slot stays empty — a literal here once said 5% while the
             fee was 9%. -->
        <p
          class="mt-4 min-h-[1em] text-6xl sm:text-7xl font-extrabold tracking-tight bg-brand-gradient-soft bg-clip-text text-transparent"
        >
          {{ hostFee || "\u00a0" }}
        </p>
        <p class="mt-2 text-base font-semibold text-header">
          of the hire on bookings paid through Venpadi.
        </p>
        <p class="mt-4 text-sm text-bodytext leading-relaxed">
          Deducted from your payout (VAT applies to the fee) · Free to list · No setup
          fee · Bookings you record yourself carry no fee · Paid plans and boosts for
          extra visibility are optional.
        </p>
        <NuxtLink
          to="/auth/signup/venue"
          class="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
        >
          Claim Your Free Venue Page
        </NuxtLink>
      </div>

      <div class="mt-8 grid sm:grid-cols-3 gap-5 text-center sm:text-left">
        <div v-for="item in perks" :key="item.title" class="flex sm:block gap-3">
          <div
            class="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mx-auto sm:mx-0"
          >
            <i :class="['pi text-xs', item.icon]"></i>
          </div>
          <div>
            <p class="mt-0 sm:mt-3 text-sm font-extrabold text-header">{{ item.title }}</p>
            <p class="mt-1 text-xs text-bodytext leading-relaxed">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { rates } = usePublicStats();
const hostFee = computed(() => hostFeeLabel(rates.value));

const perks = computed(() => [
  {
    title: "Free to list",
    body: "Showcase every hall and garden without paying a dime upfront.",
    icon: "pi-building",
  },
  {
    title: "Free to manage",
    body: "Calendar, bookings, messaging and payouts come with the free plan.",
    icon: "pi-cog",
  },
  {
    title: "Pay when paid",
    body: `The ${hostFee.value ? `${hostFee.value} ` : ""}host fee is taken from your payout — nothing is charged up front.`,
    icon: "pi-wallet",
  },
]);
</script>
