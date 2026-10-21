<template>
  <section class="space-y-12 md2:space-y-14">
    <div>
      <h2 class="text-[20px] font-bold text-header">Reviews</h2>
      <div class="mt-5 md2:flex md2:items-center md2:gap-10">
        <div class="shrink-0">
          <p class="text-[40px] font-extrabold text-header leading-none">{{ ratingText }}</p>
          <div class="mt-2 flex gap-0.5 text-[#F5A524]">
            <i v-for="n in starCount(summary.ratingAvg)" :key="n" class="pi pi-star-fill text-[11px]"></i>
          </div>
          <p class="mt-1 text-[12px] text-bodytext">Based on {{ reviewCount }} reviews</p>
        </div>
        <div class="mt-5 md2:mt-0 flex-1 max-w-[360px] space-y-1.5">
          <div
            v-for="row in histogram"
            :key="row.stars"
            class="flex items-center gap-2 text-[12px] text-bodytext"
          >
            <span class="w-3">{{ row.stars }}</span>
            <div class="flex-1 h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                class="h-full rounded-full bg-primary"
                :style="{ width: `${row.pct}%` }"
              ></div>
            </div>
            <span class="w-8 text-right">{{ row.pct }}%</span>
          </div>
        </div>
      </div>

      <div
        class="mt-6 grid grid-cols-2 md2:grid-cols-4 gap-4 pt-5 border-t border-border"
      >
        <div v-for="metric in metrics" :key="metric.key" class="flex items-start gap-2">
          <i :class="['pi text-[#9CA3AF] text-[13px] mt-0.5', metric.icon]"></i>
          <div>
            <p class="text-[12px] text-bodytext">{{ metric.label }}</p>
            <p class="mt-0.5 text-[14px] font-bold text-header">{{ metric.value }}</p>
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md2:grid-cols-2 gap-5">
        <article
          v-for="review in shownReviews"
          :key="review.id"
          class="bg-white rounded-2xl p-5"
        >
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-greybg">
              <img :src="review.avatarUrl || '/images/cat-wedding.jpg'" alt="" class="w-full h-full object-cover" />
            </span>
            <div>
              <p class="text-[14px] font-semibold text-header">{{ review.name }}</p>
              <p class="text-[12px] text-bodytext">{{ formatMonthYear(review.date) }}</p>
            </div>
          </div>
          <div class="mt-3 flex gap-0.5 text-[#F5A524]">
            <i v-for="n in starCount(review.rating)" :key="n" class="pi pi-star-fill text-[10px]"></i>
          </div>
          <p class="mt-3 text-[13px] text-bodytext leading-relaxed">
            {{ review.body }}
          </p>
        </article>
      </div>

      <button
        type="button"
        class="mt-6 h-9 px-4 rounded-full border border-border bg-white text-[13px] font-medium text-header hover:bg-greybg"
        :disabled="loadingAll"
        @click="showMore"
      >
        Show all {{ reviewCount }} reviews
      </button>
    </div>

    <div>
      <h2 class="text-[20px] font-bold text-header">You Might Also Like</h2>
      <div class="mt-5 grid grid-cols-1 md2:grid-cols-3 gap-5">
        <article v-for="card in similar" :key="card.slug" @click="navigateTo(`/discover/${card.slug}`)">
          <div class="relative h-[180px] md2:h-[196px] rounded-2xl overflow-hidden">
            <img
              :src="card.imageUrl"
              :alt="card.name"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <span
              class="absolute bottom-3 left-3 inline-flex items-center gap-1 text-white text-[12px] font-semibold drop-shadow"
            >
              <i class="pi pi-star-fill text-[#F5A524] text-[10px]"></i>
              {{ card.ratingAvg !== null && card.ratingAvg !== undefined ? Number(card.ratingAvg).toFixed(1) : "—" }}
            </span>
          </div>
          <div class="pt-3">
            <h3 class="text-[14px] font-bold text-header">{{ card.name }}</h3>
            <p class="mt-0.5 text-[12px] text-bodytext">{{ card.location }}</p>
            <p class="mt-1.5 text-[13px] font-semibold text-header">
              {{ money(card.fromHourlyMinor) }}
              <span class="font-medium text-bodytext">/hour</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, required: true },
});


const summary = computed(() => props.venue.reviews ?? { reviewCount: 0, ratingAvg: null, histogram: [], latest: [] });
const reviewCount = computed(() => Number(summary.value.reviewCount) || 0);
const ratingText = computed(() =>
  summary.value.ratingAvg !== null && summary.value.ratingAvg !== undefined ? Number(summary.value.ratingAvg).toFixed(1) : "—",
);
const starCount = (rating) => Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

// Always the five rows master shows, filled from the API's histogram.
const histogram = computed(() =>
  [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: summary.value.histogram?.find((r) => r.stars === stars)?.pct ?? 0,
  })),
);

// Master's four rating dimensions, valued from the API.
const METRICS = [
  { key: "cleanliness", label: "Cleanliness", icon: "pi-star" },
  { key: "location", label: "Location", icon: "pi-map-marker" },
  { key: "communication", label: "Communication", icon: "pi-comment" },
  { key: "value", label: "Value", icon: "pi-tag" },
];
const metrics = computed(() =>
  METRICS.map((m) => {
    const score = summary.value.dimensions?.find((d) => d.key === m.key)?.score;
    return { ...m, value: score !== null && score !== undefined ? Number(score).toFixed(1) : "—" };
  }),
);

const similar = computed(() => props.venue.similar ?? []);
const money = (minor) => (minor === null || minor === undefined ? "—" : naira(minor));

// "Show all" pages through GET /public/venues/:slug/reviews inline.
const showAll = ref(false);
const allRows = ref([]);
const allTotal = ref(0);
const allPage = ref(0);
const loadingAll = ref(false);
const LIMIT = 10;

async function loadMore() {
  loadingAll.value = true;
  try {
    const data = await api.get(`/public/venues/${encodeURIComponent(props.venue.slug)}/reviews`, {
      page: allPage.value + 1,
      limit: LIMIT,
      sort: "newest",
    });
    allRows.value = [...allRows.value, ...(data?.rows ?? [])];
    allTotal.value = data?.total ?? 0;
    allPage.value += 1;
  } catch {
    /* toast shown */
  } finally {
    loadingAll.value = false;
  }
}

/** "Show all N reviews": the first click loads the full list, later clicks load the next page. */
function showMore() {
  if (!showAll.value) return openAll();
  if (allRows.value.length < allTotal.value) return loadMore();
}

async function openAll() {
  showAll.value = true;
  allRows.value = [];
  allPage.value = 0;
  await loadMore();
}

watch(
  () => props.venue.slug,
  () => {
    showAll.value = false;
    allRows.value = [];
    allPage.value = 0;
  }
);

const shownReviews = computed(() => (showAll.value && allRows.value.length ? allRows.value : summary.value.latest ?? []));
</script>
