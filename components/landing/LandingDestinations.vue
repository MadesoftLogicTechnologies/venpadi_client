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
          :key="dest.name"
          class="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
        >
          <img
            :src="dest.image"
            :alt="dest.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 class="text-xl font-bold">{{ dest.name }}</h3>
            <p class="mt-1 text-sm text-white/80">{{ dest.meta }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const cities = [
  "All Cities",
  "Lagos",
  "Abuja",
  "London",
  "Dubai",
  "Nairobi",
  "Accra",
];

const activeCity = ref("All Cities");

const destinations = [
  {
    name: "Lagos",
    meta: "4,200+ Spaces · $150/hr avg",
    image: "/images/dest-lagos.jpg",
  },
  {
    name: "Abuja",
    meta: "1,800+ Spaces · $120/hr avg",
    image: "/images/dest-abuja.jpg",
  },
  {
    name: "London",
    meta: "3,100+ Spaces · $220/hr avg",
    image: "/images/dest-london.jpg",
  },
  {
    name: "Dubai",
    meta: "2,400+ Spaces · $280/hr avg",
    image: "/images/dest-dubai.jpg",
  },
];

const filteredDestinations = computed(() => {
  if (activeCity.value === "All Cities") return destinations;
  return destinations.filter((d) => d.name === activeCity.value);
});
</script>
