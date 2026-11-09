<template>
  <section class="bg-[#F7F5F2] py-16 md2:py-24">
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
          :key="story.name"
          class="rounded-[1.5rem] border border-border bg-white p-6 sm:p-7 flex flex-col shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
        >
          <div class="flex gap-0.5 text-primary text-sm mb-4">
            <i v-for="n in 5" :key="n" class="pi pi-star-fill"></i>
          </div>
          <p class="text-sm sm:text-[15px] text-header/85 leading-relaxed italic flex-1">
            “{{ story.quote }}”
          </p>
          <div class="mt-6 pt-4 border-t border-border">
            <p class="text-sm font-extrabold text-header">{{ story.name }}</p>
            <p class="text-xs text-bodytext mt-0.5">{{ story.role }}</p>
            <p class="mt-2 text-xs font-semibold text-primary">{{ story.stats }}</p>
          </div>
        </article>

        <article
          class="rounded-[1.5rem] bg-brand-gradient-soft p-6 sm:p-7 text-white flex flex-col justify-between min-h-[240px] shadow-[0_16px_50px_rgba(255,77,23,0.25)]"
        >
          <div>
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-white/80">
              Overall Satisfaction
            </p>
            <p class="mt-3 text-5xl sm:text-[3.5rem] font-extrabold tracking-tight leading-none">
              4.8 / 5
            </p>
            <p class="mt-4 text-sm text-white/90 leading-relaxed">
              Consistently rated by commercial venue operators for reliability, payout
              speed, and booking quality.
            </p>
          </div>
          <p class="mt-8 text-xs font-semibold text-white/95 inline-flex items-center gap-2">
            Based on 1,240+ Owner Reviews
            <i class="pi pi-verified text-sm"></i>
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const stories = [
  {
    name: "Chidi Nwosu",
    role: "Events Director · Lagos",
    quote:
      "We filled three quiet weekdays in the first month. The calendar sync alone saved our team hours of double-checking.",
    stats: "47 bookings · ₦12.4M earned",
  },
  {
    name: "Amaka Okeke",
    role: "Owner · Abuja Event Centre",
    quote:
      "Enquiries come with real budgets and guest counts. We stopped chasing tire-kickers and started confirming bookings.",
    stats: "31 bookings · ₦8.9M earned",
  },
];
</script>
