<template>
  <section id="messaging" class="bg-[#0B0F14] text-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-start">
        <div
          class="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden order-2 md2:order-1"
        >
          <div class="px-5 py-4 border-b border-white/10">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-bold">Kemi & Tunde Wedding Reception</p>
                <p class="mt-0.5 text-[11px] text-white/40">
                  12 May · Dec · Thread since May 10, 2024
                </p>
              </div>
              <span
                class="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400"
              >
                Verified client
              </span>
            </div>
          </div>

          <div class="p-5 space-y-4 min-h-[260px]">
            <div class="max-w-[85%]">
              <p class="text-[11px] text-white/40 mb-1">Sami Abayomi · Client</p>
              <div class="rounded-2xl rounded-tl-md bg-white/10 px-4 py-3 text-sm text-white/80">
                Can we confirm load-in access for the AV team from 7am on the day?
              </div>
            </div>
            <div class="max-w-[85%] ml-auto text-right">
              <p class="text-[11px] text-white/40 mb-1">You · Venue operations</p>
              <div
                class="rounded-2xl rounded-tr-md bg-primary/90 px-4 py-3 text-sm text-white text-left"
              >
                Confirmed — dock open 7:00–9:30. Floor plan v2 attached.
              </div>
              <div
                class="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs text-white/70"
              >
                <i class="pi pi-file-pdf text-primary"></i>
                Grand_Hall_FloorPlan_v2.pdf
              </div>
            </div>
          </div>

          <div class="px-5 py-4 border-t border-white/10">
            <div
              class="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-white/40"
            >
              <span class="flex-1 text-left">Write a reply…</span>
              <i class="pi pi-send text-primary text-xs"></i>
            </div>
          </div>
        </div>

        <div class="order-1 md2:order-2">
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-violet-400">
            05 — Messaging
          </p>
          <h2
            class="mt-3 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold tracking-tight leading-tight"
          >
            Every client. One thread. Nothing lost.
          </h2>
          <p class="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
            Stop scrambling through deleted WhatsApp voice notes and scattered email
            attachments. Venpadi anchors every conversation, specification, and floor
            plan revision directly to the event booking.
          </p>

          <ul class="mt-8 space-y-5">
            <li v-for="item in features" :key="item.title" class="flex gap-3">
              <span
                class="mt-0.5 w-8 h-8 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center shrink-0"
              >
                <i :class="['pi text-xs', item.icon]"></i>
              </span>
              <div>
                <p class="text-sm font-bold">{{ item.title }}</p>
                <p class="mt-1 text-sm text-white/50 leading-relaxed">{{ item.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: "Booking-linked threads",
    body: "Keeps chat, guest headcounts, and invoices in one place.",
    icon: "pi-link",
  },
  {
    title: "Event briefing questionnaires",
    body: "Standardize requirements for sound, lights, stage plans, and generators.",
    icon: "pi-list",
  },
  {
    title: "Version-controlled documents",
    body: "Store floor plans and safety certificates with audit logs so outdated files never win.",
    icon: "pi-history",
  },
  {
    title: "Push & SMS alerts",
    body: "Clients get immediate SMS pings when you reply — faster approvals.",
    icon: "pi-mobile",
  },
  {
    title: "Broadcast messaging",
    body: "Message all upcoming weekend clients at once about weather or roadworks.",
    icon: "pi-megaphone",
  },
];
</script>
