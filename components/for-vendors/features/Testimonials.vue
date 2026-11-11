<template>
  <!-- Owner testimonials are published content (GET /public/content/testimonials
       ?audience=host). With none published the section hides: invented owners
       and quotes are what the audit removed. -->
  <section v-if="testimonials.length" id="stories" class="bg-[#F7F5F0] py-16 md2:py-20 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        What owners say
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight"
      >
        From owners who made the switch.
      </h2>
      <p class="mt-3 text-sm sm:text-base text-bodytext max-w-2xl leading-relaxed">
        Event center directors recovering lost time — and finally trusting their
        calendars.
      </p>

      <div class="mt-10 grid md2:grid-cols-3 gap-4">
        <article
          v-for="item in testimonials"
          :key="item.id"
          class="rounded-2xl bg-white border border-border p-5 sm:p-6"
        >
          <div
            v-if="testimonialStars(item)"
            class="flex gap-0.5 text-amber-400 text-xs"
            :aria-label="`${testimonialStars(item)} out of 5 stars`"
          >
            <i v-for="n in testimonialStars(item)" :key="n" class="pi pi-star-fill"></i>
          </div>
          <p class="mt-4 text-sm text-header leading-relaxed">“{{ item.quote }}”</p>
          <div class="mt-5 flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-header text-white flex items-center justify-center text-xs font-bold"
              :style="item.color ? { background: item.color } : undefined"
            >
              {{ item.initials || initials(item.name) }}
            </div>
            <div>
              <p class="text-sm font-bold text-header">{{ item.name }}</p>
              <p class="text-xs text-bodytext">{{ item.role }}</p>
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
