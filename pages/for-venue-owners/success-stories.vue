<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsSuccessStoriesHero />
      <ForVendorsSuccessStoriesGrid />
      <ForVendorsSuccessStoriesStatsBar />
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
        "What venue owners say about running their bookings on Venpadi, with the marketplace's live figures.",
    },
  ],
});
</script>
