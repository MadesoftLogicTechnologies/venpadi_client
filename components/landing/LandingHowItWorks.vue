<template>
  <section id="how-it-works" class="bg-white py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Simplicity by design
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          Book your dream venue in 3 easy steps
        </h2>
        <p class="mt-3 text-bodytext text-sm sm:text-base">
          From discovery to post-event checkout, Venpadi streamlines the
          hospitality booking lifecycle.
        </p>
      </div>

      <div class="grid md2:grid-cols-3 gap-5">
        <article
          v-for="step in steps"
          :key="step.number"
          class="relative bg-white rounded-2xl border border-border p-6 sm:p-7 shadow-sm hover:-translate-y-1 transition-transform duration-300"
        >
          <div class="flex items-start justify-between mb-5">
            <div
              class="w-12 h-12 rounded-xl bg-brand-gradient-soft flex items-center justify-center text-white shadow-sm"
            >
              <i :class="['pi text-lg', step.icon]"></i>
            </div>
            <span class="text-5xl font-extrabold text-[#F3F4F6] leading-none select-none">
              {{ step.number }}
            </span>
          </div>
          <h3 class="text-lg font-bold text-header">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">
            {{ step.description }}
          </p>
        </article>
      </div>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          to="/auth/signup"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
        >
          Create a booking
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
        <NuxtLink
          to="/auth/login"
          class="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border text-header text-sm font-semibold hover:bg-greybg"
        >
          Sign in
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    number: "01",
    icon: "pi-search",
    title: "Search & Discover",
    description:
      "Filter by location, event type, guest capacity, budget and live availability. Compare spaces, layouts, photos and reviews from real bookings.",
  },
  {
    number: "02",
    icon: "pi-calendar",
    title: "Check & Reserve",
    description:
      "Pick your date and space and see the full price before you pay. Review the venue's cancellation policy, then pay securely — your money is held in escrow, not paid straight to the venue.",
  },
  {
    number: "03",
    icon: "pi-flag",
    title: "Host Your Event",
    description:
      "Message the venue, keep your booking, invoices and receipts in one place. Funds are released to the venue only after your event, once a 48-hour window has passed.",
  },
];
</script>
