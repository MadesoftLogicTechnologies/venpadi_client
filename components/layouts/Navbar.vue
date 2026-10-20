<template>
  <header
    class="bg-white border-b border-border px-4 sm:px-6 h-[64px] flex items-center gap-3 sm:gap-4"
  >
    <div class="flex-1 min-w-0 max-w-2xl xl:max-w-3xl">
      <Search
        v-model="search"
        kind="white"
        :use-button="false"
        :placeholder="
          isBooker ? 'Search venues, bookings...' : 'Search venues, bookings, clients...'
        "
        class="w-full"
      />
    </div>

    <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
      <template v-if="isBooker">
        <NuxtLink
          to="/discover"
          class="hidden xs:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-gradient text-white text-sm font-semibold hover:opacity-95 transition-opacity shadow-sm"
        >
          Book a New Venue
        </NuxtLink>

        <button
          type="button"
          class="relative w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
          aria-label="Notifications"
        >
          <i class="pi pi-bell text-sm"></i>
          <span
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"
          ></span>
        </button>
        <button
          type="button"
          class="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-bodytext hover:bg-greybg"
          aria-label="Messages"
        >
          <i class="pi pi-comment text-sm"></i>
        </button>
        <button
          type="button"
          class="hidden md2:inline-flex items-center px-2 text-sm font-medium text-header hover:text-primary"
        >
          Support
        </button>
        <button
          type="button"
          class="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-greybg"
          aria-label="Profile"
        >
          <span
            class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-primary overflow-hidden shrink-0"
          >
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              alt=""
              class="w-full h-full object-cover"
            />
            <span
              v-else
              class="w-full h-full flex items-center justify-center text-xs font-semibold text-white"
            >
              {{ initials }}
            </span>
          </span>
          <span class="hidden md2:inline text-sm font-medium text-header">
            {{ displayName }}
          </span>
          <i class="pi pi-chevron-down text-[10px] text-bodytext hidden md2:inline"></i>
        </button>
      </template>

      <template v-else>
        <button
          type="button"
          class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-white text-sm font-medium text-header hover:bg-greybg transition-colors"
        >
          <i class="pi pi-plus text-xs"></i>
          Venue
        </button>

        <button
          type="button"
          class="hidden xs:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gradient text-white text-sm font-semibold hover:opacity-95 transition-opacity"
        >
          <i class="pi pi-calendar-plus text-xs"></i>
          Booking
        </button>

        <div class="hidden md2:flex items-center gap-1">
          <button
            type="button"
            class="w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
            aria-label="Notifications sound"
          >
            <i class="pi pi-volume-up text-sm"></i>
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
            aria-label="Inbox"
          >
            <i class="pi pi-inbox text-sm"></i>
          </button>
          <button
            type="button"
            class="relative w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
            aria-label="Notifications"
          >
            <i class="pi pi-bell text-sm"></i>
            <span
              class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"
            ></span>
          </button>
        </div>

        <button
          type="button"
          class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-200 to-primary overflow-hidden border-2 border-white shadow-sm shrink-0"
          aria-label="Profile"
        >
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt=""
            class="w-full h-full object-cover"
          />
          <span
            v-else
            class="w-full h-full flex items-center justify-center text-xs font-semibold text-white"
          >
            {{ initials }}
          </span>
        </button>
      </template>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const route = useRoute();
const search = ref("");

const isBooker = computed(
  () => authStore.role === "booker" || route.path.startsWith("/discover")
);

const displayName = computed(() => authStore.user?.name || "Emma");
const avatarUrl = computed(() => authStore.user?.avatar || "");

const initials = computed(() => {
  const name = displayName.value;
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
});
</script>
