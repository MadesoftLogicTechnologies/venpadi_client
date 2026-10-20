<template>
  <section class="space-y-12 md2:space-y-14">
    <div>
      <h2 class="text-[20px] font-bold text-header">Reviews</h2>
      <div class="mt-5 md2:flex md2:items-center md2:gap-10">
        <div class="shrink-0">
          <p class="text-[40px] font-extrabold text-header leading-none">4.9</p>
          <div class="mt-2 flex gap-0.5 text-[#F5A524]">
            <i v-for="n in 5" :key="n" class="pi pi-star-fill text-[11px]"></i>
          </div>
          <p class="mt-1 text-[12px] text-bodytext">Based on 142 reviews</p>
        </div>
        <div class="mt-5 md2:mt-0 flex-1 max-w-[360px] space-y-1.5">
          <div
            v-for="row in histogram"
            :key="row.stars"
            class="flex items-center gap-2 text-[12px] text-bodytext"
          >
            <span class="w-3">{{ row.stars }}</span>
            <div class="flex-1 h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                class="h-full rounded-full bg-primary"
                :style="{ width: `${row.pct}%` }"
              ></div>
            </div>
            <span class="w-8 text-right">{{ row.pct }}%</span>
          </div>
        </div>
      </div>

      <div
        class="mt-6 grid grid-cols-2 md2:grid-cols-4 gap-4 pt-5 border-t border-border"
      >
        <div v-for="metric in metrics" :key="metric.label" class="flex items-start gap-2">
          <i :class="['pi text-[#9CA3AF] text-[13px] mt-0.5', metric.icon]"></i>
          <div>
            <p class="text-[12px] text-bodytext">{{ metric.label }}</p>
            <p class="mt-0.5 text-[14px] font-bold text-header">{{ metric.value }}</p>
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md2:grid-cols-2 gap-5">
        <article
          v-for="review in reviews"
          :key="review.name"
          class="bg-white rounded-2xl p-5"
        >
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-greybg">
              <img :src="review.avatar" alt="" class="w-full h-full object-cover" />
            </span>
            <div>
              <p class="text-[14px] font-semibold text-header">{{ review.name }}</p>
              <p class="text-[12px] text-bodytext">{{ review.date }}</p>
            </div>
          </div>
          <div class="mt-3 flex gap-0.5 text-[#F5A524]">
            <i v-for="n in 5" :key="n" class="pi pi-star-fill text-[10px]"></i>
          </div>
          <p class="mt-3 text-[13px] text-bodytext leading-relaxed">
            {{ review.body }}
          </p>
        </article>
      </div>

      <button
        type="button"
        class="mt-6 h-9 px-4 rounded-full border border-border bg-white text-[13px] font-medium text-header hover:bg-greybg"
      >
        Show all 142 reviews
      </button>
    </div>

    <div>
      <h2 class="text-[20px] font-bold text-header">You Might Also Like</h2>
      <div class="mt-5 grid grid-cols-1 md2:grid-cols-3 gap-5">
        <article v-for="card in similar" :key="card.name">
          <div class="relative h-[180px] md2:h-[196px] rounded-2xl overflow-hidden">
            <img
              :src="card.image"
              :alt="card.name"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <span
              class="absolute bottom-3 left-3 inline-flex items-center gap-1 text-white text-[12px] font-semibold drop-shadow"
            >
              <i class="pi pi-star-fill text-[#F5A524] text-[10px]"></i>
              {{ card.rating }}
            </span>
          </div>
          <div class="pt-3">
            <h3 class="text-[14px] font-bold text-header">{{ card.name }}</h3>
            <p class="mt-0.5 text-[12px] text-bodytext">{{ card.location }}</p>
            <p class="mt-1.5 text-[13px] font-semibold text-header">
              {{ card.price }}
              <span class="font-medium text-bodytext">/hour</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const histogram = [
  { stars: 5, pct: 98 },
  { stars: 4, pct: 2 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

const metrics = [
  { label: "Cleanliness", value: "4.9", icon: "pi-star" },
  { label: "Location", value: "5.0", icon: "pi-map-marker" },
  { label: "Communication", value: "4.8", icon: "pi-comment" },
  { label: "Value", value: "4.7", icon: "pi-tag" },
];

const reviews = [
  {
    name: "Chioma Okolie",
    date: "Oct 2023",
    avatar: "/images/cat-wedding.jpg",
    body: "Absolutely stunning venue! The chandeliers gave the hall such an elegant feel. The staff was incredibly helpful throughout our corporate gala. Highly recommend for any premium event.",
  },
  {
    name: "Babatunde Silva",
    date: "Sept 2023",
    avatar: "/images/cat-conference.jpg",
    body: "Great location in VI, easy to find and the valet service was top-notch. The acoustics in the hall were perfect for our conference speakers. Will definitely book again.",
  },
];

const similar = [
  {
    name: "The Crystal Ballroom",
    location: "Ikoyi, Lagos",
    price: "₦75,000",
    rating: "4.8",
    image: "/images/skyline-conference.jpg",
  },
  {
    name: "Ocean View Terrace",
    location: "Lekki Phase 1, Lagos",
    price: "₦60,000",
    rating: "4.9",
    image: "/images/aurora-rooftop.jpg",
  },
  {
    name: "The Zenith Center",
    location: "Victoria Island, Lagos",
    price: "₦95,000",
    rating: "4.7",
    image: "/images/monarch-event.jpg",
  },
];
</script>
