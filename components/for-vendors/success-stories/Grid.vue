<template>
  <section class="bg-white py-10 md2:py-14">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div
        class="flex flex-col md2:flex-row md2:items-center justify-between gap-4 mb-8"
      >
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-colors"
            :class="
              active === cat
                ? 'bg-primary text-white'
                : 'bg-greybg text-header hover:bg-border'
            "
            @click="active = cat"
          >
            {{ cat }}
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-header"
          >
            All regions
            <i class="pi pi-chevron-down text-[10px]"></i>
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-header"
          >
            Sort: Most impactful
            <i class="pi pi-chevron-down text-[10px]"></i>
          </span>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-3 gap-4">
        <article
          v-for="card in filtered"
          :key="card.title"
          class="rounded-[1.25rem] border border-border overflow-hidden bg-white flex flex-col"
          :class="card.span === 2 ? 'sm:col-span-2' : ''"
        >
          <template v-if="card.type === 'quote'">
            <div
              class="h-full min-h-[260px] p-6 sm:p-7 bg-brand-gradient-soft text-white flex flex-col justify-between"
            >
              <i class="pi pi-quote-right text-3xl opacity-40"></i>
              <p class="text-base sm:text-lg font-medium leading-relaxed">
                “{{ card.quote }}”
              </p>
              <div>
                <p class="text-sm font-extrabold">{{ card.name }}</p>
                <p class="text-xs text-white/80">{{ card.role }}</p>
              </div>
            </div>
          </template>

          <template v-else>
            <div v-if="card.image" class="relative aspect-[16/10] overflow-hidden">
              <img
                :src="card.image"
                :alt="card.title"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 text-white text-[10px] font-bold tracking-wide uppercase backdrop-blur"
              >
                {{ card.tag }}
              </div>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <p
                v-if="!card.image"
                class="text-[11px] font-bold tracking-wide uppercase text-primary mb-2"
              >
                {{ card.tag }}
              </p>
              <h3 class="text-base sm:text-lg font-extrabold text-header tracking-tight leading-snug">
                {{ card.title }}
              </h3>
              <div class="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-bodytext">
                <span v-for="m in card.metrics" :key="m">{{ m }}</span>
              </div>
            </div>
          </template>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  "All stories",
  "Event halls",
  "Rooftops",
  "Garden estates",
  "Hotels",
  "Conference",
];

const active = ref("All stories");

const cards = [
  {
    type: "story",
    category: "Garden estates",
    span: 2,
    tag: "Garden estate · Lekki Phase 1",
    title:
      "How The Glass Pavilion transformed weekend gaps into midweek corporate retainer contracts",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&h=600&fit=crop",
    metrics: ["Occupancy: 88%", "Annualized rev: ₦180M"],
  },
  {
    type: "story",
    category: "Rooftops",
    tag: "Rooftop lounge · 7-min read",
    title:
      "Old GRA Terrace: Cutting 30% no-show rates to zero with 100% up-front deposits",
    image: null,
    metrics: ["₦40M recovered"],
  },
  {
    type: "story",
    category: "Conference",
    tag: "Co-working · 12-min read",
    title: "Kilimani Hub: Scaling multi-hall enterprise bookings across 4 corporate floors",
    image: null,
    metrics: ["ADR: ₦2,500,000"],
  },
  {
    type: "quote",
    category: "Event halls",
    quote:
      "I spent two years thinking a proper booking system was for big hotel chains… our boutique hall handled more volume than our entire previous quarter.",
    name: "Adura Ololade",
    role: "Owner, The Atrium Hall",
  },
  {
    type: "story",
    category: "Event halls",
    tag: "Urban space",
    title: "The Fablab Northmas: Converting an empty textile plant into tech-demo paradise",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&h=480&fit=crop",
    metrics: ["₦110M profit/yr"],
  },
  {
    type: "story",
    category: "Hotels",
    tag: "Hotel & club",
    title: "Atlantic Cliff House: Mastering global destination micro-weddings",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=480&fit=crop",
    metrics: ["350% ROI increase"],
  },
];

const filtered = computed(() => {
  if (active.value === "All stories") return cards;
  return cards.filter((c) => c.category === active.value);
});
</script>
