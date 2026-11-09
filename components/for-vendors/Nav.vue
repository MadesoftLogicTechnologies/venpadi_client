<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 h-[72px] flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-2.5 shrink-0">
        <NuxtLink to="/">
          <AuthVenpadiLogo text-class="text-xl" :icon-size="28" />
        </NuxtLink>
        <span class="hidden sm:inline text-sm text-bodytext2">· For Venue Owners</span>
      </div>

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
        <a
          :href="ownerLogin"
          class="hidden sm:inline-flex text-sm font-medium text-header hover:text-primary px-2 py-2"
        >
          Sign In as Owner
        </a>
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-95 transition-opacity"
        >
          List Your Venue Free
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

    <div v-if="menuOpen" class="md2:hidden border-t border-border bg-white px-4 py-4 space-y-1">
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
      <a :href="ownerLogin" class="block text-sm font-medium text-header py-2" @click="menuOpen = false">
        Sign In as Owner
      </a>
    </div>
  </header>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const menuOpen = ref(false);

const ownerLogin = computed(
  () => `${config.public.VENDOR_PORTAL_URL || ""}/auth/login`.replace(/([^:]\/)\/+/g, "$1")
);

const onOwnersHome = computed(() => route.path === "/for-venue-owners");

const links = computed(() => [
  {
    label: "Features",
    to: onOwnersHome.value ? "#features" : "/for-venue-owners#features",
    match: "/for-venue-owners",
  },
  {
    label: "How It Works",
    to: onOwnersHome.value ? "#how-it-works" : "/for-venue-owners/how-it-works",
    match: "/for-venue-owners/how-it-works",
  },
  {
    label: "Success Stories",
    to: "/for-venue-owners/success-stories",
    match: "/for-venue-owners/success-stories",
  },
  {
    label: "FAQs",
    to: onOwnersHome.value ? "#faqs" : "/for-venue-owners/faqs",
    match: "/for-venue-owners/faqs",
  },
]);

function isActive(link) {
  if (!link.match) return false;
  if (link.match === "/for-venue-owners") {
    return route.path === "/for-venue-owners";
  }
  return route.path === link.match;
}
</script>
