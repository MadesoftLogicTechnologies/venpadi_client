<template>
  <section>
    <nav class="text-[13px] text-bodytext flex flex-wrap items-center gap-1.5">
      <NuxtLink to="/discover" class="hover:text-header">Venues</NuxtLink>
      <span class="text-bodytext2">›</span>
      <span>{{ venue.name }}</span>
      <span class="text-bodytext2">›</span>
      <span class="text-header font-medium">{{ selectedSpace?.name }}</span>
    </nav>

    <div class="mt-3 md2:mt-4 flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h1 class="text-[28px] md2:text-[32px] leading-tight font-extrabold text-header tracking-tight">
          {{ venue.name }}
        </h1>
        <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
          <span class="inline-flex items-center gap-1.5 text-header">
            <i class="pi pi-star-fill text-[#F5A524] text-[11px]"></i>
            <span class="font-semibold">{{ ratingText }}</span>
            <span class="text-bodytext">({{ venue.reviewCount ?? 0 }} reviews)</span>
          </span>
          <span class="inline-flex items-center gap-1.5 text-bodytext">
            <i class="pi pi-map-marker text-[11px]"></i>
            {{ venue.location?.label }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0 pt-1">
        <button
          type="button"
          class="text-[#6B7280] hover:text-header"
          aria-label="Share"
          @click="share"
        >
          <i class="pi pi-share-alt text-[15px]"></i>
        </button>
        <button
          type="button"
          class="text-[#6B7280] hover:text-primary"
          aria-label="Save"
          :disabled="isBusy(venue.id)"
          @click="toggle(venue.id)"
        >
          <i class="pi pi-heart text-[15px]" :class="{ 'text-primary': isSaved(venue.id) }"></i>
        </button>
      </div>
    </div>

    <div
      class="mt-4 md2:mt-5 grid grid-cols-1 md2:grid-cols-2 md2:grid-rows-2 gap-2 h-[240px] md2:h-[412px] rounded-2xl overflow-hidden"
    >
      <button
        type="button"
        class="relative overflow-hidden md2:row-span-2"
        @click="photosOpen = true"
      >
        <img
          :src="gallery[0]"
          :alt="venue.name"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </button>
      <div class="hidden md2:grid md2:grid-cols-2 md2:grid-rows-2 md2:gap-2 md2:row-span-2 h-full">
        <button
          v-for="(src, i) in gallery.slice(1, 5)"
          :key="`${src}-${i}`"
          type="button"
          class="relative overflow-hidden min-h-0"
          @click="photosOpen = true"
        >
          <img :src="src" alt="" class="absolute inset-0 w-full h-full object-cover" />
          <div
            v-if="i === 3"
            class="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <span class="text-white text-[13px] font-semibold">
              Show all photos
            </span>
          </div>
        </button>
      </div>
    </div>

    <div class="mt-6 md2:mt-7 md2:flex md2:items-start md2:gap-8">
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap gap-x-10 gap-y-4">
          <div class="flex items-start gap-2.5">
            <i class="pi pi-users text-[#9CA3AF] text-sm mt-0.5"></i>
            <div>
              <p class="text-[12px] text-bodytext">Capacity</p>
              <p class="text-[13px] font-semibold text-header">{{ capacityText }}</p>
            </div>
          </div>
          <div class="flex items-start gap-2.5">
            <i class="pi pi-expand text-[#9CA3AF] text-sm mt-0.5"></i>
            <div>
              <p class="text-[12px] text-bodytext">Size</p>
              <p class="text-[13px] font-semibold text-header">{{ venue.keyFacts?.floorArea || "—" }}</p>
            </div>
          </div>
          <div class="flex items-start gap-2.5">
            <i class="pi pi-bolt text-[#9CA3AF] text-sm mt-0.5"></i>
            <div>
              <p class="text-[12px] text-bodytext">Booking</p>
              <p class="text-[13px] font-semibold text-header">{{ venue.keyFacts?.bookingMode || "—" }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 md2:mt-8 flex items-center gap-3">
          <span class="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-greybg">
            <img
              :src="venue.host?.logoUrl || '/images/meridian-ballroom.jpg'"
              alt=""
              class="w-full h-full object-cover"
            />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold text-header">
              Managed by {{ venue.host?.displayName || "—" }}
            </p>
            <p class="text-[12px] text-bodytext mt-0.5">
              {{ hostMeta }}
            </p>
          </div>
          <span v-if="venue.host?.superhost" class="text-[13px] font-semibold text-primary shrink-0">
            Superhost
          </span>
        </div>
      </div>

      <aside
        class="mt-6 md2:mt-0 md2:w-[300px] md2:shrink-0 bg-white rounded-2xl border border-border shadow-[0_8px_24px_rgba(17,24,39,0.06)] p-5"
      >
        <p class="text-[26px] leading-none font-extrabold text-header tracking-tight">
          {{ headlinePrice }}
          <span class="text-[13px] font-medium text-bodytext">/{{ headlineUnit }}</span>
        </p>
        <button
          type="button"
          class="mt-4 w-full h-11 rounded-xl bg-primary text-white text-[13px] font-semibold hover:bg-primary-dark"
          @click="$emit('select-date')"
        >
          Continue to Select Date
        </button>
        <p class="mt-2 text-center text-[11px] text-bodytext2">
          You won’t be charged yet
        </p>
        <div class="mt-4 space-y-2 text-[13px]">
          <div class="flex justify-between gap-3">
            <span class="text-bodytext">Cleaning fee</span>
            <span class="font-medium text-header">{{ money(venue.fees?.cleaningFeeMinor) }}</span>
          </div>
          <div class="flex justify-between gap-3">
            <span class="text-bodytext">Venpadi service fee</span>
            <span class="font-medium text-header">{{ serviceFeeText }}</span>
          </div>
        </div>
      </aside>
    </div>

    <div class="mt-8 md2:mt-10">
      <h2 class="text-[18px] font-bold text-header">About this venue</h2>
      <div class="mt-3 space-y-3 text-[14px] text-bodytext leading-relaxed max-w-[760px]">
        <p v-for="(para, i) in shownParagraphs" :key="i">
          {{ para }}
        </p>
      </div>
      <button
        type="button"
        class="mt-2 text-[14px] font-semibold text-header underline underline-offset-2 hover:text-primary"
        @click="expanded = !expanded"
      >
        Read more
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="photosOpen"
        class="fixed inset-0 z-[80] bg-black/80 overflow-y-auto"
        @click.self="photosOpen = false"
      >
        <div class="max-w-5xl mx-auto px-4 py-8">
          <div class="flex justify-between items-center mb-4">
            <p class="text-white font-semibold">All photos</p>
            <button
              type="button"
              class="text-white/80 hover:text-white"
              @click="photosOpen = false"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
          <div class="grid grid-cols-1 md2:grid-cols-2 gap-3">
            <img
              v-for="src in gallery"
              :key="src"
              :src="src"
              alt=""
              class="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, required: true },
  selectedSpace: { type: Object, default: null },
});

