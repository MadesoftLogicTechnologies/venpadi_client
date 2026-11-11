<template>
  <section class="bg-[#FFF5F0] py-14 md2:py-20">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
          Terms in Brief: The 8 Non-Negotiables
        </h2>
        <p class="mt-3 text-sm text-bodytext leading-relaxed">
          These summarise the core commercial relationship. The full document below is the
          binding agreement.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <article
          v-for="item in items"
          :key="item.num"
          class="rounded-2xl bg-white border border-border/70 p-5 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
        >
          <p class="text-[11px] font-bold tracking-[0.12em] text-primary mb-2">
            {{ item.num }}
          </p>
          <h3 class="text-sm font-bold text-header leading-snug">{{ item.title }}</h3>
          <p class="mt-2 text-xs text-bodytext leading-relaxed">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    num: "01",
    title: "Legitimate Venue Authority",
    body: "You must have legal rights to list and take bookings for the property.",
  },
  {
    num: "02",
    title: "Listing Fidelity",
    body: "Photos, amenities, capacity, and pricing must stay accurate and current.",
  },
  {
    num: "03",
    title: "Binding Bookings",
    body: "Dates confirmed and paid on Venpadi form a binding commercial contract.",
  },
  {
    num: "04",
    title: "Protected Payouts",
    body: "Guest funds are held in escrow and released on the published payout schedule.",
  },
  {
    num: "05",
    title: "Published Platform Fee",
    body: "A published fee on successful bookings — no hidden monthly retainers.",
  },
  {
    num: "06",
    title: "Host Cancellation Reserve",
    body: "Host-initiated cancellations carry penalties that protect guest trust.",
  },
  {
    num: "07",
    title: "Structured Mediation",
    body: "A staged dispute process applies before litigation or external arbitration.",
  },
  {
    num: "08",
    title: "Nigerian Jurisdiction",
    body: "Governed by Nigerian law, with disputes seated in the High Court of Lagos State.",
  },
];
</script>
