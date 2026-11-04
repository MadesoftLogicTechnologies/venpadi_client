<template>
  <section id="faqs" class="bg-[#F7F8FA] py-14 md2:py-20">
    <div class="max-w-[800px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">FAQs</p>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
          Questions venue owners ask us
        </h2>
        <NuxtLink
          to="/for-vendors/faqs"
          class="inline-flex mt-3 text-sm font-semibold text-primary hover:underline"
        >
          View all 34 owner FAQs →
        </NuxtLink>
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
            <span class="text-sm sm:text-[15px] font-semibold text-header">{{ item.q }}</span>
            <i
              class="pi text-bodytext2 text-xs shrink-0 transition-transform"
              :class="open === i ? 'pi-minus' : 'pi-plus'"
            ></i>
          </button>
          <div v-show="open === i" class="px-5 pb-4">
            <p class="text-sm text-bodytext leading-relaxed">{{ item.a }}</p>
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
    q: "Is it free to list my venue on Venpadi?",
    a: "Yes. Creating and publishing a listing is free. Venpadi earns a transparent service fee only when you successfully complete a booking through the platform.",
  },
  {
    q: "How and when do I get paid?",
    a: "Host payments are collected securely. After the event completes as agreed, funds are released to your bank. Eligible partners can access faster or instant payout options.",
  },
  {
    q: "Can I still take offline bookings?",
    a: "Absolutely. Block those dates on your Venpadi calendar so you never double-book. You stay in control of every available slot.",
  },
  {
    q: "What if a host cancels?",
    a: "Cancellation and deposit rules are clear up front. Depending on timing and your listing policy, you may keep part or all of the deposit.",
  },
  {
    q: "Do I need to be available 24/7?",
    a: "No. Set response windows, enable notifications, and use quick accept/decline from the owner dashboard or mobile.",
  },
  {
    q: "Which cities do you cover?",
    a: "We’re live across major Nigerian cities including Lagos and Abuja, and expanding. If your venue is elsewhere, list it — demand follows great spaces.",
  },
];
</script>
