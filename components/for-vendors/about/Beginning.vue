<template>
  <section class="relative overflow-hidden bg-white py-16 md2:py-24">
    <p
      class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(2.5rem,8vw,7rem)] font-extrabold tracking-tight text-header/[0.035] leading-none select-none whitespace-nowrap"
      aria-hidden="true"
    >
      INFRASTRUCTURE NOT DIRECTORY
    </p>

    <div class="relative max-w-[760px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        The beginning
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
      >
        The problem was hiding in plain sight.
      </h2>
      <p class="mt-5 text-sm sm:text-base text-bodytext leading-relaxed">
        In late 2022, our founding team was consulting for event centers across West
        Africa and Europe. The venues were beautiful. The ops were chaos — billion-naira
        assets managed through flimsy social listing pages or bloated generic ERPs that
        treated a banquet hall like a warehouse SKU.
      </p>

      <ul class="mt-8 space-y-4">
        <li
          v-for="quote in quotes"
          :key="quote"
          class="flex gap-3 text-sm sm:text-[15px] text-header leading-relaxed"
        >
          <span class="mt-2 w-4 h-[2px] shrink-0 bg-primary"></span>
          <span class="italic text-bodytext">“{{ quote }}”</span>
        </li>
      </ul>

      <blockquote
        class="mt-10 rounded-2xl border border-border bg-greybg px-6 py-6 sm:px-8 sm:py-7"
      >
        <p class="text-base sm:text-lg font-semibold text-header leading-snug">
          “We didn’t set out to build another yellow-pages venue directory. We set out
          to build the sovereign digital infrastructure for physical spaces.”
        </p>
        <p class="mt-3 text-xs font-bold tracking-wide uppercase text-bodytext2">
          Venpadi Founding Principle · Lagos, March 2023
        </p>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
const quotes = [
  "Bookings come through WhatsApp. I’m terrified of double-booking the grand hall.",
  "International clients want to pay in GBP or USD — our gateways drop the transactions.",
  "Listing sites take 20% commission and sit on payouts for weeks.",
  "My floor team can’t check live availability without calling the front desk.",
];
</script>
