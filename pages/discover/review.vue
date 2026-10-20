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
            Review & Submit Proposal
          </h1>
          <p class="mt-2 text-[14px] text-bodytext leading-relaxed max-w-[640px]">
            Review your complete multi-day itinerary before submitting. Every selection
            is listed below — edit anything before confirming.
          </p>

          <article
            class="mt-5 bg-white rounded-[20px] border border-border p-4 md2:flex md2:items-center md2:gap-4"
          >
            <div
              class="relative w-full h-[120px] md2:w-[132px] md2:h-[88px] rounded-xl overflow-hidden shrink-0 bg-greybg"
            >
              <img
                src="/images/palm-court.jpg"
                :alt="venue.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="mt-3 md2:mt-0 flex-1 min-w-0">
              <p class="text-[10px] font-semibold tracking-[0.16em] text-bodytext2 uppercase">
                {{ venue.name }}
              </p>
              <h2 class="mt-1 text-[18px] font-extrabold text-header leading-snug">
                {{ eventName }}
              </h2>
              <p class="mt-1 text-[13px] text-bodytext">
                2 Days · Aug 24–25 · ~300 guests
              </p>
            </div>
            <div class="mt-3 md2:mt-0 flex items-center gap-3 shrink-0">
              <span
                class="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[12px] font-medium text-bodytext"
              >
                Draft
              </span>
              <NuxtLink
                :to="setupPath"
                class="text-[13px] font-semibold text-header inline-flex items-center gap-1 hover:text-primary"
              >
                Event Details
                <i class="pi pi-chevron-right text-[10px]"></i>
              </NuxtLink>
            </div>
          </article>

          <article
            v-for="day in days"
            :key="day.id"
            class="mt-4 bg-white rounded-[20px] border border-[#FFD4C8] overflow-hidden"
          >
            <div class="px-4 md2:px-5 py-4 border-b border-[#FFE8E0]">
              <div class="md2:flex md2:items-center md2:justify-between gap-3">
                <div>
                  <p class="text-[15px] font-bold text-header">
                    {{ day.title }}
                  </p>
                  <p class="mt-0.5 text-[12px] text-bodytext">{{ day.dateLabel }}</p>
                </div>
                <div class="mt-2 md2:mt-0 flex items-center gap-3">
                  <span
                    class="inline-flex items-center gap-1.5 text-[12px] font-medium text-header bg-[#FFF1ED] px-2.5 py-1 rounded-full"
                  >
                    <i class="pi pi-clock text-[10px] text-primary"></i>
                    {{ day.time }}
                  </span>
                  <NuxtLink
                    :to="setupPath"
                    class="text-[13px] font-semibold text-header inline-flex items-center gap-1 hover:text-primary"
                  >
                    Edit Day
                    <i class="pi pi-chevron-right text-[10px]"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="px-4 md2:px-5 py-4 md2:flex md2:items-center md2:gap-4">
              <div
                class="relative w-full h-[140px] md2:w-[160px] md2:h-[96px] rounded-xl overflow-hidden shrink-0 bg-greybg"
              >
                <img
                  :src="day.image"
                  :alt="day.space"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div class="mt-3 md2:mt-0 flex-1 min-w-0">
                <p class="text-[15px] font-bold text-header">{{ day.space }}</p>
                <p class="mt-1 text-[12px] text-bodytext">
                  Capacity {{ day.capacity }} · {{ day.setting }}
                </p>
              </div>
              <div class="mt-3 md2:mt-0 text-right shrink-0">
                <p class="text-[18px] font-extrabold text-header">
                  {{ naira(day.spacePrice) }}
                </p>
                <p class="text-[12px] text-bodytext">Full Day Rate</p>
                <p class="mt-1 text-[12px] text-bodytext">{{ day.guests }} guests</p>
              </div>
            </div>

            <div class="px-4 md2:px-5 pb-4">
              <p class="text-[10px] font-semibold tracking-[0.14em] text-bodytext2 uppercase">
                Selected Add-ons for {{ day.short }}
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="addon in day.addons"
                  :key="addon.label"
                  class="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[12px] text-header"
                >
                  {{ addon.label }}
                  <span class="ml-1 font-semibold">{{ addon.price }}</span>
                </span>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-[13px] text-bodytext">{{ day.short }} Total</span>
                <span class="text-[16px] font-extrabold text-header">
                  {{ naira(day.total) }}+
                </span>
              </div>
            </div>
          </article>
        </div>

        <aside
          class="mt-6 md2:mt-0 md2:w-[300px] md2:shrink-0 bg-white rounded-[20px] border border-border p-5 md2:sticky md2:top-24"
        >
          <h2 class="text-[16px] font-bold text-header">Pricing Breakdown</h2>
          <div class="mt-4 space-y-3 text-[13px]">
            <div class="flex justify-between gap-3">
              <span class="text-bodytext">Day 1 (Spaces & Add-ons)</span>
              <span class="font-semibold text-header">{{ naira(15960000) }}</span>
            </div>
            <div class="flex justify-between gap-3">
              <span class="text-bodytext">Day 2 (Spaces & Add-ons)</span>
              <span class="font-semibold text-header">{{ naira(11445000) }}</span>
            </div>
            <div class="flex justify-between gap-3">
              <span class="text-bodytext">Staff Gratuity (Est.)</span>
              <span class="font-semibold text-header">{{ naira(1800000) }}</span>
            </div>
          </div>

          <div class="mt-5 pt-4 border-t border-border">
            <p class="text-[12px] text-bodytext">Proposed Total</p>
            <p class="mt-1 text-[26px] font-extrabold text-header leading-none">
              {{ naira(23205000) }}+
            </p>
            <div class="mt-3 flex justify-between text-[12px]">
              <span class="text-bodytext">VAT (7.5%)</span>
              <span class="font-medium text-header">{{ naira(1740375) }}</span>
            </div>
            <div class="mt-2 flex justify-between text-[13px]">
              <span class="font-semibold text-header">Total incl. VAT</span>
              <span class="font-extrabold text-header">{{ naira(24945375) }}+</span>
            </div>
            <p class="mt-4 text-[22px] font-extrabold text-header">
              {{ naira(12472688) }}
            </p>
            <button
              type="button"
              class="mt-4 w-full h-11 rounded-full bg-brand-gradient-soft text-white text-[13px] font-semibold inline-flex items-center justify-center gap-2"
              @click="sent = true"
            >
              Submit Booking Proposal
              <i class="pi pi-send text-[11px]"></i>
            </button>
          </div>
        </aside>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="sent"
        class="fixed z-[70] top-[64px] left-0 right-0 bottom-0 md2:left-[248px] bg-[#F3F4F6]/90 overflow-y-auto"
      >
        <div class="min-h-full px-4 py-8 flex justify-center">
          <div class="w-full max-w-[640px]">
            <nav class="text-[13px] text-bodytext flex flex-wrap items-center gap-1.5 mb-5">
              <NuxtLink to="/discover" class="hover:text-header">Venues</NuxtLink>
              <span class="text-bodytext2">›</span>
              <span>{{ venue.name }}</span>
              <span class="text-bodytext2">›</span>
              <span class="text-header font-medium">Proposal Sent</span>
            </nav>

            <div
              class="relative bg-white rounded-[28px] border border-border shadow-[0_16px_40px_rgba(17,24,39,0.08)] px-5 py-8 md2:px-10 md2:py-10 overflow-hidden"
            >
              <span
                v-for="dot in confetti"
                :key="dot.id"
                class="absolute rounded-sm"
                :style="{
                  top: dot.top,
                  left: dot.left,
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  transform: `rotate(${dot.rotate}deg)`,
                  opacity: 0.85,
                }"
              ></span>

              <div class="relative text-center">
                <div
                  class="mx-auto w-14 h-14 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-sm"
                >
                  <i class="pi pi-check text-xl font-bold"></i>
                </div>
                <h2 class="mt-4 text-[22px] md2:text-[26px] font-extrabold text-header">
                  Proposal Sent Successfully! 🎉
                </h2>
                <p class="mt-2 text-[14px] text-bodytext">
                  Your multi-day booking request for
                  <span class="font-semibold text-header">{{ venue.name }}</span>
                  has been sent for review.
                </p>
              </div>

              <div class="relative mt-6 rounded-2xl border border-border bg-[#F9FAFB] p-4">
                <div class="flex gap-3">
                  <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-greybg">
                    <img
                      src="/images/grand-atrium.jpg"
                      :alt="venue.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p class="text-[14px] font-bold text-header">{{ venue.name }}</p>
                    <p class="text-[12px] text-bodytext">Premium Event Space</p>
                  </div>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                  <div>
                    <p class="text-[11px] text-bodytext2">Event</p>
                    <p class="font-semibold text-header">{{ shortEventName }}</p>
                  </div>
                  <div>
                    <p class="text-[11px] text-bodytext2">Space</p>
                    <p class="font-semibold text-header">2 days · Aug 24–25, 2024</p>
                  </div>
                  <div>
                    <p class="text-[11px] text-bodytext2">Day 1</p>
                    <p class="font-medium text-header">Grand Ballroom · 10AM–10PM</p>
                  </div>
                  <div>
                    <p class="text-[11px] text-bodytext2">Day 2</p>
                    <p class="font-medium text-header">Rooftop Terrace · 4PM–11PM</p>
                  </div>
                  <div>
                    <p class="text-[11px] text-bodytext2">Add-ons</p>
                    <p class="font-medium text-header">21 selections across both days</p>
                  </div>
                  <div>
                    <p class="text-[11px] text-bodytext2">Proposal Total</p>
                    <p class="font-extrabold text-header">₦23,205,000+</p>
                  </div>
                </div>
                <div
                  class="mt-4 pt-3 border-t border-border flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 text-[12px] font-semibold text-header"
                    @click="copyRef"
                  >
                    VEN-2024-PROP-00847
                    <i class="pi text-[11px]" :class="copied ? 'pi-check text-[#22C55E]' : 'pi-copy'"></i>
                  </button>
                  <span class="text-[12px] text-bodytext2">Submitted 24 Aug 2024</span>
                </div>
              </div>

              <div class="relative mt-6">
                <p class="text-[11px] font-semibold tracking-[0.16em] text-bodytext2 uppercase">
                  Next Steps
                </p>
                <div class="mt-4 space-y-5">
                  <div class="flex gap-3">
                    <span
                      class="shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-[#FFF1ED] text-primary text-[10px] font-semibold"
                    >
                      Within 24 hours
                    </span>
                    <div class="flex gap-3 min-w-0">
                      <span
                        class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                      >
                        1
                      </span>
                      <div>
                        <p class="text-[14px] font-bold text-header">Owner Review</p>
                        <p class="mt-0.5 text-[13px] text-bodytext">
                          The venue owner will review your 2-day proposal.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <span class="shrink-0 w-[118px] text-[11px] text-bodytext leading-snug">
                      50% deposit — ₦12,472,688 — due within 48 hours
                    </span>
                    <div class="flex gap-3 min-w-0">
                      <span
                        class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                      >
                        2
                      </span>
                      <div>
                        <p class="text-[14px] font-bold text-header">Secure Deposit</p>
                        <p class="mt-0.5 text-[13px] text-bodytext">After approval</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <span class="shrink-0 w-[118px]"></span>
                    <div class="flex gap-3 min-w-0">
                      <span
                        class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                      >
                        3
                      </span>
                      <div>
                        <p class="text-[14px] font-bold text-header">Booking Confirmed</p>
                        <p class="mt-0.5 text-[13px] text-bodytext">
                          Both days lock in once deposit is processed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="relative mt-8 flex flex-col md2:flex-row gap-3 justify-center">
                <NuxtLink
                  to="/bookings"
                  class="h-11 px-5 rounded-full bg-brand-gradient-soft text-white text-[13px] font-semibold inline-flex items-center justify-center"
                >
                  Go to My Bookings
                </NuxtLink>
                <NuxtLink
                  to="/discover"
                  class="h-11 px-5 rounded-full border border-border bg-white text-[13px] font-semibold text-header inline-flex items-center justify-center"
                >
                  Browse More Venues
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
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

