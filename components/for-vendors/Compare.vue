<template>
  <section class="bg-white py-16 md2:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-3xl mx-auto">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
          The sovereign difference
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight"
        >
          Other platforms list you. Venpadi grows you.
        </h2>
        <p class="mt-3 text-sm sm:text-base text-bodytext leading-relaxed">
          See how Venpadi outperforms standard classifieds, informal social DMs, and
          clunky generic directories.
        </p>
      </div>

      <div
        class="mt-10 overflow-x-auto rounded-2xl border border-border bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)]"
      >
        <table class="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="px-5 py-4 font-extrabold text-header">Capability &amp; Infrastructure</th>
              <th class="px-4 py-4 font-semibold text-bodytext2 text-center">Local Classifieds</th>
              <th class="px-4 py-4 font-semibold text-bodytext2 text-center">Social Media DMs</th>
              <th class="px-4 py-4 font-semibold text-bodytext2 text-center">Generic Booking Sites</th>
              <th
                class="px-4 py-4 font-extrabold text-white text-center bg-brand-gradient-soft rounded-tr-2xl"
              >
                Venpadi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.label"
              class="border-b border-border last:border-0"
              :class="i % 2 === 1 ? 'bg-greybg/40' : ''"
            >
              <td class="px-5 py-3.5 font-medium text-header">{{ row.label }}</td>
              <td class="px-4 py-3.5 text-center text-bodytext">{{ row.classifieds }}</td>
              <td class="px-4 py-3.5 text-center text-bodytext">{{ row.social }}</td>
              <td class="px-4 py-3.5 text-center text-bodytext">{{ row.generic }}</td>
              <td class="px-4 py-3.5 text-center bg-primary/[0.04]">
                <span class="inline-flex items-center gap-1.5 font-semibold text-primary">
                  <i class="pi pi-check text-[10px]"></i>
                  {{ row.venpadi }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-8 grid md2:grid-cols-3 gap-4">
        <article
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl bg-[#F7F5F2] p-5 sm:p-6"
        >
          <div
            class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center"
          >
            <i :class="['pi text-sm', card.icon]"></i>
          </div>
          <h3 class="mt-4 text-base font-extrabold text-header">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">{{ card.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [
  {
    label: "Smart Discovery & SEO Rankings",
    classifieds: "Static text",
    social: "Algorithm luck",
    generic: "Paid boosts",
    venpadi: "Top Google & Venpadi SEO",
  },
  {
    label: "Intent-Driven High Ticket Clients",
    classifieds: "Browsers only",
    social: "Friends & DMs",
    generic: "Mixed quality",
    venpadi: "Verified Corp & Event Planners",
  },
  {
    label: "Guaranteed Escrow Booking Protection",
    classifieds: "None",
    social: "Cash / transfer",
    generic: "Partial holds",
    venpadi: "Zero-Fraud Escrow Holds",
  },
  {
    label: "Multi-Space Sub-Listing Management",
    classifieds: "One page",
    social: "Scattered posts",
    generic: "Limited rooms",
    venpadi: "Infinite Sub-Halls & Terraces",
  },
  {
    label: "Verified Corporate Client IDs",
    classifieds: "Fake profiles",
    social: "No verification",
    generic: "Email only",
    venpadi: "Gov ID & Corporate Email Check",
  },
  {
    label: "Instant Push & WhatsApp Alerts",
    classifieds: "None",
    social: "Manual replies",
    generic: "Email digests",
    venpadi: "Instant Priority Routing",
  },
  {
    label: "Dedicated Venue Growth Manager",
    classifieds: "None",
    social: "None",
    generic: "Ticket queue",
    venpadi: "Direct Human Concierge",
  },
  {
    label: "Global Multi-Currency Settlements",
    classifieds: "Cash only",
    social: "Local transfer",
    generic: "Single currency",
    venpadi: "Local Bank in 40+ Currencies",
  },
];

const cards = [
  {
    icon: "pi-search",
    title: "Smart Discovery & SEO",
    body: "Your spaces appear when Fortune 500 coordinators and luxury wedding planners search high-intent keywords across major cities.",
  },
  {
    icon: "pi-shield",
    title: "Institutional Booking Protection",
    body: "Automatic damage deposit escrow holds, ironclad digital rental agreements, and identity verification before entry.",
  },
  {
    icon: "pi-chart-line",
    title: "Yield Analytics Dashboard",
    body: "See high-season demand spikes, optimize price per head, and compare your occupancy against regional city competitors.",
  },
];
</script>
