<template>
  <section class="bg-[#0B0F14] text-white py-14 md2:py-20">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        Got questions yet?
      </p>
      <h2 class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight">
        A real person is one click away.
      </h2>
      <p class="mt-3 text-sm sm:text-base text-white/55 max-w-2xl leading-relaxed">
        No automated loop bots. Connect directly with our venue specialists for listing
        strategy, payouts, or a live walkthrough of the owner dashboard.
      </p>

      <div class="mt-10 grid sm:grid-cols-3 gap-4">
        <article
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            :class="card.iconBg"
          >
            <i :class="['pi text-sm', card.icon]"></i>
          </div>
          <h3 class="text-base font-bold text-white">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-white/55 leading-relaxed flex-1">{{ card.body }}</p>
          <a
            :href="card.href"
            class="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-95"
            :class="card.btnClass"
          >
            {{ card.cta }}
          </a>
          <p class="mt-3 text-[11px] text-white/40 flex items-center gap-1.5">
            <span
              v-if="card.dot"
              class="w-1.5 h-1.5 rounded-full"
              :class="card.dot"
            ></span>
            <i v-else-if="card.statusIcon" :class="['pi text-[10px]', card.statusIcon]"></i>
            {{ card.status }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: "Ask a Question",
    body: "Send a quick question about listing, pricing or payouts and a venue specialist will reply.",
    cta: "Ask the Team",
    href: "mailto:owners@venpadi.com?subject=Question%20from%20a%20venue%20owner",
    btnClass: "bg-white text-header",
    icon: "pi-comments",
    iconBg: "bg-[#FF2D55]/15 text-[#FF2D55]",
    status: "We reply by email",
    statusIcon: "pi-envelope",
  },
  {
    title: "Email Support",
    body: "Send documents, RFPs, and multi-space onboarding questions.",
    cta: "owners@venpadi.com",
    href: "mailto:owners@venpadi.com",
    btnClass: "bg-white/10 text-white border border-white/15",
    icon: "pi-envelope",
    iconBg: "bg-white/10 text-white/80",
    status: "A person reads every email",
    statusIcon: "pi-user",
  },
  {
    title: "Book a Call",
    body: "Schedule a 1-on-1 walkthrough video demo tailored to your venue type and city.",
    cta: "Book a Free Call",
    href: "mailto:owners@venpadi.com?subject=Book%20a%20free%20owner%20call",
    btnClass: "bg-brand-gradient-soft text-white",
    icon: "pi-phone",
    iconBg: "bg-primary/20 text-primary",
    status: "We’ll reply to arrange a time",
    statusIcon: "pi-calendar",
  },
];
</script>
