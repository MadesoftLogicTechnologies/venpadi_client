<template>
  <section id="how-it-works" class="bg-white py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          How listing works
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          From empty calendar to paid booking in four steps.
        </h2>
        <NuxtLink
          to="/for-vendors/how-it-works"
          class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
        >
          See the full seven-step guide
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>
      </div>

      <div class="space-y-12 md2:space-y-16">
        <article
          v-for="(step, i) in steps"
          :key="step.title"
          class="grid md2:grid-cols-2 gap-8 md2:gap-12 items-center"
        >
          <div :class="i % 2 === 1 ? 'md2:order-2' : ''">
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-extrabold"
            >
              {{ i + 1 }}
            </span>
            <h3 class="mt-4 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
              {{ step.text }}
            </p>
            <ul class="mt-4 space-y-2">
              <li
                v-for="point in step.points"
                :key="point"
                class="flex items-start gap-2 text-sm text-header"
              >
                <i class="pi pi-check text-primary text-xs mt-1"></i>
                {{ point }}
              </li>
            </ul>
          </div>

          <div
            class="rounded-3xl border border-border bg-[#F7F8FA] p-5 sm:p-8 shadow-sm"
            :class="i % 2 === 1 ? 'md2:order-1' : ''"
          >
            <div class="rounded-2xl bg-white border border-border p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-primary bg-primary/10"
                >
                  <i :class="step.icon"></i>
                </span>
                <div>
                  <p class="text-sm font-bold text-header">{{ step.cardTitle }}</p>
                  <p class="text-xs text-bodytext">{{ step.cardSub }}</p>
                </div>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(line, li) in step.lines"
                  :key="li"
                  class="h-2.5 rounded-full bg-greybg"
                  :style="{ width: line }"
                ></div>
              </div>
              <div
                v-if="step.cta"
                class="mt-5 inline-flex px-4 py-2 rounded-full bg-brand-gradient-soft text-white text-xs font-semibold"
              >
                {{ step.cta }}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: "Create your free listing",
    text: "Add photos, pricing, capacity, and amenities in minutes. No setup fees — go live when you’re ready.",
    points: ["Unlimited photos & spaces", "Flexible packages & add-ons", "Live in under 24 hours"],
    icon: "pi pi-pencil",
    cardTitle: "New venue listing",
    cardSub: "Draft · 80% complete",
    lines: ["92%", "70%", "55%", "40%"],
    cta: "Publish listing",
  },
  {
    title: "Get discovered by the right hosts",
    text: "Show up in search when planners filter by location, capacity, and budget — so inbound demand finds you.",
    points: ["City & neighbourhood reach", "Verified host traffic", "Featured placement options"],
    icon: "pi pi-map-marker",
    cardTitle: "Search visibility",
    cardSub: "Lagos · Ballrooms · 200–500 guests",
    lines: ["85%", "65%", "48%"],
    cta: null,
  },
  {
    title: "Confirm bookings with confidence",
    text: "Review requests, sync your calendar, and accept only the dates that work — with clear contracts and deposits.",
    points: ["Shared availability calendar", "One-tap accept / decline", "Deposit & balance tracking"],
    icon: "pi pi-calendar",
    cardTitle: "Booking request",
    cardSub: "Corporate offsite · ₦1.2M",
    lines: ["75%", "60%", "45%", "30%"],
    cta: "Accept booking",
  },
  {
    title: "Get paid — fast and securely",
    text: "Funds land in your bank after successful events. Instant payout options for eligible partners.",
    points: ["Guaranteed host payments", "Transparent fees", "Payout history & receipts"],
    icon: "pi pi-wallet",
    cardTitle: "Payout ready",
    cardSub: "₦2,450,000 · Available now",
    lines: ["90%", "55%"],
    cta: "Withdraw to bank",
  },
];
</script>
