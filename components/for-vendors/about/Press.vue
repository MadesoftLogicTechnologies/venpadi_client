<template>
  <section id="press" class="bg-[#F7F5F0] py-16 md2:py-24 scroll-mt-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        In the press
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
      >
        What’s being said.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl">
        Industry analysts and publications documenting the transformation of event
        infrastructure.
      </p>

      <div
        class="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm font-extrabold tracking-wide text-header/35 uppercase"
      >
        <span v-for="logo in logos" :key="logo">{{ logo }}</span>
      </div>

      <div class="mt-10 grid md2:grid-cols-3 gap-4">
        <article
          v-for="story in stories"
          :key="story.source"
          class="rounded-2xl bg-white border border-border p-5 sm:p-6"
        >
          <p class="text-[11px] font-bold tracking-[0.12em] uppercase text-primary">
            {{ story.source }}
          </p>
          <p class="mt-3 text-sm text-header leading-relaxed">“{{ story.quote }}”</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  "TechCabal",
  "Disrupt Africa",
  "Techpoint Africa",
  "The Guardian",
  "BBC Africa",
  "Forbes Africa",
];

const stories = [
  {
    source: "TechCabal Review",
    quote:
      "Venpadi is quietly becoming the settlement layer for African hospitality — less marketplace theatre, more operating system.",
  },
  {
    source: "Disrupt Africa",
    quote:
      "By treating venue owners as the product, the Lagos-built platform is rewriting how high-value spaces get discovered and paid.",
  },
  {
    source: "Techpoint Africa",
    quote:
      "Multi-currency escrow and calendar infrastructure finally give event centers software that matches the complexity of their floors.",
  },
];
</script>
