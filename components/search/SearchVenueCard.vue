<template>
  <article
    class="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    :class="list ? 'sm:flex-row' : ''"
  >
    <div
      class="relative overflow-hidden bg-greybg"
      :class="list ? 'sm:w-[280px] aspect-[4/3] sm:aspect-auto sm:min-h-[220px] shrink-0' : 'aspect-[4/3]'"
    >
      <img
        :src="venue.imageUrl"
        :alt="venue.name"
        class="absolute inset-0 w-full h-full object-cover"
        @click="navigateTo(`/discover/${venue.slug}`)"
      />

      <span
        v-if="venue.badge"
        class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
        :class="badgeClass"
      >
        {{ venue.badge.label }}
      </span>

      <button
        type="button"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-bodytext hover:text-primary shadow-sm"
        aria-label="Save venue"
        :disabled="isBusy(venue.id)"
        @click="toggle(venue.id)"
      >
        <i class="pi pi-heart text-sm" :class="{ 'text-primary': isSaved(venue.id) }"></i>
      </button>

      <div
        v-if="hasDots"
        class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
      >
        <span
          v-for="i in Math.min(venue.photoCount, 5)"
          :key="i"
          class="w-1.5 h-1.5 rounded-full"
          :class="i === 1 ? 'bg-white' : 'bg-white/50'"
        ></span>
      </div>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-center justify-between gap-2 text-xs text-bodytext">
        <span class="truncate flex items-center gap-1">
          <i class="pi pi-map-marker text-[10px]"></i>
          {{ venue.location }}
        </span>
        <span
          class="shrink-0 inline-flex items-center gap-0.5 font-medium text-header"
        >
          <i class="pi pi-star-fill text-primary text-[10px]"></i>
          {{ venue.ratingAvg !== null ? Number(venue.ratingAvg).toFixed(1) : "New" }}
          <span class="text-bodytext font-normal">({{ venue.reviewCount }})</span>
        </span>
      </div>

      <h3
        class="mt-1.5 text-base font-bold text-header leading-snug"
        @click="navigateTo(`/discover/${venue.slug}`)"
      >
        {{ venue.name }}
      </h3>
      <p class="mt-1 text-xs text-bodytext">{{ venue.meta }}</p>

      <p
        v-if="venue.availabilityLabel"
        class="mt-2 text-xs font-medium text-success flex items-center gap-1"
      >
        <i class="pi pi-check-circle text-[11px]"></i>
        {{ venue.availabilityLabel }}
      </p>

      <div class="mt-auto pt-4 flex items-center justify-between gap-3">
        <div>
          <p class="text-[11px] text-bodytext2">From</p>
          <p class="text-sm font-bold text-header">₦ {{ amount }}</p>
        </div>
        <NuxtLink
          :to="`/discover/${venue.slug}`"
          class="px-4 py-2 rounded-full bg-brand-gradient-soft text-white text-xs font-semibold hover:opacity-95 shrink-0"
        >
          Book Now
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, required: true },
  list: { type: Boolean, default: false },
});

const { isSaved, isBusy, toggle } = useFavorites();

const BADGE_CLASSES = {
  featured: "bg-primary",
  instant: "bg-primary",
  popular: "bg-[#FF8A00]",
  verified: "bg-[#1E3A5F]",
};
const hasDots = computed(() => Number(props.venue.photoCount) > 1);
const amount = computed(() => {
  const m = props.venue.fromPriceMinor;
  if (m === null || m === undefined) return "—";
  return `${naira(m).replace(/^₦\s?/, "")}${props.venue.priceUnit === "hour" ? " / hour" : ""}`;
});
const badgeClass = computed(() => BADGE_CLASSES[props.venue.badge?.key] ?? "bg-primary");
</script>
