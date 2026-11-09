<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsTermsHero />
      <ForVendorsTermsBrief />
      <ForVendorsTermsDocument />
      <ForVendorsTermsRelated />
      <ForVendorsTermsPageCta />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Terms of Service — For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "Plain-language Terms of Service for Venpadi venue owners covering listings, bookings, fees, payouts, and dispute resolution.",
    },
  ],
});
</script>
