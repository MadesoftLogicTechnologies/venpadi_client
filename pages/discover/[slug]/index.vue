<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1080px] space-y-10 md2:space-y-14 pb-6">
      <DiscoverVenueHeroSection :venue="venue" @select-date="() => goToSetup()" />
      <DiscoverVenueSpacesSection />
      <DiscoverVenueLocationSection />
      <DiscoverVenueReviewsSection />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { goToSetup } = useVenueSetupNav();

const venue = computed(() => ({
  name: (route.query.venue && String(route.query.venue)) || "The Grand Pavilion",
  location:
    (route.query.location && String(route.query.location)) ||
    "Victoria Island, Lagos",
}));

useHead({
  title: venue.value.name,
  meta: [
    {
      name: "description",
      content: `View details, spaces, and reviews for ${venue.value.name}.`,
    },
  ],
});
</script>