const eventName = computed(
  () =>
    (route.query.eventName && String(route.query.eventName)) ||
    "Okonkwo-Adeyemi Wedding Celebration"
);

const query = computed(() => ({
  venue: venue.value.name,
  location: venue.value.location,
  slug: route.query.slug || "the-grand-pavilion",
  ...(route.query.eventName ? { eventName: route.query.eventName } : {}),
}));

const venuePath = computed(() => ({
  path: `/discover/${query.value.slug}`,
  query: {
    venue: query.value.venue,
    location: query.value.location,
  },
}));

const setupPath = computed(() => ({
  path: "/discover/setup",
  query: query.value,
}));

useHead({ title: "Review & Submit Proposal" });

const sent = ref(false);
const copied = ref(false);

const shortEventName = computed(() => {
  const name = eventName.value.replace(" Celebration", "");
  return name.length > 28 ? `${name.slice(0, 26)}…` : name;
});

const confetti = [
  { id: 1, top: "18px", left: "12%", size: "7px", color: "#FF4D17", rotate: 20 },
  { id: 2, top: "36px", left: "22%", size: "5px", color: "#F5A524", rotate: -15 },
  { id: 3, top: "24px", left: "78%", size: "8px", color: "#FF5C7A", rotate: 40 },
  { id: 4, top: "52px", left: "78%", size: "6px", color: "#22C55E", rotate: 10 },
  { id: 5, top: "70px", left: "14%", size: "5px", color: "#FF8A00", rotate: 55 },
  { id: 6, top: "14px", left: "62%", size: "6px", color: "#FF4D17", rotate: -25 },
  { id: 7, top: "88px", left: "84%", size: "5px", color: "#F5A524", rotate: 8 },
  { id: 8, top: "42px", left: "8%", size: "4px", color: "#34D399", rotate: 30 },
];

