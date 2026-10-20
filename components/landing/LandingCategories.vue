<template>
  <section class="bg-white py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="flex flex-col md2:flex-row md2:items-end md2:justify-between gap-4 mb-10">
        <div>
          <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
            What are you planning?
          </p>
          <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
            Find venues built for your event
          </h2>
        </div>
        <p class="text-bodytext max-w-md text-sm sm:text-base leading-relaxed md2:text-right">
          Every space is professionally curated for acoustics, capacity, and
          aesthetic — so your next gathering feels intentional from the first look.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-3 gap-4 sm:gap-5">
        <article
          v-for="cat in categories"
          :key="cat.title"
          class="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
        >
          <img
            :src="cat.image"
            :alt="cat.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10"
          ></div>

          <span
            class="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-header"
          >
            {{ cat.spaces }}
          </span>

          <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 class="text-lg sm:text-xl font-bold">{{ cat.title }}</h3>
            <p class="mt-1 text-sm text-white/80">{{ cat.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    title: "Weddings",
    spaces: "3,600+ Spaces",
    description: "Romantic gardens, historic manors & grand estates",
    image: "/images/cat-wedding.jpg",
  },
  {
    title: "Conferences & Corporate",
    spaces: "2,800+ Spaces",
    description: "Boardrooms, auditoriums & hybrid-ready halls",
    image: "/images/cat-conference.jpg",
  },
  {
    title: "Birthdays & Celebrations",
    spaces: "4,100+ Spaces",
    description: "Rooftops, lounges & private dining rooms",
    image: "/images/cat-birthday.jpg",
  },
  {
    title: "Outdoor & Garden",
    spaces: "1,900+ Spaces",
    description: "Lawns, tents & scenic open-air venues",
    image: "/images/cat-outdoor.jpg",
  },
  {
    title: "Training & Workshops",
    spaces: "2,200+ Spaces",
    description: "Bright studios & collaborative workspaces",
    image: "/images/cat-workshop.jpg",
  },
  {
    title: "Concerts & Performances",
    spaces: "980+ Spaces",
    description: "Theaters, stages & acoustic-ready rooms",
    image: "/images/cat-concert.jpg",
  },
];
</script>
