<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsAboutHero />
      <ForVendorsAboutBeginning />
      <ForVendorsAboutBeliefs />
      <ForVendorsAboutConviction />
      <ForVendorsAboutPeople />
      <ForVendorsAboutMission />
      <ForVendorsAboutJourney />
      <ForVendorsAboutNumbers />
      <ForVendorsAboutCommitment />
      <ForVendorsAboutPress />
      <ForVendorsAboutCareers />
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
