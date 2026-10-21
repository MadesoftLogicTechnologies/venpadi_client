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
          :key="cat.key"
          class="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
          @click="navigateTo({ path: '/search', query: { eventType: cat.key } })"
        >
          <img
            :src="cat.imageUrl"
            :alt="cat.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10"
          ></div>

          <span
            class="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-header"
          >
            {{ Number(cat.spacesCount).toLocaleString("en-US") }}
            {{ cat.spacesCount === 1 ? "Space" : "Spaces" }}
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
defineProps({
  categories: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});
</script>
