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
          <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">
            Setup Your Event
          </h1>
          <p class="mt-1 text-[14px] text-bodytext">
            Define the core details for your multi-day booking.
          </p>

          <section class="mt-5 bg-white rounded-[24px] border border-border p-5 md2:p-6">
            <div class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-full bg-[#FFF1ED] text-primary text-[13px] font-bold flex items-center justify-center"
              >
                1
              </span>
              <h2 class="text-[16px] font-bold text-header">Event Overview</h2>
            </div>

            <div class="mt-5">
              <div class="flex items-center justify-between">
                <label class="text-[13px] font-medium text-header">
                  Event Name <span class="text-primary">*</span>
                </label>
                <span class="text-[12px] text-bodytext2">{{ draft.eventName.length }}/100</span>
              </div>
              <input
                v-model="draft.eventName"
                type="text"
                maxlength="100"
                class="mt-2 w-full h-12 rounded-xl border border-border bg-white px-3 text-[14px] text-header outline-none focus:border-primary"
              />
            </div>

            <div class="mt-5">
              <p class="text-[13px] font-medium text-header">
                Event Type <span class="text-primary">*</span>
              </p>
              <div class="mt-3 grid grid-cols-2 md2:grid-cols-4 gap-3">
                <button
                  v-for="type in eventTypes"
                  :key="type.key"
                  type="button"
                  class="h-[88px] rounded-2xl border bg-white flex flex-col items-center justify-center gap-2 text-[12px] font-medium"
                  :class="
                    draft.eventType === type.key
                      ? 'border-primary text-header'
                      : 'border-border text-bodytext'
                  "
                  @click="draft.eventType = type.key"
                >
                  <span v-html="iconFor(type.key)" class="text-current"></span>
                  {{ type.label }}
                </button>
              </div>
            </div>

            <div class="mt-6">
              <p class="text-[13px] font-medium text-header">
                Estimated Total Guests <span class="text-primary">*</span>
              </p>
              <div class="mt-3 flex flex-wrap items-center gap-3">
                <div
                  class="inline-flex items-center rounded-full border border-border h-10 px-1.5"
                >
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full text-[18px] text-header"
                    @click="adjustGuests(-50)"
                  >
                    −
                  </button>
                  <span class="min-w-[2.75rem] text-center text-[14px] font-semibold">
                    {{ guestsLabel }}
                  </span>
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full text-[18px] text-header"
                    @click="adjustGuests(50)"
                  >
                    +
                  </button>
                </div>
                <button
                  v-for="preset in guestPresets"
                  :key="preset.value"
                  type="button"
                  class="h-9 min-w-[3.25rem] px-3 rounded-lg text-[13px] font-semibold"
                  :class="
                    Number(draft.guests) === preset.value
                      ? 'bg-primary text-white'
                      : 'bg-[#F3F4F6] text-header'
                  "
                  @click="draft.guests = preset.value"
                >
                  {{ preset.label }}
                </button>
              </div>
            </div>
          </section>

          <section class="mt-4 bg-white rounded-[24px] border border-border p-5 md2:p-6">
            <div class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-full bg-[#FFF1ED] text-primary text-[13px] font-bold flex items-center justify-center"
              >
                2
              </span>
              <h2 class="text-[16px] font-bold text-header">Schedule & Days</h2>
            </div>

            <div class="mt-5">
              <p class="text-[13px] font-medium text-header">
                How many days is this event? <span class="text-primary">*</span>
              </p>
              <div class="mt-3 flex gap-2">
                <button
                  v-for="count in dayPresets"
                  :key="count.value"
                  type="button"
                  class="w-10 h-10 rounded-lg text-[13px] font-semibold"
                  :class="
                    dayCount === count.value
                      ? 'bg-primary text-white'
                      : 'bg-[#F3F4F6] text-header'
                  "
                  @click="setDayCount(count.value)"
                >
                  {{ count.label }}
                </button>
              </div>
            </div>

            <div class="mt-6">
              <p class="text-[13px] font-medium text-header">Define Event Days</p>
              <div class="mt-4 space-y-3">
                <div
                  v-for="(day, index) in draft.days"
                  :key="index"
                  class="rounded-2xl bg-[#F8F9FB] px-4 py-4"
                >
                  <div class="md2:flex md2:items-start md2:gap-3">
                    <span
                      class="w-8 h-8 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 md2:mt-6"
                    >
                      D{{ index + 1 }}
                    </span>
                    <div
                      class="mt-3 md2:mt-0 flex-1 grid grid-cols-1 md2:grid-cols-3 gap-3 min-w-0"
                    >
                      <label class="block">
                        <span class="text-[12px] text-bodytext">Day Name</span>
                        <input
                          v-model="day.title"
                          type="text"
                          class="mt-1 w-full h-11 rounded-xl border border-border bg-white px-3 text-[13px] text-header outline-none focus:border-primary"
                        />
                      </label>
                      <label class="block">
                        <span class="text-[12px] text-bodytext">Select Space</span>
                        <div class="relative mt-1">
                          <select
                            v-model="day.spaceId"
                            class="w-full h-11 rounded-xl border border-border bg-white px-3 pr-8 text-[13px] text-header outline-none appearance-none focus:border-primary"
                          >
                            <option v-for="space in spaces" :key="space.id" :value="space.id">
                              {{ space.name }}
                            </option>
                          </select>
                          <i
                            class="pi pi-chevron-down text-[10px] text-bodytext absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                          ></i>
                        </div>
                      </label>
                      <label class="block">
                        <span class="text-[12px] text-bodytext">Select Date</span>
                        <div class="relative mt-1">
                          <input
                            v-model="day.date"
                            type="date"
                            :min="today"
                            class="date-input w-full h-11 rounded-xl border border-border bg-white px-3 text-[13px] text-header outline-none focus:border-primary"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside
          class="mt-6 md2:mt-0 md2:w-[280px] md2:shrink-0 bg-white rounded-[24px] border border-border p-5 md2:sticky md2:top-24"
        >
          <h2 class="text-[16px] font-bold text-header">Setup Summary</h2>
          <div class="mt-4 rounded-xl overflow-hidden h-[110px] bg-greybg">
            <img
              :src="coverImage"
              :alt="venue.name"
              class="w-full h-full object-cover"
            />
          </div>
          <p class="mt-3 text-[14px] font-bold text-header">{{ venue.name }}</p>
          <p class="mt-0.5 text-[12px] text-bodytext flex items-center gap-1">
            <i class="pi pi-map-marker text-[10px]"></i>
            {{ venue.location?.label || "—" }}
          </p>

          <div class="mt-4 pt-4 border-t border-border">
            <p class="text-[12px] text-bodytext">Event Name</p>
            <p class="mt-0.5 text-[14px] font-semibold text-header">
              {{ draft.eventName || "—" }}
            </p>
            <div class="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p class="text-[12px] text-bodytext">Type</p>
                <p class="mt-0.5 text-[13px] font-semibold text-header">
                  {{ selectedTypeLabel }}
                </p>
              </div>
              <div>
                <p class="text-[12px] text-bodytext">Guests</p>
                <p class="mt-0.5 text-[13px] font-semibold text-header">
                  ~{{ guestsLabel }}
                </p>
              </div>
            </div>
            <div class="mt-3">
              <p class="text-[12px] text-bodytext">Schedule ({{ dayCount }} Days)</p>
              <ul class="mt-2 space-y-1.5">
                <li
                  v-for="(day, index) in draft.days"
                  :key="index"
                  class="flex items-center gap-2 text-[13px]"
                >
                  <span
                    class="w-2 h-2 rounded-full shrink-0"
                    :class="index === 0 ? 'bg-primary' : 'bg-[#C2410C]'"
                  ></span>
                  <span class="text-bodytext">D{{ index + 1 }}:</span>
                  <span class="font-medium text-header truncate">{{
                    day.title || "Untitled"
                  }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between text-[12px]">
              <span class="text-bodytext">Setup Progress</span>
              <span class="font-semibold text-header">{{ progress }}%</span>
            </div>
            <div class="mt-2 h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div class="h-full w-[20%] rounded-full bg-primary" :style="{ width: `${progress}%` }"></div>
            </div>
          </div>

          <button
            type="button"
            class="mt-5 w-full h-11 rounded-full bg-brand-gradient-soft text-white text-[13px] font-semibold"
            @click="goToAddons"
          >
            Continue to add-ons
          </button>
          <button
            type="button"
            class="mt-2 w-full h-11 rounded-full border border-primary text-primary text-[13px] font-semibold inline-flex items-center justify-center gap-2"
            @click="goBack"
          >
            Return Back
            <i class="pi pi-arrow-right text-[10px]"></i>
          </button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast";
/*
 * Step 1 of the booking wizard. Everything lives in the shared draft
 * (useBookingDraft) so add-ons and review read the same days. Master's form
 * has no time inputs: each day runs 10:00–22:00 unless the venue page's price
 * card passed its own times in the query.
 */
import { makeDay, dateFromToday } from "~/composables/useBookingDraft";

useHead({ title: "Setup Your Event" });

const route = useRoute();
const catalog = useCatalog();
const { draft, startFor } = useBookingDraft();

const slug = computed(() => String(route.query.slug || draft.venueSlug || ""));
const { venue: venueData, load, spaceById, coverImage } = useWizardVenue(slug);

// The page renders its normal layout with "—" until the venue arrives.
const venue = computed(() => venueData.value ?? { name: "—", location: {}, spaces: [] });
const spaces = computed(() => venue.value.spaces ?? []);
const firstSpaceName = computed(() => spaceById(draft.days[0]?.spaceId)?.name || "—");

const today = dateFromToday(0);

onMounted(async () => {
  if (!slug.value) return navigateTo("/discover");
  const v = await load();
  if (!v) {
    useToastStore().setMessage({ text: "We could not load this venue.", type: "error" });
    return;
  }
  const spaceId = route.query.spaceId ? String(route.query.spaceId) : "";
  const fresh = draft.venueSlug !== v.slug;
  startFor(v, { spaceId });
  if (!draft.eventType && eventTypes.value.length) draft.eventType = eventTypes.value[0].key;
  // Coming from a space's price card: carry its date and times onto day 1.
  if (spaceId && (fresh || draft.days.length === 1)) {
    const d0 = draft.days[0];
    if (route.query.date) d0.date = String(route.query.date);
    if (route.query.start) d0.startTime = String(route.query.start);
    if (route.query.end) d0.endTime = String(route.query.end);
  }
});

const venuePath = computed(() => ({ path: `/discover/${slug.value}` }));

/* ── event type ──────────────────────────────────────────────────────────── */
const ringIcon = `<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="8" r="5.2" stroke="currentColor" stroke-width="1.6"/></svg>`;
const buildingIcon = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none"><path d="M3 16.5V6.5L10 2.5L17 6.5V16.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 16.5V11H12V16.5" stroke="currentColor" stroke-width="1.6"/></svg>`;
const partyIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 15L8 7L15 15H3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 4V2M12.5 5L14 3.5M5.5 5L4 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const conferenceIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 11V8.5C5 6.6 6.6 5 8.5 5H9.5C11.4 5 13 6.6 13 8.5V11" stroke="currentColor" stroke-width="1.6"/><path d="M4 13H14V15H4V13Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
const ICONS = {
  wedding: ringIcon,
  corporate: buildingIcon,
  party: partyIcon,
  birthday: partyIcon,
  conference: conferenceIcon,
  workshop: conferenceIcon,
  networking: buildingIcon,
};
const iconFor = (key) => ICONS[key] ?? partyIcon;

const eventTypes = computed(() => catalog.value?.eventTypes ?? []);
watch(eventTypes, (list) => {
  if (!draft.eventType && list.length) draft.eventType = list[0].key;
});
const selectedTypeLabel = computed(() => labelFor(eventTypes.value, draft.eventType) || "—");

/* ── guests ──────────────────────────────────────────────────────────────── */
const guestPresets = [
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "300", value: 300 },
  { label: "500+", value: 500 },
];
const guestsLabel = computed(() => Number(draft.guests || 0).toLocaleString("en-US"));

function adjustGuests(step) {
  draft.guests = Math.min(100000, Math.max(1, (Number(draft.guests) || 0) + step));
}

/* ── days ────────────────────────────────────────────────────────────────── */
const dayPresets = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];
const dayCount = computed(() => draft.days.length);

function setDayCount(count) {
  const fallback = draft.days[draft.days.length - 1]?.spaceId || spaces.value[0]?.id || "";
  while (draft.days.length < count) {
    const prev = draft.days[draft.days.length - 1];
    const next = makeDay(draft.days.length, fallback);
    if (prev?.date) {
      const d = new Date(`${prev.date}T12:00:00Z`);
      d.setUTCDate(d.getUTCDate() + 1);
      next.date = d.toISOString().slice(0, 10);
    }
    draft.days.push(next);
  }
  draft.days.splice(count);
  // Add-on selections on removed days go too.
  draft.addons = draft.addons.filter((a) => a.segmentIndex < count);
}

/* ── availability (checked on Continue; the form has no status slots) ───── */
/** A day's window as epoch ms, in WAT (UTC+1). */
function windowOf(day) {
  const start = new Date(`${day.date}T${day.startTime}:00+01:00`).getTime();
  let end = new Date(`${day.date}T${day.endTime}:00+01:00`).getTime();
  if (end <= start) end += 24 * 3600 * 1000;
  return [start, end];
}

async function findClashes() {
  const days = draft.days.filter((d) => d.date && d.startTime && d.endTime && d.spaceId);
  if (!venueData.value || !days.length) return [];
  const dates = days.map((d) => d.date).sort();
  const from = dates[0];
  const last = new Date(`${dates[dates.length - 1]}T12:00:00Z`);
  last.setUTCDate(last.getUTCDate() + 1); // an overnight segment spills into the next day
  const to = last.toISOString().slice(0, 10);
  if ((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000 > 92) return [];
  try {
    const data = await api.get(
      `/public/venues/${encodeURIComponent(venueData.value.slug)}/availability`,
      { from, to },
      { toast: false }
    );
    const bySpace = Object.fromEntries((data?.spaces ?? []).map((s) => [s.spaceId, s.busy ?? []]));
    const out = [];
    draft.days.forEach((day, i) => {
      if (!day.date || !day.startTime || !day.endTime || !day.spaceId) return;
      const [s, e] = windowOf(day);
      const clash = (bySpace[day.spaceId] ?? []).find(
        (b) => new Date(b.start).getTime() < e && new Date(b.end).getTime() > s
      );
      const selfClash = draft.days.some((other, j) => {
        if (j >= i || other.spaceId !== day.spaceId || !other.date) return false;
        const [os, oe] = windowOf(other);
        return os < e && oe > s;
      });
      if (clash) {
        out.push(`${day.title || `Day ${i + 1}`}: ${clash.label || (clash.kind === "booked" ? "already booked" : "unavailable")} ${timeRange(clash.start, clash.end)} on ${formatDate(clash.start)}`);
      } else if (selfClash) {
        out.push(`${day.title || `Day ${i + 1}`}: overlaps another day of your event in the same space`);
      }
    });
    return out;
  } catch {
    return [];
  }
}

/* ── progress & continue ─────────────────────────────────────────────────── */
const progress = computed(() => {
  const checks = [
    !!draft.eventName.trim(),
    !!draft.eventType,
    Number(draft.guests) > 0,
    draft.days.length > 0,
    draft.days.every((d) => d.spaceId && d.date && d.startTime && d.endTime),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
});

function validationError() {
  if (!draft.eventName.trim()) return "Give your event a name.";
  if (!draft.eventType) return "Choose an event type.";
  if (Number(draft.guests) < 1) return "Enter your guest count.";
  if (!draft.days.every((d) => d.spaceId && d.date)) return "Every day needs a space and a date.";
  if (draft.days.some((d) => d.date < today)) return "Event days must be in the future.";
  const over = draft.days.find((d) => {
    const cap = spaceById(d.spaceId)?.maxCapacity;
    return cap && Number(draft.guests) > cap;
  });
  if (over) {
    const sp = spaceById(over.spaceId);
    return `${sp.name} holds up to ${Number(sp.maxCapacity).toLocaleString("en-US")} guests.`;
  }
  return "";
}

function goBack() {
  return navigateTo(venuePath.value);
}

async function goToAddons() {
  const problem = validationError();
  if (problem) {
    useToastStore().setMessage({ text: problem, type: "error" });
    return;
  }
  const clashes = await findClashes();
  if (clashes.length && !window.confirm(`${clashes.join("\n")}\n\nContinue anyway? The venue may decline.`)) return;
  return navigateTo({ path: "/discover/addons", query: { slug: slug.value } });
}
</script>

<style scoped>
.date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.55;
}
</style>
