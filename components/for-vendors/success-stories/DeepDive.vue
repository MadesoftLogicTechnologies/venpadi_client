<template>
  <section id="deep-dive" class="bg-[#F7F5F2] py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <!-- Header -->
      <div class="max-w-3xl mx-auto text-center">
        <p
          class="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[11px] font-bold tracking-[0.08em] uppercase text-primary"
        >
          <span v-for="(crumb, i) in crumbs" :key="crumb">
            <span v-if="i">/</span>
            {{ crumb }}
          </span>
        </p>

        <h2
          class="mt-4 text-2xl sm:text-3xl md2:text-[2.65rem] font-extrabold text-header tracking-tight leading-[1.15]"
        >
          How Tobi Adeyemi turned an empty Lagos rooftop into ₦22M in one year
        </h2>

        <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
          The operational blueprint of a premier Victoria Island venue operator who
          replaced chaotic WhatsApp spreadsheets with high-trust automated transactions.
        </p>

        <div class="mt-5 inline-flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
            alt="Tobi Adeyemi"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div class="text-left">
            <p class="text-sm font-bold text-header">Tobi Adeyemi</p>
            <p class="text-xs text-bodytext flex items-center gap-1.5">
              Venue owner, The Rooftop
              <span
                class="inline-flex items-center px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold"
              >
                Verified
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Metrics bar -->
      <div
        class="mt-10 rounded-2xl border border-border bg-white px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-3 md2:grid-cols-5 gap-4 md2:gap-0 md2:divide-x md2:divide-border"
      >
        <div
          v-for="m in metrics"
          :key="m.label"
          class="md2:px-5 text-center sm:text-left md2:first:pl-0 md2:last:pr-0"
        >
          <p class="text-[10px] font-bold tracking-wider uppercase text-bodytext2">
            {{ m.label }}
          </p>
          <p
            class="mt-1 text-lg sm:text-xl font-extrabold tracking-tight"
            :class="m.accent ? 'text-primary' : 'text-header'"
          >
            {{ m.value }}
          </p>
        </div>
      </div>

      <!-- 3-column body -->
      <div
        class="mt-10 grid lg:grid-cols-[220px_minmax(0,1fr)_220px] gap-8 xl:gap-10 items-start"
      >
        <!-- Left sidebar -->
        <aside class="space-y-5 lg:sticky lg:top-24">
          <div class="rounded-2xl border border-border bg-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=480&h=360&fit=crop"
              alt="The Rooftop Lagos"
              class="w-full aspect-[4/3] object-cover"
            />
            <div class="p-4">
              <p class="text-sm font-extrabold text-header">Tobi Adeyemi, 34</p>
              <p class="mt-0.5 text-xs text-bodytext">The Rooftop, Lagos</p>
              <p class="mt-2 text-[11px] text-bodytext2">
                Capacity 100–120 · Rooftop lounge · Joined '22
              </p>
            </div>
          </div>

          <nav class="rounded-2xl border border-border bg-white p-4">
            <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-bodytext2 mb-3">
              In this case study
            </p>
            <ol class="space-y-2.5">
              <li v-for="(sec, i) in sections" :key="sec.id">
                <a
                  :href="`#${sec.id}`"
                  class="flex items-start gap-2 text-xs font-semibold text-primary hover:opacity-80"
                >
                  <span class="shrink-0">{{ i + 1 }}.</span>
                  <span>{{ sec.title }}</span>
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        <!-- Main article -->
        <article class="space-y-10 min-w-0">
          <div :id="sections[0].id" class="scroll-mt-28">
            <h3 class="text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              1. The WhatsApp quagmire
            </h3>
            <div class="mt-4 space-y-4 text-sm sm:text-[15px] text-bodytext leading-relaxed">
              <p>
                Before Venpadi, every enquiry lived in a group chat. Quotes were scribbled
                into notes apps, deposits slipped through personal transfers, and weekend
                dates vanished while the team was still typing “please confirm capacity.”
              </p>
              <p>
                Peak season meant three phones lighting up at once — and no single source of
                truth for what was actually bookable. Leads that needed a same-day answer
                often went cold overnight.
              </p>
            </div>
            <blockquote
              class="mt-5 rounded-2xl border-l-4 border-primary bg-[#FFF1ED] px-5 py-4 text-sm sm:text-[15px] text-header font-medium leading-relaxed"
            >
              “I was spending 18 hours a week acting as a human booking calendar. We lost
              potential revenue in January alone because everything broke down at the same
              time.”
            </blockquote>
          </div>

          <div :id="sections[1].id" class="scroll-mt-28">
            <h3 class="text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              2. The 48-hour turning point
            </h3>
            <div class="mt-4 space-y-4 text-sm sm:text-[15px] text-bodytext leading-relaxed">
              <p>
                Listing went live with photos, packages, and calendar rules. Within two days,
                structured enquiries replaced voice notes — with guest counts, budgets, and
                preferred dates attached.
              </p>
              <p>
                Deposits locked availability automatically. The floor team stopped
                double-checking WhatsApp threads and started preparing rooms that were
                already paid for.
              </p>
            </div>

            <div class="mt-5 rounded-2xl border border-border bg-white p-5 sm:p-6">
              <p class="text-sm font-extrabold text-header mb-1">
                Annual performance: Manual vs Venpadi
              </p>
              <p class="text-xs text-bodytext mb-5">
                Same venue, same team — before and after going live.
              </p>
              <div class="space-y-5">
                <div v-for="row in comparisons" :key="row.label">
                  <div class="flex justify-between text-xs font-semibold text-header mb-2">
                    <span>{{ row.label }}</span>
                  </div>
                  <div class="space-y-2">
                    <div>
                      <div class="flex justify-between text-[11px] text-bodytext mb-1">
                        <span>Manual</span>
                        <span>{{ row.manual }}</span>
                      </div>
                      <div class="h-2 rounded-full bg-greybg overflow-hidden">
                        <div
                          class="h-full rounded-full bg-[#C5CAD3]"
                          :style="{ width: row.manualWidth }"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-[11px] text-bodytext mb-1">
                        <span>Venpadi</span>
                        <span class="font-semibold text-primary">{{ row.platform }}</span>
                      </div>
                      <div class="h-2 rounded-full bg-greybg overflow-hidden">
                        <div
                          class="h-full rounded-full bg-primary"
                          :style="{ width: row.platformWidth }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div :id="sections[2].id" class="scroll-mt-28">
            <h3 class="text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              3. The diaspora surge & escrow trust
            </h3>
            <div class="mt-4 space-y-4 text-sm sm:text-[15px] text-bodytext leading-relaxed">
              <p>
                Once deposits and contracts lived in one place, international planners booked
                with confidence. Escrow-style settlement meant Tobi stopped chasing balances
                after the night ended — and hosts stopped worrying about wire transfers to
                strangers.
              </p>
            </div>

            <div class="mt-5 rounded-2xl border border-border bg-white p-5 sm:p-6">
              <p class="text-sm font-extrabold text-header mb-1">Guest origin mix</p>
              <p class="text-xs text-bodytext mb-4">
                Share of confirmed bookings by planner location · Year 1
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="origin in origins"
                  :key="origin.label"
                  class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold"
                  :class="
                    origin.highlight
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border bg-[#F7F8FA] text-header'
                  "
                >
                  {{ origin.label }}
                  <span class="font-extrabold">{{ origin.value }}</span>
                </span>
              </div>
            </div>
          </div>

          <div :id="sections[3].id" class="scroll-mt-28">
            <h3 class="text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              4. Advice for fellow hospitality founders
            </h3>
            <div class="mt-4 space-y-4 text-sm sm:text-[15px] text-bodytext leading-relaxed">
              <p>
                Tobi’s takeaway is blunt: treat availability as the product, not the
                conversation. Publish packages early, sync the calendar on day one, and
                require deposits before you hold a date.
              </p>
              <ul class="space-y-2.5">
                <li
                  v-for="tip in tips"
                  :key="tip"
                  class="flex items-start gap-2.5 text-header"
                >
                  <span
                    class="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
                  >
                    <i class="pi pi-check text-[10px] font-bold"></i>
                  </span>
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Right sidebar -->
        <aside class="space-y-5 lg:sticky lg:top-24">
          <div class="rounded-2xl border border-border bg-white p-4">
            <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-bodytext2 mb-3">
              Platform impact timeline
            </p>
            <ol class="relative space-y-4 before:absolute before:left-[7px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-border">
              <li
                v-for="item in timeline"
                :key="item.when"
                class="relative pl-6"
              >
                <span
                  class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-white"
                ></span>
                <p class="text-[11px] font-bold text-primary">{{ item.when }}</p>
                <p class="mt-0.5 text-xs text-bodytext leading-snug">{{ item.text }}</p>
              </li>
            </ol>
          </div>

          <div class="rounded-2xl border border-border bg-white p-4">
            <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-bodytext2 mb-3">
              Partnership details
            </p>
            <dl class="space-y-2.5 text-xs">
              <div
                v-for="row in partnership"
                :key="row.label"
                class="flex justify-between gap-3 border-b border-border/70 pb-2 last:border-0 last:pb-0"
              >
                <dt class="text-bodytext">{{ row.label }}</dt>
                <dd class="font-semibold text-header text-right">{{ row.value }}</dd>
              </div>
            </dl>
          </div>

          <div
            class="rounded-2xl bg-[#0B0F14] p-5 text-white shadow-[0_16px_40px_rgba(15,23,42,0.2)]"
          >
            <p class="text-sm font-extrabold leading-snug">Ready to grow your venue?</p>
            <p class="mt-2 text-xs text-white/55 leading-relaxed">
              List free, sync your calendar, and start taking deposits the way Tobi did.
            </p>
            <NuxtLink
              to="/auth/signup/venue"
              class="mt-4 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
            >
              Get started now
            </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
const crumbs = ["Case study", "Venue sales & bookings", "Lagos", "12 min read"];

const metrics = [
  { label: "Total revenue", value: "₦22,438,050", accent: true },
  { label: "Booking efficiency", value: "84%" },
  { label: "Total bookings", value: "127" },
  { label: "Guest rating", value: "4.8 / 5.0" },
  { label: "Avg. respond time", value: "45 min", accent: true },
];

const sections = [
  { id: "cs-whatsapp", title: "The WhatsApp Quagmire" },
  { id: "cs-turning-point", title: "The 48-Hour Turning Point" },
  { id: "cs-diaspora", title: "The Diaspora Surge & Escrow Trust" },
  { id: "cs-advice", title: "Advice for Fellow Hospitality Founders" },
];

const comparisons = [
  {
    label: "Leads managed / month",
    manual: "38",
    platform: "112",
    manualWidth: "34%",
    platformWidth: "100%",
  },
  {
    label: "Time to confirmed booking",
    manual: "6.2 days",
    platform: "18 hrs",
    manualWidth: "100%",
    platformWidth: "28%",
  },
  {
    label: "Payment success rate",
    manual: "61%",
    platform: "97%",
    manualWidth: "61%",
    platformWidth: "97%",
  },
];

const origins = [
  { label: "Lagos", value: "35%" },
  { label: "UK", value: "28%" },
  { label: "USA", value: "15%", highlight: true },
  { label: "Canada", value: "12%" },
  { label: "Other", value: "10%" },
];

const tips = [
  "Publish clear packages before you chase personalised quotes.",
  "Sync your calendar on day one — availability is the product.",
  "Require deposits; no-shows shrink when money is on the line.",
];

const timeline = [
  { when: "First 7 days", text: "Listing live · first structured enquiries" },
  { when: "Month 3", text: "Weekday corporate retainers locked in" },
  { when: "Month 6", text: "Diaspora bookings exceed local share" },
  { when: "One year", text: "₦22.4M revenue · 94% occupancy" },
];

const partnership = [
  { label: "Venue type", value: "Rooftop" },
  { label: "Location", value: "Victoria Island" },
  { label: "Start date", value: "Jan 2023" },
  { label: "Total yield", value: "₦22,438,050" },
];
</script>
