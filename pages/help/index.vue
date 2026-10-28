<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full max-w-[880px] mx-auto">
      <h1 class="text-center text-[28px] md2:text-[36px] font-extrabold text-header tracking-tight">
        How can we help you today?
      </h1>
      <div class="mt-5 max-w-[520px] mx-auto">
        <Search v-model="search" kind="grey" placeholder="Search the knowledge base..." />
      </div>

      <div v-if="visibleCards.length" class="mt-8 grid grid-cols-1 md2:grid-cols-2 gap-4">
        <NuxtLink
          v-for="link in visibleCards"
          :key="link.to"
          :to="link.to"
          class="bg-white rounded-[24px] border border-border p-5 md2:p-6 hover:shadow-sm transition-shadow flex flex-col"
        >
          <p class="text-[18px] font-bold text-header">{{ link.title }}</p>
          <p class="mt-2 text-[13px] text-bodytext leading-relaxed flex-1">{{ link.text }}</p>
          <span class="mt-5 text-[13px] font-semibold text-primary inline-flex items-center gap-1">
            View all <i class="pi pi-arrow-right text-[10px]"></i>
          </span>
        </NuxtLink>
      </div>

      <section v-if="visibleFaqs.length" class="mt-8">
        <h2 class="text-[18px] font-bold text-header">Trending Topics</h2>
        <div class="mt-3 bg-white rounded-[24px] border border-border divide-y divide-border overflow-hidden">
          <details v-for="(item, i) in visibleFaqs" :key="item.q" class="group">
            <summary class="flex items-center gap-3 cursor-pointer list-none px-5 py-4">
              <span class="w-8 h-8 rounded-full bg-header text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                {{ i + 1 }}
              </span>
              <span class="flex-1 text-[14px] font-semibold text-header">{{ item.q }}</span>
              <i class="pi pi-chevron-right text-[11px] text-bodytext transition-transform group-open:rotate-90"></i>
            </summary>
            <p class="px-5 pb-4 md2:pl-[4.75rem] text-[13px] text-bodytext leading-relaxed">{{ item.a }}</p>
          </details>
        </div>
      </section>

      <p v-if="search.trim() && !visibleCards.length && !visibleFaqs.length" class="mt-10 text-center text-[13px] text-bodytext">
        No help articles match that search.
      </p>

      <section class="mt-8 bg-white rounded-[24px] border border-border px-5 md2:px-8 py-8 text-center">
        <h2 class="text-[22px] font-extrabold text-header tracking-tight">Still need assistance?</h2>
        <p class="mt-2 text-[13px] text-bodytext max-w-[480px] mx-auto">
          {{ assistance[0]?.text }}
        </p>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <article
            v-for="item in assistance"
            :key="item.to"
            class="rounded-[20px] border border-border bg-[#F9FAFB] px-5 py-5"
          >
            <span class="w-9 h-9 rounded-xl inline-flex items-center justify-center" :class="item.iconWrap">
              <i :class="['pi text-[14px]', item.icon, item.iconColor]"></i>
            </span>
            <p class="mt-3 text-[15px] font-bold text-header">{{ item.title }}</p>
            <p class="mt-1 text-[12px] text-bodytext">{{ item.text }}</p>
            <NuxtLink
              :to="item.to"
              class="mt-4 inline-flex h-10 px-4 items-center rounded-lg text-[13px] font-semibold"
              :class="item.ctaClass"
            >
              {{ item.cta }}
            </NuxtLink>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Help" });

const search = ref("");

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

const cards = computed(() => [
  ...links,
  {
    to: "/settings",
    icon: "pi-cog",
    title: "Account & Privacy",
    text: "Go to Settings. The Security tab changes your password and signs out other devices; Notifications controls what we email or show in-app.",
  },
]);

const assistance = computed(() => {
  const chat = links.find((l) => l.to === "/messages") || links[1];
  return [
    {
      ...chat,
      cta: "Start Chat",
      iconWrap: "bg-[#FFF1ED]",
      iconColor: "text-primary",
      ctaClass: "bg-brand-gradient-soft text-white",
    },
    {
      to: "/settings",
      icon: "pi-cog",
      title: "Account & Privacy",
      text: faqs[4].a,
      cta: "Open Settings",
      iconWrap: "bg-[#F3F4F6]",
      iconColor: "text-header",
      ctaClass: "bg-header text-white",
    },
  ];
});

function matches(text) {
  const q = search.value.trim().toLowerCase();
  if (!q) return true;
  return String(text || "").toLowerCase().includes(q);
}

const visibleCards = computed(() => cards.value.filter((c) => matches(`${c.title} ${c.text}`)));
const visibleFaqs = computed(() => faqs.filter((item) => matches(`${item.q} ${item.a}`)));
</script>
