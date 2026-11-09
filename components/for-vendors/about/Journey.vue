<template>
  <section class="bg-[#F7F5F0] py-16 md2:py-24">
    <div class="max-w-[960px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
          Our journey
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
        >
          How we got here.
        </h2>
        <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
          From a notebook filled with complaints from Lagos venue managers to
          processing bookings for hosts across 190+ territories.
        </p>
      </div>

      <div class="relative mt-14">
        <div
          class="hidden md2:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-primary/40"
        ></div>

        <ol class="space-y-10 md2:space-y-14">
          <li
            v-for="(item, i) in milestones"
            :key="item.title"
            class="relative md2:grid md2:grid-cols-2 md2:gap-12"
          >
            <div
              class="hidden md2:block absolute left-1/2 top-2 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-primary border-[3px] border-[#F7F5F0] z-10"
            ></div>

            <div
              :class="
                i % 2 === 0
                  ? 'md2:col-start-1 md2:text-right md2:pr-6'
                  : 'md2:col-start-2 md2:pl-6'
              "
            >
              <p
                class="text-[11px] font-bold tracking-[0.12em] uppercase text-primary"
                :class="i % 2 === 0 ? 'md2:text-right' : ''"
              >
                {{ item.when }} · {{ item.tag }}
              </p>
              <h3 class="mt-2 text-lg sm:text-xl font-extrabold text-header">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm text-bodytext leading-relaxed">
                {{ item.body }}
              </p>
              <blockquote
                v-if="item.quote"
                class="mt-4 rounded-xl border border-border bg-white px-4 py-3 text-left"
                :class="i % 2 === 0 ? 'md2:ml-auto' : ''"
              >
                <p class="text-sm italic text-header leading-relaxed">
                  “{{ item.quote }}”
                </p>
                <p class="mt-2 text-xs font-semibold text-bodytext2">
                  — {{ item.quoteBy }}
                </p>
              </blockquote>
              <p
                v-if="item.emphasis"
                class="mt-3 text-sm font-bold text-primary"
              >
                {{ item.emphasis }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
const milestones = [
  {
    when: "2022",
    tag: "Discovery",
    title: "The Research Year",
    body: "Conducted 60+ in-depth interviews with venue operators in Lagos, Nairobi, Dubai, and London. Uncovered revenue leaks caused by fragmented messaging tools.",
  },
  {
    when: "Q1 2023",
    tag: "Engineering sprint",
    title: "The Build",
    body: "Engineers shipped Version 1 in 11 intense weeks — including a calendar availability engine and low-friction mobile booking generation.",
  },
  {
    when: "March 2023",
    tag: "Public debut",
    title: "First listing, first booking",
    body: "First venue onboarded in Lekki Phase 1. Within 24 hours, an international conference booked the hall through automated systems.",
    quote:
      "When that first payment alert hit our dashboard without a single phone call, we knew we had unlocked something special.",
    quoteBy: "Tobi Oreolu, Founder",
  },
  {
    when: "Q2 2023",
    tag: "Cross-border",
    title: "First expansion",
    body: "Expanded beyond Lagos to Accra, Nairobi, and Dubai. Rolled out multi-currency settlement in NGN, GHS, KES, USD, and AED.",
  },
  {
    when: "Q3 2023",
    tag: "Enterprise tooling",
    title: "Product depth",
    body: "Launched multi-space subdivision management, vendor portals, customisable security deposit lockers, and our Venue Success Manager program.",
  },
  {
    when: "Q4 2023",
    tag: "Scale phase",
    title: "500 venues & ₦100M+ disbursed",
    body: "Crossed 500 verified properties and disbursed over ₦100M directly to hosts. Expansion into London and North American wedding planners began.",
  },
  {
    when: "2024",
    tag: "Today",
    title: "The global operating system",
    body: "1,200+ owners, 190+ countries with active discovery, and over ₦420M earned by our space partners.",
    emphasis: "And growing.",
  },
];
</script>
