<template>
  <section class="relative overflow-hidden py-16 md2:py-24">
    <div
      class="absolute inset-0 bg-[linear-gradient(135deg,#1a1f27_0%,#0B0F14_55%,#1e1512_100%)]"
    ></div>
    <div
      class="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(255,77,23,0.35),transparent_60%)]"
    ></div>

    <div class="relative max-w-[720px] mx-auto px-4 sm:px-6 md2:px-8 text-center text-white">
      <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-3">
        Your story
      </p>
      <h2
        class="text-2xl sm:text-3xl md2:text-[2.75rem] font-extrabold tracking-tight leading-tight"
      >
        Your calendar should be full.
        <span class="text-primary">Let's fill it.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">
        Join venue owners already taking contracts, automating payouts, and raising the
        bar for hospitality across Nigeria.
      </p>

      <NuxtLink
        to="/auth/signup/venue"
        class="mt-8 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
      >
        List My Venue — It's Free
        <i class="pi pi-arrow-right text-xs"></i>
      </NuxtLink>

      <p class="mt-4 text-[11px] sm:text-xs text-white/45">
        No credit card required · Cancel anytime · No setup or hidden fees
      </p>
    </div>
  </section>
</template>
