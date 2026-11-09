<template>
  <section class="bg-white py-16 md2:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="flex flex-col md2:flex-row md2:items-end md2:justify-between gap-4 mb-10">
        <div class="max-w-xl">
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            All spaces welcome
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight"
          >
            Every space has a story. Venpadi helps you tell it.
          </h2>
        </div>
        <p class="text-sm text-bodytext leading-relaxed max-w-md md2:text-right">
          Whether you host 2,000 guests in a grand ballroom or 12 leaders in an
          architectural penthouse, your venue belongs here.
        </p>
      </div>

      <div class="grid grid-cols-2 md2:grid-cols-12 gap-3 sm:gap-4">
        <article
          v-for="cat in categories"
          :key="cat.name"
          class="group relative h-[180px] sm:h-[200px] md2:h-[220px] rounded-2xl overflow-hidden border border-border"
          :class="cat.span"
        >
          <img
            :src="cat.image"
            :alt="cat.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"></div>
          <span
            class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/45 text-[10px] font-bold text-white backdrop-blur-sm"
          >
            {{ cat.count }} Listed
          </span>
          <div class="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
            <p class="text-sm sm:text-base font-extrabold text-white">{{ cat.name }}</p>
            <p class="mt-0.5 text-[11px] sm:text-xs text-white/75">{{ cat.hint }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    name: "Event Halls & Banquets",
    hint: "Weddings, galas, annual general meetings",
    count: "1,248",
    span: "col-span-2 md2:col-span-5",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2c4?w=900&h=700&fit=crop",
  },
  {
    name: "Rooftops & Terraces",
    hint: "Sunset cocktails, launches, VIP nights",
    count: "642",
    span: "col-span-2 md2:col-span-4",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=700&fit=crop",
  },
  {
    name: "Content Studios",
    hint: "Brand shoots, creator sets",
    count: "318",
    span: "col-span-1 md2:col-span-3",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=700&fit=crop",
  },
  {
    name: "Photo & Cycloramas",
    hint: "Product & fashion studios",
    count: "214",
    span: "col-span-1 md2:col-span-3",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop",
  },
  {
    name: "Music Studios",
    hint: "Recording & rehearsal",
    count: "189",
    span: "col-span-1 md2:col-span-3",
    image: "https://images.unsplash.com/photo-1598653226834-0d0f4c0b0b8a?w=500&h=400&fit=crop",
  },
  {
    name: "Podcast & Broadcast Lounges",
    hint: "Interview sets, live streams",
    count: "156",
    span: "col-span-2 md2:col-span-6",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&h=400&fit=crop",
  },
  {
    name: "Film & Sound Stages",
    hint: "Production & commercial shoots",
    count: "97",
    span: "col-span-2 md2:col-span-5",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=400&fit=crop",
  },
  {
    name: "Shortlet Apartments & Penthouses",
    hint: "Intimate dinners, retreats",
    count: "1,102",
    span: "col-span-1 md2:col-span-4",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=400&fit=crop",
  },
  {
    name: "Garden Estates & Outdoor",
    hint: "Receptions under the trees",
    count: "428",
    span: "col-span-1 md2:col-span-3",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=400&fit=crop",
  },
  {
    name: "Conference Centres",
    hint: "Keynotes, AGMs, summits",
    count: "376",
    span: "col-span-2 md2:col-span-5",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
  },
  {
    name: "Hotels & Resorts",
    hint: "Banquets with lodging",
    count: "512",
    span: "col-span-1 md2:col-span-4",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=400&fit=crop",
  },
  {
    name: "Art Galleries & Showrooms",
    hint: "Exhibitions & product launches",
    count: "143",
    span: "col-span-1 md2:col-span-3",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=400&fit=crop",
  },
];
</script>
