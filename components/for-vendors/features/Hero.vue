<template>
  <section
    class="relative overflow-hidden min-h-[560px] flex items-center text-white bg-[linear-gradient(160deg,#1A1410_0%,#0B0F14_42%,#2A120C_100%)]"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,77,23,0.28),transparent_55%)]"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-24 -right-16 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.22),transparent_70%)]"
    ></div>
    <div
      class="pointer-events-none absolute -top-20 -left-20 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,59,92,0.16),transparent_70%)]"
    ></div>

    <div class="relative max-w-[900px] mx-auto px-4 sm:px-6 md2:px-8 py-20 md2:py-28 text-center">
      <span
        class="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-bold tracking-[0.12em] uppercase"
      >
        For venue owners · Everything in one place
      </span>

      <h1
        class="mt-5 text-[2.15rem] sm:text-[2.75rem] md2:text-[3.4rem] font-extrabold tracking-tight leading-[1.08]"
      >
        Every tool you need to run a venue.
        <span class="text-primary">Finally in one place.</span>
      </h1>

      <p class="mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-2xl mx-auto">
        Replace fragmented WhatsApp chats, lost spreadsheet rows, and stressful payout
        chasing. Venpadi delivers the unified operating system designed exclusively for
        premium event spaces.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#overview"
          class="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
        >
          Explore the Features
          <i class="pi pi-arrow-down text-xs"></i>
        </a>
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-white/35 text-white text-sm font-semibold hover:bg-white/10"
        >
          Start for Free
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
      </div>

      <!-- The host count is GET /public/stats; with none to report the line hides. -->
      <p
        v-if="hasFigure(stats?.hosts)"
        class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-xs sm:text-sm text-white/80"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        {{ statCount(stats.hosts) }} venue {{ stats.hosts === 1 ? "host runs" : "hosts run" }} their bookings on Venpadi today
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
        <a
          v-for="tag in tags"
          :key="tag.label"
          :href="tag.href"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/80 hover:bg-white/10"
        >
          <i :class="['pi text-[10px]', tag.icon]"></i>
          {{ tag.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { stats } = usePublicStats();

const tags = [
  { label: "Listings", icon: "pi-images", href: "#listings" },
  { label: "Bookings", icon: "pi-calendar", href: "#bookings" },
  { label: "Payments", icon: "pi-wallet", href: "#payments" },
  { label: "Analytics", icon: "pi-chart-bar", href: "#analytics" },
  { label: "Messaging", icon: "pi-comments", href: "#messaging" },
  { label: "Add-ons", icon: "pi-plus-circle", href: "#vendors" },
  { label: "Trust", icon: "pi-shield", href: "#trust" },
];
</script>
