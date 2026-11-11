<template>
  <section id="step-6" class="scroll-mt-36 bg-[#0B0F14] py-16 md:py-24 text-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div class="order-2 md2:order-1 relative">
          <div
            class="rounded-[1.35rem] border border-white/10 bg-[#141A22] p-4 sm:p-5 shadow-[0_28px_70px_rgba(0,0,0,0.4)]"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <p class="text-sm font-extrabold">Owner Inbox</p>
                <span
                  class="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold"
                >
                  2 New
                </span>
              </div>
              <span class="text-[11px] text-white/45">Example</span>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="(row, i) in inbox"
                :key="row.name"
                class="rounded-xl border px-3.5 py-3 flex items-start justify-between gap-3"
                :class="
                  i === 0
                    ? 'border-primary/50 bg-primary/[0.06]'
                    : 'border-white/10 bg-white/[0.03]'
                "
              >
                <div>
                  <p class="text-sm font-semibold flex items-center gap-1.5">
                    {{ row.name }}
                    <span
                      v-if="i === 0"
                      class="w-1.5 h-1.5 rounded-full bg-primary"
                    ></span>
                  </p>
                  <p class="text-[11px] text-white/45 mt-0.5">{{ row.meta }}</p>
                </div>
                <span
                  class="shrink-0 text-xs font-bold"
                  :class="row.confirmed ? 'text-emerald-400' : 'text-primary'"
                >
                  {{ row.right }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="relative md2:-mt-8 md2:ml-8 rounded-[1.25rem] border border-border bg-white text-header p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          >
            <div class="flex items-center gap-3 mb-3">
              <span
                class="w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center"
              >
                KA
              </span>
              <div>
                <p class="text-sm font-extrabold">Kemi Adeleke (Lead Producer)</p>
                <p class="text-[11px] text-bodytext">Planner · Booking request</p>
              </div>
            </div>
            <p class="text-sm text-bodytext leading-relaxed">
              “Good day, we need early load-in access on the 14th for floral
              installations. Can you include that in the quote?”
            </p>
            <div class="mt-4 flex items-center gap-2">
              <div
                class="flex-1 rounded-full border border-border bg-[#F7F5F2] px-3.5 py-2.5 text-xs text-bodytext"
              >
                Type quick acceptance or custom quote…
              </div>
              <span
                class="shrink-0 px-4 py-2.5 rounded-full bg-header text-white text-xs font-semibold"
              >
                Reply
              </span>
            </div>
          </div>
        </div>

        <div class="order-1 md2:order-2 relative">
          <span
            class="pointer-events-none absolute -right-1 -top-10 text-[8rem] sm:text-[10rem] font-extrabold leading-none text-white/[0.05] select-none"
          >
            06
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full border border-primary/30 bg-primary/15 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Step 6 of 7
          </span>
          <h2
            class="relative mt-5 text-2xl sm:text-3xl md2:text-[2.45rem] font-extrabold tracking-tight leading-[1.15]"
          >
            The enquiries arrive.
            <span class="text-transparent bg-clip-text bg-brand-gradient-soft">
              You stay in control.
            </span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
            No endless back-and-forth. Every request arrives with the date, space,
            guest count and event type — so you can judge the fit before you reply.
          </p>

          <div class="relative mt-7 space-y-3">
            <div
              v-for="(item, i) in points"
              :key="item.title"
              class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 flex items-start gap-3"
            >
              <span
                class="w-7 h-7 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center shrink-0"
              >
                {{ i + 1 }}
              </span>
              <div>
                <p class="text-sm font-bold">{{ item.title }}</p>
                <p class="mt-0.5 text-xs sm:text-sm text-white/50 leading-relaxed">
                  {{ item.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const inbox = [
  {
    name: "Fintech Summit 2026 Product Launch",
    meta: "Product launch · The Grand Ballroom",
    right: "New request",
  },
  {
    name: "Kemi & Tunde Luxury Wedding",
    meta: "Wedding · Terrace + Ballroom",
    right: "Quote sent",
  },
  {
    name: "Diplomatic Gala Dinner",
    meta: "Gala dinner · Penthouse Suite",
    right: "✓ Confirmed",
    confirmed: true,
  },
];

const points = [
  {
    title: "Enquiry Received",
    text: "Review the event format, date, space and guest count before you engage.",
  },
  {
    title: "Direct Messaging & Dynamic Quotes",
    text: "Send itemized custom quotes and negotiate extras in one thread.",
  },
  {
    title: "Accept & Lock the Date",
    text: "The planner accepts your quote and pays through Venpadi, and the date is blocked on your calendar.",
  },
];
</script>
