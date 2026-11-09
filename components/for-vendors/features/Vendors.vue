<template>
  <section id="vendors" class="bg-[#F7F5F0] py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="max-w-2xl">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-pink-600">
          06 — Vendor network
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight"
        >
          Your clients want more than a venue. Give them everything.
        </h2>
        <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
          Turn your event venue into a full-service hospitality ecosystem while taking a
          predictable commission on auxiliary supplier hires.
        </p>
      </div>

      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-4 gap-3">
        <article
          v-for="cat in categories"
          :key="cat.title"
          class="rounded-2xl bg-white border border-border p-4 sm:p-5"
        >
          <div
            class="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center"
          >
            <i :class="['pi text-xs', cat.icon]"></i>
          </div>
          <h3 class="mt-3 text-sm font-extrabold text-header">{{ cat.title }}</h3>
          <p class="mt-1 text-xs text-bodytext">{{ cat.count }} vetted vendors</p>
        </article>
      </div>

      <div class="mt-6 grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <article
          v-for="item in benefits"
          :key="item.title"
          class="rounded-2xl bg-white border border-border p-5"
        >
          <h3 class="text-sm font-extrabold text-header">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  { title: "Music & DJs", count: 142, icon: "pi-volume-up" },
  { title: "Photography & Video", count: 215, icon: "pi-camera" },
  { title: "Gourmet Catering", count: 98, icon: "pi-shopping-bag" },
  { title: "Floristry & Decor", count: 112, icon: "pi-sun" },
  { title: "MC & Host Services", count: 84, icon: "pi-microphone" },
  { title: "AV & Lighting", count: 62, icon: "pi-bolt" },
  { title: "Transportation", count: 44, icon: "pi-car" },
  { title: "Event Staffing", count: 52, icon: "pi-users" },
];

const benefits = [
  {
    title: "100% vetted vendors",
    body: "All third-party hires pass background checks, health permits, and equipment tests.",
  },
  {
    title: "Preferred vendor lists",
    body: "Lock your own preferred list to keep unreliable suppliers off your floors.",
  },
  {
    title: "In-booking coordination",
    body: "Vendor arrival, loading dock timings, and electrical schematics automated.",
  },
  {
    title: "Revenue share",
    body: "Earn 5%–10% referral fees paid automatically on every vendor booked via your link.",
  },
];
</script>
