<template>
  <section class="bg-[#F7F5F0] pb-16 md2:pb-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-start">
        <div>
          <span
            class="inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-border text-[11px] font-bold tracking-[0.12em] uppercase text-bodytext2"
          >
            The engine behind Venpadi
          </span>
          <h2
            class="mt-4 text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight"
          >
            A product company with a larger mission.
          </h2>
          <p class="mt-5 text-sm sm:text-base text-bodytext leading-relaxed">
            Madesoft Technologies Ltd. is an African software powerhouse building
            category-defining enterprise suites. We reject Silicon Valley clones in
            favor of platforms that automate real-world commerce in high-growth
            economies — starting with the physical spaces that host celebrations,
            conferences, and culture.
          </p>
          <a
            href="https://madesoft.co"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-90"
          >
            Explore the Madesoft parent ecosystem at madesoft.co
            <i class="pi pi-arrow-right text-xs"></i>
          </a>
        </div>

        <div class="rounded-2xl bg-[#141414] text-white p-6 sm:p-7 border border-white/5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-sm font-bold">Active Software Portfolio</p>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-white/70"
            >
              Madesoft ecosystem
            </span>
          </div>

          <ul class="mt-6 space-y-5">
            <li
              v-for="product in products"
              :key="product.name"
              class="flex gap-3"
            >
              <div
                class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0"
              >
                <i :class="['pi text-sm text-primary', product.icon]"></i>
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-sm font-bold">{{ product.name }}</p>
                  <span
                    class="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full"
                    :class="product.badgeClass"
                  >
                    {{ product.badge }}
                  </span>
                </div>
                <p class="mt-1 text-xs text-white/55 leading-relaxed">
                  {{ product.body }}
                </p>
              </div>
            </li>
          </ul>

          <div
            class="mt-7 pt-5 border-t border-white/10 flex flex-wrap justify-between gap-2 text-[11px] text-white/45"
          >
            <span>Engineering hub: Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    name: "Venpadi",
    badge: "Active flagship",
    badgeClass: "bg-emerald-500/15 text-emerald-400",
    icon: "pi-building",
    body: "Operating system for venues — discovery, bookings, escrow payments and payouts.",
  },
  {
    name: "Glead 360",
    badge: "On-reserve",
    badgeClass: "bg-white/10 text-white/60",
    icon: "pi-heart",
    body: "Next-generation clinical records and pharmacy management components.",
  },
  {
    name: "Veinode",
    badge: "Simulation",
    badgeClass: "bg-white/10 text-white/60",
    icon: "pi-cog",
    body: "Industrial process orchestration, IoT telemetry, and plant-floor automation.",
  },
];
</script>
