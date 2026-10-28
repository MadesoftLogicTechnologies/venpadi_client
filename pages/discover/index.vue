<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 w-full">
    <h1 class="text-2xl font-bold text-header">Discover Venues</h1>
    <p class="mt-2 text-sm text-bodytext">
      Browse spaces available for your next event.
    </p>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md2:grid-cols-3 gap-4">
      <NuxtLink
        v-for="item in venues"
        :key="item.id"
        :to="`/discover/${item.slug}`"
        class="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow"
      >
        <div class="relative h-44">
          <img
            :src="item.imageUrl"
            :alt="item.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <h2 class="text-sm font-bold text-header">{{ item.name }}</h2>
          <p class="mt-1 text-xs text-bodytext">{{ item.location }}</p>
          <p class="mt-2 text-sm font-semibold text-header">
            {{ price(item) }}
            <span class="font-medium text-bodytext">/{{ unit(item) }}</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Discover Venues" });

// Master's grid has no pager or search: one larger page of published venues.
const { data } = useResource(() => api.get("/public/venues", { page: 1, limit: 60 }), {
  initial: { rows: [], total: 0 },
});
const venues = computed(() => data.value?.rows ?? []);

const hasHourly = (item) => item.fromHourlyMinor !== null && item.fromHourlyMinor !== undefined;
const price = (item) => {
  const minor = hasHourly(item) ? item.fromHourlyMinor : item.fromDayMinor;
  return minor === null || minor === undefined ? "—" : naira(minor);
};
const unit = (item) => (hasHourly(item) || item.fromDayMinor === null || item.fromDayMinor === undefined ? "hour" : "day");
</script>
