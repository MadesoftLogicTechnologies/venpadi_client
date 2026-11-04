<template>
  <div
    id="faq-categories"
    class="sticky top-[72px] z-40 bg-white/95 backdrop-blur border-b border-border"
  >
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-3 flex items-center justify-between gap-4"
    >
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
        <a
          v-for="cat in categories"
          :key="cat.id"
          :href="`#${cat.id}`"
          class="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors"
          :class="
            active === cat.id
              ? 'bg-primary text-white'
              : 'bg-greybg text-header hover:bg-border'
          "
          @click="active = cat.id"
        >
          {{ cat.label }}
        </a>
      </div>
      <p class="hidden md2:block shrink-0 text-[11px] font-semibold text-bodytext2">
        {{ categories.length }} navigation filters
      </p>
    </div>
  </div>
</template>

<script setup>
const categories = [
  { id: "faq-getting-started", label: "Getting Started" },
  { id: "faq-listing", label: "Your Listing" },
  { id: "faq-pricing", label: "Pricing & Revenue" },
  { id: "faq-bookings", label: "Bookings & Clients" },
  { id: "faq-payments", label: "Payments & Payouts" },
  { id: "faq-support", label: "Support & Safety" },
  { id: "faq-technical", label: "Technical" },
];

const active = ref(categories[0].id);
</script>
