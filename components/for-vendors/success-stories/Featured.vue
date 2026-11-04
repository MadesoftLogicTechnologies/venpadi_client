<template>
  <section class="relative -mt-20 md2:-mt-28 pb-6">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <article
        class="grid md2:grid-cols-2 rounded-[1.5rem] overflow-hidden border border-border bg-white shadow-[0_28px_70px_rgba(15,23,42,0.14)]"
      >
        <div class="p-6 sm:p-8 md2:p-10 flex flex-col">
          <div class="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-wide uppercase">
            <span class="text-primary">Rooftop bar & lounge</span>
            <span class="text-bodytext2">·</span>
            <span class="text-bodytext2">14-min read</span>
          </div>

          <h2
            class="mt-3 text-xl sm:text-2xl md2:text-[1.75rem] font-extrabold text-header tracking-tight leading-snug"
          >
            From word-of-mouth to ₦22M in one year: how Tobi filled The Rooftop Lagos
          </h2>

          <p class="mt-3 text-sm text-bodytext leading-relaxed">
            Chaotic WhatsApp threads became automated bookings. Occupancy climbed from
            quiet weekdays to a calendar that pays for itself — with verified metrics
            from the owner who lived it.
          </p>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div v-for="stat in stats" :key="stat.label">
              <p class="text-[10px] font-bold tracking-wider uppercase text-bodytext2">
                {{ stat.label }}
              </p>
              <p class="mt-1 text-lg sm:text-xl font-extrabold text-header tracking-tight">
                {{ stat.value }}
              </p>
              <p class="text-[11px] text-bodytext">{{ stat.sub }}</p>
            </div>
          </div>

          <div
            class="mt-auto pt-8 flex flex-wrap items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3">
              <img
                :src="avatar"
                alt="Tobi Adeyemi"
                class="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-bold text-header">Tobi Adeyemi</p>
                <p class="text-xs text-bodytext">Founder, The Rooftop Lagos</p>
              </div>
            </div>
            <a
              href="#deep-dive"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-header text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Read complete story
              <i class="pi pi-arrow-right text-xs"></i>
            </a>
          </div>
        </div>

        <div class="relative min-h-[280px] md2:min-h-full">
          <img
            :src="image"
            alt="The Rooftop Lagos"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
          ></div>
          <blockquote
            class="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6 rounded-2xl bg-white/95 backdrop-blur px-4 py-3.5 shadow-lg"
          >
            <p class="text-sm text-header leading-relaxed font-medium">
              “Venpadi eliminated our 4-hour daily back-and-forth… revenue grew 3× in a
              year.”
            </p>
            <footer class="mt-2 text-xs font-semibold text-bodytext">
              — Tobi Adeyemi, The Rooftop
            </footer>
          </blockquote>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const avatar =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop";
const image =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&h=700&fit=crop";

const stats = [
  { label: "Revenue increase", value: "₦22.4M", sub: "Per annum" },
  { label: "Occupancy rate", value: "94%", sub: "Up from 28%" },
  { label: "Payback", value: "14 mo", sub: "Full setup cost" },
];
</script>
