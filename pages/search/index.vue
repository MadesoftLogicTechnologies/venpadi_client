<template>
  <div class="bg-white min-h-screen">
    <LandingNav />

    <SearchBar
      :model="filters"
      :chips="chips"
      :filter-count="activeFilterCount"
      @search="onSearch"
      @toggle-filters="sidebarOpen = !sidebarOpen"
      @toggle-chip="toggleChip"
      @remove-chip="removeChip"
      @clear-chips="clearChips"
    />

    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-8">
      <div class="flex gap-8 items-start">
        <!-- Desktop sidebar -->
        <div class="hidden md2:block w-[240px] shrink-0 sticky top-[88px]">
          <SearchSidebar
            v-model:sort="sort"
            v-model:categories="selectedCategories"
            v-model:capacity="capacity"
          />
        </div>

        <!-- Mobile sidebar drawer -->
        <div
          v-if="sidebarOpen"
          class="md2:hidden fixed inset-0 z-[60] flex"
        >
          <div
            class="absolute inset-0 bg-black/40"
            @click="sidebarOpen = false"
          ></div>
          <div
            class="relative ml-auto w-full max-w-sm bg-white h-full overflow-y-auto p-5 shadow-xl"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-base font-bold text-header">Refine search</h2>
              <button
                type="button"
                class="w-9 h-9 rounded-full hover:bg-greybg flex items-center justify-center"
                aria-label="Close filters"
                @click="sidebarOpen = false"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
            <SearchSidebar
              v-model:sort="sort"
              v-model:categories="selectedCategories"
              v-model:capacity="capacity"
            />
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"
          >
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-header tracking-tight">
                {{ totalFormatted }} venues found
              </h1>
              <p class="mt-1 text-sm text-bodytext">
                Showing spaces matching your filters across Lagos & nearby areas
              </p>
            </div>

            <div
              class="flex items-center gap-1 p-1 rounded-xl border border-border bg-white self-start"
            >
              <button
                v-for="mode in viewModes"
                :key="mode.id"
                type="button"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                :class="
                  viewMode === mode.id
                    ? 'bg-primary text-white'
                    : 'text-bodytext hover:bg-greybg'
                "
                :aria-label="mode.label"
                @click="viewMode = mode.id"
              >
                <i :class="['pi text-sm', mode.icon]"></i>
                <span class="hidden md2:inline">{{ mode.label }}</span>
              </button>
            </div>
          </div>

          <div
            :class="
              viewMode === 'map'
                ? 'grid md2:grid-cols-2 gap-5 items-start'
                : ''
            "
          >
            <div
              :class="
                viewMode === 'list'
                  ? 'flex flex-col gap-4'
                  : viewMode === 'map'
                    ? 'flex flex-col gap-4'
                    : 'grid sm:grid-cols-2 md2:grid-cols-3 gap-5'
              "
            >
              <template
                v-for="(item, index) in displayItems"
                :key="item.id || `banner-${index}`"
              >
                <SearchEnterpriseBanner v-if="item.type === 'banner'" />
                <SearchVenueCard
                  v-else
                  :venue="item"
                  :list="viewMode === 'list' || viewMode === 'map'"
                />
              </template>
            </div>

            <div
              v-if="viewMode === 'map'"
              class="hidden md2:block rounded-2xl border border-border bg-greybg min-h-[640px] sticky top-[88px] overflow-hidden"
            >
              <div
                class="h-full min-h-[640px] flex flex-col items-center justify-center text-center p-6 text-bodytext"
              >
                <i class="pi pi-map text-3xl text-primary mb-3"></i>
                <p class="text-sm font-semibold text-header">Split map view</p>
                <p class="text-xs mt-1 max-w-xs">
                  Map preview placeholder — wire your map provider here.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 flex flex-col items-center gap-5">
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                class="w-9 h-9 rounded-lg border border-border text-bodytext hover:bg-greybg disabled:opacity-40"
                :disabled="page === 1"
                aria-label="Previous page"
                @click="page--"
              >
                <i class="pi pi-chevron-left text-xs"></i>
              </button>
              <button
                v-for="p in visiblePages"
                :key="p"
                type="button"
                class="min-w-[36px] h-9 px-2 rounded-lg text-sm font-semibold transition-colors"
                :class="
                  page === p
                    ? 'bg-primary text-white'
                    : 'border border-border text-header hover:bg-greybg'
                "
                @click="page = p"
              >
                {{ p }}
              </button>
              <button
                type="button"
                class="w-9 h-9 rounded-lg border border-border text-bodytext hover:bg-greybg disabled:opacity-40"
                :disabled="page === totalPages"
                aria-label="Next page"
                @click="page++"
              >
                <i class="pi pi-chevron-right text-xs"></i>
              </button>
            </div>

            <button
              type="button"
              class="px-6 py-3 rounded-full border border-border text-sm font-semibold text-header hover:bg-greybg"
              @click="loadMore"
            >
              Load 24 More Venues
            </button>
          </div>
        </div>
      </div>
    </div>

    <LandingFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Explore venues",
  meta: [
    {
      name: "description",
      content: "Search and filter thousands of verified event venues on Venpadi.",
    },
  ],
});

