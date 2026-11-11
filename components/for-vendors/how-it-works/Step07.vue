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
        No more chasing balances after the event. Planners pay through Venpadi into
        escrow, and your earnings are paid out to your bank account.
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
          <p class="text-sm font-extrabold text-header">Escrow Protection</p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            Payments are held by Venpadi until after the event, and cancellations follow
            the cancellation policy the planner agreed to when booking.
          </p>
        </div>
        <div class="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <span
            class="inline-flex w-9 h-9 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3"
          >
            <i class="pi pi-building text-sm"></i>
          </span>
          <p class="text-sm font-extrabold text-header">Payment &amp; Payout Channels</p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            Planners pay by card or bank transfer through
            <span class="font-semibold text-header">Paystack;</span>
            payouts go to your Nigerian bank account in Naira.
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
    status: "Deposit in escrow",
    statusClass: "text-primary",
    text: "The planner pays the deposit through Venpadi and it is held in escrow.",
  },
  {
    title: "Event Approaches",
    status: "Balance due",
    statusClass: "text-header",
    text: "The planner is invoiced for the balance and pays it through Venpadi before the event.",
  },
  {
    title: "Event Happens",
    status: "Booking completed",
    statusClass: "text-emerald-600",
    text: "The event takes place; refundable caution deposits are settled afterwards.",
  },
  {
    title: "You're Paid",
    status: "After 48-hour window",
    statusClass: "text-primary",
    text: "Once the 48-hour window after completion passes, the funds are available for payout to your bank.",
  },
];

const channels = ["Card payments", "Bank transfer", "Payout to Nigerian banks"];
</script>
