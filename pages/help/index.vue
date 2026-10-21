<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[900px]">
      <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">Help</h1>
      <p class="mt-1 text-[14px] text-bodytext">Answers to common questions about booking on Venpadi.</p>

      <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="bg-white rounded-2xl border border-border p-4 hover:shadow-sm transition-shadow"
        >
          <i :class="['pi text-primary', link.icon]"></i>
          <p class="mt-2 text-[14px] font-semibold text-header">{{ link.title }}</p>
          <p class="text-[12px] text-bodytext">{{ link.text }}</p>
        </NuxtLink>
      </div>

      <section class="mt-5 bg-white rounded-2xl border border-border divide-y divide-border">
        <details v-for="item in faqs" :key="item.q" class="group px-5 py-4">
          <summary class="flex items-center justify-between gap-3 cursor-pointer list-none text-[14px] font-semibold text-header">
            {{ item.q }}
            <i class="pi pi-chevron-down text-[11px] text-bodytext transition-transform group-open:rotate-180"></i>
          </summary>
          <p class="mt-2 text-[13px] text-bodytext leading-relaxed">{{ item.a }}</p>
        </details>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Help" });

const links = [
  { to: "/bookings", icon: "pi-calendar", title: "My Bookings", text: "Track approvals, payments and dates." },
  { to: "/messages", icon: "pi-comment", title: "Message a venue", text: "Ask questions before or after booking." },
  { to: "/invoices", icon: "pi-file", title: "Payments", text: "See what’s due and download receipts." },
];

const faqs = [
  {
    q: "How does booking work?",
    a: "Pick a venue and space, set up your event days, add any extras, then submit your proposal. Instant-book venues approve straight away; others review your request, usually within 24 hours.",
  },
  {
    q: "When do I pay?",
    a: "Once a booking is approved you pay the deposit (shown on your booking) to lock the dates. The balance is due before the event. Every amount and due date is listed under Payment schedule.",
  },
  {
    q: "What is the caution deposit?",
    a: "Some spaces hold a refundable caution deposit against damage. It is returned after the venue inspects the space following your event.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Open the booking and choose Cancel booking — you’ll see exactly how much is refunded under the venue’s cancellation policy before you confirm.",
  },
  {
    q: "How do I change my password or notification settings?",
    a: "Go to Settings. The Security tab changes your password and signs out other devices; Notifications controls what we email or show in-app.",
  },
];
</script>
