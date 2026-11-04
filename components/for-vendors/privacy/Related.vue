<template>
  <section class="bg-[#F9F9F7] py-14 md2:py-16 border-t border-border">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
        Related Legal Documents
      </h2>
      <div class="mt-8 grid sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="doc in docs"
          :key="doc.title"
          :to="doc.to"
          class="rounded-2xl bg-white border border-border p-5 shadow-[0_8px_24px_rgba(26,22,20,0.04)] hover:border-primary/30 transition-colors"
        >
          <div
            class="w-9 h-9 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center mb-4"
          >
            <i :class="['pi text-sm', doc.icon]"></i>
          </div>
          <h3 class="text-sm font-bold text-header">{{ doc.title }}</h3>
          <p class="mt-2 text-xs text-bodytext leading-relaxed">{{ doc.body }}</p>
          <p class="mt-4 text-xs font-semibold text-header">
            {{ doc.cta }}
            <span class="text-primary">→</span>
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const docs = [
  {
    title: "Terms of Service",
    body: "Commercial terms for listing, bookings, fees, cancellations, and dispute resolution.",
    icon: "pi-file",
    to: "/for-vendors/terms",
    cta: "Read more",
  },
  {
    title: "Cookie preferences",
    body: "How cookies and similar technologies support auth, security, and analytics.",
    icon: "pi-circle",
    to: "/for-vendors/privacy#priv-09",
    cta: "See cookies chapter",
  },
  {
    title: "Owner FAQ",
    body: "Plain answers on listings, payouts, verification, and support for venue owners.",
    icon: "pi-question-circle",
    to: "/for-vendors/faqs",
    cta: "Read more",
  },
];
</script>
