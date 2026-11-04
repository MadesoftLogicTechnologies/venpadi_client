<template>
  <section class="bg-[#F7F5F2] py-14 md2:py-16">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <p
        class="text-center text-[11px] font-bold tracking-[0.14em] uppercase text-bodytext2 mb-6"
      >
        As featured on Venpadi
      </p>
      <div class="grid sm:grid-cols-3 gap-3 sm:gap-4">
        <img
          v-for="(src, i) in images"
          :key="i"
          :src="src"
          alt="Venue gallery"
          class="w-full aspect-[4/3] object-cover rounded-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const images = [
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=700&h=520&fit=crop",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=700&h=520&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=520&fit=crop",
];
</script>
