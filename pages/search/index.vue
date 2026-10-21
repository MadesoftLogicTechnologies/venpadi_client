<template>
  <div class="bg-white min-h-screen">
    <LandingNav />

    <SearchBar
      :model="form"
      :chips="chips"
      :filter-count="activeFilterCount"
      :event-types="catalog?.eventTypes ?? []"
      :styles="catalog?.venueStyles ?? []"
      :guest-options="guestOptions"
      :budget-options="budgetOptions"
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
            v-model:sort="applied.sort"
            v-model:categories="applied.categories"
            v-model:capacity="applied.capacity"
            :category-options="catalog?.searchCategories ?? []"
            :category-counts="result.categoryCounts"
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
              v-model:sort="applied.sort"
              v-model:categories="applied.categories"
              v-model:capacity="applied.capacity"
              :category-options="catalog?.searchCategories ?? []"
              :category-counts="result.categoryCounts"
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
                Showing spaces matching your filters across {{ whereLabel }} & nearby areas
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
                :disabled="firstPage === 1 || loading"
                aria-label="Previous page"
                @click="goToPage(firstPage - 1)"
              >
                <i class="pi pi-chevron-left text-xs"></i>
              </button>
              <button
                v-for="p in visiblePages"
                :key="p"
                type="button"
                class="min-w-[36px] h-9 px-2 rounded-lg text-sm font-semibold transition-colors"
                :class="
                  isCurrent(p)
                    ? 'bg-primary text-white'
                    : 'border border-border text-header hover:bg-greybg'
                "
                :disabled="loading"
                @click="goToPage(p)"
              >
                {{ p }}
              </button>
              <button
                type="button"
                class="w-9 h-9 rounded-lg border border-border text-bodytext hover:bg-greybg disabled:opacity-40"
                :disabled="onLastPage || loading"
                aria-label="Next page"
                @click="goToPage(page + 1)"
              >
                <i class="pi pi-chevron-right text-xs"></i>
              </button>
            </div>

            <button
              type="button"
              class="px-6 py-3 rounded-full border border-border text-sm font-semibold text-header hover:bg-greybg"
              :disabled="loading"
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
/*
 * Venue search. The applied filters live in the URL (so the landing page's
 * search and category links land here pre-filtered, and a reload keeps them),
 * and every change re-queries GET /public/search.
 */
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

const LIMIT = 24;
const route = useRoute();
const router = useRouter();
const catalog = useCatalog();

/* ── buckets: UI choice → API params ─────────────────────────────────────── */

const GUEST_BUCKETS = {
  "1-50": { label: "1–50", min: 1, max: 50 },
  "51-150": { label: "51–150", min: 51, max: 150 },
  "151-300": { label: "151–300", min: 151, max: 300 },
  "301-500": { label: "301–500", min: 301, max: 500 },
  "500+": { label: "500+", min: 500, max: null },
};
// Budget in naira; sent as kobo (…Minor).
const BUDGET_BUCKETS = {
  "lt500k": { label: "Under ₦500k", min: null, max: 500_000 },
  "500k-1.5m": { label: "₦500k – ₦1.5M", min: 500_000, max: 1_500_000 },
  "1.5m-3m": { label: "₦1.5M – ₦3M", min: 1_500_000, max: 3_000_000 },
  "3m+": { label: "₦3M+", min: 3_000_000, max: null },
};

const guestLabel = (v) =>
  GUEST_BUCKETS[v]?.label ?? (/^\d+$/.test(String(v)) ? `${Number(v).toLocaleString("en-US")}+` : v);

const guestOptions = computed(() => {
  const opts = [{ value: "", label: "Any" }];
  for (const [value, b] of Object.entries(GUEST_BUCKETS)) opts.push({ value, label: b.label });
  // A guest count typed on the landing page ("120") stays selectable.
  if (form.guests && !GUEST_BUCKETS[form.guests]) opts.push({ value: form.guests, label: guestLabel(form.guests) });
  return opts;
});
const budgetOptions = [
  { value: "", label: "Any" },
  ...Object.entries(BUDGET_BUCKETS).map(([value, b]) => ({ value, label: b.label })),
];

/* ── state ───────────────────────────────────────────────────────────────── */

const str = (v) => (Array.isArray(v) ? v[0] : v ?? "") + "";

