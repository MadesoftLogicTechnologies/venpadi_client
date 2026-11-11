<template>
  <section class="bg-[#F9F9F7]">
    <div
      v-for="(cat, catIndex) in faqCategories"
      :id="cat.id"
      :key="cat.id"
      class="scroll-mt-36 border-b border-border/70"
    >
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-12 md2:py-16">
        <div class="grid md2:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] gap-8 md2:gap-12 items-start">
          <div class="relative pt-2">
            <span
              class="pointer-events-none absolute -left-2 -top-4 text-[7rem] sm:text-[8.5rem] font-extrabold leading-none text-header/[0.05] select-none"
            >
              {{ cat.num }}
            </span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-[#FF2D55]">
              Category {{ Number(cat.num) }} of {{ faqCategories.length }}
            </p>
            <h2
              class="relative mt-2 text-2xl sm:text-[1.85rem] font-extrabold text-header tracking-tight"
            >
              {{ cat.title }}
            </h2>
            <p class="relative mt-3 text-sm text-bodytext leading-relaxed max-w-sm">
              {{ cat.description }}
            </p>
            <p
              class="relative mt-4 inline-flex items-center gap-2 text-xs font-semibold text-header"
            >
              <span
                class="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center"
              >
                <i class="pi pi-check text-[10px]"></i>
              </span>
              {{ cat.items.length }} {{ cat.items.length === 1 ? "question" : "questions" }}
            </p>
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, i) in cat.items"
              :key="item.q"
              class="rounded-2xl bg-white border border-border/80 shadow-[0_8px_24px_rgba(26,22,20,0.04)] overflow-hidden transition-colors"
              :class="
                openKey === keyOf(cat.id, i)
                  ? 'bg-[#FFF7F2] border-primary/20'
                  : ''
              "
            >
              <button
                type="button"
                class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                @click="toggle(cat.id, i)"
              >
                <span class="text-sm sm:text-[15px] font-semibold text-header leading-snug">
                  {{ item.q }}
                </span>
                <i
                  class="pi text-bodytext2 text-xs shrink-0 transition-transform"
                  :class="
                    openKey === keyOf(cat.id, i) ? 'pi-chevron-up' : 'pi-chevron-down'
                  "
                ></i>
              </button>
              <div v-show="openKey === keyOf(cat.id, i)" class="px-5 pb-5">
                <p class="text-sm text-bodytext leading-relaxed">{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="catIndex === 1 && featured"
        class="bg-[#1A1614] text-white py-14 md2:py-16 px-4 sm:px-6 md2:px-8"
      >
        <div class="max-w-[720px] mx-auto text-center">
          <div class="mx-auto mb-5 h-0.5 w-10 bg-primary"></div>
          <blockquote
            class="text-lg sm:text-xl md2:text-[1.35rem] font-medium leading-relaxed text-white/95"
          >
            “{{ featured.quote }}”
          </blockquote>
          <p class="mt-5 text-sm text-primary/90">
            {{ [featured.name, featured.role].filter(Boolean).join(", ") }}
          </p>
        </div>
      </div>

      <!-- The "dedicated Venue Success Manager on WhatsApp" block and its named
           quotes were invented (no such service, no WhatsApp channel); removed. -->
    </div>
  </section>
</template>

<script setup>
import { faqCategories } from "./data.js";

const openKey = ref(keyOf(faqCategories[0].id, 0));

// The interstitial quote is a published host testimonial (API), or nothing.
const { testimonials } = usePublicTestimonials("host");
const featured = computed(() => testimonials.value[0] ?? null);

function keyOf(catId, index) {
  return `${catId}:${index}`;
}

function toggle(catId, index) {
  const next = keyOf(catId, index);
  openKey.value = openKey.value === next ? null : next;
}
</script>
