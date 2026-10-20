<template>
  <article>
    <div class="md2:grid md2:grid-cols-[minmax(0,1fr)_340px] md2:gap-6 md2:items-start">
      <div>
        <div class="relative h-[220px] md2:h-[248px] rounded-2xl overflow-hidden bg-greybg">
          <img
            :src="space.photos[photoIndex]"
            :alt="space.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div
            class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 text-white text-[12px] font-semibold"
          >
            {{ photoIndex + 1 }} / {{ space.photos.length }} {{ space.name }}
          </div>
          <button
            type="button"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6B7280] hover:text-primary"
            aria-label="Save space"
          >
            <i class="pi pi-heart text-sm"></i>
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
          <span class="font-bold text-header">{{ space.hall }}</span>
          <span class="text-bodytext2">·</span>
          <span class="text-bodytext">{{ space.floor }}</span>
          <span class="text-bodytext2">·</span>
          <span class="text-bodytext">{{ space.building }}</span>
        </div>
        <p class="mt-2 text-[13px] text-bodytext leading-relaxed">
          {{ space.description }}
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
            <p class="text-[16px] font-bold text-header">{{ space.hall }}</p>
          </div>
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EAF8F0] text-[#16A34A] text-[11px] font-semibold"
          >
            Available
          </span>
        </div>

        <p class="mt-5 text-[13px] font-semibold text-header">{{ space.hall }} Pricing</p>
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
            {{ naira(activeRate)
            }}<span class="text-[13px] font-medium text-bodytext">
              / {{ pricingTab === "hour" ? "hour" : pricingTab === "day" ? "day" : "pkg" }}
            </span>
          </p>
          <div class="text-right text-[12px] text-bodytext space-y-0.5">
            <p>
              Min. hrs:
              <span class="font-semibold text-header">{{ space.minHours }}</span>
            </p>
            <p>
              Min. spend:
              <span class="font-semibold text-primary">{{ naira(space.minSpend) }}</span>
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
            <dt class="text-bodytext">{{ hours }} hours ×</dt>
            <dd class="font-medium text-header">{{ naira(hoursTotal) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">Cleaning fee</dt>
            <dd class="font-medium text-header">{{ naira(space.cleaningFee) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">Subtotal</dt>
            <dd class="font-medium text-header">{{ naira(subtotal) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">Venpadi fee (5%)</dt>
            <dd class="font-medium text-header">{{ naira(serviceFee) }}</dd>
          </div>
          <div class="flex justify-between gap-3 pt-2 border-t border-border">
            <dt class="font-semibold text-header">Total estimate:</dt>
            <dd class="font-extrabold text-header">{{ naira(total) }}</dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-bodytext">
              Venpadi Pay
              <span class="block text-[11px] text-bodytext2">(4 installments)</span>
            </dt>
            <dd class="font-semibold text-header">{{ naira(installment) }}</dd>
          </div>
        </dl>

        <div
          class="mt-4 rounded-xl bg-[#FFF6F0] px-3 py-2.5 text-[12px] text-header leading-relaxed"
        >
          <span class="font-semibold text-primary">Weekend rate applies.</span>
          Weekday rate {{ naira(35000) }}/hr. Save {{ naira(40000) }} by booking a
          weekday.
        </div>

        <button
          type="button"
          class="mt-4 w-full h-11 rounded-full bg-primary text-white text-[13px] font-semibold hover:bg-primary-dark"
          @click="goToSetup({ space: space.hall })"
        >
          Select this Space
        </button>
        <button
          type="button"
          class="mt-2 w-full h-11 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg"
          @click="goToSetup({ space: space.hall })"
        >
          Check Availability
        </button>
      </aside>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  space: { type: Object, required: true },
});

const route = useRoute();

function goToSetup(extra = {}) {
  return navigateTo({
    path: "/discover/setup",
    query: {
      venue: route.query.venue || "The Grand Pavilion",
      location: route.query.location || "Victoria Island, Lagos",
      slug: route.params.slug || "the-grand-pavilion",
      ...extra,
    },
  });
}

const photoIndex = ref(0);
const selectedLayout = ref("theatre");
const pricingTab = ref("hour");
const hours = ref(8);
const hourOptions = [4, 6, 8, 10, 12];

const pricingTabs = [
  { id: "hour", label: "By Hour" },
  { id: "day", label: "By Day" },
  { id: "package", label: "By Package" },
];

const layouts = [
  {
    id: "theatre",
    name: "Theatre",
    seats: "800 seats",
    capacity: 500,
    dots: [[4, 3], [8, 3], [12, 3], [16, 3], [20, 3], [24, 3], [6, 8], [10, 8], [14, 8], [18, 8], [22, 8], [8, 13], [12, 13], [16, 13], [20, 13]],
  },
  {
    id: "banquet",
    name: "Banquet / Gala",
    seats: "",
    capacity: 400,
    dots: [[6, 4], [10, 4], [8, 8], [18, 4], [22, 4], [20, 8], [6, 12], [10, 12], [18, 12], [22, 12]],
  },
  {
    id: "cabaret",
    name: "Cabaret",
    seats: "",
    capacity: 250,
    dots: [[8, 4], [12, 4], [16, 4], [20, 4], [6, 9], [10, 9], [18, 9], [22, 9], [10, 14], [18, 14]],
  },
  {
    id: "boardroom",
    name: "Boardroom",
    seats: "50 seats",
    capacity: 50,
    dots: [[8, 3], [12, 3], [16, 3], [20, 3], [6, 8], [22, 8], [8, 13], [12, 13], [16, 13], [20, 13]],
  },
  {
    id: "standing",
    name: "Standing",
    seats: "80 pax",
    capacity: 900,
    dots: [[5, 4], [10, 4], [15, 4], [20, 4], [25, 4], [7, 9], [13, 9], [19, 9], [24, 9], [10, 14], [16, 14], [22, 14]],
  },
  {
    id: "exhibition",
    name: "Exhibition",
    seats: "",
    capacity: 600,
    dots: [[5, 4], [11, 4], [17, 4], [23, 4], [5, 10], [11, 10], [17, 10], [23, 10]],
  },
  {
    id: "classroom",
    name: "Classroom",
    seats: "",
    capacity: 300,
    dots: [[6, 3], [11, 3], [16, 3], [21, 3], [6, 8], [11, 8], [16, 8], [21, 8], [6, 13], [11, 13], [16, 13], [21, 13]],
  },
  {
    id: "ushape",
    name: "U-Shape",
    seats: "",
    capacity: 80,
    dots: [[6, 3], [6, 8], [6, 13], [11, 13], [16, 13], [21, 13], [21, 8], [21, 3]],
  },
];

const specs = [
  { label: "Floor Size", value: "2,400 sq ft", icon: "pi-th-large" },
  { label: "Dimensions", value: "34m × 18m", icon: "pi-arrows-h" },
  { label: "Ceiling", value: "6.0 metres", icon: "pi-sort-alt" },
  { label: "Natural Light", value: "Full (South windows)", icon: "pi-sun" },
  { label: "Entrances", value: "2 (Main, side, service)", icon: "pi-sign-in" },
  { label: "Accessibility", value: "Fully step-free", icon: "pi-user" },
  { label: "Climate", value: "Zoned central AC", icon: "pi-cloud" },
  { label: "Acoustics", value: "Professionally treated", icon: "pi-volume-up" },
  { label: "A/V Built-in", value: "Yes — full rig", icon: "pi-desktop" },
];

const currentLayout = computed(
  () => layouts.find((l) => l.id === selectedLayout.value) || layouts[0]
);

const activeRate = computed(() => {
  if (pricingTab.value === "day") return props.space.minSpend;
  if (pricingTab.value === "package") return 250000;
  return props.space.fromHour;
});

const hoursTotal = computed(() => {
  if (pricingTab.value === "day") return props.space.minSpend;
  if (pricingTab.value === "package") return 250000;
  return props.space.fromHour * hours.value;
});

const subtotal = computed(() => hoursTotal.value + props.space.cleaningFee);
const serviceFee = computed(() => Math.round(subtotal.value * 0.05));
const total = computed(() => subtotal.value + serviceFee.value);
const installment = computed(() => Math.round(total.value / 4));

const endTime = computed(() => {
  const end = 16 + hours.value;
  const hour24 = end % 24;
  const suffix = hour24 >= 12 && hour24 !== 24 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00 ${suffix}`;
});

function naira(value) {
  return `₦${Number(value).toLocaleString("en-NG")}`;
}

function prevPhoto() {
  photoIndex.value =
    (photoIndex.value - 1 + props.space.photos.length) % props.space.photos.length;
}

function nextPhoto() {
  photoIndex.value = (photoIndex.value + 1) % props.space.photos.length;
}
</script>
