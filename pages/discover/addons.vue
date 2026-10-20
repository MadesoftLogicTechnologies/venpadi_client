<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1080px]">
      <nav class="text-[13px] text-bodytext flex flex-wrap items-center gap-1.5">
        <NuxtLink to="/discover" class="hover:text-header">Venues</NuxtLink>
        <span class="text-bodytext2">›</span>
        <NuxtLink :to="venuePath" class="hover:text-header">{{ venue.name }}</NuxtLink>
        <span class="text-bodytext2">›</span>
        <span class="text-header font-medium">Grand Ballroom</span>
      </nav>

      <div class="mt-5 md2:flex md2:items-start md2:gap-6">
        <div class="min-w-0 flex-1">
          <section>
            <h1 class="text-[22px] font-bold text-header">Catering</h1>
            <article
              class="mt-4 bg-white rounded-[20px] border border-border p-3 md2:p-4 md2:flex md2:gap-4"
            >
              <div
                class="relative w-full h-[170px] md2:w-[210px] md2:h-[188px] rounded-xl overflow-hidden shrink-0 bg-greybg"
              >
                <img
                  src="/images/catering-buffet.jpg"
                  alt="Premium Buffet Catering"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                <h2 class="text-[16px] font-bold text-header">Premium Buffet Catering</h2>
                <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
                  Elevated culinary experience featuring seasonal menus and live stations.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[11px] font-medium text-[#4B5563]">Continental</span>
                  <span class="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[11px] font-medium text-[#4B5563]">Vegan Options</span>
                </div>
                <p class="mt-4 text-[18px] font-extrabold text-header">
                  ₦25,000 <span class="text-[13px] font-medium text-bodytext">/ guest</span>
                </p>
              </div>
              <div class="mt-3 md2:mt-0 md2:w-[236px] shrink-0 space-y-3">
                <div
                  v-for="(day, index) in cateringDays"
                  :key="day.id"
                  class="rounded-xl border-2 px-3 py-3"
                  :class="day.on ? 'border-[#FF5C7A] bg-[#FFF8F8]' : 'border-border'"
                >
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-[13px] font-semibold text-header">
                      Day {{ index + 1 }}: {{ day.name }}
                    </p>
                    <ToggleSwitch v-model="day.on" />
                  </div>
                  <div class="mt-2 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 text-[12px] text-bodytext">
                      <span>Guests</span>
                      <div class="inline-flex items-center rounded-full border border-border h-7 px-1">
                        <button type="button" class="w-5 h-5" @click="adjustDayGuests(day, -50)">−</button>
                        <span class="min-w-[1.75rem] text-center text-[12px] font-semibold text-header">{{ day.guests }}</span>
                        <button type="button" class="w-5 h-5" @click="adjustDayGuests(day, 50)">+</button>
                      </div>
                    </div>
                    <p class="text-[13px] font-bold text-primary">
                      {{ day.on ? naira(day.guests * CATERING_RATE) : "—" }}
                    </p>
                  </div>
                </div>
              </div>
            </article>
            <div class="mt-3 flex items-center justify-between text-[13px]">
              <span class="text-bodytext">Catering Subtotal</span>
              <span class="font-bold text-header">{{ naira(cateringSubtotal) }}</span>
            </div>
          </section>

          <section class="mt-8">
            <h2 class="text-[22px] font-bold text-header">Decor & Lighting</h2>

            <article
              class="mt-4 bg-white rounded-[20px] border-2 p-3 md2:p-4 md2:flex md2:gap-4"
              :class="uplightingSelected ? 'border-[#FF5C7A]' : 'border-border'"
            >
              <div
                class="relative w-full h-[170px] md2:w-[210px] md2:h-[188px] rounded-xl overflow-hidden shrink-0 bg-greybg"
              >
                <img
                  src="/images/uplighting.jpg"
                  alt="Architectural Uplighting"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="text-[16px] font-bold text-header">Architectural Uplighting</h3>
                  <span v-if="uplightingSelected" class="text-[11px] font-semibold text-primary">Selected</span>
                </div>
                <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
                  Transform the venue ambiance with 40+ fixtures and custom colour washes.
                </p>
                <div class="mt-3">
                  <p class="text-[12px] text-bodytext">Custom Colors</p>
                  <div class="mt-1.5 flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full bg-[#22D3EE]"></span>
                    <span class="w-4 h-4 rounded-full bg-[#FF4D6A]"></span>
                    <span class="w-4 h-4 rounded-full bg-[#34D399]"></span>
                  </div>
                </div>
                <p class="mt-4 text-[18px] font-extrabold text-header">
                  ₦450,000 <span class="text-[13px] font-medium text-bodytext">/ day</span>
                </p>
              </div>
              <div class="mt-3 md2:mt-0 md2:w-[236px] shrink-0 space-y-3">
                <div
                  v-for="(day, index) in uplightDays"
                  :key="day.id"
                  class="rounded-xl border-2 px-3 py-3"
                  :class="day.on ? 'border-[#FF5C7A] bg-[#FFF8F8]' : 'border-border'"
                >
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-[13px] font-semibold text-header">
                      Day {{ index + 1 }}: {{ day.name }}
                    </p>
                    <ToggleSwitch v-model="day.on" />
                  </div>
                  <p class="mt-2 text-right text-[13px] font-bold text-primary">
                    {{ day.on ? naira(UPLIGHT_RATE) : "—" }}
                  </p>
                </div>
              </div>
            </article>

            <article
              class="mt-4 bg-white rounded-[20px] border border-border p-3 md2:p-4 md2:flex md2:gap-4 md2:items-center"
            >
              <div
                class="relative w-full h-[140px] md2:w-[210px] md2:h-[132px] rounded-xl overflow-hidden shrink-0 bg-greybg"
              >
                <img
                  src="/images/videography.jpg"
                  alt="Cinematic Videography"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                <h3 class="text-[16px] font-bold text-header">Cinematic Videography</h3>
                <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
                  Two-camera coverage capturing the full event story.
                </p>
                <p class="mt-3 text-[18px] font-extrabold text-header">
                  ₦850,000 <span class="text-[13px] font-medium text-bodytext">/ day</span>
                </p>
              </div>
              <div class="mt-3 md2:mt-0 md2:w-[236px] shrink-0 space-y-2">
                <div
                  v-for="(day, index) in videoDays"
                  :key="day.id"
                  class="flex items-center justify-between rounded-xl border border-border px-3 py-2.5"
                >
                  <p class="text-[13px] text-bodytext">
                    Day {{ index + 1 }}: {{ day.name }}
                  </p>
                  <ToggleSwitch v-model="day.on" />
                </div>
              </div>
            </article>

            <div class="mt-3 flex items-center justify-between text-[13px]">
              <span class="text-bodytext">Decor & Lighting Subtotal</span>
              <span class="font-bold text-header">{{ naira(decorSubtotal) }}</span>
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
                  <span class="font-semibold text-header">{{ naira(VENUE_HIRE) }}</span>
                </div>
              </div>

              <div v-for="(group, index) in summaryDays" :key="group.label">
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
              {{ naira(grandTotal) }}
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
const ToggleSwitch = {
  props: { modelValue: Boolean },
  emits: ["update:modelValue"],
  template: `
    <button
      type="button"
      class="relative w-9 h-5 rounded-full shrink-0"
      :class="modelValue ? 'bg-primary' : 'bg-[#D1D5DB]'"
      :aria-pressed="modelValue"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
        :class="modelValue ? 'right-0.5' : 'left-0.5'"
      ></span>
    </button>
  `,
};

const CATERING_RATE = 25000;
const UPLIGHT_RATE = 450000;
const VIDEO_RATE = 850000;
const VENUE_HIRE = 2000000;

const route = useRoute();

const venue = computed(() => ({
  name: (route.query.venue && String(route.query.venue)) || "The Grand Pavilion",
  location:
    (route.query.location && String(route.query.location)) ||
    "Victoria Island, Lagos",
}));

const venuePath = computed(() => ({
  path: `/discover/${route.query.slug || "the-grand-pavilion"}`,
  query: {
    venue: venue.value.name,
    location: venue.value.location,
  },
}));

useHead({ title: "Add-ons" });

const dayNames = ["Grand Celebration", "Evening Reception"];

const cateringDays = reactive([
  { id: "c1", name: dayNames[0], on: true, guests: 300 },
  { id: "c2", name: dayNames[1], on: true, guests: 150 },
]);
const uplightDays = reactive([
  { id: "u1", name: dayNames[0], on: true },
  { id: "u2", name: dayNames[1], on: true },
]);
const videoDays = reactive([
  { id: "v1", name: dayNames[0], on: false },
  { id: "v2", name: dayNames[1], on: false },
]);

const cateringSubtotal = computed(() =>
  cateringDays.reduce((sum, day) => sum + (day.on ? day.guests * CATERING_RATE : 0), 0)
);
const uplightSubtotal = computed(() =>
  uplightDays.reduce((sum, day) => sum + (day.on ? UPLIGHT_RATE : 0), 0)
);
const videoSubtotal = computed(() =>
  videoDays.reduce((sum, day) => sum + (day.on ? VIDEO_RATE : 0), 0)
);
const decorSubtotal = computed(() => uplightSubtotal.value + videoSubtotal.value);
const uplightingSelected = computed(() => uplightDays.some((day) => day.on));

const summaryDays = computed(() =>
  dayNames.map((name, index) => {
    const lines = [];
    const cater = cateringDays[index];
    const light = uplightDays[index];
    const video = videoDays[index];
    if (cater.on) {
      lines.push({
        label: `Premium Buffet (x${cater.guests})`,
        amount: cater.guests * CATERING_RATE,
      });
    }
    if (light.on) lines.push({ label: "Uplighting", amount: UPLIGHT_RATE });
    if (video.on) lines.push({ label: "Videography", amount: VIDEO_RATE });
    return {
      short: name.split(" ")[0].toUpperCase(),
      lines,
    };
  })
);

const grandTotal = computed(
  () => VENUE_HIRE + cateringSubtotal.value + decorSubtotal.value
);

function adjustDayGuests(day, step) {
  day.guests = Math.min(1000, Math.max(50, day.guests + step));
}

function naira(value) {
  return `₦${Number(value).toLocaleString("en-NG")}`;
}

function goToReview() {
  return navigateTo({
    path: "/discover/review",
    query: {
      venue: venue.value.name,
      location: venue.value.location,
      slug: route.query.slug || "the-grand-pavilion",
      ...(route.query.eventName ? { eventName: route.query.eventName } : {}),
    },
  });
}
</script>
