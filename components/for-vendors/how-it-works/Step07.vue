<template>
  <section id="step-7" class="scroll-mt-36 bg-[#F7F5F2] py-16 md:py-24">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
      >
        Step 7 of 7
      </span>
      <h2
        class="mt-5 text-2xl sm:text-3xl md2:text-[2.6rem] font-extrabold text-header tracking-tight leading-tight"
      >
        Your event runs. Your money moves.
        <span class="text-transparent bg-clip-text bg-brand-gradient-soft">Zero chasing.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl mx-auto">
        Eliminate post-event invoice delinquency. Venpadi manages institutional escrow
        deposits with automated settlements straight to your designated corporate accounts.
      </p>

      <div class="relative mt-12">
        <div
          class="hidden md2:block absolute top-[2.15rem] left-[12%] right-[12%] h-px bg-primary/30"
          aria-hidden="true"
        ></div>
        <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-3 sm:gap-4 relative">
          <div
            v-for="(step, i) in flow"
            :key="step.title"
            class="rounded-2xl border bg-white p-4 sm:p-5 text-left"
            :class="i === 2 ? 'border-primary shadow-[0_0_0_1px_rgba(255,77,23,0.2)]' : 'border-border'"
          >
            <span
              class="inline-flex w-8 h-8 rounded-full bg-primary text-white text-xs font-extrabold items-center justify-center"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <p class="mt-3 text-sm font-extrabold text-header">{{ step.title }}</p>
            <p
              class="mt-1 text-xs font-bold"
              :class="step.statusClass"
            >
              {{ step.status }}
            </p>
            <p class="mt-2 text-xs text-bodytext leading-relaxed">{{ step.text }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8 grid sm:grid-cols-2 gap-4 text-left">
        <div class="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <span
            class="inline-flex w-9 h-9 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3"
          >
            <i class="pi pi-shield text-sm"></i>
          </span>
          <p class="text-sm font-extrabold text-header">Institutional Escrow Protocol</p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            Every transaction is safeguarded by licensed Tier-1 fiduciary banking rails.
            Never suffer cancellations without receiving your contracted non-refundable
            forfeit payments.
          </p>
        </div>
        <div class="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <span
            class="inline-flex w-9 h-9 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3"
          >
            <i class="pi pi-building text-sm"></i>
          </span>
          <p class="text-sm font-extrabold text-header">Global &amp; Local Settlement Channels</p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            Directly routed via
            <span class="font-semibold text-header">Paystack, Flutterwave, Stripe, Nigerian Banks,</span>
            and cross-border SWIFT in 40+ currencies.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="p in channels"
              :key="p"
              class="px-2.5 py-1 rounded-full border border-border text-[11px] font-semibold text-header"
            >
              {{ p }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const flow = [
  {
    title: "Booking Confirmed",
    status: "40%—50% Deposit",
    statusClass: "text-primary",
    text: "Secured immediately in protected escrow vault upon client agreement.",
  },
  {
    title: "Event Approaches",
    status: "T-minus 7 Days",
    statusClass: "text-header",
    text: "Remaining balance automatically debited from organizer without manual invoicing.",
  },
  {
    title: "You're Paid",
    status: "24hr Direct Payout",
    statusClass: "text-primary",
    text: "Direct net disbursement to local commercial banks or international treasury.",
  },
  {
    title: "Event Happens",
    status: "Hall Clearance",
    statusClass: "text-emerald-600",
    text: "Successful completion confirmed with caution deposit releases handled systematically.",
  },
];

const channels = ["NGN Bank Wire", "USD / EUR Wire", "MTN MoMo", "M-Pesa"];
</script>