function fromQuery(q) {
  return {
    location: str(q.location),
    city: str(q.city),
    eventType: str(q.eventType),
    guests: str(q.guests),
    budget: str(q.budget),
    style: str(q.style),
    date: str(q.date),
    sort: str(q.sort) || "recommended",
    categories: str(q.categories).split(",").filter(Boolean),
    capacity: str(q.capacity),
  };
}

const initial = fromQuery(route.query);
const applied = reactive({ ...initial });
const form = reactive({
  location: initial.location,
  city: initial.city,
  eventType: initial.eventType,
  guests: initial.guests,
  budget: initial.budget,
  style: initial.style,
});

const sidebarOpen = ref(false);
const viewMode = ref("grid");
const firstPage = ref(Math.max(1, Number(str(route.query.page)) || 1));
const page = ref(firstPage.value);
const rows = ref([]);
const loading = ref(false);
const result = reactive({ total: 0, categoryCounts: [] });

/* ── API params ──────────────────────────────────────────────────────────── */

function apiParams(p) {
  const q = {
    location: (on("location") && applied.location) || undefined,
    city: (on("city") && applied.city) || undefined,
    eventType: (on("eventType") && applied.eventType) || undefined,
    style: (on("style") && applied.style) || undefined,
    date: (on("date") && applied.date) || undefined,
    capacity: (on("capacity") && applied.capacity) || undefined,
    categories: applied.categories.filter((c) => on(`cat:${c}`)).join(",") || undefined,
    sort: applied.sort,
    page: p,
    limit: LIMIT,
  };
  const guests = on("guests") ? applied.guests : "";
  const budget = on("budget") ? applied.budget : "";
  const g = GUEST_BUCKETS[guests];
  if (g) {
    q.guestsMin = g.min ?? undefined;
    q.guestsMax = g.max ?? undefined;
  } else if (/^\d+$/.test(guests)) {
    q.guestsMin = Number(guests);
  }
  const b = BUDGET_BUCKETS[budget];
  if (b) {
    q.budgetMinMinor = b.min !== null ? toMinor(b.min) : undefined;
    q.budgetMaxMinor = b.max !== null ? toMinor(b.max) : undefined;
  }
  return q;
}

let seq = 0;
async function fetchPage(p, { append = false } = {}) {
  const mine = ++seq;
  loading.value = true;
  try {
    const data = await api.get("/public/search", apiParams(p));
    if (mine !== seq) return;
    rows.value = append ? [...rows.value, ...(data?.rows ?? [])] : data?.rows ?? [];
    result.total = data?.total ?? 0;
    result.categoryCounts = data?.categoryCounts ?? [];
    page.value = p;
    if (!append) firstPage.value = p;
  } catch {
    if (mine === seq && !append) rows.value = [];
  } finally {
    if (mine === seq) loading.value = false;
  }
}

/** Mirror the applied filters into the URL (replace, so Back leaves search). */
function syncUrl() {
  const q = {};
  for (const k of ["location", "city", "eventType", "guests", "budget", "style", "date", "capacity"]) {
    if (applied[k]) q[k] = applied[k];
  }
  if (applied.categories.length) q.categories = applied.categories.join(",");
  if (applied.sort && applied.sort !== "recommended") q.sort = applied.sort;
  if (firstPage.value > 1) q.page = String(firstPage.value);
  lastSynced = JSON.stringify(q);
  router.replace({ query: q });
}

// A new search from elsewhere (e.g. the landing page or nav) while already
// on /search: re-read the filters from the URL.
let lastSynced = null;
watch(
  () => route.query,
  (q) => {
    if (lastSynced !== null && JSON.stringify(q) === lastSynced) return;
    const next = fromQuery(q);
    Object.assign(form, {
      location: next.location,
      city: next.city,
      eventType: next.eventType,
      guests: next.guests,
      budget: next.budget,
      style: next.style,
    });
    suppressSidebarWatch = true;
    Object.assign(applied, next);
    nextTick(() => (suppressSidebarWatch = false));
    lastSynced = null;
    fetchPage(Math.max(1, Number(str(q.page)) || 1));
  }
);
let suppressSidebarWatch = false;

function runSearch(p = 1) {
  firstPage.value = p;
  syncUrl();
  return fetchPage(p);
}

