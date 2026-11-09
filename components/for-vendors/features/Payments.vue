<template>
  <section id="payments" class="bg-[#0B0F14] text-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-start">
        <div>
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            03 — Payments
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold tracking-tight leading-tight"
          >
            Your money. Not stuck in transit.
          </h2>
          <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
            End the awkwardness of manual bank transfer verification and delayed
            payouts. Collect deposits instantly across Africa and global markets with
            integrated escrow settlement.
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="rail in rails"
              :key="rail"
              class="px-2.5 py-1.5 rounded-md border border-white/15 bg-white/5 text-[11px] font-semibold text-white/65"
            >
              {{ rail }}
            </span>
          </div>

          <div class="mt-8 grid sm:grid-cols-2 gap-5">
            <div v-for="item in features" :key="item.title" class="flex gap-3">
              <span
                class="mt-0.5 w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0"
              >
                <i :class="['pi text-xs', item.icon]"></i>
              </span>
              <div>
                <p class="text-sm font-bold">{{ item.title }}</p>
                <p class="mt-1 text-xs text-white/50 leading-relaxed">{{ item.body }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <p class="text-[11px] font-bold tracking-wider uppercase text-white/40">
            Available for payout
          </p>
          <div class="mt-2 flex items-end justify-between gap-3">
            <p class="text-3xl font-extrabold tracking-tight">₦12,480,000</p>
            <button
              type="button"
              class="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold"
            >
              Initiate transfer
            </button>
          </div>

          <div class="mt-6">
            <div class="flex justify-between text-xs text-white/45 mb-2">
              <span>Pending balance</span>
              <span>₦4,240,000</span>
            </div>
            <div class="h-2 rounded-full bg-white/10 overflow-hidden">
              <div class="h-full w-[35%] rounded-full bg-primary"></div>
            </div>
          </div>

          <div class="mt-6 pt-5 border-t border-white/10 space-y-3">
            <p class="text-xs font-bold uppercase tracking-wider text-white/40">
              Recent transactions
            </p>
            <div
              v-for="tx in txs"
              :key="tx.label"
              class="flex items-center justify-between gap-3 text-sm"
            >
              <span class="text-white/70">{{ tx.label }}</span>
              <span class="font-bold text-emerald-400">{{ tx.amount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const rails = [
  "Stripe",
  "Paystack",
  "Flutterwave",
  "Bank transfer",
  "Airwallex",
  "BNPL",
  "USSD",
  "Mastercard",
  "Visa",
  "Verve",
];

const features = [
  {
    title: "Automated collection",
    body: "Take 50% upfront and schedule the balance 14 days before the event.",
    icon: "pi-sync",
  },
  {
    title: "Escrow protection",
    body: "Venue and client funds held securely until event check-in is approved.",
    icon: "pi-lock",
  },
  {
    title: "Multi-currency",
    body: "Accept USD, GBP, EUR, NGN, GHS, and KES with localized conversion.",
    icon: "pi-globe",
  },
  {
    title: "BNPL financing",
    body: "Hosts pay in installments while you still receive 100% upfront.",
    icon: "pi-credit-card",
  },
  {
    title: "Real-time payouts",
    body: "Direct settlements into merchant banks without unnecessary delays.",
    icon: "pi-send",
  },
  {
    title: "Tax-compliant invoices",
    body: "VAT and WHT compliant PDF receipts with custom stamps, instantly.",
    icon: "pi-file",
  },
];

const txs = [
  { label: "Kemi & Tunde deposit", amount: "+₦625,000" },
  { label: "Zenith Bank settlement", amount: "+₦340,000" },
];
</script>
