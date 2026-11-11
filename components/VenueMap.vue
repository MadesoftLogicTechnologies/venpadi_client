<template>
  <!-- WP4: a Google map with one marker per venue that has coordinates.
       With no GOOGLE_MAPS_API_KEY (or if the script fails to load) there is
       no widget at all — never a placeholder or a stock picture of a map —
       just each venue's address and an "Open in Google Maps" link, or nothing
       when `fallback` is false (the page already shows the address). -->
  <div v-if="useWidget" ref="mapEl" class="w-full h-full" :class="mapClass" role="region" aria-label="Map"></div>
  <ul v-else-if="fallback && points.length" class="divide-y divide-border">
    <li v-for="p in points" :key="p.id" class="py-3 flex items-start gap-3">
      <i class="pi pi-map-marker text-primary text-[13px] mt-0.5"></i>
      <div class="min-w-0 flex-1">
        <NuxtLink v-if="p.to" :to="p.to" class="block text-[13px] font-semibold text-header hover:text-primary truncate">
          {{ p.title }}
        </NuxtLink>
        <p v-else class="text-[13px] font-semibold text-header truncate">{{ p.title }}</p>
        <p v-if="p.subtitle" class="text-[12px] text-bodytext truncate">{{ p.subtitle }}</p>
        <a
          :href="mapsSearchUrl(p)"
          target="_blank"
          rel="noopener"
          class="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-primary"
        >
          Open in Google Maps <i class="pi pi-external-link text-[9px]"></i>
        </a>
      </div>
    </li>
  </ul>
</template>

<script setup>
/*
 *   <VenueMap :markers="[{ id, lat, lng, title, subtitle, to }]" class="h-[400px]" />
 *
 * Markers with a null/invalid lat or lng are skipped. Loads the Maps JS API
 * once per page by script tag with runtimeConfig.public.GOOGLE_MAPS_API_KEY
 * (a browser key restricted to this portal's domain).
 */
const props = defineProps({
  markers: { type: Array, default: () => [] },
  // Zoom for a single marker; several markers fit their bounds.
  zoom: { type: Number, default: 15 },
  // Show the address + link list when there is no map.
  fallback: { type: Boolean, default: true },
  mapClass: { type: String, default: "" },
});

const router = useRouter();
const key = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY || "";
const failed = ref(false);
const useWidget = computed(() => !!key && !failed.value && points.value.length > 0);
const mapEl = ref(null);

const valid = (n) => n !== null && n !== undefined && n !== "" && Number.isFinite(Number(n));
const points = computed(() =>
  props.markers
    .filter((m) => m && valid(m.lat) && valid(m.lng))
    .map((m, i) => ({ ...m, id: m.id ?? i, lat: Number(m.lat), lng: Number(m.lng) }))
);

const mapsSearchUrl = (p) => `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;

let map = null;
let drawn = [];
let info = null;

function draw() {
  const g = window.google?.maps;
  if (!g || !mapEl.value) return;
  if (!map) {
    map = new g.Map(mapEl.value, { mapTypeControl: false, streetViewControl: false, fullscreenControl: false });
    info = new g.InfoWindow();
  }
  drawn.forEach((m) => m.setMap(null));
  drawn = points.value.map((p) => {
    const marker = new g.Marker({ position: { lat: p.lat, lng: p.lng }, map, title: p.title || "" });
    marker.addListener("click", () => {
      const box = document.createElement("div");
      box.style.cssText = "font:13px/1.4 sans-serif;max-width:220px";
      const title = document.createElement(p.to ? "a" : "strong");
      title.textContent = p.title || "";
      if (p.to) {
        title.href = router.resolve(p.to).href;
        title.style.cssText = "font-weight:600;color:#111827";
        title.addEventListener("click", (e) => {
          e.preventDefault();
          navigateTo(p.to);
        });
      }
      box.appendChild(title);
      if (p.subtitle) {
        const sub = document.createElement("div");
        sub.textContent = p.subtitle;
        sub.style.color = "#6B7280";
        box.appendChild(sub);
      }
      info.setContent(box);
      info.open({ map, anchor: marker });
    });
    return marker;
  });
  if (points.value.length === 1) {
    map.setCenter({ lat: points.value[0].lat, lng: points.value[0].lng });
    map.setZoom(props.zoom);
  } else if (points.value.length > 1) {
    const bounds = new g.LatLngBounds();
    points.value.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
    map.fitBounds(bounds, 48);
  }
}

onMounted(async () => {
  if (!key) return;
  try {
    await loadGoogleMaps(key);
    await nextTick();
    draw();
  } catch {
    failed.value = true; // bad key / blocked script: fall back to the links
  }
});

// The element is re-created when the widget toggles (e.g. markers arrive
// after mount), so a new element needs a new map.
watch(mapEl, (el, old) => {
  if (el && el !== old) {
    map = null;
    drawn = [];
    if (window.google?.maps) draw();
  }
});
watch(points, () => {
  if (map) draw();
});
onBeforeUnmount(() => {
  drawn.forEach((m) => m.setMap(null));
  drawn = [];
  map = null;
});
</script>

<script>
// One script tag per page load, shared by every <VenueMap>.
let loading = null;
function loadGoogleMaps(apiKey) {
  if (window.google?.maps?.Map) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const cb = "__venpadiMapsReady";
    window[cb] = () => {
      delete window[cb];
      resolve();
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&callback=${cb}`;
    s.async = true;
    s.onerror = () => {
      loading = null;
      s.remove();
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}
</script>
