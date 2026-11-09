<template>
  <section id="trust" class="bg-[#0B0F14] text-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        07 — Trust & safety
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight max-w-3xl"
      >
        The money is safe. The booking is protected. The dispute is mediated.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl">
        Running an event venue carries real property risks. Venpadi is built with an
        institutional safety net — every host authenticated, every deposit escrowed.
      </p>

      <div class="mt-10 grid md2:grid-cols-3 gap-4">
        <article
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <div
            class="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"
          >
            <i :class="['pi text-sm', card.icon]"></i>
          </div>
          <h3 class="mt-4 text-lg font-extrabold">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-white/55 leading-relaxed">{{ card.body }}</p>
        </article>
      </div>

      <blockquote
        class="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7"
      >
        <p class="text-base sm:text-lg font-semibold leading-relaxed">
          “A corporate client’s sound contractor damaged our mahogany acoustic paneling
          during takedown. Within 48 hours Venpadi’s dispute team inspected our
          pre-event walk-through photos and released the ₦450,000 caution deposit
          straight into our account.”
        </p>
        <div class="mt-5 flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold"
          >
            AO
          </div>
          <div>
            <p class="text-sm font-bold">Amaka Osei</p>
            <p class="text-xs text-white/45">
              Managing Director, The Landmark — Abuja
            </p>
          </div>
        </div>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: "Escrow guarantee",
    body: "Funds held in segregated statutory escrow accounts — no manual revokes, no silent holds.",
    icon: "pi-building",
  },
  {
    title: "72-hour dispute SLA",
    body: "Dedicated asset managers review photos and proof of damage against a hard response clock.",
    icon: "pi-stopwatch",
  },
  {
    title: "Biometric & CAC verification",
    body: "Corporate registration (CAC/RC) and biometric identity checks before high-value transactions.",
    icon: "pi-verified",
  },
];
</script>
