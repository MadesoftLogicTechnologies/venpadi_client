<template>
  <section class="bg-[#F7F5F2]">
    <!-- Host testimonials from GET /public/content/testimonials?audience=host;
         hidden when there are none (the duplicated "Ioana Kutuzova" USD quote
         it replaced was invented). -->
    <div v-if="testimonials.length" id="case-studies" class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-14 md2:py-16">
      <div class="grid md2:grid-cols-2 gap-5">
        <article
          v-for="t in testimonials.slice(0, 2)"
          :key="t.id"
          class="rounded-[1.5rem] bg-[#F3EEE6] overflow-hidden grid sm:grid-cols-[1.1fr_0.9fr] shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
        >
          <div class="p-6 sm:p-8 flex flex-col">
            <div v-if="testimonialStars(t)" class="flex gap-0.5 mb-3" :aria-label="`${testimonialStars(t)} out of 5 stars`">
              <i v-for="n in testimonialStars(t)" :key="n" class="pi pi-star-fill text-primary text-xs"></i>
            </div>
            <p class="text-xl sm:text-2xl font-extrabold text-header leading-snug tracking-tight">
              “{{ t.quote }}”
            </p>
            <div class="mt-auto pt-8 flex items-end justify-between gap-3">
              <div>
                <p class="text-sm font-extrabold text-header">{{ t.name }}</p>
                <p class="text-[11px] font-bold tracking-wider uppercase text-bodytext2 mt-0.5">
                  {{ t.role }}
                </p>
              </div>
              <NuxtLink
                to="/for-venue-owners/success-stories"
                class="text-sm font-semibold text-primary shrink-0"
              >
                Read Story →
              </NuxtLink>
            </div>
          </div>
          <div class="relative min-h-[260px] sm:min-h-full p-3 sm:p-4 flex items-center justify-center">
            <img
              :src="storyImage"
              :alt="t.name"
              class="w-full max-w-[248px] h-auto"
              width="248"
              height="347"
            />
            <div
              class="absolute left-2 bottom-10 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-extrabold"
              :style="{ background: t.color || '#FF4D17' }"
            >
              {{ t.initials }}
            </div>
          </div>
        </article>
      </div>
    </div>

    <div id="features" class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pb-14 md2:pb-20">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        The Venpadi Advantage
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight max-w-3xl"
      >
        Built for venue owners who think like businesses.
      </h2>

      <!-- Figures come from GET /public/stats and a card's number hides when it
           is zero or missing; the 68% / 3.2x / 48 hrs / 100% it replaced were
           invented. -->
      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <article
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl border p-5 sm:p-6 relative overflow-hidden"
          :class="card.dark ? 'border-header bg-header text-white' : 'border-border bg-white'"
        >
          <div
            class="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full"
            :class="card.dark ? 'bg-primary/25' : 'bg-primary/10'"
          ></div>
          <p v-if="card.figure" class="relative text-4xl font-extrabold text-primary tracking-tight">{{ card.figure }}</p>
          <span
            v-else
            class="relative w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"
          >
            <i :class="['pi text-lg', card.icon]"></i>
          </span>
          <p v-if="card.figureLabel && card.figure" class="mt-1 text-[11px] font-bold tracking-wider uppercase" :class="card.dark ? 'text-white/60' : 'text-bodytext2'">
            {{ card.figureLabel }}
          </p>
          <div class="mt-5 flex items-center gap-2">
            <h3 class="text-base font-extrabold" :class="card.dark ? '' : 'text-header'">{{ card.title }}</h3>
            <i :class="['pi text-primary text-xs', card.icon]"></i>
          </div>
          <p class="mt-2 text-xs leading-relaxed" :class="card.dark ? 'text-white/55' : 'text-bodytext'">
            {{ card.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const storyImage = "/images/venue-owner-story.svg";

const { testimonials } = usePublicTestimonials("host");
const { stats } = usePublicStats();

const fig = (key, fmt = statCount) => (hasFigure(stats.value?.[key]) ? fmt(stats.value[key]) : null);

const cards = computed(() => [
  {
    title: "Planner demand",
    icon: "pi-users",
    figure: fig("planners"),
    figureLabel: "Planners on Venpadi",
    body: "Planners search by event type, capacity, budget and live availability — and find your spaces when they match.",
  },
  {
    title: "Real bookings",
    icon: "pi-calendar",
    figure: fig("eventsHosted"),
    figureLabel: "Events booked",
    body: "Requests arrive with dates, guest count and event details, so you approve or decline with everything in front of you.",
  },
  {
    title: "Verified reviews",
    icon: "pi-star",
    figure: hasFigure(stats.value?.reviewCount) ? fig("averageRating", (n) => `${Number(n).toFixed(1)}/5`) : null,
    figureLabel: "Average rating",
    body: "Reviews written after a completed booking are marked verified, so planners can tell real events apart.",
  },
  {
    title: "Escrow-protected payouts",
    icon: "pi-shield",
    dark: true,
    figure: fig("gmvProcessedMinor", nairaCompact),
    figureLabel: "Paid through Venpadi",
    body: "Planners pay into escrow. Funds are released to your payout account after the event is completed and a 48-hour window has passed.",
  },
]);
</script>
