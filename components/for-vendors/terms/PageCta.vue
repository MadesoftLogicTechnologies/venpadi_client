<template>
  <section class="relative overflow-hidden bg-[#0B0F14] text-white py-14 md2:py-20">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,77,23,0.28),transparent_70%)]"
    ></div>

    <div class="relative max-w-[720px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <div
        class="mx-auto mb-5 w-8 h-8 rotate-45 rounded-sm bg-brand-gradient opacity-90"
      ></div>
      <h2
        class="text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight"
      >
        Terms you can agree to because you understand them.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
        Join Nigeria’s premier ballrooms, hotels, and creative spaces operating with clear
        rules, secure revenue, and structured dispute support.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity"
        >
          List My Venue — Sign up free
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
        <a
          href="mailto:support@venpadi.com"
          class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          <i class="pi pi-envelope text-xs"></i>
          Questions? support@venpadi.com
        </a>
      </div>
      <p class="mt-4 text-[11px] text-white/40">
        No credit card required. Cancel anytime. Listing is free.
      </p>
    </div>
  </section>
</template>
