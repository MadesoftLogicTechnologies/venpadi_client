<template>
  <section class="bg-white pt-10 pb-12 md2:pt-14 md2:pb-16">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-12 items-center">
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-greybg text-sm text-bodytext mb-5"
          >
            <span class="w-2 h-2 rounded-full bg-primary shrink-0"></span>
            Book venues in 50+ cities worldwide
          </div>

          <h1
            class="text-[2.25rem] sm:text-[2.75rem] md2:text-[3.25rem] leading-[1.1] font-extrabold text-header tracking-tight"
          >
            Book the perfect venue,
            <span class="text-transparent bg-clip-text bg-brand-gradient-soft">
              anywhere in the world.
            </span>
          </h1>

          <p class="mt-5 text-base sm:text-lg text-bodytext max-w-xl leading-relaxed">
            Discover thousands of event venues — from intimate executive
            boardrooms to grand luxury ballrooms. Compare, book, and manage
            everything seamlessly in one unified platform.
          </p>

          <form
            class="mt-8 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-stretch gap-2"
            @submit.prevent="search"
          >
            <label
              class="flex-1 flex items-center gap-3 px-3 py-2.5 min-w-0 rounded-xl hover:bg-greybg/80"
            >
              <i class="pi pi-map-marker text-primary text-sm shrink-0"></i>
              <div class="min-w-0 flex-1">
                <span class="block text-[11px] font-semibold text-bodytext2 uppercase tracking-wide">
                  Location
                </span>
                <input
                  v-model="location"
                  type="text"
                  placeholder="City or venue name"
                  class="w-full bg-transparent border-0 outline-none text-sm text-header placeholder:text-bodytext2 p-0"
                />
              </div>
            </label>

            <div class="hidden sm:block w-px bg-border self-stretch my-2"></div>

            <label
              class="flex-1 flex items-center gap-3 px-3 py-2.5 min-w-0 rounded-xl hover:bg-greybg/80"
            >
              <i class="pi pi-calendar text-primary text-sm shrink-0"></i>
              <div class="min-w-0 flex-1">
                <span class="block text-[11px] font-semibold text-bodytext2 uppercase tracking-wide">
                  Event Type
                </span>
                <select
                  v-model="eventType"
                  class="w-full bg-transparent border-0 outline-none text-sm text-header p-0 appearance-none cursor-pointer"
                >
                  <option v-for="t in eventTypes" :key="t.key" :value="t.key">{{ t.label }}</option>
                </select>
              </div>
            </label>

            <div class="hidden sm:block w-px bg-border self-stretch my-2"></div>

            <label
              class="flex-1 flex items-center gap-3 px-3 py-2.5 min-w-0 rounded-xl hover:bg-greybg/80"
            >
              <i class="pi pi-users text-primary text-sm shrink-0"></i>
              <div class="min-w-0 flex-1">
                <span class="block text-[11px] font-semibold text-bodytext2 uppercase tracking-wide">
                  When & Guests
                </span>
                <input
                  v-model="whenGuests"
                  type="text"
                  placeholder="Select dates"
                  class="w-full bg-transparent border-0 outline-none text-sm text-header placeholder:text-bodytext2 p-0"
                />
              </div>
            </label>

            <button
              type="submit"
              class="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              <i class="pi pi-search text-sm"></i>
              Search
            </button>
          </form>

          <div class="mt-5 flex flex-wrap gap-2">
            <button
              v-for="chip in chips"
              :key="chip.key"
              type="button"
              @click="navigateTo({ path: '/search', query: { eventType: chip.key } })"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-border bg-white text-sm text-header hover:border-primary/40 hover:bg-greybg transition-colors"
            >
              <i :class="['pi text-xs text-primary', chip.icon]"></i>
              {{ chip.label }}
            </button>
          </div>
        </div>

        <div class="relative">
          <div class="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] sm:aspect-[5/6] md2:aspect-[4/5] shadow-lg">
            <img
              :src="v.imageUrl"
              :alt="v.name"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            ></div>

            <div
              class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-xs font-semibold text-header shadow-sm"
            >
              <i class="pi pi-verified text-primary text-[11px]"></i>
              Verified Landmark
            </div>

            <div
              class="absolute top-4 right-4 max-w-[180px] px-3 py-2 rounded-xl bg-white/95 text-xs shadow-sm"
            >
              <div class="flex items-center gap-1 font-semibold text-header">
                <i class="pi pi-star-fill text-primary text-[10px]"></i>
                {{ ratingText }}
                <span class="font-normal text-bodytext">({{ v.reviewCount ?? 0 }} reviews)</span>
              </div>
              <p class="text-[10px] text-bodytext mt-0.5">{{ v.badge?.label || "—" }}</p>
            </div>

            <div class="absolute bottom-5 left-5 right-5 text-white">
              <p class="text-sm text-white/80 flex items-center gap-1.5">
                <i class="pi pi-map-marker text-xs"></i>
                {{ v.location || "—" }}
              </p>
              <h2 class="text-xl sm:text-2xl font-bold mt-1">
                {{ v.name || "—" }}
              </h2>
              <p class="mt-2 text-sm font-semibold">From ₦ {{ amount(v.fromPriceMinor) }}</p>
            </div>
          </div>

          <div
            class="absolute -bottom-4 left-4 sm:left-6 right-4 sm:right-auto sm:w-[280px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-4 border border-border"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs text-bodytext">Available</p>
                <p class="text-sm font-semibold text-header">{{ v.availabilityLabel || "—" }}</p>
                <p class="text-xs text-bodytext mt-1">
                  Day rate
                  <span class="font-semibold text-header">₦ {{ amount(v.fromDayMinor ?? v.fromPriceMinor) }}</span>
                </p>
              </div>
              <NuxtLink
