<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsPrivacyHero />
      <ForVendorsPrivacyDocument />
      <ForVendorsPrivacyRelated />
      <ForVendorsPrivacyTrust />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Privacy Policy — For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "How Venpadi collects, uses, shares, and protects venue owner data — written to be readable, GDPR and NDPR aligned.",
    },
  ],
});
</script>
