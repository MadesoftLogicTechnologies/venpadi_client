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
            Transparent answers from the Venpadi team — no fine print theatre.
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
                  Want to speak with our Host Team? Email us and a person will reply.
                </p>
                <a
                  href="mailto:owners@venpadi.com"
                  class="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-white border border-border text-sm font-bold text-header hover:bg-greybg"
                >
                  owners@venpadi.com
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

// The fee is quoted from the live rate (GET /public/stats), never a literal.
const { rates } = usePublicStats();
const hostFee = computed(() => hostFeeLabel(rates.value));

const faqs = computed(() => [
  {
    q: "Are there any upfront or sign-up fees?",
    a: hostFee.value
      ? `No. Listing is free with no setup charges. Venpadi takes a ${hostFee.value} host fee on bookings made through the marketplace.`
      : "No. Listing is free with no setup charges. Venpadi takes a host fee only on bookings made through the marketplace.",
  },
  {
    q: "How do I prevent double-booking existing direct clients?",
    a: "Block those dates on your Venpadi calendar, or record the booking as a direct booking. Planners can only request dates that are free.",
  },
  {
    q: "What happens if a guest damages my property?",
    a: "Refundable caution deposits are held in escrow. After the event you can claim a deduction with evidence; the planner can accept it or contest it, and the rest is refunded.",
  },
  {
    q: "How quickly are booking payouts transferred to my bank?",
    a: "Funds become available for payout once the event is completed and a 48-hour window has passed, then they are paid to your bank account.",
  },
  {
    q: "Can I set custom cancellation policies?",
    a: "Yes. Choose a flexible, moderate or strict cancellation policy for your venue so last-minute cancellations don’t erase your weekend revenue.",
  },
  {
    q: "Can I list multiple separate spaces under one venue?",
    a: "Absolutely. Manage every hall, terrace and suite under one owner account with independent pricing and calendars.",
  },
]);
</script>
