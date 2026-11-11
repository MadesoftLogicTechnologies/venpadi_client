<template>
  <section v-if="tiles.length" class="bg-[#141414] text-white py-16 md2:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        Venpadi today
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight leading-tight max-w-3xl"
      >
        Live figures from the marketplace.
      </h2>

      <div class="mt-12 grid sm:grid-cols-2 md2:grid-cols-4 gap-8 md2:gap-6">
        <div v-for="stat in tiles" :key="stat.key">
          <p class="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-sm font-bold">{{ stat.label }}</p>
        </div>
      </div>

      <div
        class="mt-12 pt-10 border-t border-white/10 grid sm:grid-cols-2 gap-6"
      >
        <div
          v-for="item in secondary"
          :key="item.label"
          class="flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0"
          >
            <i :class="['pi text-sm', item.icon]"></i>
          </div>
          <div>
            <p class="text-lg font-extrabold tracking-tight">{{ item.value }}</p>
            <p class="mt-1 text-xs text-white/50 leading-relaxed">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Every figure comes from GET /public/stats; a zero or missing figure hides its
// tile, and the section hides with no tiles (audit WP2 — the old ₦420M+,
// 1,200+, 190+ and 4.8/5 were invented).
const { stats, rates } = usePublicStats();

const tiles = computed(() =>
  statTiles(stats.value, ["gmvProcessedMinor", "hosts", "eventsHosted", "averageRating"], {
    averageRating: "Average review rating",
  })
);

// Policy facts, not performance claims: the fee comes from the live rates, the
// payout timing from the escrow rule (completed event + 48h window).
const secondary = computed(() =>
  [
    hostFeeLabel(rates.value) && {
      value: hostFeeLabel(rates.value),
      label: "Host fee on completed bookings — listing your venue is free",
      icon: "pi-percentage",
    },
    {
      value: "48 hrs",
      label: "Window after a completed event before its funds become available for payout",
      icon: "pi-wallet",
    },
  ].filter(Boolean)
);
</script>
