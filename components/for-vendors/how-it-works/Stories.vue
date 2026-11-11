<template>
  <!-- Host testimonials from GET /public/content/testimonials?audience=host,
       hidden when there are none. The named owners, their "₦12.4M earned"
       figures and the "4.8 / 5 from 1,240+ owner reviews" card were invented. -->
  <section v-if="stories.length" class="bg-[#F7F5F2] py-16 md2:py-24">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center mb-10">
        <p class="text-xs font-bold tracking-[0.14em] uppercase text-primary mb-2">
          Owner Stories
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.4rem] font-extrabold text-header tracking-tight">
          Don't take our word for it.
        </h2>
      </div>

      <div class="grid md2:grid-cols-3 gap-4 md2:gap-5">
        <article
          v-for="story in stories"
          :key="story.id"
          class="rounded-[1.5rem] border border-border bg-white p-6 sm:p-7 flex flex-col shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
        >
          <div
            v-if="testimonialStars(story)"
            class="flex gap-0.5 text-primary text-sm mb-4"
            :aria-label="`${testimonialStars(story)} out of 5 stars`"
          >
            <i v-for="n in testimonialStars(story)" :key="n" class="pi pi-star-fill"></i>
          </div>
          <p class="text-sm sm:text-[15px] text-header/85 leading-relaxed italic flex-1">
            “{{ story.quote }}”
          </p>
          <div class="mt-6 pt-4 border-t border-border">
            <p class="text-sm font-extrabold text-header">{{ story.name }}</p>
            <p class="text-xs text-bodytext mt-0.5">{{ story.role }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { testimonials } = usePublicTestimonials("host");
const stories = computed(() => testimonials.value.slice(0, 3));
</script>
