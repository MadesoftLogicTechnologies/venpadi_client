<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full max-w-[880px] mx-auto">
      <h1 class="text-center text-[28px] md2:text-[36px] font-extrabold text-header tracking-tight">
        How can we help you today?
      </h1>
      <div class="mt-5 max-w-[520px] mx-auto">
        <Search v-model="search" kind="grey" placeholder="Search the help articles..." />
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
            Open <i class="pi pi-arrow-right text-[10px]"></i>
          </span>
        </NuxtLink>
      </div>

      <section class="mt-8">
        <h2 class="text-[18px] font-bold text-header">Frequently asked questions</h2>

        <div v-if="faqsPending && !faqs.length" class="mt-3 bg-white rounded-[24px] border border-border px-5 py-8 text-center text-[13px] text-bodytext">
          Loading questions…
        </div>
        <div
          v-else-if="faqsError && !faqs.length"
          class="mt-3 bg-white rounded-[24px] border border-border px-5 py-8 text-center"
        >
          <p class="text-[13px] text-bodytext">We couldn’t load the help articles.</p>
          <button type="button" class="mt-2 text-[13px] font-semibold text-primary" @click="refreshFaqs">Try again</button>
        </div>
        <p
          v-else-if="!faqs.length"
          class="mt-3 bg-white rounded-[24px] border border-border px-5 py-8 text-center text-[13px] text-bodytext"
        >
          No help articles have been published yet — contact support below and we’ll answer directly.
        </p>
        <div
          v-else-if="visibleFaqs.length"
          class="mt-3 bg-white rounded-[24px] border border-border divide-y divide-border overflow-hidden"
        >
          <details v-for="(item, i) in visibleFaqs" :key="item.id" class="group">
            <summary class="flex items-center gap-3 cursor-pointer list-none px-5 py-4">
              <span class="w-8 h-8 rounded-full bg-header text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                {{ i + 1 }}
              </span>
              <span class="flex-1 min-w-0">
                <span class="block text-[14px] font-semibold text-header">{{ item.question }}</span>
                <span v-if="item.category" class="block text-[11px] text-bodytext2 mt-0.5">{{ item.category }}</span>
              </span>
              <i class="pi pi-chevron-right text-[11px] text-bodytext transition-transform group-open:rotate-90"></i>
            </summary>
            <p class="px-5 pb-4 md2:pl-[4.75rem] text-[13px] text-bodytext leading-relaxed whitespace-pre-line">{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <p v-if="search.trim() && faqs.length && !visibleCards.length && !visibleFaqs.length" class="mt-6 text-center text-[13px] text-bodytext">
        No help articles match that search.
      </p>

      <section class="mt-8 bg-white rounded-[24px] border border-border px-5 md2:px-8 py-8 text-center">
        <h2 class="text-[22px] font-extrabold text-header tracking-tight">Still need assistance?</h2>
        <p class="mt-2 text-[13px] text-bodytext max-w-[480px] mx-auto">
          Message a venue about a booking, or write to the Venpadi support team.
        </p>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <article class="rounded-[20px] border border-border bg-[#F9FAFB] px-5 py-5">
            <span class="w-9 h-9 rounded-xl inline-flex items-center justify-center bg-[#FFF1ED]">
              <i class="pi pi-comment text-[14px] text-primary"></i>
            </span>
            <p class="mt-3 text-[15px] font-bold text-header">Chat with a venue</p>
            <p class="mt-1 text-[12px] text-bodytext">Questions about dates, spaces or a booking go straight to the venue.</p>
            <NuxtLink
              :to="signedIn ? '/messages' : { path: '/auth/login', query: { redirect: '/messages' } }"
              class="mt-4 inline-flex h-10 px-4 items-center rounded-lg text-[13px] font-semibold bg-brand-gradient-soft text-white"
            >
              {{ signedIn ? "Start Chat" : "Sign in to chat" }}
            </NuxtLink>
          </article>
          <article class="rounded-[20px] border border-border bg-[#F9FAFB] px-5 py-5">
            <span class="w-9 h-9 rounded-xl inline-flex items-center justify-center bg-[#F3F4F6]">
              <i class="pi pi-envelope text-[14px] text-header"></i>
            </span>
            <p class="mt-3 text-[15px] font-bold text-header">Email Venpadi support</p>
            <p class="mt-1 text-[12px] text-bodytext">Payments, refunds, your account or anything else.</p>
            <a
              href="mailto:support@venpadi.com"
              class="mt-4 inline-flex h-10 px-4 items-center rounded-lg text-[13px] font-semibold bg-header text-white"
            >
              support@venpadi.com
            </a>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

useHead({ title: "Help" });

const auth = useAuthStore();
const signedIn = computed(() => auth.isAuthenticated);
const search = ref("");

const cards = [
  { to: "/bookings", title: "My Bookings", text: "Track approvals, payments and dates." },
  { to: "/messages", title: "Message a venue", text: "Ask questions before or after booking." },
  { to: "/invoices", title: "Payments", text: "See what’s due and what you’ve paid." },
  { to: "/settings", title: "Account & Privacy", text: "Password, signed-in devices, notifications and your data." },
];

// C1: the questions are managed by admins and served by the API
// (GET /public/content/faqs?audience=client, display order). The hard-coded
// list they replace had drifted from the product (e.g. "usually within 24
// hours"). Search stays client-side over the loaded list.
const {
  data: faqsData,
  pending: faqsPending,
  error: faqsError,
  refresh: refreshFaqs,
} = useResource(() => api.get("/public/content/faqs", { audience: "client" }, { toast: false }), { initial: [] });
const faqs = computed(() => (Array.isArray(faqsData.value) ? faqsData.value : []));

function matches(text) {
  const q = search.value.trim().toLowerCase();
  if (!q) return true;
  return String(text || "").toLowerCase().includes(q);
}

const visibleCards = computed(() => cards.filter((c) => matches(`${c.title} ${c.text}`)));
const visibleFaqs = computed(() =>
  faqs.value.filter((item) => matches(`${item.question} ${item.answer} ${item.category ?? ""}`))
);
</script>