async function copyRef() {
  try {
    await navigator.clipboard.writeText("VEN-2024-PROP-00847");
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch {
    copied.value = false;
  }
}

const days = [
  {
    id: "d1",
    short: "Day 1",
    title: "Day 1: Grand Celebration",
    dateLabel: "Saturday, 24 August 2024",
    time: "10:00 AM – 10:00 PM",
    image: "/images/meridian-ballroom.jpg",
    space: "Grand Ballroom",
    capacity: 500,
    setting: "Indoor",
    spacePrice: 1200000,
    guests: 300,
    addons: [
      { label: "Premium Seating", price: "₦150k" },
      { label: "Stage Setup", price: "₦200k" },
      { label: "AV Package", price: "₦150k" },
    ],
    total: 15960000,
  },
  {
    id: "d2",
    short: "Day 2",
    title: "Day 2: Evening Reception",
    dateLabel: "Sunday, 25 August 2024",
    time: "4:00 PM – 12:00 AM",
    image: "/images/grand-atrium.jpg",
    space: "Grand Ballroom",
    capacity: 500,
    setting: "Indoor",
    spacePrice: 1200000,
    guests: 150,
    addons: [
      { label: "Premium Seating", price: "₦150k" },
      { label: "Stage Setup", price: "₦200k" },
      { label: "AV Package", price: "₦150k" },
    ],
    total: 11445000,
  },
];

function naira(value) {
  return `₦${Number(value).toLocaleString("en-NG")}`;
}
</script>
