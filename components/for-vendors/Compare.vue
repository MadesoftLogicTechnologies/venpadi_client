<template>
  <section class="bg-[#F7F8FA] py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Why Venpadi
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          Listing your venue shouldn’t feel like another side hustle.
        </h2>
      </div>

      <div class="overflow-x-auto rounded-3xl border border-border bg-white shadow-sm">
        <table class="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr class="border-b border-border bg-greybg/50">
              <th class="px-5 py-4 font-semibold text-bodytext2 w-[32%]">Capability</th>
              <th class="px-5 py-4 font-extrabold text-primary w-[23%]">
                <span class="inline-flex items-center gap-2">
                  Venpadi
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 font-bold">
                    Recommended
                  </span>
                </span>
              </th>
              <th class="px-5 py-4 font-semibold text-bodytext2 w-[23%]">DIY / socials</th>
              <th class="px-5 py-4 font-semibold text-bodytext2 w-[22%]">Other platforms</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.label"
              class="border-b border-border last:border-0"
              :class="i % 2 === 1 ? 'bg-greybg/30' : ''"
            >
              <td class="px-5 py-4 font-medium text-header">{{ row.label }}</td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-2 text-header font-semibold">
                  <i class="pi pi-check-circle text-success text-sm"></i>
                  {{ row.venpadi }}
                </span>
              </td>
              <td class="px-5 py-4 text-bodytext">{{ row.diy }}</td>
              <td class="px-5 py-4 text-bodytext">{{ row.other }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-4 gap-4">
        <article
          v-for="card in perks"
          :key="card.title"
          class="rounded-2xl border border-border bg-white p-5"
        >
          <span
            class="w-10 h-10 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center"
          >
            <i :class="card.icon"></i>
          </span>
          <h3 class="mt-4 text-sm font-extrabold text-header">{{ card.title }}</h3>
          <p class="mt-2 text-xs text-bodytext leading-relaxed">{{ card.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [
  {
    label: "Qualified booking demand",
    venpadi: "Built-in host traffic",
    diy: "You chase every lead",
    other: "Mixed / paid ads",
  },
  {
    label: "Payment protection",
    venpadi: "Escrow + guaranteed payouts",
    diy: "Manual transfers",
    other: "Varies",
  },
  {
    label: "Calendar & availability",
    venpadi: "Synced owner dashboard",
    diy: "Spreadsheets / WhatsApp",
    other: "Basic tools",
  },
  {
    label: "Setup cost",
    venpadi: "Free to list",
    diy: "Time & ads",
    other: "Often subscription",
  },
  {
    label: "Local support",
    venpadi: "Nigeria-first team",
    diy: "You’re on your own",
    other: "Generic support",
  },
];

const perks = [
  {
    icon: "pi pi-bolt",
    title: "Instant payouts",
    text: "Eligible partners can withdraw confirmed earnings straight to their bank.",
  },
  {
    icon: "pi pi-lock",
    title: "Secure payments",
    text: "Host payments are held safely until the event completes as agreed.",
  },
  {
    icon: "pi pi-shield",
    title: "Protected by Venpadi",
    text: "Clear policies on deposits, cancellations, and dispute handling.",
  },
  {
    icon: "pi pi-headphones",
    title: "Owner support",
    text: "Dedicated help for listing setup, pricing tips, and booking issues.",
  },
];
</script>
