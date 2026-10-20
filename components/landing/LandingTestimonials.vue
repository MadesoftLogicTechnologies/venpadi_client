<template>
  <section class="bg-greybg py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Trusted by professionals
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight max-w-xl">
          Loved by 10,000+ planners and event hosts
        </h2>
      </div>

      <div class="grid md2:grid-cols-3 gap-5">
        <article
          v-for="item in testimonials"
          :key="item.name"
          class="bg-white rounded-2xl border border-border p-6 shadow-sm"
        >
          <div class="flex gap-0.5 mb-4">
            <i
              v-for="n in 5"
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
const testimonials = [
  {
    quote:
      "Venpadi cut our venue shortlist time from two weeks to an afternoon. Transparent pricing and verified photos meant zero surprises on the day.",
    name: "Adaora Okeke",
    role: "Lead Planner, Bloom Events · Lagos",
    initials: "AO",
    color: "#FF4D17",
  },
  {
    quote:
      "We booked a 400-guest corporate summit across three cities. Contracts, deposits, and vendor coordination all lived in one place — game changer.",
    name: "James Whitmore",
    role: "Events Director, Northline · London",
    initials: "JW",
    color: "#1E3A5F",
  },
  {
    quote:
      "As a first-time host I needed guidance. The walkthroughs and escrow payment gave me confidence I was booking a real, quality space.",
    name: "Fatima Hassan",
    role: "Private Host · Abuja",
    initials: "FH",
    color: "#FF8A00",
  },
];
</script>
