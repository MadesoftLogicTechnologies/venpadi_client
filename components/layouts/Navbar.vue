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
        @keyup.enter="runSearch"
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
          @click="navigateTo('/notifications')"
        >
          <i class="pi pi-bell text-sm"></i>
          <span
            v-if="unreadNotifications"
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"
          ></span>
        </button>
        <button
          type="button"
          class="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-bodytext hover:bg-greybg"
          aria-label="Messages"
          @click="navigateTo('/messages')"
        >
          <i class="pi pi-comment text-sm"></i>
        </button>
        <button
          type="button"
          class="hidden md2:inline-flex items-center px-2 text-sm font-medium text-header hover:text-primary"
          @click="navigateTo('/help')"
        >
          Support
        </button>
        <button
          type="button"
          class="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-greybg"
          aria-label="Profile"
          @click="openProfile"
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
          @click="navigateTo('/auth/signup/venue')"
        >
          <i class="pi pi-plus text-xs"></i>
          Venue
        </button>

        <button
          type="button"
          class="hidden xs:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gradient text-white text-sm font-semibold hover:opacity-95 transition-opacity"
          @click="navigateTo('/discover')"
        >
          <i class="pi pi-calendar-plus text-xs"></i>
          Booking
        </button>

        <div class="hidden md2:flex items-center gap-1">
          <button
            type="button"
            class="w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
            aria-label="Notifications sound"
            @click="comingSoon"
          >
            <i class="pi pi-volume-up text-sm"></i>
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
            aria-label="Inbox"
            @click="navigateTo('/messages')"
          >
            <i class="pi pi-inbox text-sm"></i>
          </button>
          <button
            type="button"
            class="relative w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
            aria-label="Notifications"
            @click="navigateTo('/notifications')"
          >
            <i class="pi pi-bell text-sm"></i>
            <span
              v-if="unreadNotifications"
              class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"
            ></span>
          </button>
        </div>

        <button
          type="button"
          class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-200 to-primary overflow-hidden border-2 border-white shadow-sm shrink-0"
          aria-label="Profile"
          @click="openProfile"
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
import { useToastStore } from "~/store/toast";

const authStore = useAuthStore();
const route = useRoute();
const search = ref("");

// Master's switch: the booker header for signed-in planners and on /discover.
const isBooker = computed(
  () => (authStore.isAuthenticated && !!authStore.user) || authStore.role === "booker" || route.path.startsWith("/discover")
);

const displayName = computed(() => authStore.displayName || authStore.user?.email || "");
const avatarUrl = computed(() => authStore.user?.avatarUrl || "");

const initials = computed(() =>
  displayName.value
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
);

/* ── unread dot ──────────────────────────────────────────────────────────── */
const unreadNotifications = ref(0);

async function loadCounts() {
  if (!authStore.isAuthenticated) {
    unreadNotifications.value = 0;
    return;
  }
  try {
    const notes = await api.get("/notifications", { unread: true, limit: 1 }, { toast: false });
    unreadNotifications.value = notes?.unreadCount ?? notes?.total ?? 0;
  } catch {
    /* the dot is decoration — never block the page */
  }
}

onMounted(loadCounts);
watch(() => route.path, loadCounts);
watch(() => authStore.isAuthenticated, loadCounts);

function runSearch() {
  const q = search.value.trim();
  return navigateTo({ path: "/search", query: q ? { location: q } : {} });
}

function openProfile() {
  return navigateTo(authStore.isAuthenticated ? "/settings" : "/auth/login");
}

function comingSoon() {
  useToastStore().setMessage({ text: "Coming soon.", type: "info" });
}
</script>
