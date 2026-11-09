<template>
  <section id="summary" class="bg-[#F7F5F2] py-16 md2:py-24 border-t border-black/5">
    <div class="max-w-[1180px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-3xl mx-auto mb-10 md2:mb-12">
        <h2
          class="text-2xl sm:text-3xl md2:text-[2.6rem] font-extrabold text-header tracking-tight leading-tight"
        >
          Seven steps. One platform.
          <span class="block text-transparent bg-clip-text bg-brand-gradient-soft">
            A venue business that runs itself.
          </span>
        </h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 md2:grid-cols-7 gap-2.5 sm:gap-3 mb-8 md2:mb-10">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="rounded-2xl border p-3.5 sm:p-4 text-left min-h-0"
          :class="
            i === steps.length - 1
              ? 'border-primary/40 bg-primary/[0.06]'
              : 'border-border bg-white'
          "
        >
          <p
            class="text-[11px] font-extrabold mb-1"
            :class="i === steps.length - 1 ? 'text-primary' : 'text-header'"
          >
            {{ String(i + 1).padStart(2, "0") }} {{ step.title }}
          </p>
          <p
            class="text-[11px] leading-snug"
            :class="i === steps.length - 1 ? 'text-primary/80' : 'text-bodytext'"
          >
            {{ step.sub }}
          </p>
        </div>
      </div>

      <div class="grid sm:grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="stat in stats"
          :key="stat.value"
          class="rounded-[1.25rem] border border-border bg-white p-5 sm:p-6"
        >
          <span
            class="inline-flex w-9 h-9 rounded-xl items-center justify-center mb-3"
            :class="stat.iconClass"
          >
            <i :class="stat.icon" class="text-sm"></i>
          </span>
          <p
            class="text-2xl sm:text-3xl font-extrabold tracking-tight"
            :class="stat.valueClass"
          >
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
  { title: "Create Account", sub: "2 minutes" },
  { title: "Build Profile", sub: "Media & Story" },
  { title: "Add Spaces", sub: "Hourly/Daily" },
  { title: "Set Calendar", sub: "Sync & Holds" },
  { title: "Go Live", sub: "Instant Index" },
  { title: "Enquiries", sub: "Direct Chat" },
  { title: "Get Paid", sub: "24hr Escrow" },
];

const stats = [
  {
    icon: "pi pi-clock",
    iconClass: "bg-header/5 text-header",
    value: "20 minutes",
    valueClass: "text-header",
    text: "To complete onboarding from zero to a live, bookable venue showcase.",
  },
  {
    icon: "pi pi-calendar",
    iconClass: "bg-primary/10 text-primary",
    value: "48 hours",
    valueClass: "text-transparent bg-clip-text bg-brand-gradient-soft",
    text: "Historical average duration to receive your first verified client booking inquiry.",
  },
  {
    icon: "pi pi-wallet",
    iconClass: "bg-header/5 text-header",
    value: "24 hours",
    valueClass: "text-header",
    text: "Speed of complete fund release into your treasury post event completion.",
  },
];
</script>
