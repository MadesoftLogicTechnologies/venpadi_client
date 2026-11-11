<template>
  <!-- Host testimonials from GET /public/content/testimonials?audience=host.
       The former case-study cards (named venues, occupancy and revenue figures)
       were invented; with no published testimonials the section hides. -->
  <section v-if="testimonials.length" class="bg-white py-10 md2:py-14">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid sm:grid-cols-2 md2:grid-cols-3 gap-4">
        <article
          v-for="t in testimonials"
          :key="t.id"
          class="rounded-[1.25rem] border border-border overflow-hidden bg-white p-6 sm:p-7 flex flex-col justify-between min-h-[220px]"
        >
          <div>
            <div v-if="testimonialStars(t)" class="flex gap-0.5 mb-4" :aria-label="`${testimonialStars(t)} out of 5 stars`">
              <i v-for="n in testimonialStars(t)" :key="n" class="pi pi-star-fill text-primary text-sm"></i>
            </div>
            <i v-else class="pi pi-quote-right text-2xl text-primary/40"></i>
            <p class="mt-3 text-sm sm:text-base text-header leading-relaxed">“{{ t.quote }}”</p>
          </div>
          <div class="mt-6 flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              :style="{ background: t.color || '#1F2937' }"
            >
              {{ t.initials || initials(t.name) }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-extrabold text-header">{{ t.name }}</p>
              <p v-if="t.role" class="text-xs text-bodytext">{{ t.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { testimonials } = usePublicTestimonials("host");
</script>
