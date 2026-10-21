<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1080px]">
      <nav class="text-[13px] text-bodytext flex flex-wrap items-center gap-1.5">
        <NuxtLink to="/discover" class="hover:text-header">Venues</NuxtLink>
        <span class="text-bodytext2">›</span>
        <NuxtLink :to="venuePath" class="hover:text-header">{{ venue.name }}</NuxtLink>
        <span class="text-bodytext2">›</span>
        <span class="text-header font-medium">{{ firstSpaceName }}</span>
      </nav>

      <div class="mt-5 md2:flex md2:items-start md2:gap-6">
        <div class="min-w-0 flex-1">
          <section v-for="(group, gi) in groups" :key="group.category" :class="gi ? 'mt-8' : ''">
            <h1 v-if="gi === 0" class="text-[22px] font-bold text-header">{{ group.category }}</h1>
            <h2 v-else class="text-[22px] font-bold text-header">{{ group.category }}</h2>
            <template v-for="addon in group.addons" :key="addon.id">
              <!-- per guest: master's catering card -->
              <article
                v-if="addon.pricingModel === 'per_person'"
                class="mt-4 bg-white rounded-[20px] border border-border p-3 md2:p-4 md2:flex md2:gap-4"
              >
                <div
                  class="relative w-full h-[170px] md2:w-[210px] md2:h-[188px] rounded-xl overflow-hidden shrink-0 bg-greybg"
                >
                  <img
                    :src="addon.imageUrl"
                    :alt="addon.name"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                  <h2 class="text-[16px] font-bold text-header">{{ addon.name }}</h2>
                  <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
                    {{ addon.description }}
                  </p>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <span v-for="tag in addon.tags" :key="tag" class="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[11px] font-medium text-[#4B5563]">{{ tag }}</span>
                  </div>
                  <p class="mt-4 text-[18px] font-extrabold text-header">
                    {{ naira(addon.priceMinor) }} <span class="text-[13px] font-medium text-bodytext">/ {{ unitShort(addon) }}</span>
                  </p>
                </div>
                <div class="mt-3 md2:mt-0 md2:w-[236px] shrink-0 space-y-3">
                  <div
                    v-for="(day, index) in draft.days"
                    :key="index"
                    class="rounded-xl border-2 px-3 py-3"
                    :class="isOn(addon.id, index) ? 'border-[#FF5C7A] bg-[#FFF8F8]' : 'border-border'"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <p class="text-[13px] font-semibold text-header">
                        Day {{ index + 1 }}: {{ day.title }}
                      </p>
                      <ToggleSwitch :model-value="isOn(addon.id, index)" @update:model-value="toggleAddon(addon, index)" />
                    </div>
                    <div class="mt-2 flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2 text-[12px] text-bodytext">
                        <span>Guests</span>
                        <div class="inline-flex items-center rounded-full border border-border h-7 px-1">
                          <button type="button" class="w-5 h-5" @click="adjustQty(addon, index, -50)">−</button>
                          <span class="min-w-[1.75rem] text-center text-[12px] font-semibold text-header">{{ qtyOf(addon, index) }}</span>
                          <button type="button" class="w-5 h-5" @click="adjustQty(addon, index, 50)">+</button>
                        </div>
                      </div>
                      <p class="text-[13px] font-bold text-primary">
                        {{ isOn(addon.id, index) ? lineAmount(addon.id, index) : "—" }}
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <!-- featured per-day: master's uplighting card -->
              <article
                v-else-if="addon.popularUpsell"
                class="mt-4 bg-white rounded-[20px] border-2 p-3 md2:p-4 md2:flex md2:gap-4"
                :class="isSelectedAnywhere(addon.id) ? 'border-[#FF5C7A]' : 'border-border'"
              >
                <div
                  class="relative w-full h-[170px] md2:w-[210px] md2:h-[188px] rounded-xl overflow-hidden shrink-0 bg-greybg"
                >
                  <img
                    :src="addon.imageUrl"
                    :alt="addon.name"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-3">
                    <h3 class="text-[16px] font-bold text-header">{{ addon.name }}</h3>
                    <span v-if="isSelectedAnywhere(addon.id)" class="text-[11px] font-semibold text-primary">Selected</span>
                  </div>
                  <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
                    {{ addon.description }}
                  </p>
                  <div v-if="colorsOf(addon).length" class="mt-3">
                    <p class="text-[12px] text-bodytext">Custom Colors</p>
                    <div class="mt-1.5 flex items-center gap-2">
                      <span v-for="c in colorsOf(addon)" :key="c" class="w-4 h-4 rounded-full" :style="{ backgroundColor: c }"></span>
                    </div>
                  </div>
                  <p class="mt-4 text-[18px] font-extrabold text-header">
                    {{ naira(addon.priceMinor) }} <span class="text-[13px] font-medium text-bodytext">/ {{ unitShort(addon) }}</span>
                  </p>
                </div>
                <div class="mt-3 md2:mt-0 md2:w-[236px] shrink-0 space-y-3">
                  <div
                    v-for="(day, index) in draft.days"
                    :key="index"
                    class="rounded-xl border-2 px-3 py-3"
                    :class="isOn(addon.id, index) ? 'border-[#FF5C7A] bg-[#FFF8F8]' : 'border-border'"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <p class="text-[13px] font-semibold text-header">
                        Day {{ index + 1 }}: {{ day.title }}
                      </p>
                      <ToggleSwitch :model-value="isOn(addon.id, index)" @update:model-value="toggleAddon(addon, index)" />
                    </div>
                    <p class="mt-2 text-right text-[13px] font-bold text-primary">
                      {{ isOn(addon.id, index) ? lineAmount(addon.id, index) : "—" }}
                    </p>
                  </div>
                </div>
              </article>

              <!-- other per-day / flat: master's videography card -->
              <article
                v-else
                class="mt-4 bg-white rounded-[20px] border border-border p-3 md2:p-4 md2:flex md2:gap-4 md2:items-center"
              >
                <div
                  class="relative w-full h-[140px] md2:w-[210px] md2:h-[132px] rounded-xl overflow-hidden shrink-0 bg-greybg"
                >
                  <img
                    :src="addon.imageUrl"
                    :alt="addon.name"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                  <h3 class="text-[16px] font-bold text-header">{{ addon.name }}</h3>
                  <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
                    {{ addon.description }}
                  </p>
                  <p class="mt-3 text-[18px] font-extrabold text-header">
                    {{ naira(addon.priceMinor) }} <span class="text-[13px] font-medium text-bodytext">/ {{ unitShort(addon) }}</span>
                  </p>
                </div>
                <div class="mt-3 md2:mt-0 md2:w-[236px] shrink-0 space-y-2">
                  <div
                    v-for="(day, index) in draft.days"
                    :key="index"
                    class="flex items-center justify-between rounded-xl border border-border px-3 py-2.5"
                  >
                    <p class="text-[13px] text-bodytext">
                      Day {{ index + 1 }}: {{ day.title }}
                    </p>
                    <ToggleSwitch :model-value="isOn(addon.id, index)" @update:model-value="toggleAddon(addon, index)" />
                  </div>
                </div>
              </article>
            </template>
            <div class="mt-3 flex items-center justify-between text-[13px]">
              <span class="text-bodytext">{{ group.category }} Subtotal</span>
              <span class="font-bold text-header">{{ money(categorySubtotal(group)) }}</span>
            </div>
          </section>
        </div>

        <aside
          class="mt-6 md2:mt-0 md2:w-[300px] md2:shrink-0 bg-white rounded-[20px] border border-border overflow-hidden md2:sticky md2:top-24"
        >
          <div class="p-5">
            <h2 class="text-[16px] font-bold text-header">Add-Ons Summary</h2>
            <p class="mt-1 text-[12px] text-bodytext">{{ venue.name }}</p>

            <div class="mt-4 space-y-4 text-[12px]">
              <div>
                <p class="text-[10px] font-semibold tracking-[0.14em] text-bodytext2 uppercase">
                  Venue Hire
                </p>
                <div class="mt-1.5 flex justify-between gap-3">
                  <span class="text-bodytext">Base Venue Hire</span>
                  <span class="font-semibold text-header">{{ money(venueHire) }}</span>
                </div>
              </div>

              <div v-for="(group, index) in summaryDays" :key="index">
                <p class="text-[10px] font-semibold tracking-[0.14em] text-bodytext2 uppercase">
                  Day {{ index + 1 }} {{ group.short }}
                </p>
                <div class="mt-1.5 space-y-1">
                  <div
                    v-for="line in group.lines"
                    :key="line.label"
                    class="flex justify-between gap-3"
                  >
                    <span class="text-bodytext">{{ line.label }}</span>
                    <span class="font-semibold text-header">{{ naira(line.amount) }}</span>
                  </div>
                  <p v-if="!group.lines.length" class="text-bodytext2">No add-ons</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#FFF1ED] px-5 py-4">
            <p class="text-[12px] text-bodytext">Estimated Grand Total</p>
            <p class="mt-1 text-[22px] font-extrabold text-header leading-none">
              {{ money(grandTotal) }}
            </p>
            <button
              type="button"
              class="mt-4 w-full h-11 rounded-full bg-primary text-white text-[13px] font-semibold hover:bg-primary-dark"
              @click="goToReview"
            >
              Continue to Review
            </button>
            <p class="mt-2 text-center text-[11px] text-bodytext2">Step 3 of 5</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 * Step 2: the venue's add-ons (from the venue detail), toggled per day, drawn
 * with master's three card designs: per-guest add-ons use the catering card
 * (guest stepper), featured per-day add-ons the uplighting card, the rest the
 * videography card. Every amount is a debounced POST /quote of the whole draft.
 */
