<template>
  <section id="vendors" class="bg-[#F7F5F0] py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="max-w-2xl">
        <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-pink-600">
          06 — Add-ons
        </p>
        <h2
          class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight"
        >
          Your clients want more than a venue. Sell them the extras.
        </h2>
        <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed">
          Offer the services you provide alongside the space — clients add them while
          booking, and they are priced and invoiced with the hire.
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
// Kinds of add-on a venue can sell. The third-party vendor marketplace is a
// later phase and is not presented here (audit C4).
const categories = [
  { title: "Music & DJs", icon: "pi-volume-up" },
  { title: "Photography & Video", icon: "pi-camera" },
  { title: "Catering", icon: "pi-shopping-bag" },
  { title: "Floristry & Decor", icon: "pi-sun" },
  { title: "MC & Host Services", icon: "pi-microphone" },
  { title: "AV & Lighting", icon: "pi-bolt" },
  { title: "Transportation", icon: "pi-car" },
  { title: "Event Staffing", icon: "pi-users" },
];

const benefits = [
  {
    title: "Your own price list",
    body: "Price each add-on per event, per day, per hour or per guest, and choose which spaces offer it.",
  },
  {
    title: "Chosen while booking",
    body: "Clients pick add-ons with their space; the total is calculated before they pay.",
  },
  {
    title: "Refundable deposits",
    body: "Attach a caution deposit to equipment add-ons — held in escrow with the booking.",
  },
  {
    title: "One invoice, one payout",
    body: "Add-on payments arrive with the hire and are paid out with it.",
  },
];
</script>