defineEmits(["select-date"]);

const photosOpen = ref(false);
const expanded = ref(false);
const { isSaved, isBusy, toggle } = useFavorites();

const gallery = computed(() => (props.venue.gallery ?? []).map((p) => p.url).filter(Boolean));

const money = (minor) => (minor === null || minor === undefined ? "—" : naira(minor));

const ratingText = computed(() =>
  props.venue.ratingAvg !== null && props.venue.ratingAvg !== undefined ? Number(props.venue.ratingAvg).toFixed(1) : "—",
);

const capacityText = computed(() => {
  const c = props.venue.keyFacts?.maxCapacity;
  return c ? `Up to ${Number(c).toLocaleString("en-US")}` : "—";
});

const headlinePrice = computed(() => money(props.venue.fromHourlyMinor ?? props.venue.fromDayMinor));
const headlineUnit = computed(() =>
  props.venue.fromHourlyMinor === null || props.venue.fromHourlyMinor === undefined
    ? props.venue.fromDayMinor === null || props.venue.fromDayMinor === undefined
      ? "hour"
      : "day"
    : "hour",
);

const serviceFeeText = computed(() => {
  const bps = props.venue.fees?.serviceFeeBps;
  return bps === null || bps === undefined ? "—" : `${pct(bps / 100, 1)} of booking`;
});

const hostMeta = computed(() => {
  const h = props.venue.host;
  if (!h) return "—";
  const parts = [];
  if (h.superhost) parts.push("Superhost");
  else if (h.verified) parts.push("Verified");
  if (h.yearsHosting) parts.push(`${h.yearsHosting} ${h.yearsHosting === 1 ? "year" : "years"} hosting`);
  else if (h.hostingSince) parts.push(`Hosting since ${formatMonthYear(h.hostingSince)}`);
  return parts.join(" · ") || "—";
});

// The description is shown as master's paragraphs; "Read more" reveals the rest.
const paragraphs = computed(() =>
  String(props.venue.description || props.venue.tagline || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
);
const shownParagraphs = computed(() => (expanded.value ? paragraphs.value : paragraphs.value.slice(0, 2)));

async function share() {
  const url = window.location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: props.venue.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      notifySuccess("Link copied");
    }
  } catch {
    /* share sheet dismissed */
  }
}
</script>