const sidebarOpen = ref(false);
const viewMode = ref("grid");
const sort = ref("recommended");
const selectedCategories = ref(["banquet"]);
const capacity = ref("200–500");
const page = ref(1);
const totalPages = 8;
const totalResults = 2847;

const filters = reactive({
  location: "Lekki & Victoria Island",
  city: "Lagos, Nigeria",
  eventType: "Weddings, Galas & Dinners",
  guests: "200–500",
  budget: "₦500k – ₦1.5M",
  style: "Immersive",
});

const chips = ref([
  { id: "lagos", label: "Lagos", active: false },
  { id: "guests", label: "200–500 Guests", active: false },
  { id: "budget", label: "₦500k – ₦1.5M", active: false },
  { id: "wedding", label: "Weddings", active: false },
  { id: "immersive", label: "Immersive", active: true },
  { id: "indoor", label: "Indoor AV", active: false },
]);

const viewModes = [
  { id: "grid", label: "Grid", icon: "pi-th-large" },
  { id: "list", label: "List View", icon: "pi-list" },
  { id: "map", label: "Split Map", icon: "pi-map" },
];

const venues = [
  {
    id: 1,
    name: "The Grand Atrium Pavillion",
    location: "Victoria Island, Lagos",
    rating: "4.9",
    reviews: "218",
    meta: "Up to 1,000 guests · Banquet & Theater",
    availability: "Available today for booking",
    price: "1,250,000",
    badge: "Featured Venue",
    badgeClass: "bg-primary",
    dots: true,
    image: "/images/grand-atrium.jpg",
  },
  {
    id: 2,
    name: "Skyline Conference Hub",
    location: "Lekki Phase 1, Lagos",
    rating: "4.8",
    reviews: "156",
    meta: "Up to 420 guests · Plenary & Breakout",
    availability: "Available Sat, Oct 18",
    price: "780,000",
    badge: "Top Rated",
    badgeClass: "bg-[#FF8A00]",
    dots: true,
    image: "/images/skyline-conference.jpg",
  },
  {
    id: 3,
    name: "Palm Court Gardens",
    location: "Ikoyi, Lagos",
    rating: "5.0",
    reviews: "91",
    meta: "Up to 600 guests · Outdoor & Tent",
    availability: "Available today for booking",
    price: "950,000",
    badge: "Featured Venue",
    badgeClass: "bg-primary",
    dots: true,
    image: "/images/palm-court.jpg",
  },
  {
    id: 4,
    name: "Aurora Rooftop Lounge",
    location: "Yaba, Lagos",
    rating: "4.7",
    reviews: "124",
    meta: "Up to 180 guests · Lounge & Terrace",
    availability: "3 dates left this month",
    price: "420,000",
    badge: "Top Rated",
    badgeClass: "bg-[#1E3A5F]",
    dots: true,
    image: "/images/aurora-rooftop.jpg",
  },
  {
    id: 5,
    name: "Meridian Ballroom",
    location: "Victoria Island, Lagos",
    rating: "4.9",
    reviews: "203",
    meta: "Up to 850 guests · Ballroom & Stage",
    availability: "Available today for booking",
    price: "1,100,000",
    badge: "Featured Venue",
    badgeClass: "bg-primary",
    dots: true,
    image: "/images/meridian-ballroom.jpg",
  },
  {
    id: 6,
    name: "Harbour View Hall",
    location: "Oniru, Lagos",
    rating: "4.6",
    reviews: "77",
    meta: "Up to 300 guests · Waterfront",
    availability: "Available Fri–Sun",
    price: "640,000",
    badge: null,
    badgeClass: "",
    dots: true,
    image: "/images/harbour-view.jpg",
  },
];

const displayItems = computed(() => {
  const items = [...venues];
  // Insert enterprise banner after first row (3 cards in grid)
  return [
    ...items.slice(0, 3),
    { type: "banner", id: "enterprise" },
    ...items.slice(3),
  ];
});

const totalFormatted = computed(() =>
  totalResults.toLocaleString("en-US")
);

const activeFilterCount = computed(() => chips.value.length);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, page.value - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

function onSearch() {
  page.value = 1;
}

function toggleChip(id) {
  const chip = chips.value.find((c) => c.id === id);
  if (chip) chip.active = !chip.active;
}

function removeChip(id) {
  chips.value = chips.value.filter((c) => c.id !== id);
}

function clearChips() {
  chips.value = [];
}

function loadMore() {
  if (page.value < totalPages) page.value++;
}
</script>
