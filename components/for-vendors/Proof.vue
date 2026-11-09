<template>
  <section class="bg-[#F7F5F2]">
    <div id="case-studies" class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-14 md2:py-16">
      <div class="grid md2:grid-cols-2 gap-5">
        <article
          v-for="t in testimonials"
          :key="t.name"
          class="rounded-[1.5rem] bg-[#F3EEE6] overflow-hidden grid sm:grid-cols-[1.1fr_0.9fr] shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
        >
          <div class="p-6 sm:p-8 flex flex-col">
            <p class="text-xl sm:text-2xl font-extrabold text-header leading-snug tracking-tight">
              “{{ t.quote }}”
            </p>
            <div class="mt-auto pt-8 flex items-end justify-between gap-3">
              <div>
                <p class="text-sm font-extrabold text-header">{{ t.name }}</p>
                <p class="text-[11px] font-bold tracking-wider uppercase text-bodytext2 mt-0.5">
                  {{ t.brand }}
                </p>
              </div>
              <NuxtLink
                to="/for-venue-owners/success-stories"
                class="text-sm font-semibold text-primary shrink-0"
              >
                Read Story →
              </NuxtLink>
            </div>
          </div>
          <div class="relative min-h-[260px] sm:min-h-full p-3 sm:p-4 flex items-center justify-center">
            <img
              :src="storyImage"
              :alt="t.name"
              class="w-full max-w-[248px] h-auto"
              width="248"
              height="347"
            />
            <div
              class="absolute left-2 bottom-10 w-16 h-16 rounded-full bg-white shadow-lg flex flex-col items-center justify-center"
            >
              <i :class="['pi text-primary text-sm', t.badgeIcon]"></i>
              <span class="text-[8px] font-extrabold tracking-wider uppercase text-primary mt-0.5">
                {{ t.brand }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div id="features" class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pb-14 md2:pb-20">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        The Venpadi Advantage
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight max-w-3xl"
      >
        Built for venue owners who think like businesses.
      </h2>

      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <!-- Occupancy -->
        <article
          class="rounded-2xl border border-border bg-white p-5 sm:p-6 relative overflow-hidden"
        >
          <div
            class="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-primary/10"
          ></div>
          <div class="relative w-24 h-24 mx-auto sm:mx-0">
            <svg viewBox="0 0 96 96" class="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="38" fill="none" stroke="#F3EDE8" stroke-width="8" />
              <circle
                cx="48"
                cy="48"
                r="38"
                fill="none"
                stroke="#FF4D17"
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="239"
                stroke-dashoffset="76"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p class="text-lg font-extrabold text-header leading-none">68%</p>
              <p class="text-[8px] font-bold tracking-wider uppercase text-bodytext2 mt-1">
                Capacity shift
              </p>
            </div>
          </div>
          <div class="mt-5 flex items-center gap-2">
            <h3 class="text-base font-extrabold text-header">Occupancy Growth</h3>
            <i class="pi pi-arrow-up-right text-primary text-xs"></i>
          </div>
          <p class="mt-2 text-xs text-bodytext leading-relaxed">
            Average documented increase in venue schedule utilization within year 1 of
            listing.
          </p>
        </article>

        <!-- Visibility -->
        <article
          class="rounded-2xl border border-border bg-white p-5 sm:p-6 relative overflow-hidden"
        >
          <div
            class="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-primary/10"
          ></div>
          <p class="text-4xl font-extrabold text-primary tracking-tight">3.2x</p>
          <svg viewBox="0 0 160 48" class="mt-3 w-full h-10 text-primary/70">
            <path
              d="M0 40 C25 38 35 28 55 22 C75 16 90 30 110 14 C125 4 145 10 160 2"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="3 3"
            />
          </svg>
          <div class="mt-4 flex items-center gap-2">
            <h3 class="text-base font-extrabold text-header">More Visibility</h3>
            <i class="pi pi-globe text-primary text-xs"></i>
          </div>
          <p class="mt-2 text-xs text-bodytext leading-relaxed">
            Targeted intent searches versus passive social media advertising &amp; link
            trees alone.
          </p>
        </article>

        <!-- First booking -->
        <article
          class="rounded-2xl border border-border bg-white p-5 sm:p-6 relative overflow-hidden"
        >
          <div
            class="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-primary/10"
          ></div>
          <p class="text-3xl font-extrabold text-primary tracking-tight">48 hrs</p>
          <div class="mt-3">
            <div class="flex justify-between text-[10px] font-bold uppercase text-bodytext2 mb-1">
              <span>p90 record</span>
            </div>
            <div class="h-2 rounded-full bg-greybg overflow-hidden">
              <div class="h-full w-[82%] rounded-full bg-primary"></div>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span class="px-2 py-1 rounded-full bg-greybg text-[10px] font-semibold text-bodytext"
              >Day 1 Ingest</span
            >
            <span class="px-2 py-1 rounded-full bg-greybg text-[10px] font-semibold text-bodytext"
              >Day 2 Matching</span
            >
            <span
              class="px-2 py-1 rounded-full bg-primary text-[10px] font-semibold text-white"
              >Live Funded</span
            >
          </div>
          <div class="mt-4 flex items-center gap-2">
            <h3 class="text-base font-extrabold text-header">Fastest First Booking</h3>
            <i class="pi pi-bolt text-primary text-xs"></i>
          </div>
          <p class="mt-2 text-xs text-bodytext leading-relaxed">
            Median timeframe for newly verified venues to receive their first validated
            booking deposit.
          </p>
        </article>

        <!-- Payouts dark -->
        <article
          class="rounded-2xl border border-header bg-header text-white p-5 sm:p-6 relative overflow-hidden"
        >
          <div
            class="pointer-events-none absolute -top-10 -right-6 w-32 h-32 rounded-full bg-primary/25"
          ></div>
          <p class="text-4xl font-extrabold text-primary tracking-tight">100%</p>
          <p class="mt-2 inline-flex items-center gap-2 text-xs text-white/70">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            Deposit &amp; Escrow Protected
          </p>
          <div class="mt-6 flex items-center gap-2">
            <h3 class="text-base font-extrabold">Guaranteed Payouts</h3>
            <i class="pi pi-shield text-primary text-xs"></i>
          </div>
          <p class="mt-2 text-xs text-white/55 leading-relaxed">
            Automated milestone escrow holding, zero-chargeback guarantee, and instant
            direct bank disbursements within 24 hours of event sign-off.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const storyImage = "/images/venue-owner-story.svg";

const testimonials = [
  {
    quote: "Over the past year, we have increased our bookings by $50K with Venpadi.",
    name: "Ioana Kutuzova",
    brand: "Gertie",
    badgeIcon: "pi-shopping-bag",
  },
  {
    quote: "Over the past year, we have increased our bookings by $50K with Venpadi.",
    name: "Ioana Kutuzova",
    brand: "Kogi",
    badgeIcon: "pi-sun",
  },
];
</script>
