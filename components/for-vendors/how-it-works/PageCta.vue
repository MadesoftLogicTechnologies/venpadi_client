<template>
  <section class="relative overflow-hidden min-h-[58vh] md:min-h-[65vh] flex items-center py-20 md:py-28">
    <div class="absolute inset-0">
      <img
        :src="bgImage"
        alt=""
        class="h-full w-full object-cover object-center"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-black/85" />
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5),transparent_70%)]"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-[900px] px-4 sm:px-6 md:px-8 text-center text-white">
      <p class="text-xs font-bold tracking-[0.14em] uppercase text-primary mb-8">
        Begin today
      </p>
      <h2
        class="text-3xl sm:text-4xl md:text-[4.5rem] font-extrabold tracking-tight leading-[1.55] space-y-4 sm:space-y-5"
      >
        <span class="block whitespace-nowrap">Your calendar should be</span>
        <span class="block">full.</span>
        <span class="block text-primary pt-2 sm:pt-3">Let’s fill it.</span>
      </h2>
      <p class="mt-10 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto">
        Join the venues on Venpadi taking bookings, collecting payments through escrow,
        and managing their calendars in one place.
      </p>

      <NuxtLink
        to="/auth/signup/venue"
        class="mt-12 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold shadow-[0_12px_40px_rgba(255,77,23,0.45)] hover:opacity-95 transition-opacity"
      >
        List My Venue — It’s Free
        <i class="pi pi-arrow-right text-xs"></i>
      </NuxtLink>

      <p class="mt-7 text-[11px] sm:text-xs text-white/50">
        ✓ No credit card required · ✓ Cancel anytime · ✓ 48h average first booking
      </p>

      <NuxtLink
        to="/for-venue-owners"
        class="mt-8 inline-flex text-sm text-white/90 underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
      >
        Or read more about becoming a Venpadi owner →
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const bgImage = "/" + "images/how-it-works-go-live-bg.jpg";
</script>
