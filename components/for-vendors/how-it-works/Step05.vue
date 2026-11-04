<template>
  <section id="step-05" class="bg-[#F7F5F2] py-14 md2:py-20 border-t border-black/5">
    <div class="max-w-[960px] mx-auto px-4 sm:px-6 md2:px-8 text-center">
      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
      >
        Publish
      </span>
      <h2
        class="mt-4 text-2xl sm:text-3xl md2:text-[2.5rem] font-extrabold text-header tracking-tight leading-tight"
      >
        Hit publish.
        <span class="text-primary">The world is watching.</span>
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl mx-auto">
        When your listing goes live, Venpadi distributes your space to qualified event
        producers, corporate coordinators, and hosts already searching in your city.
      </p>

      <div class="relative mt-10 max-w-md mx-auto">
        <div
          class="absolute -left-2 sm:-left-8 top-10 rounded-2xl bg-white border border-border shadow-sm px-3 py-2 text-[11px] font-semibold text-header"
        >
          Live updates in real time
        </div>
        <div
          class="absolute -right-2 sm:-right-10 bottom-16 rounded-2xl bg-white border border-border shadow-sm px-3 py-2 text-[11px] font-semibold text-header"
        >
          Listing available to hosts
        </div>

        <div
          class="relative rounded-[1.5rem] border border-border bg-white overflow-hidden text-left shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
        >
          <div class="aspect-[16/10] bg-gradient-to-br from-[#2A2F38] via-[#3D4450] to-[#1A1E24] relative">
            <span
              class="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              LIVE
            </span>
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-base font-extrabold text-header">The Grandeur Hall & Terrace</p>
            <p class="mt-1 text-xs text-bodytext">Victoria Island, Lagos · Capacity 350–500</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in ['Weddings', 'Corporate', 'Rooftop']"
                :key="tag"
                class="px-2.5 py-1 rounded-full bg-greybg text-[11px] font-semibold text-header"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 grid sm:grid-cols-3 gap-6 sm:gap-8">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
            {{ stat.value }}
          </p>
          <p class="mt-1 text-[11px] font-bold tracking-wider uppercase text-primary">
            {{ stat.label }}
          </p>
          <p class="mt-1 text-xs text-bodytext">{{ stat.sub }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: "6.2 hrs", label: "Average time to book", sub: "From first view to enquiry" },
  { value: "14,000+", label: "Active event planners", sub: "Browsing each month" },
  { value: "2,847", label: "Live listings now", sub: "Across Nigerian cities" },
];
</script>
