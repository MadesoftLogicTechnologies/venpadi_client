<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsAboutHero />
      <ForVendorsAboutBeginning />
      <ForVendorsAboutBeliefs />
      <ForVendorsAboutConviction />
      <ForVendorsAboutMission />
      <ForVendorsAboutNumbers />
      <ForVendorsAboutCommitment />
      <ForVendorsAboutCareers />
      <ForVendorsAboutPress />
      <ForVendorsAboutPageCta />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "About Us — For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "Venpadi is the operating system for modern venues — built by Madesoft in Lagos for owners who want infrastructure, not another directory.",
    },
  ],
});
</script>
