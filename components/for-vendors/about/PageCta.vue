<template>
  <section class="relative overflow-hidden bg-[#0B0F14] py-16 md2:py-24">
    <p
      class="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[clamp(4rem,18vw,14rem)] font-extrabold tracking-tight text-white/[0.03] leading-none select-none"
      aria-hidden="true"
    >
      VENPADI
    </p>

    <div class="relative max-w-[720px] mx-auto px-4 sm:px-6 md2:px-8 text-center text-white">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        Ready when you are
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold tracking-tight leading-tight"
      >
        You’ve read the story. Now start yours.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
        Join over 1,200 ambitious venue owners unlocking frictionless bookings and
        escrow payouts on Venpadi.
      </p>

      <NuxtLink
        to="/auth/signup/venue"
        class="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity"
      >
        List My Venue — It’s Free
      </NuxtLink>

      <div
        class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55"
      >
        <a href="mailto:hello@venpadi.com" class="hover:text-white transition-colors">
          Schedule a Product Walkthrough
        </a>
        <span class="hidden sm:inline text-white/20">·</span>
        <a href="mailto:owners@venpadi.com" class="hover:text-white transition-colors">
          Speak with an Owner Success Lead
        </a>
      </div>
    </div>
  </section>
</template>
