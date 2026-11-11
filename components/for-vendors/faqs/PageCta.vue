<template>
  <section class="bg-[#F9F9F7] py-14 md2:py-20">
    <div class="max-w-[720px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <h2
        class="text-2xl sm:text-3xl md2:text-[2.4rem] font-extrabold text-header tracking-tight leading-tight"
      >
        Your questions are answered. Your venue is ready.
        <span class="bg-clip-text text-transparent bg-brand-gradient">
          What’s stopping you?
        </span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
        <template v-if="hasFigure(stats?.liveVenues)">
          Join {{ statCount(stats.liveVenues) }} estates, conference hotels, and independent
          venues already live on Venpadi.
        </template>
        <template v-else>
          Join the estates, conference hotels, and independent venues filling calendars on
          Venpadi.
        </template>
      </p>
      <NuxtLink
        to="/auth/signup/venue"
        class="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity"
      >
        List My Venue — It’s Free
      </NuxtLink>
      <p class="mt-4 text-[11px] text-bodytext2">
        No credit card required · No setup fee ·
        <a href="mailto:owners@venpadi.com" class="text-primary font-semibold hover:underline">
          Talk to a specialist
        </a>
      </p>
    </div>
  </section>
</template>

<script setup>
// Venue count from GET /public/stats; the "1,400" it replaced was invented.
const { stats } = usePublicStats();
</script>
