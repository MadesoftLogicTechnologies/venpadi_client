<template>
  <section class="relative overflow-hidden py-16 md2:py-24">
    <div
      class="absolute inset-0 bg-[linear-gradient(160deg,#1a1410_0%,#0B0F14_50%,#1e1512_100%)]"
    ></div>
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(255,77,23,0.35),transparent_70%)]"
    ></div>

    <div class="relative max-w-[720px] mx-auto px-4 sm:px-6 md2:px-8 text-center text-white">
      <h2
        class="text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold tracking-tight leading-tight"
      >
        Every venue's story starts the same place:
        <span class="text-primary">the listing page.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">
        List your space, set your pricing and calendar, and start building the
        bookings your venue deserves.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity"
        >
          Get started — it's free
        </NuxtLink>
        <a
          href="mailto:hello@venpadi.com"
          class="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          Schedule a demo today
        </a>
      </div>

      <p class="mt-4 text-[11px] text-white/40">
        Listing is free. Terms of service apply.
      </p>
    </div>
  </section>
</template>
