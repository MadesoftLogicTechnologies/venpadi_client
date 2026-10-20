<template>
  <header
    class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border"
  >
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 h-[72px] flex items-center justify-between gap-4"
    >
      <NuxtLink to="/" class="shrink-0">
        <AuthVenpadiLogo text-class="text-xl" :icon-size="28" />
      </NuxtLink>

      <nav class="hidden md2:flex items-center gap-8 text-sm font-medium text-header">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="hover:text-primary transition-colors"
          :class="{ 'text-primary': isActive(link) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <NuxtLink
          to="/auth/signup/venue"
          class="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-border text-sm font-medium text-header hover:bg-greybg transition-colors"
        >
          List Your Venue
        </NuxtLink>
        <NuxtLink
          to="/auth/login"
          class="inline-flex items-center text-sm font-medium text-header hover:text-primary px-2 py-2"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/auth/signup"
          class="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
        >
          Create Booking
          <i class="pi pi-arrow-right text-xs"></i>
        </NuxtLink>

        <button
          type="button"
          class="md2:hidden w-10 h-10 rounded-full flex items-center justify-center text-header hover:bg-greybg"
          aria-label="Open menu"
          @click="menuOpen = !menuOpen"
        >
          <i :class="menuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>
      </div>
    </div>

    <div
      v-if="menuOpen"
      class="md2:hidden border-t border-border bg-white px-4 py-4 space-y-1"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block text-sm font-medium text-header py-2"
        :class="{ 'text-primary': isActive(link) }"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
      <div class="pt-3 mt-2 border-t border-border space-y-2">
        <NuxtLink
          to="/auth/login"
          class="block text-sm font-medium text-header py-2"
          @click="menuOpen = false"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/auth/signup/venue"
          class="block text-sm font-medium text-header py-2"
          @click="menuOpen = false"
        >
          List Your Venue
        </NuxtLink>
        <NuxtLink
          to="/auth/signup"
          class="block text-center text-sm font-semibold text-white py-2.5 rounded-full bg-brand-gradient-soft"
          @click="menuOpen = false"
        >
          Create Booking
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();
const menuOpen = ref(false);

const links = computed(() => {
  const onHome = route.path === "/";
  return [
    { label: "Explore Venues", to: "/search" },
    {
      label: "How It Works",
      to: onHome ? "#how-it-works" : "/#how-it-works",
    },
    {
      label: "For Venue Owners",
      to: onHome ? "#owners" : "/#owners",
    },
    {
      label: "For Vendors",
      to: onHome ? "#vendors" : "/#vendors",
    },
  ];
});

function isActive(link) {
  if (link.to === "/search") {
    return route.path.startsWith("/search");
  }
  if (link.to === "/auth/signup") {
    return route.path === "/auth/signup";
  }
  if (link.to === "/auth/login") {
    return route.path.startsWith("/auth/login");
  }
  return false;
}
</script>
