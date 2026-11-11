<template>
  <section v-if="testimonials.length" class="bg-greybg py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Trusted by professionals
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight max-w-xl">
          Loved by{{ planners ? ` ${Number(planners).toLocaleString("en-US")}` : "" }} planners and event hosts
        </h2>
      </div>

      <div class="grid md2:grid-cols-3 gap-5">
        <article
          v-for="item in testimonials"
          :key="item.id"
          class="bg-white rounded-2xl border border-border p-6 shadow-sm"
        >
          <!-- C16: stars only for a testimonial that carries a rating, and
               exactly that many — never a default five. -->
          <div v-if="starCount(item)" class="flex gap-0.5 mb-4" :aria-label="`${starCount(item)} out of 5 stars`">
            <i
              v-for="n in starCount(item)"
              :key="n"
              class="pi pi-star-fill text-primary text-sm"
            ></i>
          </div>
          <p class="text-sm text-header leading-relaxed">“{{ item.quote }}”</p>
          <div class="mt-6 flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              :style="{ background: item.color }"
            >
              {{ item.initials }}
            </div>
            <div>
              <p class="text-sm font-semibold text-header">{{ item.name }}</p>
              <p class="text-xs text-bodytext">{{ item.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  testimonials: { type: Array, default: () => [] },
  planners: { type: Number, default: null },
});

const starCount = (t) => {
  const r = Number(t?.rating);
  return t?.rating === null || t?.rating === undefined || !Number.isFinite(r) ? 0 : Math.max(0, Math.min(5, Math.round(r)));
};
</script>
