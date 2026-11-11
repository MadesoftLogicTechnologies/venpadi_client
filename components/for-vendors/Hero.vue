<template>
  <section class="relative overflow-hidden bg-[#F7F5F2]">
    <div
      class="pointer-events-none absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,77,23,0.16),transparent_70%)]"
    ></div>
    <div
      class="pointer-events-none absolute -top-16 -right-16 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.14),transparent_70%)]"
    ></div>

    <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pt-12 pb-14 md2:pt-16 md2:pb-16">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-10 items-center">
        <div>
          <span
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[12px] font-semibold text-header shadow-sm"
          >
            <i class="pi pi-building text-primary text-xs"></i>
            <template v-if="hasFigure(stats?.liveVenues)">
              Join {{ statCount(stats.liveVenues) }} venues already live on Venpadi
            </template>
            <template v-else>List your venue on Venpadi</template>
          </span>

          <h1
            class="mt-5 text-[2.35rem] sm:text-[2.9rem] md2:text-[3.4rem] leading-[1.08] font-extrabold text-header tracking-tight"
          >
            Your venue has empty dates. We
            <span class="relative inline-block text-primary">
              fill
              <span
                class="absolute left-0 right-0 -bottom-1 h-[6px] rounded-full bg-primary/35"
              ></span>
              <span
                class="absolute left-1 right-1 -bottom-[3px] h-[3px] rounded-full bg-primary/55"
              ></span>
            </span>
            them.
          </h1>

          <p class="mt-5 text-base sm:text-lg text-bodytext max-w-xl leading-relaxed">
            Turn unbooked weekdays into steady revenue. Venpadi connects your spaces with
            wedding planners, corporate organizers, and hosts across Nigeria — so empty
            calendar slots become confirmed bookings.
          </p>

          <ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            <li
              v-for="item in bullets"
              :key="item"
              class="inline-flex items-center gap-2 text-sm font-semibold text-header"
            >
              <span
                class="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0"
              >
                <i class="pi pi-check text-[9px] font-bold"></i>
              </span>
              {{ item }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/auth/signup/venue"
              class="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold shadow-sm hover:opacity-95"
            >
              List My Venue — It’s Free
              <i class="pi pi-arrow-right text-xs"></i>
            </NuxtLink>
            <a
              href="#how-it-works"
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-white text-header text-sm font-semibold hover:bg-greybg"
            >
              <span
                class="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
              >
                <i class="pi pi-play text-[10px]"></i>
              </span>
              See how it works
            </a>
          </div>

          <!-- Real marketplace figures only (GET /public/stats); the stock
               avatars, "+5k" and "4.9 / 5" they replaced were invented. -->
          <ul v-if="tiles.length" class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-bodytext">
            <li v-for="t in tiles" :key="t.key">
              <span class="font-semibold text-header">{{ t.value }}</span>
              {{ t.label.toLowerCase() }}
            </li>
          </ul>
        </div>

        <div class="relative flex items-center justify-center md2:justify-end">
          <img
            :src="heroImage"
            alt="Venpadi venue owner dashboard preview"
            class="w-full max-w-[564px] h-auto drop-shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            width="564"
            height="563"
          />
        </div>
      </div>
    </div>

    <div class="bg-brand-gradient-soft overflow-hidden">
      <div class="venue-ticker flex w-max whitespace-nowrap py-3.5 text-[12px] sm:text-sm font-bold tracking-wide text-white uppercase">
        <div
          v-for="n in 2"
          :key="n"
          class="flex shrink-0 items-center gap-10 px-5"
        >
          <span
            v-for="(item, i) in ticker"
            :key="`${n}-${i}`"
            class="inline-flex items-center gap-2"
          >
            <i :class="['pi text-xs', item.icon]"></i>
            {{ item.text }}
            <span class="opacity-50">·</span>
          </span>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
// Keep as a runtime string so Vite/Nuxt does not rewrite it through
// virtual:public?t=...&/images/... (that produces a broken "/&/images/..." URL).
const heroImage = "/" + "images/for-vendors-hero.svg";

const bullets = [
  "Free to list",
  "Total Calendar Control",
  "Escrow-protected payouts",
];

// What a venue gets — capabilities, not an invented feed of other venues'
// bookings and payouts.
const ticker = [
  { icon: "pi-calendar", text: "Live availability calendar" },
  { icon: "pi-shield", text: "Escrow-protected payments" },
  { icon: "pi-inbox", text: "Booking requests in one inbox" },
  { icon: "pi-comments", text: "Message planners directly" },
  { icon: "pi-file", text: "Invoices for every booking" },
  { icon: "pi-users", text: "Staff accounts with roles" },
  { icon: "pi-star", text: "Reviews from real bookings" },
  { icon: "pi-wallet", text: "Payouts to your bank" },
];

const { stats } = usePublicStats();
const tiles = computed(() =>
  statTiles(stats.value, ["averageRating", "hosts", "cities"], { hosts: "Venue hosts", cities: "Cities" })
);
</script>

<style>
@keyframes venue-ticker-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.venue-ticker {
  animation: venue-ticker-marquee 55s linear infinite;
}
</style>
