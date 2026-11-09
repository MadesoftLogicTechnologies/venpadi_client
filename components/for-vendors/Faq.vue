<template>
  <section id="faqs" class="bg-white py-16 md2:py-24 scroll-mt-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-[0.9fr_1.1fr] gap-10 md2:gap-14">
        <div>
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            Clear answers
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight"
          >
            Everything you need to know about listing
          </h2>
          <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
            Transparent answers from the Lagos team that onboarded the first thousand
            venues — no fine print theatre.
          </p>

          <div class="mt-8 rounded-2xl bg-[#F7F5F2] p-5 sm:p-6">
            <div class="flex items-start gap-3">
              <span
                class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0"
              >
                <i class="pi pi-megaphone text-sm"></i>
              </span>
              <div>
                <p class="text-sm font-semibold text-header leading-snug">
                  Want to speak with our Host Team? Call or WhatsApp our Lagos operations
                  now
                </p>
                <a
                  href="tel:+2347008367234"
                  class="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-white border border-border text-sm font-bold text-header hover:bg-greybg"
                >
                  +234 [0] 700 VENPADI
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, i) in faqs"
            :key="item.q"
            class="rounded-2xl border border-border bg-white overflow-hidden"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              @click="open = open === i ? null : i"
            >
              <span class="text-sm sm:text-[15px] font-semibold text-header">{{
                item.q
              }}</span>
              <i
                class="pi text-primary text-xs shrink-0 transition-transform"
                :class="open === i ? 'pi-chevron-up' : 'pi-chevron-down'"
              ></i>
            </button>
            <div v-show="open === i" class="px-5 pb-4">
              <p class="text-sm text-bodytext leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const open = ref(0);

const faqs = [
  {
    q: "Are there any upfront or sign-up fees?",
    a: "No. Listing is free with no setup charges. Venpadi only takes a transparent performance commission when a booking completes successfully.",
  },
  {
    q: "How do I prevent double-booking existing direct clients?",
    a: "Block those dates on your Venpadi calendar (or sync Google/Apple). Holds auto-expire so your inventory stays accurate without chasing leads.",
  },
  {
    q: "What happens if a guest damages my property?",
    a: "Security deposits sit in escrow. Upload walk-through evidence and our dispute team mediates under a 72-hour SLA before releasing caution funds.",
  },
  {
    q: "How quickly are booking payouts transferred to my bank?",
    a: "After successful event check-in and sign-off, automated settlement corridors disburse to your bank within 24 hours.",
  },
  {
    q: "Can I set custom cancellation policies?",
    a: "Yes. Choose non-refundable windows and deposit rules per space so last-minute cancellations don’t erase your weekend revenue.",
  },
  {
    q: "Can I list multiple separate spaces under one venue?",
    a: "Absolutely. Manage infinite sub-halls, terraces, and suites under one owner account with independent pricing and calendars.",
  },
];
</script>
