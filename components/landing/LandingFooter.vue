<template>
  <footer class="bg-dark text-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pt-14 pb-8">
      <div class="grid sm:grid-cols-2 md2:grid-cols-5 gap-10 md2:gap-8">
        <div class="md2:col-span-2">
          <AuthVenpadiLogo dark text-class="text-xl" :icon-size="28" />
          <p class="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
            Venpadi connects planners with verified venues and trusted vendors —
            so every event starts with the right space.
          </p>
          <!-- Social icons return when Venpadi has real profile URLs; an icon that
               goes nowhere is a dead control. -->
        </div>

        <div v-for="col in columns" :key="col.title">
          <h4 class="text-sm font-semibold text-white/90 mb-4">{{ col.title }}</h4>
          <ul class="space-y-2.5">
            <li v-for="link in col.links" :key="link.label">
              <NuxtLink
                v-if="link.to"
                :to="link.to"
                class="text-sm text-white/55 hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="text-sm text-white/55 hover:text-white transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 pt-6 border-t border-white/10 text-xs text-white/45 flex flex-col sm:flex-row sm:justify-between gap-2"
      >
        <p>© {{ year }} Venpadi Technologies Inc. All rights reserved.</p>
        <div class="flex gap-4">
          <NuxtLink to="/for-venue-owners/privacy" class="hover:text-white">Privacy</NuxtLink>
          <NuxtLink to="/for-venue-owners/terms" class="hover:text-white">Terms</NuxtLink>
          <NuxtLink to="/for-venue-owners/privacy#priv-09" class="hover:text-white">Cookies</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Search venues", to: "/search" },
      { label: "Create booking", to: "/auth/signup" },
      { label: "Sign in", to: "/auth/login" },
      { label: "List your venue", to: "/auth/signup/venue" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "How it works", to: "/#how-it-works" },
      { label: "For venue owners", to: "/for-venue-owners" },
      { label: "For Vendors", to: "/for-venue-owners" },
      { label: "Pricing & Plans", to: "/features#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/for-venue-owners/about" },
      { label: "Careers", to: "/for-venue-owners/about#careers" },
      { label: "Press & Media", to: "/for-venue-owners/about#press" },
      { label: "Privacy Policy", to: "/for-venue-owners/privacy" },
      { label: "Contact", href: "mailto:hello@venpadi.com" },
    ],
  },
];
</script>
