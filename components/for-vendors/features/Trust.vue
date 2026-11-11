<template>
  <section id="trust" class="bg-[#0B0F14] text-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        07 — Trust & safety
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight max-w-3xl"
      >
        The money is held. The date is locked. The deposit is protected.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl">
        Running an event venue carries real property risks. Venpadi is built with a
        safety net — verified hosts, escrowed payments and refundable caution deposits.
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

    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: "Escrowed payments",
    body: "Client payments are held by Venpadi and released to you after the event and its 48-hour dispute window.",
    icon: "pi-building",
  },
  {
    title: "Caution deposits & claims",
    body: "Hold a refundable caution deposit; after the event, claim against it for damage and the client can accept or contest.",
    icon: "pi-shield",
  },
  {
    title: "Host verification",
    body: "Identity, business registration (CAC) and proof of address are checked before a venue shows as verified.",
    icon: "pi-verified",
  },
];
</script>
