<template>
  <section id="available-spaces" class="scroll-mt-24">
    <h2 class="text-[20px] font-bold text-header">Available Spaces</h2>
    <div class="mt-5 space-y-4">
      <template v-for="space in spaces" :key="space.id">
        <DiscoverVenueSpaceDetail
          v-if="space.id === selectedId"
          :space="space"
          :venue="venue"
        />
        <DiscoverVenueSpaceCompact
          v-else
          :space="space"
          @select="selectedId = space.id"
        />

        <div v-if="space.id === selectedId" class="pt-6">
          <h3 class="text-[18px] font-bold text-header">What’s in this space</h3>
          <div class="mt-4 grid grid-cols-2 md2:grid-cols-3 gap-3">
            <div
              v-for="item in spaceAmenities(space)"
              :key="item"
              class="bg-[#F3F4F6] rounded-xl px-4 py-4 min-h-[92px]"
            >
              <i :class="['pi text-primary text-[14px]', iconFor(item)]"></i>
              <p class="mt-2 text-[13px] font-medium text-header leading-snug">
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, required: true },
});

const selectedId = defineModel("selectedId", { type: String, default: "" });

const spaces = computed(() => props.venue.spaces ?? []);

const spaceAmenities = (space) => [...new Set([...(space.amenities ?? []), ...(space.highlights ?? [])])];

/** A best-effort icon from the amenity's wording. */
const ICONS = [
  [/generator|power|inverter/i, "pi-bolt"],
  [/ac|hvac|chiller|climate|cool/i, "pi-cloud"],
  [/audio|sound|pa\b|speaker/i, "pi-volume-up"],
  [/led|screen|projector|av\b|video/i, "pi-desktop"],
  [/light/i, "pi-sun"],
  [/wifi|wi-fi|internet/i, "pi-wifi"],
  [/stage|podium/i, "pi-star"],
  [/kitchen|catering|bar/i, "pi-inbox"],
  [/parking|valet|loading/i, "pi-car"],
  [/suite|vip|lounge|green room/i, "pi-user"],
  [/rest ?room|bathroom|toilet/i, "pi-home"],
  [/security/i, "pi-shield"],
];
const iconFor = (label) => ICONS.find(([re]) => re.test(label))?.[1] ?? "pi-check-circle";
</script>
