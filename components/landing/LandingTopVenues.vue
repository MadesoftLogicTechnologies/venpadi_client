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
          Explore all 12,000+ venues
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-5">
        <article
          v-for="venue in venues"
          :key="venue.name"
          class="bg-white rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="venue.image"
              :alt="venue.name"
              class="w-full h-full object-cover"
            />
            <span
              class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
              :class="venue.badgeClass"
            >
              {{ venue.badge }}
            </span>
            <button
              type="button"
              class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-bodytext hover:text-primary shadow-sm"
              aria-label="Save venue"
            >
              <i class="pi pi-heart text-sm"></i>
            </button>
          </div>

          <div class="p-4">
            <div class="flex items-center justify-between gap-2 text-xs text-bodytext">
              <span class="truncate">{{ venue.location }}</span>
              <span class="shrink-0 inline-flex items-center gap-0.5 font-medium text-header">
                <i class="pi pi-star-fill text-primary text-[10px]"></i>
                {{ venue.rating }}
                <span class="text-bodytext font-normal">({{ venue.reviews }})</span>
              </span>
            </div>
            <h3 class="mt-1.5 text-base font-bold text-header">{{ venue.name }}</h3>
            <p class="mt-1 text-xs text-bodytext">{{ venue.meta }}</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-sm font-semibold text-header">
                From ₦ {{ venue.price }}
                <span class="font-normal text-bodytext text-xs">/ day</span>
              </p>
              <NuxtLink
                :to="{
                  path: '/auth/signup',
                  query: { venue: venue.name, location: venue.location },
                }"
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
const venues = [
  {
    name: "The Monarch Event",
    location: "Lekki Phase 1, Lagos",
    rating: "4.9",
    reviews: "84",
    meta: "Up to 800 guests · Banquet & Theater",
    price: "650,000",
    badge: "Instant Book",
    badgeClass: "bg-primary",
    image: "/images/monarch-event.jpg",
  },
  {
    name: "Skyline Conference Hub",
    location: "Victoria Island, Lagos",
    rating: "4.8",
    reviews: "126",
    meta: "Up to 320 guests · Boardroom & Plenary",
    price: "420,000",
    badge: "Popular",
    badgeClass: "bg-[#FF8A00]",
    image: "/images/skyline-conference.jpg",
  },
  {
    name: "Palm Court Gardens",
    location: "Ikoyi, Lagos",
    rating: "5.0",
    reviews: "61",
    meta: "Up to 500 guests · Outdoor & Tent",
    price: "780,000",
    badge: "Verified",
    badgeClass: "bg-[#1E3A5F]",
    image: "/images/palm-court.jpg",
  },
  {
    name: "Aurora Rooftop Lounge",
    location: "Abuja CBD",
    rating: "4.7",
    reviews: "93",
    meta: "Up to 180 guests · Lounge & Terrace",
    price: "310,000",
    badge: "Instant Book",
    badgeClass: "bg-primary",
    image: "/images/aurora-rooftop.jpg",
  },
];
</script>
