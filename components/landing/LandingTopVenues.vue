<template>
  <section id="venues" class="bg-greybg py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
        <div>
          <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
            Handpicked for you
          </p>
          <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
            Top-rated venues this week
          </h2>
        </div>
        <NuxtLink
          to="/search"
          class="text-sm font-semibold text-primary hover:opacity-80 inline-flex items-center gap-1"
        >
          Explore all{{ total !== null ? ` ${Number(total).toLocaleString("en-US")}` : "" }} venues
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-5">
        <article
          v-for="venue in venues"
          :key="venue.id"
          class="bg-white rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="venue.imageUrl"
              :alt="venue.name"
              class="w-full h-full object-cover"
              @click="navigateTo(`/discover/${venue.slug}`)"
            />
            <span
              v-if="venue.badge"
              class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
              :class="badgeClass(venue.badge.key)"
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
          </div>

          <div class="p-4">
            <div class="flex items-center justify-between gap-2 text-xs text-bodytext">
              <span class="truncate">{{ venue.location }}</span>
              <span class="shrink-0 inline-flex items-center gap-0.5 font-medium text-header">
                <i class="pi pi-star-fill text-primary text-[10px]"></i>
                {{ venue.ratingAvg !== null ? Number(venue.ratingAvg).toFixed(1) : "New" }}
                <span class="text-bodytext font-normal">({{ venue.reviewCount }})</span>
              </span>
            </div>
            <h3 class="mt-1.5 text-base font-bold text-header">{{ venue.name }}</h3>
            <p class="mt-1 text-xs text-bodytext">{{ venue.meta }}</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-sm font-semibold text-header">
                From ₦ {{ amount(venue.fromPriceMinor) }}
                <span class="font-normal text-bodytext text-xs">/ {{ venue.priceUnit === "hour" ? "hour" : "day" }}</span>
              </p>
              <NuxtLink
                :to="`/discover/${venue.slug}`"
                class="text-sm font-semibold text-primary hover:opacity-80"
              >
                Book now
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  venues: { type: Array, default: () => [] },
  total: { type: Number, default: null },
  loading: { type: Boolean, default: false },
});

const { isSaved, isBusy, toggle } = useFavorites();

const BADGE_CLASSES = {
  instant: "bg-primary",
  featured: "bg-primary",
  popular: "bg-[#FF8A00]",
  verified: "bg-[#1E3A5F]",
};
const amount = (minor) =>
  minor === null || minor === undefined ? "—" : naira(minor).replace(/^₦\s?/, "");
const badgeClass = (key) => BADGE_CLASSES[key] ?? "bg-primary";
</script>
