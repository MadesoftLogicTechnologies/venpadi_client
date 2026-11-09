<template>
  <footer class="bg-black text-white/55 pt-16 pb-8">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid sm:grid-cols-2 md2:grid-cols-4 gap-10 md2:gap-12 pb-12 border-b border-white/10">
        <div class="sm:col-span-2 md2:col-span-1">
          <NuxtLink to="/" class="inline-flex">
            <AuthVenpadiLogo dark text-class="text-xl" :icon-size="28" />
          </NuxtLink>
          <p class="mt-4 text-sm leading-relaxed max-w-[260px]">
            The operating system for modern venues, banquet estates, and luxury event
            discovery worldwide. Built for high-yield hospitality leaders.
          </p>
          <div class="mt-5 flex items-center gap-2.5">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/35 transition-colors"
            >
              <i :class="['pi text-sm', social.icon]"></i>
            </a>
          </div>
        </div>

        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-white mb-4">
            For Venue Owners
          </p>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in ownerLinks" :key="link.label">
              <NuxtLink
                v-if="link.to"
                :to="link.to"
                class="hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="hover:text-white transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Platform
          </p>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in platformLinks" :key="link.label">
              <NuxtLink :to="link.to" class="hover:text-white transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Company
          </p>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in companyLinks" :key="link.label">
              <NuxtLink
                v-if="link.to"
                :to="link.to"
                class="hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="hover:text-white transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 text-xs text-white/40">
        <p>© {{ year }} Venpadi Technologies Inc. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

const socials = [
  { icon: "pi-globe", label: "Website", href: "/" },
  { icon: "pi-at", label: "Email", href: "mailto:hello@venpadi.com" },
  { icon: "pi-share-alt", label: "Share", href: "#" },
];

const ownerLinks = [
  { label: "List Your Venue", to: "/auth/signup/venue" },
  { label: "Operating System", to: "/features" },
  { label: "Case Studies", to: "/for-venue-owners/success-stories" },
  { label: "Owner FAQ", to: "/for-venue-owners/faqs" },
];

const platformLinks = [
  { label: "Explore Venues", to: "/search" },
  { label: "Features", to: "/features" },
  { label: "Owner FAQ", to: "/for-venue-owners/faqs" },
  { label: "How It Works", to: "/for-venue-owners/how-it-works" },
];

const companyLinks = [
  { label: "About Us", to: "/for-venue-owners/about" },
  { label: "Careers", to: "/for-venue-owners/about#careers" },
  { label: "Privacy Policy", to: "/for-venue-owners/privacy" },
  { label: "Terms of Service", to: "/for-venue-owners/terms" },
  { label: "Blog", href: "#" },
];
</script>
