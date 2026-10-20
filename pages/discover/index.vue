<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px]">
    <h1 class="text-2xl font-bold text-header">Discover Venues</h1>
    <p class="mt-2 text-sm text-bodytext">
      Browse spaces available for your next event.
    </p>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md2:grid-cols-3 gap-4">
      <NuxtLink
        v-for="item in venues"
        :key="item.slug"
        :to="{
          path: `/discover/${item.slug}`,
          query: { venue: item.name, location: item.location },
        }"
        class="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow"
      >
        <div class="relative h-44">
          <img
            :src="item.image"
            :alt="item.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <h2 class="text-sm font-bold text-header">{{ item.name }}</h2>
          <p class="mt-1 text-xs text-bodytext">{{ item.location }}</p>
          <p class="mt-2 text-sm font-semibold text-header">
            {{ item.price }}
            <span class="font-medium text-bodytext">/hour</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Discover Venues" });

const venues = [
  {
    slug: "the-grand-pavilion",
    name: "The Grand Pavilion",
    location: "Victoria Island, Lagos",
    price: "₦85,000",
    image: "/images/grand-atrium.jpg",
  },
  {
    slug: "the-crystal-ballroom",
    name: "The Crystal Ballroom",
    location: "Ikoyi, Lagos",
    price: "₦75,000",
    image: "/images/skyline-conference.jpg",
  },
  {
    slug: "ocean-view-terrace",
    name: "Ocean View Terrace",
    location: "Lekki Phase 1, Lagos",
    price: "₦60,000",
    image: "/images/aurora-rooftop.jpg",
  },
  {
    slug: "the-zenith-center",
    name: "The Zenith Center",
    location: "Victoria Island, Lagos",
    price: "₦95,000",
    image: "/images/monarch-event.jpg",
  },
];
</script>
