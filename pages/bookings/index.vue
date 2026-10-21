<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1180px]">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">My Bookings</h1>
          <p class="mt-1 text-[14px] text-bodytext">Your upcoming and past venue bookings.</p>
        </div>
        <div class="w-full sm:w-[280px]">
          <Search v-model="search" kind="white" placeholder="Search event, venue or reference" />
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <button
          v-for="t in tabs"
          :key="t.key"
          type="button"
          class="h-9 px-4 rounded-full text-[13px] font-semibold border transition-colors"
          :class="tab === t.key ? 'bg-primary text-white border-primary' : 'bg-white text-header border-border hover:bg-greybg'"
          @click="setTab(t.key)"
        >
          {{ t.label }}
        </button>
      </div>

      <section class="mt-5 bg-white rounded-2xl border border-border overflow-hidden">
        <p v-if="pending && !data.rows.length" class="px-5 py-10 text-center text-sm text-bodytext">Loading…</p>
        <div v-else-if="!data.rows.length" class="px-5 py-12 text-center">
          <p class="text-[14px] font-semibold text-header">No {{ currentTabLabel.toLowerCase() }} bookings</p>
          <p class="mt-1 text-[13px] text-bodytext">
            {{ tab === "upcoming" ? "Find a venue and send a booking request." : "Nothing here yet." }}
          </p>
          <NuxtLink
            v-if="tab === 'upcoming'"
            to="/discover"
            class="mt-4 inline-flex h-9 px-4 items-center rounded-full border border-border text-[13px] font-semibold text-header hover:bg-greybg"
          >
            Discover venues
          </NuxtLink>
        </div>

        <NuxtLink
          v-for="b in data.rows"
          :key="b.id"
          :to="`/bookings/${b.reference}`"
          class="flex flex-col md2:flex-row md2:items-center gap-3 md2:gap-6 px-5 py-4 border-b border-border last:border-b-0 hover:bg-greybg"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-[15px] font-bold text-header">{{ b.eventName }}</p>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(b.status)">
                {{ b.statusLabel }}
              </span>
            </div>
            <p class="mt-0.5 text-[12px] text-bodytext">
              {{ b.venue?.name }}<template v-if="b.spaces?.length"> · {{ b.spaces.map((s) => s.name).join(", ") }}</template>
            </p>
            <p class="mt-0.5 text-[11px] text-bodytext2">
              {{ b.reference }} · {{ b.eventTypeLabel }} · {{ b.guestCount }} guests
            </p>
          </div>
          <div class="text-[13px] text-header md2:w-[200px]">
            <p class="font-semibold">{{ b.dateLabel }}</p>
            <p class="text-[12px] text-bodytext">{{ b.timeLabel }}</p>
          </div>
          <div class="md2:w-[180px] md2:text-right">
            <p class="text-[15px] font-extrabold text-header">{{ naira(b.totalMinor) }}</p>
            <p class="text-[12px]" :class="b.canPay ? 'text-primary font-semibold' : 'text-bodytext'">
              {{ b.paymentLabel }}
            </p>
          </div>
          <i class="pi pi-chevron-right text-[11px] text-bodytext2 hidden md2:block"></i>
        </NuxtLink>
      </section>

      <AccountPager v-model:page="page" class="mt-4" :total="data.total" :limit="data.limit || LIMIT" />
    </div>
  </div>
</template>

<script setup>
useHead({ title: "My Bookings" });

const LIMIT = 20;
const route = useRoute();
const router = useRouter();

const tabs = [
  { key: "upcoming", label: "Upcoming" },
  { key: "pending", label: "Pending" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];
const tab = ref(tabs.some((t) => t.key === route.query.tab) ? String(route.query.tab) : "upcoming");
const page = ref(1);
const search = ref("");

const currentTabLabel = computed(() => tabs.find((t) => t.key === tab.value)?.label ?? "");

function setTab(key) {
  tab.value = key;
  page.value = 1;
  router.replace({ query: { ...route.query, tab: key } });
}
watch(search, () => (page.value = 1));

const { data, pending } = useResource(
  () =>
    api.get("/me/bookings", {
      tab: tab.value,
      page: page.value,
      limit: LIMIT,
      search: search.value.trim() || undefined,
    }),
  { watch: [tab, page, search], initial: { rows: [], total: 0, page: 1, limit: LIMIT }, debounce: 250 }
);
</script>
