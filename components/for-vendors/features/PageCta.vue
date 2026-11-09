<template>
  <section class="relative overflow-hidden py-16 md2:py-24">
    <img
      src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=900&fit=crop"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-[#0B0F14]/88"></div>

    <div class="relative max-w-[760px] mx-auto px-4 sm:px-6 md2:px-8 text-center text-white">
      <h2
        class="text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold tracking-tight leading-tight"
      >
        Your venue, running the way it
        <span class="text-primary">always should have been.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
        Join over 1,200 premier venue operators across Lagos, Abuja, Accra, and Nairobi.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
        >
          List Your Venue — It’s Free
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
        <a
          href="mailto:hello@venpadi.com"
          class="inline-flex items-center px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10"
        >
          Book a Demo Walkthrough
        </a>
      </div>

      <div
        class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55"
      >
        <span
          v-for="item in proofs"
          :key="item"
          class="inline-flex items-center gap-1.5"
        >
          <i class="pi pi-check text-emerald-400 text-[10px]"></i>
          {{ item }}
        </span>
      </div>

      <div
        class="mt-10 mx-auto max-w-md rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-left"
      >
        <p class="text-sm text-white/80 leading-relaxed">
          “We listed on a Tuesday. By Friday the calendar had three deposits. That never
          happened on WhatsApp.”
        </p>
        <p class="mt-3 text-xs font-semibold text-white/45">
          Grace Akusu · Kems Garden Event Center
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const proofs = [
  "No credit card required",
  "Lists in under 10 minutes",
  "Cancel anytime",
];
</script>
