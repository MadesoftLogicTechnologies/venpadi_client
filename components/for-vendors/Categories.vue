<template>
  <section class="bg-white py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Venue types we fill
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          Whatever you operate — hosts are searching for it.
        </h2>
      </div>

      <div class="grid grid-cols-2 md2:grid-cols-4 gap-3 sm:gap-4">
        <article
          v-for="cat in categories"
          :key="cat.name"
          class="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border"
        >
          <img
            :src="cat.image"
            :alt="cat.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <p class="text-sm sm:text-base font-extrabold text-white">{{ cat.name }}</p>
            <p class="text-[11px] sm:text-xs text-white/75 mt-0.5">{{ cat.hint }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    name: "Ballrooms",
    hint: "Weddings & galas",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2c4?w=600&h=450&fit=crop",
  },
  {
    name: "Gardens & outdoors",
    hint: "Receptions & parties",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=450&fit=crop",
  },
  {
    name: "Conference halls",
    hint: "Corporate & trainings",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop",
  },
  {
    name: "Rooftops",
    hint: "Cocktails & launches",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=450&fit=crop",
  },
  {
    name: "Hotels & resorts",
    hint: "Multi-day events",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=450&fit=crop",
  },
  {
    name: "Studios & lofts",
    hint: "Shoots & intimate events",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=450&fit=crop",
  },
  {
    name: "Banquet centres",
    hint: "Large receptions",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=450&fit=crop",
  },
  {
    name: "Unique spaces",
    hint: "Warehouses, boats & more",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=450&fit=crop",
  },
];
</script>
