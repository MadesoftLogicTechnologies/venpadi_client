<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsSuccessStoriesHero />
      <ForVendorsSuccessStoriesFeatured />
      <ForVendorsSuccessStoriesGrid />
      <ForVendorsSuccessStoriesSpotlight />
      <ForVendorsSuccessStoriesStatsBar />
      <ForVendorsSuccessStoriesDeepDive />
      <ForVendorsSuccessStoriesQuote />
      <ForVendorsSuccessStoriesByTheNumbers />
      <ForVendorsSuccessStoriesGallery />
      <ForVendorsSuccessStoriesPageCta />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Success Stories — For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "Real venues. Real numbers. Explore how Nigerian venue owners filled calendars, cut no-shows, and grew revenue on Venpadi.",
    },
  ],
});
</script>
