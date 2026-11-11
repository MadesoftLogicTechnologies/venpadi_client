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
            End the awkwardness of manual bank transfer verification and chasing
            balances. Clients pay by card through Paystack, the money is held in escrow,
            and it is released to you once the event is done.
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
          <!-- An illustration of the payouts screen: no invented balances, and the
               "button" is a picture of one, not a control. -->
          <div class="flex items-center justify-between gap-3">
            <p class="text-[11px] font-bold tracking-wider uppercase text-white/40">
              Available for payout
            </p>
            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-white/10 text-white/60">Example</span>
          </div>
          <div class="mt-2 flex items-end justify-between gap-3">
            <span class="block h-8 w-44 rounded-md bg-white/15" aria-hidden="true"></span>
            <span class="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold" aria-hidden="true">
              Request payout
            </span>
          </div>

          <div class="mt-6">
            <div class="flex justify-between text-xs text-white/45 mb-2">
              <span>In the 48h dispute window</span>
              <span class="block h-3 w-16 rounded bg-white/15" aria-hidden="true"></span>
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
              <span class="font-bold text-emerald-400">{{ tx.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Paystack is the one live gateway (API DECISIONS §5); these are the cards it takes.
const rails = ["Paystack", "Mastercard", "Visa", "Verve"];

const features = [
  {
    title: "Automated collection",
    body: "The first payment is due within 48 hours of approval; the balance is due 30 days before the event.",
    icon: "pi-sync",
  },
  {
    title: "Escrow protection",
    body: "Client payments are held until the event is completed and the 48-hour dispute window has passed.",
    icon: "pi-lock",
  },
  {
    title: "Payouts to your bank",
    body: "Request a payout of your available balance to your verified bank account.",
    icon: "pi-send",
  },
  {
    title: "Clear invoices",
    body: "Every invoice shows the hire, add-ons, fees and VAT line by line.",
    icon: "pi-file",
  },
];

const txs = [
  { label: "Wedding reception — deposit", status: "Received" },
  { label: "Strategy offsite — balance", status: "Received" },
];
</script>
