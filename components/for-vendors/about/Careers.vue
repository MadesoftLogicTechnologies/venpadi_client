<template>
  <section id="careers" class="bg-white py-16 md2:py-24 scroll-mt-24">
    <div class="max-w-[960px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        Careers at Venpadi
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
      >
        We hire people who take venue owners personally.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl">
        Help us build definitive hospitality infrastructure from Lagos to the world.
      </p>
      <p class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-header">
        <span
          class="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center"
        >
          <i class="pi pi-check text-[10px] font-bold"></i>
        </span>
        Remote-friendly across Africa & Europe
      </p>

      <div class="mt-10 space-y-3">
        <article
          v-for="job in jobs"
          :key="job.title"
          class="rounded-2xl border border-border bg-white px-5 py-5 sm:px-6 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div class="flex-1 min-w-0">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide uppercase"
            >
              {{ job.team }}
            </span>
            <h3 class="mt-2.5 text-base sm:text-lg font-extrabold text-header">
              {{ job.title }}
            </h3>
            <p class="mt-1 text-sm text-bodytext">{{ job.meta }}</p>
          </div>
          <a
            :href="job.href"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-90 shrink-0"
          >
            Apply Now
            <i class="pi pi-arrow-right text-xs"></i>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const jobs = [
  {
    team: "Engineering",
    title: "Senior Backend Engineer (Payments & Settlement)",
    meta: "Full-time · Lagos / Hybrid / Remote",
    href: "mailto:careers@venpadi.com?subject=Senior%20Backend%20Engineer",
  },
  {
    team: "Product Design",
    title: "Product Designer (Design Systems & Web)",
    meta: "Full-time · Nairobi / Remote",
    href: "mailto:careers@venpadi.com?subject=Product%20Designer",
  },
  {
    team: "Growth & Operations",
    title: "Venue Success Manager (East Africa Expansion)",
    meta: "Full-time · Kigali / Remote",
    href: "mailto:careers@venpadi.com?subject=Venue%20Success%20Manager",
  },
];
</script>