:to="v.slug ? `/discover/${v.slug}` : '/search'"
                class="shrink-0 px-4 py-2.5 rounded-full bg-brand-gradient-soft text-white text-xs font-semibold hover:opacity-95"
              >
                Book Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, default: null },
});

// The featured card shows the top venue from GET /public/landing.
const v = computed(() => props.venue ?? {});
const amount = (minor) =>
  minor === null || minor === undefined ? "—" : naira(minor).replace(/^₦\s?/, "");
const ratingText = computed(() =>
  v.value.ratingAvg === null || v.value.ratingAvg === undefined ? "—" : Number(v.value.ratingAvg).toFixed(1)
);

const catalog = useCatalog();
const eventTypes = computed(() => catalog.value?.eventTypes ?? []);

const location = ref("");
const eventType = ref("wedding");
const whenGuests = ref("");

watch(
  eventTypes,
  (list) => {
    if (list.length && !list.some((t) => t.key === eventType.value)) eventType.value = list[0].key;
  },
  { immediate: true }
);

const chips = [
  { key: "wedding", label: "Weddings", icon: "pi-heart" },
  { key: "conference", label: "Conferences", icon: "pi-briefcase" },
  { key: "birthday", label: "Birthdays", icon: "pi-gift" },
  { key: "workshop", label: "Workshops", icon: "pi-desktop" },
  { key: "outdoor", label: "Outdoor", icon: "pi-sun" },
];

/**
 * "When & Guests" is one free-text box: a guest count ("150 guests") and/or a
 * date ("2026-12-12", "12 Dec 2026") are picked out of it for the search.
 */
function parseWhenGuests(text) {
  const out = {};
  let rest = String(text || "").trim();
  const g = rest.match(/(\d+)\s*(guests?|people|pax|persons?)/i) ?? rest.match(/^\s*(\d{1,5})\s*$/);
  if (g) {
    out.guests = g[1];
    rest = rest.replace(g[0], " ").trim();
  }
  const iso = rest.match(/\d{4}-\d{2}-\d{2}/);
  if (iso) out.date = iso[0];
  else if (rest) {
    const d = new Date(rest.replace(/[,;]+/g, " "));
    if (!Number.isNaN(d.getTime())) {
      const pad = (n) => String(n).padStart(2, "0");
      out.date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }
  }
  return out;
}

function search() {
  const query = { ...parseWhenGuests(whenGuests.value) };
  if (location.value.trim()) query.location = location.value.trim();
  if (eventType.value) query.eventType = eventType.value;
  return navigateTo({ path: "/search", query });
}
</script>
