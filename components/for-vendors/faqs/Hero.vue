<template>
  <section class="relative overflow-hidden bg-[#0B0F14] text-white pt-14 pb-16 md2:pt-20 md2:pb-20">
    <div
      class="pointer-events-none absolute -left-10 top-10 text-[14rem] font-extrabold text-white/[0.04] leading-none select-none"
    >
      ?
    </div>
    <div
      class="pointer-events-none absolute right-[8%] bottom-8 text-[10rem] font-extrabold leading-none select-none bg-clip-text text-transparent bg-brand-gradient opacity-20"
    >
      ?
    </div>

    <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-12 items-center">
        <div>
          <span
            class="inline-flex items-center px-3 py-1.5 rounded-full border border-primary/35 bg-primary/10 text-[11px] font-bold tracking-[0.1em] uppercase text-primary"
          >
            Venue owner FAQ · {{ questionCount }} questions answered
          </span>

          <h1
            class="mt-5 text-[2.15rem] sm:text-[2.75rem] md2:text-[3.25rem] font-extrabold tracking-tight leading-[1.1]"
          >
            Everything you wanted to ask.
            <span class="text-primary">Answered plainly.</span>
          </h1>

          <p class="mt-5 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
            The candid handbook for venue directors, ballroom hosts, and space managers.
            No jargon, no hidden commissions, zero ambiguity.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#faq-categories"
              class="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white text-header text-sm font-semibold hover:opacity-95"
            >
              Jump to a category ↓
            </a>
            <a
              href="mailto:owners@venpadi.com"
              class="inline-flex items-center text-sm font-semibold text-white/80 hover:text-white"
            >
              Talk to a venue specialist →
            </a>
          </div>

          <div
            class="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] sm:text-xs text-white/45"
          >
            <span v-for="item in trust" :key="item">{{ item }}</span>
          </div>
        </div>

        <div class="relative min-h-[320px] md2:min-h-[420px] flex items-center justify-center">
          <img
            src="/images/for-vendors-faq-hero.svg"
            alt=""
            class="w-full max-w-[480px] h-auto drop-shadow-2xl"
            width="545"
            height="566"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { faqCategories } from "./data.js";

// Counted from the FAQ data itself, so the number can't drift from the page.
const questionCount = faqCategories.reduce((n, c) => n + c.items.length, 0);

const trust = [
  `${questionCount} questions answered`,
  "Plain answers",
  "No questions left behind",
  "Email support ready",
];
</script>
