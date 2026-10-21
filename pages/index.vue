<template>
  <div class="bg-white min-h-screen">
    <LandingNav />
    <LandingHero :venue="landing?.topVenues?.[0] ?? null" />
    <LandingStats :stats="landing?.stats ?? null" />
    <LandingCategories :categories="landing?.categories ?? []" :loading="pending && !landing" />
    <LandingTopVenues
      :venues="landing?.topVenues ?? []"
      :total="landing?.stats?.liveVenues ?? null"
      :loading="pending && !landing"
    />
    <LandingHowItWorks />
    <LandingTestimonials
      :testimonials="landing?.testimonials ?? []"
      :planners="landing?.stats?.planners ?? null"
    />
    <LandingDestinations :destinations="landing?.destinations ?? []" />
    <LandingVendorsCta />
    <LandingOwners />
    <LandingFooter />
  </div>
</template>

<script setup>
// One call feeds every landing section: stats, categories, top venues,
// testimonials and destinations.
const { data: landing, pending } = useResource(() =>
  api.get("/public/landing", undefined, { toast: false })
);

definePageMeta({
  layout: "plain",
});

useHead({
  title: "Book the perfect venue, anywhere",
  meta: [
    {
      name: "description",
      content:
        "Discover and book verified event venues worldwide with Venpadi — compare, reserve, and manage in one platform.",
    },
  ],
});
</script>
