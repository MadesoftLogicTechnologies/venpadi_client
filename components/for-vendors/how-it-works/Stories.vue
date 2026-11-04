<template>
  <section class="bg-[#F7F5F2] py-14 md2:py-20">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          User stories
        </p>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
          Don't take our word for it.
        </h2>
      </div>

      <div class="grid md2:grid-cols-3 gap-4">
        <article
          v-for="story in stories"
          :key="story.name"
          class="rounded-[1.25rem] border border-border bg-white p-5 sm:p-6 flex flex-col"
        >
          <div class="flex gap-0.5 text-amber-400 text-sm mb-3">
            <i v-for="n in 5" :key="n" class="pi pi-star-fill"></i>
          </div>
          <p class="text-sm text-header leading-relaxed flex-1">“{{ story.quote }}”</p>
          <div class="mt-5 pt-4 border-t border-border">
            <p class="text-sm font-extrabold text-header">{{ story.name }}</p>
            <p class="text-xs text-bodytext">{{ story.role }}</p>
          </div>
        </article>

        <article
          class="rounded-[1.25rem] bg-brand-gradient-soft p-5 sm:p-6 text-white flex flex-col justify-between min-h-[220px]"
        >
          <div>
            <p class="text-[11px] font-bold tracking-[0.12em] uppercase text-white/80">
              Overall satisfaction
            </p>
            <p class="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">4.8 / 5</p>
            <p class="mt-3 text-sm text-white/85 leading-relaxed">
              Highest-rated venue owner software among partners surveyed on Venpadi.
            </p>
          </div>
          <p class="mt-6 text-xs font-semibold text-white/90">
            Based on 1,500+ global reviews →
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const stories = [
  {
    name: "Cindy Nelson",
    role: "Events Director · Lagos",
    quote:
      "We filled three quiet weekdays in the first month. The calendar sync alone saved our team hours of double-checking.",
  },
  {
    name: "Jack McThompson",
    role: "Owner · Abuja Event Centre",
    quote:
      "Enquiries come with real budgets and guest counts. We stopped chasing tire-kickers and started confirming bookings.",
  },
];
</script>
