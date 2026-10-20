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
                <span class="text-[12px] text-bodytext2">{{ eventName.length }}/100</span>
              </div>
              <input
                v-model="eventName"
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
                  :key="type.id"
                  type="button"
                  class="h-[88px] rounded-2xl border bg-white flex flex-col items-center justify-center gap-2 text-[12px] font-medium"
                  :class="
                    eventType === type.id
                      ? 'border-primary text-header'
                      : 'border-border text-bodytext'
                  "
                  @click="eventType = type.id"
                >
                  <span v-html="type.icon" class="text-current"></span>
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
                    guests === preset.value
                      ? 'bg-primary text-white'
                      : 'bg-[#F3F4F6] text-header'
                  "
                  @click="guests = preset.value"
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
                  v-for="(day, index) in days"
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
                          v-model="day.name"
                          type="text"
                          class="mt-1 w-full h-11 rounded-xl border border-border bg-white px-3 text-[13px] text-header outline-none focus:border-primary"
                        />
                      </label>
                      <label class="block">
                        <span class="text-[12px] text-bodytext">Select Space</span>
                        <div class="relative mt-1">
                          <select
                            v-model="day.space"
                            class="w-full h-11 rounded-xl border border-border bg-white px-3 pr-8 text-[13px] text-header outline-none appearance-none focus:border-primary"
                          >
                            <option v-for="space in spaces" :key="space" :value="space">
                              {{ space }}
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
              src="/images/grand-atrium.jpg"
              :alt="venue.name"
              class="w-full h-full object-cover"
            />
          </div>
          <p class="mt-3 text-[14px] font-bold text-header">{{ venue.name }}</p>
          <p class="mt-0.5 text-[12px] text-bodytext flex items-center gap-1">
            <i class="pi pi-map-marker text-[10px]"></i>
            {{ venue.location }}
          </p>

          <div class="mt-4 pt-4 border-t border-border">
            <p class="text-[12px] text-bodytext">Event Name</p>
            <p class="mt-0.5 text-[14px] font-semibold text-header">
              {{ eventName || "—" }}
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
                  v-for="(day, index) in days"
                  :key="index"
                  class="flex items-center gap-2 text-[13px]"
                >
                  <span
                    class="w-2 h-2 rounded-full shrink-0"
                    :class="index === 0 ? 'bg-primary' : 'bg-[#C2410C]'"
                  ></span>
                  <span class="text-bodytext">D{{ index + 1 }}:</span>
                  <span class="font-medium text-header truncate">{{
                    day.name || "Untitled"
                  }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between text-[12px]">
              <span class="text-bodytext">Setup Progress</span>
              <span class="font-semibold text-header">20%</span>
            </div>
            <div class="mt-2 h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div class="h-full w-[20%] rounded-full bg-primary"></div>
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

useHead({ title: "Setup Your Event" });

const ringIcon = `<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><circle cx="8" cy="8" r="5.2" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="8" r="5.2" stroke="currentColor" stroke-width="1.6"/></svg>`;
const buildingIcon = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none"><path d="M3 16.5V6.5L10 2.5L17 6.5V16.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 16.5V11H12V16.5" stroke="currentColor" stroke-width="1.6"/></svg>`;
const partyIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 15L8 7L15 15H3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 4V2M12.5 5L14 3.5M5.5 5L4 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const conferenceIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 11V8.5C5 6.6 6.6 5 8.5 5H9.5C11.4 5 13 6.6 13 8.5V11" stroke="currentColor" stroke-width="1.6"/><path d="M4 13H14V15H4V13Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

const eventTypes = [
  { id: "wedding", label: "Wedding", icon: ringIcon },
  { id: "corporate", label: "Corporate", icon: buildingIcon },
  { id: "party", label: "Party", icon: partyIcon },
  { id: "conference", label: "Conference", icon: conferenceIcon },
];

const guestPresets = [
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "300", value: 300 },
  { label: "500+", value: 500 },
];

const dayPresets = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const spaces = [
  "Roof top",
  "Grand Ballroom",
  "Main Hall",
  "Sunset Garden",
  "The Glass Pavilion",
];

const defaultNames = [
  "Traditional Engagement",
  "White Wedding",
  "Reception",
  "After Party",
];

const eventName = ref("Jenkins Wedding Celebration");
const eventType = ref("wedding");
const guests = ref(300);
const dayCount = ref(2);
const days = ref([makeDay(0), makeDay(1)]);

const selectedTypeLabel = computed(
  () => eventTypes.find((t) => t.id === eventType.value)?.label || "—"
);
const guestsLabel = computed(() => (guests.value >= 500 ? "500+" : String(guests.value)));

function makeDay(index) {
  return {
    name: defaultNames[index] || `Day ${index + 1}`,
    space: "Roof top",
    date: "2024-10-14",
  };
}

function setDayCount(count) {
  dayCount.value = count;
  const next = [...days.value];
  while (next.length < count) next.push(makeDay(next.length));
  days.value = next.slice(0, count);
}

function adjustGuests(step) {
  guests.value = Math.min(1000, Math.max(50, guests.value + step));
}

function goBack() {
  return navigateTo(venuePath.value);
}

function goToAddons() {
  return navigateTo({
    path: "/discover/addons",
    query: {
      venue: venue.value.name,
      location: venue.value.location,
      slug: route.query.slug || "the-grand-pavilion",
      eventName: eventName.value,
    },
  });
}
</script>

<style scoped>
.date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.55;
}
</style>
