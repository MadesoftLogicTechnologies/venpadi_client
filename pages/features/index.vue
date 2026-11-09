<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsFeaturesNav />
    <main>
      <ForVendorsFeaturesHero />
      <ForVendorsFeaturesOverview />
      <ForVendorsFeaturesListings />
      <ForVendorsFeaturesBookings />
      <ForVendorsFeaturesPayments />
      <ForVendorsFeaturesAnalytics />
      <ForVendorsFeaturesMessaging />
      <ForVendorsFeaturesVendors />
      <ForVendorsFeaturesTrust />
      <ForVendorsFeaturesCompare />
      <ForVendorsFeaturesTestimonials />
      <ForVendorsFeaturesPricing />
      <ForVendorsFeaturesPageCta />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Features — Venpadi",
  meta: [
    {
      name: "description",
      content:
        "Listings, bookings, escrow payments, analytics, messaging, vendors, and trust — the full Venpadi operating system for venue owners.",
    },
  ],
});
</script>
