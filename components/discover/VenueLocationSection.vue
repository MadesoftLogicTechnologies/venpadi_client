<template>
  <section class="space-y-10 md2:space-y-12">
    <div>
      <h2 class="text-[20px] font-bold text-header">Venue Highlights</h2>
      <div class="mt-5 grid grid-cols-1 md2:grid-cols-3 gap-x-10 gap-y-4">
        <div
          v-for="item in highlights"
          :key="item.label"
          class="flex items-center gap-3 text-[14px] text-header"
        >
          <i :class="['pi text-[#6B7280] text-[15px]', item.icon]"></i>
          {{ item.label }}
        </div>
      </div>
      <button
        type="button"
        class="mt-5 h-9 px-4 rounded-full border border-border bg-white text-[13px] font-medium text-header hover:bg-greybg"
        @click="showAll = !showAll"
      >
        {{ showAll ? "Hide extra amenities" : "Show all 24 amenities" }}
      </button>
      <div
        v-if="showAll"
        class="mt-4 grid grid-cols-1 md2:grid-cols-3 gap-x-10 gap-y-3 text-[13px] text-bodytext"
      >
        <p v-for="item in extraAmenities" :key="item">{{ item }}</p>
      </div>
    </div>

    <div>
      <h2 class="text-[20px] font-bold text-header">Location</h2>
      <div
        class="mt-4 relative h-[200px] md2:h-[240px] rounded-2xl overflow-hidden bg-[#C5CDD3]"
      >
        <svg
          class="absolute inset-0 w-full h-full"
          viewBox="0 0 800 240"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="800" height="240" fill="#C5CDD3" />
          <path
            d="M0 40C80 30 140 70 210 90C290 112 340 70 410 86C490 104 540 160 620 150C700 140 760 90 800 80V240H0V40Z"
            fill="#9AA3AB"
          />
          <path
            d="M0 120C90 110 150 150 230 168C310 186 370 140 450 154C540 170 610 210 690 198C740 190 780 160 800 150V240H0V120Z"
            fill="#8B949C"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span
            class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-white/70"
          >
            <i class="pi pi-map-marker text-xs"></i>
          </span>
        </div>
      </div>
      <p class="mt-3 text-[13px] text-bodytext">
        14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria
      </p>
      <div class="mt-3 flex flex-wrap gap-2">
        <a
          :href="mapsUrl"
          target="_blank"
          rel="noopener"
          class="h-9 px-4 rounded-full border border-border bg-white text-[13px] font-medium text-header hover:bg-greybg inline-flex items-center"
        >
          Get Directions
        </a>
        <a
          :href="mapsUrl"
          target="_blank"
          rel="noopener"
          class="h-9 px-4 rounded-full border border-border bg-white text-[13px] font-medium text-header hover:bg-greybg inline-flex items-center gap-1.5"
        >
          View on Google Maps
          <i class="pi pi-external-link text-[10px]"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const showAll = ref(false);

const highlights = [
  { label: "Valet Parking", icon: "pi-car" },
  { label: "High-Speed WiFi", icon: "pi-wifi" },
  { label: "Central AC", icon: "pi-cloud" },
  { label: "Catering Kitchen", icon: "pi-inbox" },
  { label: "A/V Equipment", icon: "pi-desktop" },
  { label: "Wheelchair Access", icon: "pi-user" },
];

const extraAmenities = [
  "Bridal suite",
  "Green room",
  "On-site security",
  "Backup generator",
  "Breakout rooms",
  "Outdoor smoking area",
  "Coat check",
  "VIP lounge",
  "Loading dock",
  "Dance floor",
  "In-house lighting",
  "Event coordination",
];

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=14+Adeola+Odeku+Street,+Victoria+Island,+Lagos";
</script>
