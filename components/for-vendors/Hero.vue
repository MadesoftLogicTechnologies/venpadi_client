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
            Join 5,000+ venues already earning on Venpadi
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

          <div class="mt-8 flex items-center gap-3">
            <div class="flex -space-x-2.5">
              <img
                v-for="(src, i) in avatars"
                :key="i"
                :src="src"
                alt=""
                class="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
              <span
                class="w-9 h-9 rounded-full border-2 border-white bg-header text-white text-[10px] font-bold flex items-center justify-center"
              >
                +5k
              </span>
            </div>
            <p class="text-xs sm:text-sm text-bodytext max-w-sm leading-snug">
              <span class="font-semibold text-header">★ 4.9 / 5</span>
              · 5,000+ venue hosts. Operating across Lagos, Abuja, Port Harcourt &amp; 50+
              cities
            </p>
          </div>
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

    <div class="bg-white border-b border-border">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-6 flex items-center justify-center">
        <img
          src="/images/venue-partner-logos.svg"
          alt="Partner venues and brands"
          class="w-full max-w-[1100px] h-auto opacity-80"
          width="1280"
          height="58"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
// Keep as a runtime string so Vite/Nuxt does not rewrite it through
// virtual:public?t=...&/images/... (that produces a broken "/&/images/..." URL).
const heroImage = "/" + "images/for-vendors-hero.svg";

const bullets = [
  "100% Free Listing",
  "Total Calendar Control",
  "Direct Payout in 24 hrs",
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
];

const ticker = [
  { icon: "pi-flag", text: "Grandeur Hall, Lagos just booked ₦1.2M event" },
  { icon: "pi-calendar", text: "The Skyview, Abuja secured 3 dates this week" },
  { icon: "pi-star", text: "Pearl Gardens, Lekki hit 94% occupancy" },
  { icon: "pi-wallet", text: "Azure Ballroom paid out ₦840k in 24 hrs" },
  { icon: "pi-users", text: "Harbour View Hall hosted 220 corporate guests" },
  { icon: "pi-check-circle", text: "Eden Courtyard confirmed a Saturday wedding" },
  { icon: "pi-bolt", text: "Crystal Dome, PH filled 5 empty weekdays" },
  { icon: "pi-map-marker", text: "Golden Palm, Ikeja listed & got 12 inquiries" },
  { icon: "pi-chart-line", text: "Riviera Terrace climbed to 88% occupancy" },
  { icon: "pi-clock", text: "Summit Hall booked a same-week conference" },
  { icon: "pi-heart", text: "Bloom Pavilion locked a ₦2.1M engagement party" },
  { icon: "pi-briefcase", text: "Atlas Centre closed 4 midweek corporate slots" },
  { icon: "pi-bookmark", text: "Oasis Gardens got 9 new wishlist saves today" },
  { icon: "pi-verified", text: "Crestview Arena verified & went live in 1 day" },
  { icon: "pi-send", text: "Lumina Hall received a ₦650k deposit" },
  { icon: "pi-building", text: "Metro Loft turned Friday into a sold-out night" },
  { icon: "pi-calendar-plus", text: "Sapphire Court added 7 peak-season dates" },
  { icon: "pi-money-bill", text: "Nova Event Space earned ₦3.4M this month" },
  { icon: "pi-thumbs-up", text: "Palm & Pine got a 5★ review after first booking" },
  { icon: "pi-megaphone", text: "Velvet Room featured in Venpadi Top Picks" },
];
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
