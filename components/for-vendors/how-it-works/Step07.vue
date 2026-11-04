<template>
  <section id="step-07" class="bg-[#F7F5F2] py-14 md2:py-20">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
      >
        Payment
      </span>
      <h2
        class="mt-4 text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold text-header tracking-tight leading-tight"
      >
        Your event runs. Your money moves.
        <span class="text-primary">Zero chasing.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl mx-auto">
        Eliminate post-event invoice delays. Venpadi manages the financial side so
        settlements land in your designated bank account — automatically.
      </p>

      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="(step, i) in flow"
          :key="step.title"
          class="rounded-2xl border bg-white p-4 text-left"
          :class="i === 2 ? 'border-primary shadow-[0_0_0_1px_rgba(255,77,23,0.25)]' : 'border-border'"
        >
          <p class="text-[11px] font-bold text-primary mb-1">
            {{ String(i + 1).padStart(2, "0") }}
          </p>
          <p class="text-sm font-extrabold text-header">{{ step.title }}</p>
          <p class="mt-1 text-xs text-bodytext">{{ step.text }}</p>
        </div>
      </div>

      <div class="mt-8 grid sm:grid-cols-2 gap-4 text-left">
        <div class="rounded-2xl border border-border bg-white p-5">
          <p class="text-sm font-extrabold text-header">Automated invoice payout</p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            Every Venpadi transaction generates a clean, automated invoice trail for your
            books — no spreadsheet scramble after the event.
          </p>
        </div>
        <div class="rounded-2xl border border-border bg-white p-5">
          <p class="text-sm font-extrabold text-header">Settlement partners</p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            Funds settle via trusted payment rails. Withdraw to your nominated Nigerian
            bank account once events complete successfully.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="p in ['Visa', 'Mastercard', 'Stripe', 'Paystack']"
              :key="p"
              class="px-2.5 py-1 rounded-full bg-greybg text-[11px] font-semibold text-header"
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
  { title: "Booking confirmed", text: "Money held securely." },
  { title: "Event approaches", text: "Finalize details." },
  { title: "Event held", text: "Your money moves." },
  { title: "Funds payout", text: "Cash received." },
];
</script>
