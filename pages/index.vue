<template>
  <div class="bg-white min-h-screen">
    <LandingNav />
    <LandingHero />
    <LandingStats />
    <LandingCategories />
    <LandingTopVenues />
    <LandingHowItWorks />
    <LandingTestimonials />
    <LandingDestinations />
    <LandingVendorsCta />
    <LandingOwners />
    <LandingFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Book the perfect venue, anywhere",
  meta: [
    {
      name: "description",
      content:
        "Discover and book verified event venues worldwide with Venpadi — compare, reserve, and manage in one platform.",
    },
  ],
});
</script>
