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
          <div class="mt-5 flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.icon"
              href="#"
              class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
              :aria-label="social.label"
            >
              <i :class="['pi text-sm', social.icon]"></i>
            </a>
          </div>
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
                href="#"
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
          <a href="#" class="hover:text-white">Privacy</a>
          <a href="#" class="hover:text-white">Terms</a>
          <a href="#" class="hover:text-white">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

const socials = [
  { icon: "pi-instagram", label: "Instagram" },
  { icon: "pi-twitter", label: "Twitter" },
  { icon: "pi-linkedin", label: "LinkedIn" },
  { icon: "pi-facebook", label: "Facebook" },
];

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
      { label: "For venue owners", to: "/#owners" },
      { label: "Vendor network", to: "/#vendors" },
      { label: "Pricing & Plans" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Careers" },
      { label: "Press & Media" },
      { label: "Privacy Policy" },
      { label: "Contact" },
    ],
  },
];
</script>