// Sidebar filters apply immediately.
watch(
  () => [applied.sort, applied.capacity, applied.categories.join(",")],
  () => {
    if (!suppressSidebarWatch) runSearch(1);
  }
);

onMounted(() => fetchPage(firstPage.value));

/* ── actions ─────────────────────────────────────────────────────────────── */

function onSearch() {
  Object.assign(applied, {
    location: form.location.trim(),
    city: form.city.trim(),
    eventType: form.eventType,
    guests: form.guests,
    budget: form.budget,
    style: form.style,
  });
  sidebarOpen.value = false;
  runSearch(1);
}

const isCurrent = (p) => p >= firstPage.value && p <= page.value;
const onLastPage = computed(() => page.value >= totalPages.value);

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return;
  runSearch(p);
  if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadMore() {
  if (page.value >= totalPages.value) return;
  fetchPage(page.value + 1, { append: true });
}

const inactive = ref([]);
const on = (id) => !inactive.value.includes(id);

function toggleChip(id) {
  inactive.value = on(id) ? [...inactive.value, id] : inactive.value.filter((x) => x !== id);
  runSearch(1);
}

const labelOf = (list, key) => (list ?? []).find((x) => x.key === key)?.label ?? key;

const chips = computed(() => {
  const out = [];
  if (applied.location) out.push({ id: "location", label: applied.location });
  if (applied.city) out.push({ id: "city", label: applied.city });
  if (applied.eventType) out.push({ id: "eventType", label: labelOf(catalog.value?.eventTypes, applied.eventType) });
  if (applied.guests) out.push({ id: "guests", label: `${guestLabel(applied.guests)} Guests` });
  if (applied.budget) out.push({ id: "budget", label: BUDGET_BUCKETS[applied.budget]?.label ?? applied.budget });
  if (applied.style) out.push({ id: "style", label: labelOf(catalog.value?.venueStyles, applied.style) });
  if (applied.date) out.push({ id: "date", label: formatDate(`${applied.date}T12:00:00Z`) });
  if (applied.capacity) out.push({ id: "capacity", label: `Capacity ${applied.capacity.replace("-", "–")}` });
  for (const c of applied.categories) {
    out.push({ id: `cat:${c}`, label: labelOf(catalog.value?.searchCategories, c) });
  }
  return out.map((c) => ({ ...c, active: on(c.id) }));
});

const activeFilterCount = computed(() => chips.value.length);

function removeChip(id) {
  inactive.value = inactive.value.filter((x) => x !== id);
  if (id.startsWith("cat:")) {
    applied.categories = applied.categories.filter((c) => c !== id.slice(4));
    return; // the sidebar watcher re-runs the search
  }
  if (id === "capacity") {
    applied.capacity = "";
    return;
  }
  applied[id] = "";
  if (id in form) form[id] = "";
  runSearch(1);
}

function clearChips() {
  inactive.value = [];
  for (const k of ["location", "city", "eventType", "guests", "budget", "style", "date"]) {
    applied[k] = "";
    if (k in form) form[k] = "";
  }
  const sidebarChanged = applied.categories.length || applied.capacity;
  applied.categories = [];
  applied.capacity = "";
  if (!sidebarChanged) runSearch(1);
}

/* ── derived ─────────────────────────────────────────────────────────────── */

const viewModes = [
  { id: "grid", label: "Grid", icon: "pi-th-large" },
  { id: "list", label: "List View", icon: "pi-list" },
  { id: "map", label: "Split Map", icon: "pi-map" },
];

const displayItems = computed(() => {
  const items = [...rows.value];
  if (items.length <= 3) return items;
  // Enterprise banner after the first row (3 cards in grid).
  return [...items.slice(0, 3), { type: "banner", id: "enterprise" }, ...items.slice(3)];
});

const totalPages = computed(() => Math.max(1, Math.ceil(result.total / LIMIT)));
const totalFormatted = computed(() => Number(result.total).toLocaleString("en-US"));

const whereLabel = computed(() => {
  const where = [applied.location, applied.city].filter(Boolean).join(", ");
  return where || "all cities";
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, Math.min(firstPage.value - 2, totalPages.value - 4));
  const end = Math.min(totalPages.value, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});
</script>