import { h } from "vue";
import { useToastStore } from "~/store/toast";

// Master's toggle, as a render function (no runtime template compiler).
const ToggleSwitch = {
  props: { modelValue: Boolean },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          class: ["relative w-9 h-5 rounded-full shrink-0", props.modelValue ? "bg-primary" : "bg-[#D1D5DB]"],
          "aria-pressed": props.modelValue,
          onClick: () => emit("update:modelValue", !props.modelValue),
        },
        [
          h("span", {
            class: [
              "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",
              props.modelValue ? "right-0.5" : "left-0.5",
            ],
          }),
        ]
      );
  },
};

useHead({ title: "Add-ons" });

const route = useRoute();
const { draft, startFor, quoteBody, quotable } = useBookingDraft();
const slug = computed(() => String(route.query.slug || draft.venueSlug || ""));
const { venue: venueData, load, spaceById } = useWizardVenue(slug);

const venue = computed(() => venueData.value ?? { name: "—", addons: [] });
const firstSpaceName = computed(() => spaceById(draft.days[0]?.spaceId)?.name || "—");

onMounted(async () => {
  if (!slug.value) return navigateTo("/discover");
  const v = await load();
  if (!v) {
    useToastStore().setMessage({ text: "We could not load this venue.", type: "error" });
    return;
  }
  startFor(v);
  refreshQuote();
});

