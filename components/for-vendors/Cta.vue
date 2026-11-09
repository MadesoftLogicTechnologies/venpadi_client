<template>
  <section id="partner" class="relative overflow-hidden bg-[#0B0F14] py-16 md2:py-24">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,23,0.22),transparent_60%)]"
    ></div>
    <p
      class="pointer-events-none absolute right-6 bottom-0 text-[clamp(5rem,20vw,14rem)] font-extrabold leading-none text-white/[0.04] select-none"
      aria-hidden="true"
    >
      No. 1
    </p>

    <div class="relative max-w-[760px] mx-auto px-4 sm:px-6 md2:px-8 text-center text-white">
      <span
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] sm:text-xs font-semibold text-white/80"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        Now accepting venue partners for Q4 peak event season
      </span>

      <h2
        class="mt-6 text-2xl sm:text-3xl md2:text-[2.75rem] font-extrabold tracking-tight leading-tight"
      >
        Your venue is ready.<br />
        Your calendar is waiting.<br />
        <span class="text-primary">Venpadi is open.</span>
      </h2>

      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
        Join the 5,000+ venue hosts across Nigeria turning unbooked square meters into
        predictable, hands-free business profits.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
        >
          List My Venue — It’s Free
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
        <a
          href="mailto:hello@venpadi.com"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10"
        >
          <i class="pi pi-calendar text-xs"></i>
          Book a 15-Min Onboarding Call
        </a>
      </div>
    </div>
  </section>
</template>
