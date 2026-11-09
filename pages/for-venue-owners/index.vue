<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsHero />
      <ForVendorsProof />
      <ForVendorsDashboard />
      <ForVendorsHowItWorks />
      <ForVendorsCompare />
      <ForVendorsCategories />
      <ForVendorsFaq />
      <ForVendorsCta />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "List your venue on Venpadi for free. Fill empty dates with verified hosts, manage bookings, and get paid securely.",
    },
  ],
});
</script>