const venuePath = computed(() => ({ path: `/discover/${slug.value}` }));
const money = (minor) => (minor === null || minor === undefined ? "—" : naira(minor));

const UNIT = { flat: "event", per_day: "day", per_hour: "hour", per_person: "guest" };
const unitShort = (a) => UNIT[a.pricingModel] ?? a.unitLabel ?? "unit";

/** Tags that are colour codes (#22D3EE …) feed the "Custom Colors" swatches. */
const colorsOf = (a) => (a.tags ?? []).filter((t) => /^#[0-9a-f]{3,8}$/i.test(t));

const groups = computed(() => {
  const by = new Map();
  for (const a of venue.value.addons ?? []) {
    if (!by.has(a.category)) by.set(a.category, []);
    by.get(a.category).push(a);
  }
  return [...by.entries()].map(([category, addons]) => ({ category, addons }));
});

const allowedOn = (addon, day) => !addon.spaceIds?.length || addon.spaceIds.includes(day.spaceId);

const selection = (addonId, index) => draft.addons.find((a) => a.addonId === addonId && a.segmentIndex === index);
const isOn = (addonId, index) => !!selection(addonId, index);
const isSelectedAnywhere = (addonId) => draft.addons.some((a) => a.addonId === addonId);

// Guest counts chosen on a per-guest card before it is switched on.
const pendingQty = reactive({});
const defaultQty = (addon) => Math.max(addon.minQuantity || 1, Number(draft.guests) || 1);
const qtyOf = (addon, index) =>
  selection(addon.id, index)?.quantity ?? pendingQty[`${addon.id}:${index}`] ?? defaultQty(addon);

function toggleAddon(addon, index) {
  const i = draft.addons.findIndex((a) => a.addonId === addon.id && a.segmentIndex === index);
  if (i >= 0) {
    draft.addons.splice(i, 1);
    return;
  }
  if (!allowedOn(addon, draft.days[index])) {
    useToastStore().setMessage({ text: `${addon.name} is not offered in this day's space.`, type: "error" });
    return;
  }
  const entry = { addonId: addon.id, segmentIndex: index, quantity: null };
  if (addon.pricingModel === "per_person") entry.quantity = qtyOf(addon, index);
  else if (addon.minQuantity > 1) entry.quantity = addon.minQuantity;
  draft.addons.push(entry);
}

function adjustQty(addon, index, step) {
  const next = Math.max(addon.minQuantity || 1, (Number(qtyOf(addon, index)) || 0) + step);
  const sel = selection(addon.id, index);
  if (sel) sel.quantity = next;
  else pendingQty[`${addon.id}:${index}`] = next;
}

/* ── live quote ──────────────────────────────────────────────────────────── */
const quote = ref(null);
let seq = 0;
let timer = null;

async function loadQuote() {
  if (!quotable()) return;
  const mine = ++seq;
  try {
    const data = await api.post("/quote", quoteBody());
    if (mine === seq) quote.value = data;
  } catch {
    /* the toast explains it */
  }
}

function refreshQuote() {
  clearTimeout(timer);
  timer = setTimeout(loadQuote, 400);
}

watch(() => JSON.stringify([draft.addons, draft.days, draft.guests]), refreshQuote);

const lines = computed(() => quote.value?.lines ?? []);
const sum = (list) => list.reduce((s, l) => s + (Number(l.amountMinor) || 0), 0);
const venueHire = computed(() => (quote.value ? sum(lines.value.filter((l) => l.kind !== "addon")) : null));
const lineAmount = (addonId, index) => {
  const line = lines.value.find((l) => l.kind === "addon" && l.refId === addonId && l.segmentIndex === index);
  return line ? naira(line.amountMinor) : "—";
};
const categorySubtotal = (group) => {
  if (!quote.value) return null;
  const ids = new Set(group.addons.map((a) => a.id));
  return sum(lines.value.filter((l) => l.kind === "addon" && ids.has(l.refId)));
};

const summaryDays = computed(() =>
  draft.days.map((day, index) => ({
    short: String(day.title || "").split(" ")[0].toUpperCase(),
    lines: lines.value
      .filter((l) => l.kind === "addon" && l.segmentIndex === index)
      .map((l) => ({ label: l.quantity > 1 ? `${l.name} (x${l.quantity})` : l.name, amount: l.amountMinor })),
  }))
);

const grandTotal = computed(() => quote.value?.totals?.totalMinor ?? null);

function goToReview() {
  if (!draft.days.length) return navigateTo({ path: "/discover/setup", query: { slug: slug.value } });
  return navigateTo({ path: "/discover/review", query: { slug: slug.value } });
}
</script>
