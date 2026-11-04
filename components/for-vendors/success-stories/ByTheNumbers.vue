<template>
  <section class="bg-white py-14 md2:py-20">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center mb-10">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
          By the numbers: the financial breakdown
        </h2>
        <p class="mt-2 text-sm text-bodytext">
          Results from The Rooftop Lagos after one full year on Venpadi.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 md2:grid-cols-3 gap-4">
        <div
          v-for="card in cards"
          :key="card.label"
          class="rounded-[1.25rem] border border-border bg-[#F7F8FA] p-5 sm:p-6"
        >
          <p
            class="text-2xl sm:text-3xl font-extrabold tracking-tight"
            :class="card.accent ? 'text-primary' : 'text-header'"
          >
            {{ card.value }}
          </p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">{{ card.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { value: "₦18.25M", label: "Total transaction value managed through the platform" },
  { value: "100%", label: "Events completed without payment chase-backs", accent: true },
  { value: "42%", label: "Growth in recurring monthly revenue" },
  { value: "4,200 m²", label: "Effective space inventory managed across packages" },
  { value: "10,230", label: "Guests hosted through Venpadi bookings" },
  { value: "4.95 / 5", label: "Average guest rating after events", accent: true },
];
</script>
