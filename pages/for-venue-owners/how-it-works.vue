<template>
  <div class="min-h-screen bg-white font-sans antialiased">
    <ForVendorsNav />
    <main>
      <ForVendorsHowItWorksHero />
      <ForVendorsHowItWorksStepNav />
      <ForVendorsHowItWorksStep01 />
      <ForVendorsHowItWorksStep02 />
      <ForVendorsHowItWorksStep03 />
      <ForVendorsHowItWorksStep04 />
      <ForVendorsHowItWorksStep05 />
      <ForVendorsHowItWorksStep06 />
      <ForVendorsHowItWorksStep07 />
      <ForVendorsHowItWorksSummary />
      <ForVendorsHowItWorksStories />
      <ForVendorsHowItWorksPageCta />
    </main>
    <ForVendorsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "How it Works — For Venue Owners",
  meta: [
    {
      name: "description",
      content:
        "From empty calendar to fully booked — the step-by-step blueprint for listing your venue on Venpadi, winning enquiries, and getting paid.",
    },
  ],
});
</script>
