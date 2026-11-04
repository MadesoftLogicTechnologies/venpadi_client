<template>
  <section class="relative overflow-hidden bg-[#F7F8FA] pt-10 pb-14 md2:pt-14 md2:pb-20">
    <div
      class="pointer-events-none absolute -right-24 top-10 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl"
    ></div>

    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 relative">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-12 items-center">
        <div>
          <h1
            class="text-[2.35rem] sm:text-[2.9rem] md2:text-[3.35rem] leading-[1.08] font-extrabold text-header tracking-tight"
          >
            Your venue has empty dates.
            <span class="relative inline-block">
              We
              <span
                class="mx-1 px-2.5 py-0.5 rounded-lg bg-primary text-white inline-block -rotate-1 shadow-sm"
              >
                fill
              </span>
              them.
            </span>
          </h1>

          <p class="mt-5 text-base sm:text-lg text-bodytext max-w-xl leading-relaxed">
            Turn unbooked weekdays into revenue. Venpadi connects your spaces with
            wedding planners, corporate organizers, and hosts across Nigeria —
            so empty calendar slots become confirmed bookings.
          </p>

          <ul class="mt-6 space-y-2.5">
            <li
              v-for="item in bullets"
              :key="item"
              class="flex items-center gap-2.5 text-sm font-medium text-header"
            >
              <span
                class="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
              >
                <i class="pi pi-check text-[10px] font-bold"></i>
              </span>
              {{ item }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/auth/signup/venue"
              class="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
            >
              List My Venue — It’s Free
            </NuxtLink>
            <a
              href="#partner"
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-border bg-white text-header text-sm font-semibold hover:bg-greybg transition-colors"
            >
              <span
                class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"
              >
                <i class="pi pi-play text-[10px]"></i>
              </span>
              Book a Free Video Call
            </a>
          </div>

          <div class="mt-8 flex items-center gap-3">
            <div class="flex -space-x-2">
              <img
                v-for="(src, i) in avatars"
                :key="i"
                :src="src"
                alt=""
                class="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            </div>
            <p class="text-xs sm:text-sm text-bodytext max-w-xs leading-snug">
              <span class="font-semibold text-header">4.9/5</span>
              from 1,500+ venue owners across Lagos, Abuja &amp; beyond
            </p>
          </div>
        </div>

        <div class="relative flex items-center justify-center md2:justify-end">
          <img
            src="/images/for-vendors-hero.svg"
            alt="Venpadi venue owner dashboard preview"
            class="w-full max-w-[564px] h-auto drop-shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            width="564"
            height="563"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const bullets = [
  "Protected by Venpadi",
  "Instant Guaranteed Payouts",
  "Secure Payments & Billing",
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
];
</script>
