<template>
  <section id="available-spaces" class="scroll-mt-24">
    <h2 class="text-[20px] font-bold text-header">Available Spaces</h2>
    <div class="mt-5 space-y-4">
      <template v-for="space in spaces" :key="space.id">
        <DiscoverVenueSpaceDetail
          v-if="space.id === selectedId"
          :space="space"
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
              v-for="item in amenities"
              :key="item.label"
              class="bg-[#F3F4F6] rounded-xl px-4 py-4 min-h-[92px]"
            >
              <i :class="['pi text-primary text-[14px]', item.icon]"></i>
              <p class="mt-2 text-[13px] font-medium text-header leading-snug">
                {{ item.label }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
const selectedId = ref("grand-atrium");

const spaces = [
  {
    id: "grand-ballroom",
    name: "Grand Ballroom",
    hall: "Grand Ballroom",
    floor: "First Floor",
    building: "Main Building",
    guests: 500,
    image: "/images/meridian-ballroom.jpg",
    photos: [
      "/images/meridian-ballroom.jpg",
      "/images/grand-atrium.jpg",
      "/images/skyline-conference.jpg",
      "/images/cat-wedding.jpg",
      "/images/monarch-event.jpg",
      "/images/aurora-rooftop.jpg",
      "/images/harbour-view.jpg",
      "/images/palm-court.jpg",
    ],
    tags: ["24/7 Power", "Air Conditioning", "Pro Sound"],
    description:
      "A column-free ballroom with crystal lighting, a built-in stage, and a dedicated dance floor.",
    fullDay: 850000,
    fromHour: 15000,
    minHours: 4,
    minSpend: 180000,
    cleaningFee: 15000,
  },
  {
    id: "grand-atrium",
    name: "Grand Atrium",
    hall: "Main Hall",
    floor: "Ground Floor",
    building: "Main Building",
    guests: 800,
    image: "/images/grand-atrium.jpg",
    photos: [
      "/images/grand-atrium.jpg",
      "/images/meridian-ballroom.jpg",
      "/images/skyline-conference.jpg",
      "/images/cat-wedding.jpg",
      "/images/monarch-event.jpg",
      "/images/aurora-rooftop.jpg",
      "/images/harbour-view.jpg",
      "/images/palm-court.jpg",
    ],
    tags: ["Column-lined", "6m ceilings", "Built-in stage"],
    description:
      "A grand column-lined ballroom with 6-metre ceilings, a built-in stage, and a dedicated dance floor.",
    fullDay: 360000,
    fromHour: 45000,
    minHours: 4,
    minSpend: 180000,
    cleaningFee: 15000,
  },
  {
    id: "sunset-garden",
    name: "Sunset Garden",
    hall: "Sunset Garden",
    floor: "Outdoor",
    building: "Garden Wing",
    guests: 300,
    image: "/images/palm-court.jpg",
    photos: [
      "/images/palm-court.jpg",
      "/images/aurora-rooftop.jpg",
      "/images/cat-outdoor.jpg",
      "/images/harbour-view.jpg",
      "/images/grand-atrium.jpg",
      "/images/meridian-ballroom.jpg",
      "/images/dest-lagos.jpg",
      "/images/cat-wedding.jpg",
    ],
    tags: ["Outdoor Ambience", "Mood Lighting"],
    description:
      "An open-air garden terrace with palm lighting, lounge seating, and evening city views.",
    fullDay: 180000,
    fromHour: 10000,
    minHours: 4,
    minSpend: 80000,
    cleaningFee: 10000,
  },
  {
    id: "glass-pavilion",
    name: "The Glass Pavilion",
    hall: "Glass Pavilion",
    floor: "First Floor",
    building: "East Wing",
    guests: 200,
    image: "/images/harbour-view.jpg",
    photos: [
      "/images/harbour-view.jpg",
      "/images/skyline-conference.jpg",
      "/images/aurora-rooftop.jpg",
      "/images/grand-atrium.jpg",
      "/images/meridian-ballroom.jpg",
      "/images/palm-court.jpg",
      "/images/cat-conference.jpg",
      "/images/dest-lagos.jpg",
    ],
    tags: ["Panoramic Views", "Climate Control"],
    description:
      "A glass-walled pavilion with panoramic views, climate control, and flexible seating.",
    fullDay: 280000,
    fromHour: 12000,
    minHours: 4,
    minSpend: 100000,
    cleaningFee: 12000,
  },
];

const amenities = [
  { label: "Stage & podium", icon: "pi-desktop" },
  { label: "LED lighting", icon: "pi-sun" },
  { label: "House sound (3000W)", icon: "pi-volume-up" },
  { label: "4K projector + 12ft screen", icon: "pi-video" },
  { label: "Dedicated Wi-Fi node", icon: "pi-wifi" },
  { label: "Private bar area", icon: "pi-inbox" },
  { label: "Dedicated coordinator", icon: "pi-user" },
  { label: "Adjacent bathrooms", icon: "pi-home" },
  { label: "Direct loading bay access", icon: "pi-truck" },
];
</script>
