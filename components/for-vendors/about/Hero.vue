<template>
  <section class="relative overflow-hidden bg-[#1A1410] text-white">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,23,0.18),transparent_55%)]"
    ></div>

    <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pt-14 pb-16 md2:pt-20 md2:pb-24">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div>
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            About Venpadi · Built by Madesoft
          </p>
          <h1
            class="mt-4 text-[2.15rem] sm:text-[2.75rem] md2:text-[3.25rem] font-extrabold tracking-tight leading-[1.08]"
          >
            We built the platform we wished existed.
          </h1>
          <p class="mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl">
            Hotels and vacation stays got operating systems. High-value physical venues
            were left with WhatsApp threads and paper agreements. Venpadi was born to
            close that gap — infrastructure for the spaces that host real life.
          </p>

          <div class="mt-8 flex flex-wrap gap-2.5">
            <span
              class="inline-flex items-center px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white/80"
            >
              Built by Madesoft, Lagos, Nigeria
            </span>
            <span
              v-if="hasFigure(stats?.cities)"
              class="inline-flex items-center px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white/80"
            >
              Venues live in {{ statCount(stats.cities) }} {{ stats.cities === 1 ? "city" : "cities" }}
            </span>
          </div>
        </div>

        <div class="relative">
          <div
            v-if="hasFigure(stats?.liveVenues)"
            class="absolute -top-3 left-4 z-20 inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold shadow-lg"
          >
            {{ statCount(stats.liveVenues) }} live {{ stats.liveVenues === 1 ? "venue" : "venues" }}
          </div>

          <div
            class="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f29da8c2c4?w=900&h=700&fit=crop"
              alt=""
              class="w-full h-[280px] sm:h-[340px] object-cover"
            />
          </div>

          <!-- Real figure from GET /public/stats; hidden until there is one. -->
          <div
            v-if="hasFigure(stats?.gmvProcessedMinor)"
            class="absolute -bottom-6 right-2 sm:right-6 z-10 w-[220px] rounded-2xl bg-white text-header p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-border"
          >
            <p class="text-[10px] font-bold tracking-wider uppercase text-bodytext2">
              Paid through Venpadi
            </p>
            <p class="mt-1 text-xl font-extrabold tracking-tight">{{ nairaCompact(stats.gmvProcessedMinor) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Every figure here comes from GET /public/stats or is not shown (audit WP2).
const { stats } = usePublicStats();
</script>
