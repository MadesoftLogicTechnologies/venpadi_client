<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsFaqsHero />
      <ForVendorsFaqsCategoryNav />
      <ForVendorsFaqsSections />
      <ForVendorsFaqsSupport />
      <ForVendorsFaqsPageCta />
      <ForVendorsFaqsStatsBar />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "FAQs — For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "Everything venue owners ask about listing, pricing, bookings, payouts, and support on Venpadi — answered plainly.",
    },
  ],
});
</script>
