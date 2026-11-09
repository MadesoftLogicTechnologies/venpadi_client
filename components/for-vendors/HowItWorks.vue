<template>
  <section id="how-it-works" class="bg-white py-16 md2:py-24 scroll-mt-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
          Seamless onboarding
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight"
        >
          How Listing on Venpadi Works
        </h2>
        <p class="mt-3 text-sm sm:text-base text-bodytext leading-relaxed">
          From zero to your first confirmed booking in under 24 hours with zero technical
          complexity.
        </p>
      </div>

      <div class="space-y-16 md2:space-y-20">
        <article
          v-for="(step, i) in steps"
          :key="step.title"
          class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-center"
        >
          <div :class="i % 2 === 1 ? 'md2:order-2' : ''">
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              {{ step.label }}
            </p>
            <h3 class="mt-3 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
              {{ step.body }}
            </p>
            <ul class="mt-5 space-y-2.5">
              <li
                v-for="point in step.points"
                :key="point"
                class="flex items-center gap-2.5 text-sm font-medium text-header"
              >
                <span
                  class="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
                >
                  <i class="pi pi-check text-[10px] font-bold"></i>
                </span>
                {{ point }}
              </li>
            </ul>
          </div>

          <div :class="i % 2 === 1 ? 'md2:order-1' : ''">
            <!-- Step 1 card -->
            <div
              v-if="i === 0"
              class="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
            >
              <div class="flex items-center justify-between mb-5">
                <p class="text-sm font-bold text-header">Owner Profile Setup</p>
                <span class="text-[11px] font-semibold text-bodytext2">Step 1 of 3</span>
              </div>
              <label class="block text-xs font-semibold text-bodytext2 mb-1.5"
                >Venue Name</label
              >
              <div
                class="rounded-xl border border-border px-3.5 py-2.5 text-sm text-header mb-3"
              >
                The Grant Atrium &amp; Garden
              </div>
              <div class="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label class="block text-xs font-semibold text-bodytext2 mb-1.5"
                    >City</label
                  >
                  <div
                    class="rounded-xl border border-border px-3.5 py-2.5 text-sm text-header"
                  >
                    Lagos, VI
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-bodytext2 mb-1.5"
                    >Max Capacity</label
                  >
                  <div
                    class="rounded-xl border border-border px-3.5 py-2.5 text-sm text-header"
                  >
                    800 Guests
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="w-full py-3 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold"
              >
                Continue to Details →
              </button>
            </div>

            <!-- Step 2 card -->
            <div
              v-else-if="i === 1"
              class="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
            >
              <div class="grid grid-cols-3 gap-2">
                <img
                  v-for="(src, idx) in gallery"
                  :key="idx"
                  :src="src"
                  alt=""
                  class="rounded-xl h-20 object-cover w-full"
                />
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in amenities"
                  :key="tag"
                  class="px-2.5 py-1 rounded-full bg-greybg text-[11px] font-semibold text-header"
                  >{{ tag }}</span
                >
              </div>
              <div class="mt-5">
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-header">Profile Strength: 90%</span>
                  <span class="text-emerald-600">Ready</span>
                </div>
                <div class="h-2 rounded-full bg-greybg overflow-hidden">
                  <div class="h-full w-[90%] rounded-full bg-emerald-500"></div>
                </div>
                <p class="mt-2 text-[11px] text-bodytext">
                  Ready for High-Tier Discoverability
                </p>
              </div>
            </div>

            <!-- Step 3 calendar -->
            <div
              v-else-if="i === 2"
              class="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
            >
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-header">October 2024</p>
                <span
                  class="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700"
                  >2-Way Sync: Active</span
                >
              </div>
              <div class="grid grid-cols-7 gap-1.5 text-center text-[11px]">
                <span
                  v-for="d in days"
                  :key="d.label"
                  class="aspect-[2/1] rounded-lg flex items-center justify-center font-semibold"
                  :class="d.class"
                  >{{ d.label }}</span
                >
              </div>
              <div class="mt-4 flex flex-wrap gap-3 text-[11px] text-bodytext">
                <span class="inline-flex items-center gap-1.5"
                  ><span class="w-2.5 h-2.5 rounded-sm bg-primary"></span> Booked</span
                >
                <span class="inline-flex items-center gap-1.5"
                  ><span class="w-2.5 h-2.5 rounded-sm bg-header/20"></span> Blocked</span
                >
                <span class="inline-flex items-center gap-1.5"
                  ><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Synced</span
                >
              </div>
            </div>

            <!-- Step 4 payout -->
            <div
              v-else
              class="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"
                >
                  <i class="pi pi-check text-sm font-bold"></i>
                </span>
                <div>
                  <p class="text-sm font-extrabold text-header">Payout Disbursed</p>
                  <p class="text-xs text-bodytext">GTBank ***6212</p>
                </div>
              </div>
              <div class="mt-5 space-y-2.5 text-sm">
                <div class="flex justify-between gap-3">
                  <span class="text-bodytext">First Payout Rec.</span>
                  <span class="font-semibold text-header">Oct 19, 2024</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-bodytext">Event Name</span>
                  <span class="font-semibold text-header">Zenith Tech Summit</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-bodytext">Guest Verification</span>
                  <span class="font-semibold text-emerald-600">ID &amp; Deposit Verified</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    label: "Step 01 — 3 minutes",
    title: "Create your free venue owner account",
    body: "Sign up with no credit card and no setup charges. Your owner workspace is ready in minutes.",
    points: ["Instant verification", "Dedicated advisor"],
  },
  {
    label: "Step 02 — 15 minutes",
    title: "Build your high-converting profile",
    body: "Add venue photography, amenities like AC and generators, and custom rates that match your floors.",
    points: ["Professional photography tips", "Custom pricing tiers"],
  },
  {
    label: "Step 03 — Instant sync",
    title: "Set availability and go live",
    body: "Sync Google or Apple calendars and pass a 24-hour verification review before you open for bookings.",
    points: ["24-hour review", "Instant book toggle"],
  },
  {
    label: "Step 04 — Automated payouts",
    title: "Receive bookings and get paid reliably",
    body: "Contracts execute in-app, deposits sit in escrow, and payouts hit your bank within 24 hours of event sign-off.",
    points: ["Zero chasing of balances", "Automated security deposit"],
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1519167758481-83f29da8c2c4?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&h=200&fit=crop",
];

const amenities = ["24/7 Power Supply", "Chairs", "Valet Parking"];

const days = Array.from({ length: 21 }, (_, i) => {
  const n = i + 1;
  if ([3, 4, 11].includes(n)) return { label: String(n), class: "bg-primary text-white" };
  if ([7, 14].includes(n)) return { label: String(n), class: "bg-header/10 text-header" };
  if ([8, 9, 15, 16].includes(n))
    return { label: String(n), class: "bg-emerald-50 text-emerald-700" };
  return { label: String(n), class: "text-bodytext hover:bg-greybg" };
});
</script>
