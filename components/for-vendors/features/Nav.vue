<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
    <div
      class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 h-[72px] flex items-center justify-between gap-4"
    >
      <NuxtLink to="/" class="shrink-0">
        <AuthVenpadiLogo text-class="text-xl" :icon-size="28" />
      </NuxtLink>

      <nav class="hidden md2:flex items-center gap-7 text-sm font-medium text-header">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="hover:text-primary transition-colors"
          :class="{
            'text-primary border-b-2 border-primary pb-1': active === link.href,
          }"
          @click="active = link.href"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <a
          :href="ownerLogin"
          class="hidden sm:inline-flex text-sm font-medium text-header hover:text-primary px-2 py-2"
        >
          Login
        </a>
        <NuxtLink
          to="/auth/signup/venue"
          class="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-95 transition-opacity"
        >
          List My Venue<span class="hidden sm:inline">&nbsp;— Free</span>
          <i class="hidden sm:inline pi pi-arrow-right text-xs"></i>
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
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="block text-sm font-medium text-header py-2"
        :class="{ 'text-primary': active === link.href }"
        @click="
          active = link.href;
          menuOpen = false;
        "
      >
        {{ link.label }}
      </a>
      <a
        :href="ownerLogin"
        class="block text-sm font-medium text-header py-2"
        @click="menuOpen = false"
      >
        Login
      </a>
    </div>
  </header>
</template>

<script setup>
const config = useRuntimeConfig();
const menuOpen = ref(false);
const active = ref("#overview");

const ownerLogin = computed(
  () => `${config.public.VENDOR_PORTAL_URL || ""}/auth/login`.replace(/([^:]\/)\/+/g, "$1")
);

// "Stories" only when owner testimonials are published — the section hides otherwise.
const { testimonials } = usePublicTestimonials("host");
const links = computed(() => [
  { label: "Core Overview", href: "#overview" },
  { label: "Interactive Mockups", href: "#listings" },
  { label: "Comparison", href: "#comparison" },
  { label: "Pricing", href: "#pricing" },
  ...(testimonials.value.length ? [{ label: "Stories", href: "#stories" }] : []),
]);
</script>
