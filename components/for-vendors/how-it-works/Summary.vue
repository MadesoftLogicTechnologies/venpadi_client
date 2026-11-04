<template>
  <section class="bg-white py-14 md2:py-20">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <h2
          class="text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold text-header tracking-tight leading-tight"
        >
          Seven steps. One platform.
          <span class="text-primary">A venue business that runs itself.</span>
        </h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 md2:grid-cols-7 gap-2.5 sm:gap-3 mb-10">
        <div
          v-for="(step, i) in steps"
          :key="step"
          class="rounded-2xl border p-3 text-center"
          :class="
            i === steps.length - 1
              ? 'border-primary/30 bg-primary/5'
              : 'border-border bg-[#F7F8FA]'
          "
        >
          <p class="text-[11px] font-extrabold text-primary mb-1">
            {{ String(i + 1).padStart(2, "0") }}
          </p>
          <p class="text-xs font-semibold text-header leading-snug">{{ step }}</p>
        </div>
      </div>

      <div class="grid sm:grid-cols-3 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.value"
          class="rounded-[1.25rem] border border-border bg-[#F7F8FA] p-5 sm:p-6"
        >
          <p class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">{{ stat.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  "Create account",
  "Build profile",
  "Set pricing",
  "Calendar",
  "Go live",
  "Promote",
  "Get paid",
];

const stats = [
  {
    value: "20 minutes",
    text: "To set up your venue business and have it live for hosts to discover.",
  },
  {
    value: "48 hours",
    text: "Average time from first contact to a fully paid booking on the platform.",
  },
  {
    value: "24 hours",
    text: "Payouts of booked and completed events straight into your bank account.",
  },
];
</script>
