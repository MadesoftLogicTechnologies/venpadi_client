<template>
  <article>
    <div class="md2:grid md2:grid-cols-[minmax(0,1fr)_340px] md2:gap-6 md2:items-start">
      <div>
        <div class="relative h-[220px] md2:h-[248px] rounded-2xl overflow-hidden bg-greybg">
          <img
            :src="photos[photoIndex]"
            :alt="space.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div
            class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 text-white text-[12px] font-semibold"
          >
            {{ photos.length ? photoIndex + 1 : 0 }} / {{ photos.length }} {{ space.name }}
          </div>
          <button
            type="button"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6B7280] hover:text-primary"
            aria-label="Save space"
            :disabled="isBusy(venue.id)"
            @click="toggle(venue.id)"
          >
            <i class="pi pi-heart text-sm" :class="{ 'text-primary': isSaved(venue.id) }"></i>
          </button>
          <button
            type="button"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
            aria-label="Previous photo"
            @click="prevPhoto"
          >
            <i class="pi pi-chevron-left text-xs"></i>
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
            aria-label="Next photo"
            @click="nextPhoto"
          >
            <i class="pi pi-chevron-right text-xs"></i>
          </button>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-2 text-[14px]">
          <span class="font-bold text-header">{{ space.hall || space.name }}</span>
          <span class="text-bodytext2">·</span>
          <span class="text-bodytext">{{ space.floor || "—" }}</span>
          <span class="text-bodytext2">·</span>
          <span class="text-bodytext">{{ space.environment || space.typeLabel || "—" }}</span>
        </div>
        <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
          {{ space.description || space.tagline }}
        </p>

        <div class="mt-6">
          <h4 class="text-[11px] font-bold tracking-[0.16em] text-[#9CA3AF] uppercase">
            Architectural & Physical Specs
          </h4>
          <div class="mt-3 grid grid-cols-1 md2:grid-cols-3 gap-2.5">
            <div
              v-for="spec in specs"
              :key="spec.label"
              class="rounded-xl bg-white border border-[#EEEFF1] px-3 py-2.5"
            >
              <p class="text-[11px] text-bodytext flex items-center gap-1.5">
                <i :class="['pi text-[10px] text-primary', spec.icon]"></i>
                {{ spec.label }}
              </p>
              <p class="mt-1 text-[13px] font-semibold text-header">{{ spec.value }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h4 class="text-[14px] font-bold text-header">Supported Layout Configurations</h4>
          <div class="mt-3 grid grid-cols-2 md2:grid-cols-4 gap-2.5">
            <button
              v-for="layout in layouts"
              :key="layout.id"
              type="button"
              class="rounded-xl border bg-white px-3 py-3 text-left transition-colors min-h-[92px]"
              :class="
                layout.id === selectedLayout
                  ? 'border-primary'
                  : 'border-[#E5E7EB] hover:border-primary/40'
              "
              @click="selectedLayout = layout.id"
            >
              <div class="h-7 flex items-center text-[#9CA3AF]">
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden="true">
                  <circle
                    v-for="(dot, i) in layout.dots"
                    :key="i"
                    :cx="dot[0]"
                    :cy="dot[1]"
                    r="1.4"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p class="mt-1 text-[13px] font-semibold text-header">{{ layout.name }}</p>
              <p v-if="layout.seats" class="text-[11px] text-bodytext mt-0.5">
                {{ layout.seats }}
              </p>
            </button>
          </div>
          <div
            class="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#FFF1ED] text-[12px] text-header"
          >
            In
            <span class="font-semibold">{{ currentLayout.name }}</span>
            layout, this space holds up to
            <span class="font-semibold">{{ currentLayout.capacity }} guests</span>
          </div>
        </div>
      </div>

      <aside
        class="mt-6 md2:mt-0 rounded-2xl border border-border bg-white shadow-[0_8px_24px_rgba(17,24,39,0.05)] p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-[12px] text-bodytext">Selected Space</p>
            <p class="text-[16px] font-bold text-header">{{ space.hall || space.name }}</p>
          </div>
          <span
            v-if="!segment || segment.available"
            class="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAF8F0] text-[#16A34A] text-[11px] font-semibold"
          >
            Available
          </span>
        </div>

        <p class="mt-5 text-[13px] font-semibold text-header">{{ space.hall || space.name }} Pricing</p>
        <div class="mt-2 flex flex-wrap gap-2">
          <button
            v-for="tab in pricingTabs"
            :key="tab.id"
            type="button"
            class="px-3 h-8 rounded-lg text-[12px] font-semibold"
            :class="
              pricingTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-[#F3F4F6] text-[#6B7280] hover:text-header'
            "
            @click="pricingTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="mt-4 flex items-end justify-between gap-3">
          <p class="text-[26px] leading-none font-extrabold text-header">
            {{ money(activeRate)
            }}<span class="text-[13px] font-medium text-bodytext">
              / {{ pricingTab === "hour" ? "hour" : pricingTab === "day" ? "day" : "pkg" }}
            </span>
          </p>
          <div class="text-right text-[12px] text-bodytext space-y-0.5">
            <p>
              Min. hrs:
              <span class="font-semibold text-header">{{ space.minHours || "—" }}</span>
            </p>
            <p>
              Min. spend:
              <span class="font-semibold text-primary">{{ money(space.minSpendMinor) }}</span>
            </p>
          </div>
        </div>

        <div class="mt-5">
          <p class="text-[13px] font-semibold text-header">How long do you need it?</p>
          <div
            class="mt-2 flex items-center justify-between gap-3 rounded-xl border border-border px-3 h-11"
          >
            <select
              v-model.number="hours"
              class="bg-transparent text-[13px] font-semibold text-header outline-none"
            >
              <option v-for="h in hourOptions" :key="h" :value="h">{{ h }} hours</option>
            </select>
            <span class="text-[12px] text-bodytext whitespace-nowrap">
              4:00 PM → {{ endTime }}
            </span>
          </div>
        </div>

        <dl class="mt-4 space-y-2 text-[13px]">
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">{{ durationHours }} hours ×</dt>
            <dd class="font-medium text-header">{{ money(hoursTotal) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">Cleaning fee</dt>
            <dd class="font-medium text-header">{{ money(feesTotal) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">Subtotal</dt>
            <dd class="font-medium text-header">{{ money(quote?.totals?.subtotalMinor) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">Venpadi fee ({{ serviceFeePct }})</dt>
            <dd class="font-medium text-header">{{ money(quote?.totals?.serviceFeeMinor) }}</dd>
          </div>
          <div class="flex justify-between gap-3 pt-2 border-t border-border">
            <dt class="font-semibold text-header">Total estimate:</dt>
            <dd class="font-extrabold text-header">{{ money(quote?.totals?.totalMinor) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">
              Venpadi Pay
              <span class="block text-[11px] text-bodytext2">({{ quote?.installments?.count ?? "—" }} installments)</span>
            </dt>
            <dd class="font-semibold text-header">{{ money(quote?.installments?.amountMinor) }}</dd>
          </div>
        </dl>

        <div
          v-if="segment && segment.tier === 'weekend'"
          class="mt-4 rounded-xl bg-[#FFF6F0] px-3 py-2.5 text-[12px] text-header leading-relaxed"
        >
          <span class="font-semibold text-primary">Weekend rate applies.</span>
          Weekday rate {{ money(hourlyRate?.amountMinor) }}/hr. Save {{ money(weekdaySaving) }} by booking a
          weekday.
        </div>

        <button
          type="button"
          class="mt-4 w-full h-11 rounded-full bg-primary text-white text-[13px] font-semibold hover:bg-primary-dark"
          @click="goToSetup"
        >
          Select this Space
        </button>
        <button
          type="button"
          class="mt-2 w-full h-11 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg"
          @click="goToSetup"
        >
          Check Availability
        </button>
      </aside>
    </div>
  </article>
</template>

<script setup>
/*
 * One space, expanded. The price card is a live POST /quote for a single
 * segment (the selected tier and duration, 4:00 PM start, on the draft's date
 * or two weeks out) so every figure is the API's.
 */
import { dateFromToday } from "~/composables/useBookingDraft";

const props = defineProps({
  space: { type: Object, required: true },
  venue: { type: Object, required: true },
});

const { draft } = useBookingDraft();
const { isSaved, isBusy, toggle } = useFavorites();

const money = (minor) => (minor === null || minor === undefined ? "—" : naira(minor));

/* ── gallery ─────────────────────────────────────────────────────────────── */
const photos = computed(() =>
  props.space.photos?.length ? props.space.photos : props.space.imageUrl ? [props.space.imageUrl] : []
);
const photoIndex = ref(0);
watch(
  () => props.space.id,
  () => (photoIndex.value = 0)
);
function prevPhoto() {
  if (!photos.value.length) return;
  photoIndex.value = (photoIndex.value - 1 + photos.value.length) % photos.value.length;
}
function nextPhoto() {
  if (!photos.value.length) return;
  photoIndex.value = (photoIndex.value + 1) % photos.value.length;
}

/* ── specs & layouts ─────────────────────────────────────────────────────── */
const SPEC_ICONS = [
  [/size|area/i, "pi-th-large"],
  [/dimension/i, "pi-arrows-h"],
  [/ceiling|height/i, "pi-sort-alt"],
  [/light/i, "pi-sun"],
  [/entrance/i, "pi-sign-in"],
  [/access/i, "pi-user"],
  [/climate|\bac\b/i, "pi-cloud"],
  [/acoustic|sound/i, "pi-volume-up"],
  [/a\/v|\bav\b|screen/i, "pi-desktop"],
];
const specs = computed(() =>
  (props.space.specs ?? []).map((s) => ({
    ...s,
    icon: SPEC_ICONS.find(([re]) => re.test(s.label))?.[1] ?? "pi-info-circle",
  }))
);

const LAYOUT_DOTS = {
  theatre: [[4, 3], [8, 3], [12, 3], [16, 3], [20, 3], [24, 3], [6, 8], [10, 8], [14, 8], [18, 8], [22, 8], [8, 13], [12, 13], [16, 13], [20, 13]],
  banquet: [[6, 4], [10, 4], [8, 8], [18, 4], [22, 4], [20, 8], [6, 12], [10, 12], [18, 12], [22, 12]],
  cabaret: [[8, 4], [12, 4], [16, 4], [20, 4], [6, 9], [10, 9], [18, 9], [22, 9], [10, 14], [18, 14]],
  boardroom: [[8, 3], [12, 3], [16, 3], [20, 3], [6, 8], [22, 8], [8, 13], [12, 13], [16, 13], [20, 13]],
  standing: [[5, 4], [10, 4], [15, 4], [20, 4], [25, 4], [7, 9], [13, 9], [19, 9], [24, 9], [10, 14], [16, 14], [22, 14]],
  cocktail: [[5, 4], [10, 4], [15, 4], [20, 4], [25, 4], [7, 9], [13, 9], [19, 9], [24, 9], [10, 14], [16, 14], [22, 14]],
  exhibition: [[5, 4], [11, 4], [17, 4], [23, 4], [5, 10], [11, 10], [17, 10], [23, 10]],
  classroom: [[6, 3], [11, 3], [16, 3], [21, 3], [6, 8], [11, 8], [16, 8], [21, 8], [6, 13], [11, 13], [16, 13], [21, 13]],
  ushape: [[6, 3], [6, 8], [6, 13], [11, 13], [16, 13], [21, 13], [21, 8], [21, 3]],
};

// Master's layout card shape: { id, name, seats, capacity, dots }.
const layouts = computed(() =>
  (props.space.layouts ?? []).map((l) => ({
    id: l.key,
    name: l.label,
    seats: `${Number(l.capacity).toLocaleString("en-US")} seats`,
    capacity: Number(l.capacity).toLocaleString("en-US"),
    dots: LAYOUT_DOTS[l.key] ?? LAYOUT_DOTS.standing,
    featured: l.featured,
  }))
);
const selectedLayout = ref("");
watch(
  layouts,
  (list) => {
    if (!list.some((l) => l.id === selectedLayout.value)) {
      selectedLayout.value = (list.find((l) => l.featured) ?? list[0])?.id ?? "";
    }
  },
  { immediate: true }
);
const currentLayout = computed(
  () => layouts.value.find((l) => l.id === selectedLayout.value) ?? { name: "—", capacity: "—" }
);

/* ── pricing ─────────────────────────────────────────────────────────────── */
const pricingTabs = [
  { id: "hour", label: "By Hour" },
  { id: "day", label: "By Day" },
  { id: "package", label: "By Package" },
];
const pricingTab = ref("hour");

const rateFor = (tier) => (props.space.rates ?? []).find((r) => r.tier === tier) ?? null;
const hourlyRate = computed(() => rateFor("hourly"));
const dayRate = computed(() => rateFor("full_day"));
const packages = computed(() =>
  (props.venue.packages ?? []).filter((p) => !p.spaceIds?.length || p.spaceIds.includes(props.space.id))
);

const activeRate = computed(() => {
  if (pricingTab.value === "package") return packages.value[0]?.priceMinor ?? null;
  if (pricingTab.value === "day") return dayRate.value?.amountMinor ?? props.space.fullDayMinor ?? null;
  return hourlyRate.value?.amountMinor ?? props.space.fromHourMinor ?? null;
});

const minHours = computed(() => Math.max(1, Number(props.space.minHours) || 1));
const hourOptions = computed(() => {
  const set = new Set([minHours.value, 4, 6, 8, 10, 12].filter((h) => h >= minHours.value && h <= 24));
  return [...set].sort((a, b) => a - b);
});
const hours = ref(8);
watch(
  hourOptions,
  (opts) => {
    if (!opts.includes(hours.value)) hours.value = opts.find((h) => h >= 8) ?? opts[opts.length - 1];
  },
  { immediate: true }
);
const durationHours = computed(() =>
  pricingTab.value === "day" ? dayRate.value?.includedHours || hours.value : hours.value
);

// Date: the draft's day for this space when there is one, else two weeks out.
const date = computed(
  () =>
    (draft.venueId === props.venue.id && draft.days.find((d) => d.spaceId === props.space.id)?.date) ||
    dateFromToday(14)
);

const pad = (n) => String(n).padStart(2, "0");
const START = "16:00"; // master's card reads "4:00 PM → …"
const addHours = (hhmm, h) => {
  const [hh, mm] = hhmm.split(":").map(Number);
  const total = (hh * 60 + mm + Math.round(h * 60)) % (24 * 60);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
};
const endHHMM = computed(() => addHours(START, durationHours.value));
const endTime = computed(() => {
  const [h, m] = endHHMM.value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad(m)} ${suffix}`;
});

const guestCount = computed(() => {
  const want = draft.venueId === props.venue.id && draft.guests ? Number(draft.guests) : 100;
  const max = Number(props.space.maxCapacity) || want;
  const min = Number(props.space.minCapacity) || 1;
  return Math.max(1, Math.min(max, Math.max(min, want)));
});

const quote = ref(null);
let qseq = 0;
let qtimer = null;

async function loadQuote() {
  const mine = ++qseq;
  if (pricingTab.value === "package" || !props.venue.id) {
    quote.value = null;
    return;
  }
  try {
    const data = await api.post(
      "/quote",
      {
        venueId: props.venue.id,
        segments: [
          {
            spaceId: props.space.id,
            date: date.value,
            startTime: START,
            endTime: endHHMM.value,
            tier: pricingTab.value === "day" ? "full_day" : "hourly",
            guestCount: guestCount.value,
            ...(selectedLayout.value ? { layout: selectedLayout.value } : {}),
          },
        ],
        addons: [],
      },
      { toast: false }
    );
    if (mine === qseq) quote.value = data;
  } catch {
    if (mine === qseq) quote.value = null;
  }
}

watch(
  [() => props.space.id, pricingTab, hours, date, selectedLayout],
  () => {
    clearTimeout(qtimer);
    qtimer = setTimeout(loadQuote, 250);
  },
  { immediate: true }
);

const segment = computed(() => quote.value?.segments?.[0] ?? null);
const sumLines = (kind) => {
  const lines = (quote.value?.lines ?? []).filter((l) => l.kind === kind);
  return quote.value ? lines.reduce((a, l) => a + (Number(l.amountMinor) || 0), 0) : null;
};
const hoursTotal = computed(() => sumLines("space"));
const feesTotal = computed(() => sumLines("fee"));
const serviceFeePct = computed(() => {
  const bps = quote.value?.totals?.serviceFeeBps;
  return bps === null || bps === undefined ? "—" : pct(bps / 100, 1);
});
const weekdaySaving = computed(() => {
  if (!segment.value || !hourlyRate.value) return null;
  const diff = (Number(segment.value.spaceAmountMinor) || 0) - hourlyRate.value.amountMinor * durationHours.value;
  return diff > 0 ? diff : null;
});

/* ── continue ────────────────────────────────────────────────────────────── */
function goToSetup() {
  return navigateTo({
    path: "/discover/setup",
    query: {
      slug: props.venue.slug,
      spaceId: props.space.id,
      date: date.value,
      ...(pricingTab.value !== "package" ? { start: START, end: endHHMM.value } : {}),
    },
  });
}
</script>
