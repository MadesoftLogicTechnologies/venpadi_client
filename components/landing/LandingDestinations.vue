<template>
  <section class="bg-white py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="mb-8">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Global presence
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          Explore venues by destination
        </h2>
      </div>

      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="city in cities"
          :key="city"
          type="button"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="
            activeCity === city
              ? 'bg-primary text-white'
              : 'bg-white border border-border text-header hover:bg-greybg'
          "
          @click="activeCity = city"
        >
          {{ city }}
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-4 sm:gap-5">
        <article
          v-for="dest in filteredDestinations"
          :key="dest.city"
          class="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
          @click="navigateTo({ path: '/search', query: { city: dest.city } })"
        >
          <img
            :src="dest.imageUrl"
            :alt="dest.city"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 class="text-xl font-bold">{{ dest.city }}</h3>
            <p class="mt-1 text-sm text-white/80">{{ meta(dest) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  destinations: { type: Array, default: () => [] },
});

const ALL = "All Cities";
const activeCity = ref(ALL);

const cities = computed(() => [ALL, ...props.destinations.map((d) => d.city)]);

const filteredDestinations = computed(() => {
  if (activeCity.value === ALL) return props.destinations;
  return props.destinations.filter((d) => d.city === activeCity.value);
});

function meta(dest) {
  const spaces = `${Number(dest.spacesCount).toLocaleString("en-US")} ${dest.spacesCount === 1 ? "Space" : "Spaces"}`;
  return dest.avgHourlyMinor === null || dest.avgHourlyMinor === undefined
    ? spaces
    : `${spaces} · ${naira(dest.avgHourlyMinor)}/hr avg`;
}
</script>
