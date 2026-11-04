<template>
  <section id="partner" class="bg-white pb-14 md2:pb-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div
        class="relative overflow-hidden rounded-[1.75rem] bg-dark px-6 sm:px-10 md2:px-14 py-12 md2:py-16 text-center"
      >
        <div
          class="pointer-events-none absolute -left-20 top-0 w-[360px] h-[360px] rounded-full bg-primary/30 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -right-16 bottom-0 w-[320px] h-[320px] rounded-full bg-primary/20 blur-3xl"
        ></div>

        <div class="relative max-w-2xl mx-auto">
          <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-3">
            Become a partner
          </p>
          <h2 class="text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold text-white tracking-tight leading-tight">
            Ready to fill your empty dates?
          </h2>
          <p class="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
            Join 1,500+ venue owners already using Venpadi to turn quiet weekdays into
            confirmed revenue. Listing is free — take the next step today.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <NuxtLink
              to="/auth/signup/venue"
              class="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
            >
              List Your Venue Free
            </NuxtLink>
            <a
              :href="ownerLogin"
              class="inline-flex items-center px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Sign in as Owner
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
const ownerLogin = computed(
  () => `${config.public.VENDOR_PORTAL_URL || ""}/auth/login`.replace(/([^:]\/)\/+/g, "$1")
);
</script>
