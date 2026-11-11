<template>
  <section id="step-5" class="scroll-mt-36 bg-white py-14 md:py-20 border-t border-black/5">
    <div class="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 text-center">
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
      >
        Step 5 of 7
      </span>
      <h2
        class="mt-4 text-2xl sm:text-3xl md:text-[2.5rem] font-extrabold text-header tracking-tight leading-tight"
      >
        Hit publish.
        <span class="text-primary">Planners can find you.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl mx-auto">
        When your listing goes live, your spaces appear in Venpadi search for planners
        looking for your event types, capacity, location and dates.
      </p>

      <div class="relative mt-10 mx-auto max-w-[720px]">
        <img
          :src="goLiveImage"
          alt="Live venue listing with match notifications and global discovery"
          class="h-auto w-full"
          width="720"
          height="480"
          loading="lazy"
        />
      </div>

      <!-- Marketplace figures from GET /public/stats; tiles with no figure hide
           (the "6.2 hrs" / "14,000+" / "2,847" they replaced were invented). -->
      <div
        v-if="stats.length"
        class="mt-10 rounded-2xl bg-[#F7F5F2] px-4 py-6 sm:px-6 sm:py-7 grid gap-6 sm:gap-0 sm:divide-x sm:divide-black/10"
        :class="stats.length === 3 ? 'sm:grid-cols-3' : stats.length === 2 ? 'sm:grid-cols-2' : ''"
      >
        <div v-for="stat in stats" :key="stat.label" class="sm:px-4">
          <p class="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            {{ stat.value }}
          </p>
          <p class="mt-1.5 text-[11px] font-bold tracking-wider uppercase text-header">
            {{ stat.label }}
          </p>
          <p class="mt-1 text-xs text-bodytext">{{ stat.sub }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const goLiveImage = "/" + "images/how-it-works-go-live.svg";

const { stats: live } = usePublicStats();
const SUBS = {
  planners: "Registered on Venpadi",
  eventsHosted: "Booked through Venpadi",
  liveVenues: "Listed alongside yours",
};
const stats = computed(() =>
  statTiles(live.value, ["planners", "eventsHosted", "liveVenues"]).map((t) => ({ ...t, sub: SUBS[t.key] }))
);
</script>
