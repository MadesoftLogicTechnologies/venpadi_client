<template>
  <section class="bg-white pt-10 pb-12 md2:pt-14 md2:pb-16">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-12 items-center">
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-greybg text-sm text-bodytext mb-5"
          >
            <span class="w-2 h-2 rounded-full bg-primary shrink-0"></span>
            Book venues in 50+ cities worldwide
          </div>

          <h1
            class="text-[2.25rem] sm:text-[2.75rem] md2:text-[3.25rem] leading-[1.1] font-extrabold text-header tracking-tight"
          >
            Book the perfect venue,
            <span class="text-transparent bg-clip-text bg-brand-gradient-soft">
              anywhere in the world.
            </span>
          </h1>

          <p class="mt-5 text-base sm:text-lg text-bodytext max-w-xl leading-relaxed">
            Discover thousands of event venues — from intimate executive
            boardrooms to grand luxury ballrooms. Compare, book, and manage
            everything seamlessly in one unified platform.
          </p>

          <form
            class="mt-8 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-stretch gap-2"
            @submit.prevent="navigateTo('/search')"
          >
            <label
              class="flex-1 flex items-center gap-3 px-3 py-2.5 min-w-0 rounded-xl hover:bg-greybg/80"
            >
              <i class="pi pi-map-marker text-primary text-sm shrink-0"></i>
              <div class="min-w-0 flex-1">
                <span class="block text-[11px] font-semibold text-bodytext2 uppercase tracking-wide">
                  Location
                </span>
                <input
                  v-model="location"
                  type="text"
                  placeholder="City or venue name"
                  class="w-full bg-transparent border-0 outline-none text-sm text-header placeholder:text-bodytext2 p-0"
                />
              </div>
            </label>

            <div class="hidden sm:block w-px bg-border self-stretch my-2"></div>

            <label
              class="flex-1 flex items-center gap-3 px-3 py-2.5 min-w-0 rounded-xl hover:bg-greybg/80"
            >
              <i class="pi pi-calendar text-primary text-sm shrink-0"></i>
              <div class="min-w-0 flex-1">
                <span class="block text-[11px] font-semibold text-bodytext2 uppercase tracking-wide">
                  Event Type
                </span>
                <select
                  v-model="eventType"
                  class="w-full bg-transparent border-0 outline-none text-sm text-header p-0 appearance-none cursor-pointer"
                >
                  <option>Wedding</option>
                  <option>Conference</option>
                  <option>Birthday</option>
                  <option>Workshop</option>
                  <option>Outdoor</option>
                </select>
              </div>
            </label>

            <div class="hidden sm:block w-px bg-border self-stretch my-2"></div>

            <label
              class="flex-1 flex items-center gap-3 px-3 py-2.5 min-w-0 rounded-xl hover:bg-greybg/80"
            >
              <i class="pi pi-users text-primary text-sm shrink-0"></i>
              <div class="min-w-0 flex-1">
                <span class="block text-[11px] font-semibold text-bodytext2 uppercase tracking-wide">
                  When & Guests
                </span>
                <input
                  v-model="whenGuests"
                  type="text"
                  placeholder="Select dates"
                  class="w-full bg-transparent border-0 outline-none text-sm text-header placeholder:text-bodytext2 p-0"
                />
              </div>
            </label>

            <button
              type="submit"
              class="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              <i class="pi pi-search text-sm"></i>
              Search
            </button>
          </form>

          <div class="mt-5 flex flex-wrap gap-2">
            <button
              v-for="chip in chips"
              :key="chip.label"
              type="button"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-border bg-white text-sm text-header hover:border-primary/40 hover:bg-greybg transition-colors"
            >
              <i :class="['pi text-xs text-primary', chip.icon]"></i>
              {{ chip.label }}
            </button>
          </div>
        </div>

        <div class="relative">
          <div class="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] sm:aspect-[5/6] md2:aspect-[4/5] shadow-lg">
            <img
              :src="heroImage"
              alt="The Grand Atrium Pavillion"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            ></div>

            <div
              class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-xs font-semibold text-header shadow-sm"
            >
              <i class="pi pi-verified text-primary text-[11px]"></i>
              Verified Landmark
            </div>

            <div
              class="absolute top-4 right-4 max-w-[180px] px-3 py-2 rounded-xl bg-white/95 text-xs shadow-sm"
            >
              <div class="flex items-center gap-1 font-semibold text-header">
                <i class="pi pi-star-fill text-primary text-[10px]"></i>
                4.9
                <span class="font-normal text-bodytext">(218 reviews)</span>
              </div>
              <p class="text-[10px] text-bodytext mt-0.5">Top 1% Global Venue</p>
            </div>

            <div class="absolute bottom-5 left-5 right-5 text-white">
              <p class="text-sm text-white/80 flex items-center gap-1.5">
                <i class="pi pi-map-marker text-xs"></i>
                Victoria Island, Lagos
              </p>
              <h2 class="text-xl sm:text-2xl font-bold mt-1">
                The Grand Atrium Pavillion
              </h2>
              <p class="mt-2 text-sm font-semibold">From ₦ 450,000</p>
            </div>
          </div>

          <div
            class="absolute -bottom-4 left-4 sm:left-6 right-4 sm:right-auto sm:w-[280px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-4 border border-border"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs text-bodytext">Available</p>
                <p class="text-sm font-semibold text-header">Sat, Oct 18</p>
                <p class="text-xs text-bodytext mt-1">
                  Day rate
                  <span class="font-semibold text-header">₦ 450,000</span>
                </p>
              </div>
              <NuxtLink
                to="/auth/signup?venue=The%20Grand%20Atrium%20Pavillion&location=Victoria%20Island%2C%20Lagos"
                class="shrink-0 px-4 py-2.5 rounded-full bg-brand-gradient-soft text-white text-xs font-semibold hover:opacity-95"
              >
                Book Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const location = ref("");
const eventType = ref("Wedding");
const whenGuests = ref("");

const heroImage = "/images/grand-atrium.jpg";

const chips = [
  { label: "Weddings", icon: "pi-heart" },
  { label: "Conferences", icon: "pi-briefcase" },
  { label: "Birthdays", icon: "pi-gift" },
  { label: "Workshops", icon: "pi-desktop" },
  { label: "Outdoor", icon: "pi-sun" },
];
</script>
