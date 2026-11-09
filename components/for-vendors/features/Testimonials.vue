<template>
  <section id="stories" class="bg-[#F7F5F0] py-16 md2:py-20 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        What owners say
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight"
      >
        From owners who made the switch.
      </h2>
      <p class="mt-3 text-sm sm:text-base text-bodytext max-w-2xl leading-relaxed">
        Event center directors recovering lost time — and finally trusting their
        calendars.
      </p>

      <div class="mt-10 grid md2:grid-cols-3 gap-4">
        <article
          v-for="item in items"
          :key="item.name"
          class="rounded-2xl bg-white border border-border p-5 sm:p-6"
        >
          <div class="flex gap-0.5 text-amber-400 text-xs">
            <i v-for="n in 5" :key="n" class="pi pi-star-fill"></i>
          </div>
          <p class="mt-4 text-sm text-header leading-relaxed">“{{ item.quote }}”</p>
          <div class="mt-5 flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-header text-white flex items-center justify-center text-xs font-bold"
            >
              {{ item.initials }}
            </div>
            <div>
              <p class="text-sm font-bold text-header">{{ item.name }}</p>
              <p class="text-xs text-bodytext">{{ item.place }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    initials: "TA",
    name: "Tobi Adeyemi",
    place: "The Rooftop · Lekki, Lagos",
    quote:
      "We stopped losing Saturdays to WhatsApp double-bookings. Holds expire, deposits clear, and my team finally sleeps.",
  },
  {
    initials: "NO",
    name: "Ngozi Okeke",
    place: "Azure Gardens · Mabushi, Abuja",
    quote:
      "Escrow meant I could say yes to international planners without chasing SWIFT proofs for three days.",
  },
  {
    initials: "EO",
    name: "Emeka Okoro",
    place: "Harbourview Hall · Port Harcourt",
    quote:
      "The 5% only hits when the event completes. Listing was free — switching from our old CMS took an afternoon.",
  },
];
</script>
