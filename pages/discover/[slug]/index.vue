<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1080px] space-y-10 md2:space-y-14 pb-6">
      <DiscoverVenueHeroSection :venue="view" :selected-space="selectedSpace" @select-date="startBooking" />
      <DiscoverVenueSpacesSection v-model:selected-id="selectedId" :venue="view" />
      <DiscoverVenueLocationSection :venue="view" />
      <DiscoverVenueReviewsSection :venue="view" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { goToSetup } = useVenueSetupNav();

const slug = computed(() => String(route.params.slug || ""));

const { data: venue } = useResource(
  () => api.get(`/public/venues/${encodeURIComponent(slug.value)}`),
  { watch: [slug] }
);

const selectedId = ref(String(route.query.spaceId || ""));
watch(venue, (v) => {
  if (!v) return;
  if (!v.spaces?.some((s) => s.id === selectedId.value)) {
    selectedId.value = v.spaces?.find((s) => s.isPrimary)?.id || v.spaces?.[0]?.id || "";
  }
});
// While the venue loads (or if it is missing) the page renders its normal
// layout with empty data; a failed load is surfaced by the toast below.
const EMPTY = { name: "", spaces: [], gallery: [], highlights: [], amenities: [], location: {} };
const view = computed(() => venue.value ?? EMPTY);

function startBooking() {
  return goToSetup(selectedSpace.value ? { spaceId: selectedSpace.value.id } : {});
}

const selectedSpace = computed(() => venue.value?.spaces?.find((s) => s.id === selectedId.value) ?? null);

useHead(() => ({
  title: venue.value?.name || "Venue",
  meta: [
    {
      name: "description",
      content: venue.value
        ? `View details, spaces, and reviews for ${venue.value.name}.`
        : "Venue details on Venpadi.",
    },
  ],
}));
</script>
