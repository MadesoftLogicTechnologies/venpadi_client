<template>
  <section id="overview" class="bg-[#F7F5F0] py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        What you get
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight"
      >
        Seven systems. One dashboard.
      </h2>

      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-3 gap-4">
        <article
          v-for="item in systems"
          :key="item.title"
          class="rounded-2xl bg-white border border-border p-5 sm:p-6 flex flex-col"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center"
            :class="item.iconBg"
          >
            <i :class="['pi text-sm', item.icon, item.iconColor]"></i>
          </div>
          <p
            class="mt-4 text-[11px] font-bold tracking-[0.12em] uppercase"
            :class="item.iconColor"
          >
            {{ item.eyebrow }}
          </p>
          <h3 class="mt-1.5 text-lg font-extrabold text-header">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-bodytext leading-relaxed flex-1">{{ item.body }}</p>
          <a
            :href="item.href"
            class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-header hover:text-primary"
          >
            Explore
            <i class="pi pi-arrow-right text-xs"></i>
          </a>
        </article>

        <article
          class="sm:col-span-2 md2:col-span-3 rounded-2xl bg-white border border-border p-5 sm:p-6 md2:p-7 flex flex-col md2:flex-row md2:items-center gap-5"
        >
          <div
            class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"
          >
            <i class="pi pi-shield text-sm"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[11px] font-bold tracking-[0.12em] uppercase text-primary">
              Trust & safety
            </p>
            <h3 class="mt-1 text-lg font-extrabold text-header">
              Verified hosts &amp; escrowed payments
            </h3>
            <p class="mt-2 text-sm text-bodytext leading-relaxed max-w-3xl">
              Venue owners submit identity, business registration and proof of address
              before their venue is marked verified. Client payments are held in escrow
              and released after the event's 48-hour dispute window.
            </p>
          </div>
          <a
            href="#trust"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-header hover:text-primary shrink-0"
          >
            Explore System
            <i class="pi pi-arrow-right text-xs"></i>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const systems = [
  {
    eyebrow: "Listings engine",
    title: "Multi-space showcasing",
    body: "Photo galleries, multiple spaces per venue, capacity by layout, and amenities.",
    icon: "pi-images",
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    href: "#listings",
  },
  {
    eyebrow: "Booking engine",
    title: "Automated lifecycle",
    body: "Date holds that expire on their own, status tracking, and double-booking locks.",
    icon: "pi-calendar",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    href: "#bookings",
  },
  {
    eyebrow: "Escrow payments",
    title: "Deposits, balances & payouts",
    body: "Card payments through Paystack, scheduled deposit and balance collection, and payouts to your bank.",
    icon: "pi-wallet",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    href: "#payments",
  },
  {
    eyebrow: "Intelligence",
    title: "Revenue & demand",
    body: "Revenue by month, space, event type and source, plus occupancy — from your own bookings.",
    icon: "pi-chart-bar",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    href: "#analytics",
  },
  {
    eyebrow: "Direct messaging",
    title: "Unified client threads",
    body: "One conversation per client, with file attachments, beside their bookings.",
    icon: "pi-comments",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    href: "#messaging",
  },
  {
    eyebrow: "Add-ons",
    title: "Sell your own extras",
    body: "Catering, décor, equipment and staffing you provide, priced and invoiced with the booking.",
    icon: "pi-users",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    href: "#vendors",
  },
];
</script>
