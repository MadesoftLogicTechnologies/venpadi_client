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
              {{ cat.countLabel }}
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
        v-if="catIndex === 1"
        class="bg-[#1A1614] text-white py-14 md2:py-16 px-4 sm:px-6 md2:px-8"
      >
        <div class="max-w-[720px] mx-auto text-center">
          <div class="mx-auto mb-5 h-0.5 w-10 bg-primary"></div>
          <blockquote
            class="text-lg sm:text-xl md2:text-[1.35rem] font-medium leading-relaxed text-white/95"
          >
            “I spent two years thinking a proper booking system was for big hotel chains —
            not for someone running one venue in Lagos. Venpadi changed that assumption
            permanently.”
          </blockquote>
          <p class="mt-5 text-sm text-primary/90">
            Tobi Adeyemi, Founder, The Rooftop Lagos
          </p>
        </div>
      </div>

      <div
        v-if="catIndex === 3"
        class="bg-[#1A1614] text-white py-14 md2:py-20 px-4 sm:px-6 md2:px-8"
      >
        <div class="max-w-[1100px] mx-auto">
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            Human-concierge layer
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold tracking-tight max-w-2xl"
          >
            The platform actually answers.
          </h2>
          <p class="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
            Technology should automate logistics, not replace accountability. Every
            approved venue on Venpadi is paired with a dedicated human Venue Success
            Manager reachable by direct WhatsApp and phone.
          </p>
          <div
            class="mt-5 inline-flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 max-w-xl"
          >
            <span class="mt-0.5 w-2 h-2 rounded-full bg-[#FF2D55] shrink-0"></span>
            Receive a dedicated manager assigned to every venue account for the first
            30 days.
          </div>

          <div class="mt-10 grid sm:grid-cols-3 gap-4">
            <article
              v-for="quote in conciergeQuotes"
              :key="quote.name"
              class="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p class="text-sm text-white/80 leading-relaxed">“{{ quote.text }}”</p>
              <p class="mt-4 text-sm font-semibold text-white">{{ quote.name }}</p>
              <p class="text-xs text-primary mt-0.5">{{ quote.role }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { faqCategories } from "./data.js";

const openKey = ref(keyOf(faqCategories[0].id, 0));

const conciergeQuotes = [
  {
    name: "Farhan K.",
    role: "Estate Director, Abuja",
    text: "Our manager knew our calendar better than we did by week two. That alone paid for itself.",
  },
  {
    name: "Jameel R.",
    role: "Ballroom Ops, Lagos",
    text: "Weekend emergencies actually got a human on WhatsApp — not a ticket number.",
  },
  {
    name: "Rania S.",
    role: "Multi-space Host",
    text: "They helped us rewrite packages so corporate planners stopped ghosting after the tour.",
  },
];

function keyOf(catId, index) {
  return `${catId}:${index}`;
}

function toggle(catId, index) {
  const next = keyOf(catId, index);
  openKey.value = openKey.value === next ? null : next;
}
</script>
