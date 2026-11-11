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
// Only capabilities the platform has today: no SEO-ranking, ID-check,
// WhatsApp, concierge or multi-currency claims (none exist).
const rows = [
  {
    label: "Searchable by Event Type, Capacity & Date",
    classifieds: "Static text",
    social: "Algorithm luck",
    generic: "Basic filters",
    venpadi: "Live availability search",
  },
  {
    label: "Planners Who Arrive With Event Details",
    classifieds: "Browsers only",
    social: "Friends & DMs",
    generic: "Mixed quality",
    venpadi: "Structured booking requests",
  },
  {
    label: "Escrow Booking Protection",
    classifieds: "None",
    social: "Cash / transfer",
    generic: "Partial holds",
    venpadi: "Escrow until after the event",
  },
  {
    label: "Multi-Space Sub-Listing Management",
    classifieds: "One page",
    social: "Scattered posts",
    generic: "Limited rooms",
    venpadi: "Every hall & terrace, priced separately",
  },
  {
    label: "Booking & Message Alerts",
    classifieds: "None",
    social: "Manual replies",
    generic: "Email digests",
    venpadi: "Email & in-app notifications",
  },
  {
    label: "Team Access",
    classifieds: "None",
    social: "Shared phone",
    generic: "Single login",
    venpadi: "Staff accounts with roles",
  },
  {
    label: "Invoices & Payouts",
    classifieds: "Cash only",
    social: "Local transfer",
    generic: "Manual",
    venpadi: "Invoices + payouts to your bank",
  },
];

const cards = [
  {
    icon: "pi-search",
    title: "Smart Discovery",
    body: "Your spaces appear when planners search by event type, capacity, location, budget and date — and only when they're actually free.",
  },
  {
    icon: "pi-shield",
    title: "Booking Protection",
    body: "Payments are held in escrow, refundable caution deposits are handled for you, and every booking follows your cancellation policy.",
  },
  {
    icon: "pi-chart-line",
    title: "Analytics Dashboard",
    body: "See bookings, earnings and enquiries for each of your venues in one dashboard.",
  },
];
</script>
