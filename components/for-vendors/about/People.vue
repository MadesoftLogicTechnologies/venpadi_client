<template>
  <section class="bg-[#F7F5F0] py-16 md2:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        ● The people
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight max-w-3xl"
      >
        Built by people who take this personally.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl">
        A multi-disciplinary collective anchored in Lagos, Nigeria — with teammates
        across Nairobi, London, and Berlin who live the hospitality workflows we ship.
      </p>

      <div class="mt-10 grid sm:grid-cols-2 md2:grid-cols-3 gap-4">
        <article
          v-for="person in people"
          :key="person.name"
          class="relative rounded-2xl bg-white border border-border p-5 sm:p-6"
        >
          <button
            type="button"
            class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-bodytext2 hover:bg-greybg"
            aria-label="Share"
          >
            <i class="pi pi-share-alt text-xs"></i>
          </button>
          <div
            class="w-12 h-12 rounded-full bg-header text-white flex items-center justify-center text-sm font-bold"
          >
            {{ person.initials }}
          </div>
          <h3 class="mt-4 text-base font-extrabold text-header">{{ person.name }}</h3>
          <p class="mt-0.5 text-sm font-semibold text-primary">{{ person.role }}</p>
          <p class="mt-3 text-sm text-bodytext leading-relaxed">{{ person.bio }}</p>
        </article>
      </div>

      <div class="mt-4 grid sm:grid-cols-3 gap-4">
        <article
          v-for="value in values"
          :key="value.title"
          class="rounded-2xl bg-white border border-border p-5 sm:p-6"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center"
            :class="value.iconBg"
          >
            <i :class="['pi text-sm', value.icon, value.iconColor]"></i>
          </div>
          <h3 class="mt-4 text-base font-extrabold text-header">{{ value.title }}</h3>
          <p class="mt-2 text-sm text-bodytext leading-relaxed">{{ value.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const people = [
  {
    initials: "FI",
    name: "Faith Imade",
    role: "Founder & CEO, Madesoft",
    bio: "Product operator turned founder. Obsessed with turning high-friction venue commerce into software that settles money as cleanly as it books dates.",
  },
  {
    initials: "OA",
    name: "Omotayo Adalake",
    role: "Head of Product",
    bio: "Owns the owner experience end-to-end — from first listing to payout clarity — with a bias for workflows floor teams actually use under pressure.",
  },
  {
    initials: "CN",
    name: "Chinedu Nwosu",
    role: "Lead Systems Architect",
    bio: "Designs the calendar, escrow, and multi-currency settlement rails that keep 1,200+ venues in sync without double-booking chaos.",
  },
  {
    initials: "ZE",
    name: "Zainab Emeka",
    role: "Head of Owner Success",
    bio: "Runs the Venue Success Manager program. Translates owner complaints into roadmap priorities and onboarding playbooks that stick.",
  },
  {
    initials: "KM",
    name: "Kelechi Mensah",
    role: "Engineering Lead, Payments",
    bio: "Builds settlement corridors across NGN, GHS, KES, USD, and AED — with the paranoia required when owners expect 24-hour payouts.",
  },
  {
    initials: "TB",
    name: "Temi Bassey",
    role: "Design Systems Lead",
    bio: "Crafts the visual language hosts and guests share — clear enough for a floor manager on a phone, sharp enough for a boardroom demo.",
  },
];

const values = [
  {
    title: "Lagos-built",
    body: "Forged in a high-energy metropolis where venue ops fail loudly. That pressure shapes every release we ship.",
    icon: "pi-sun",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Owner-obsessed",
    body: "We measure success by your occupancy, payout speed, and financial sovereignty — not vanity marketplace metrics.",
    icon: "pi-heart",
    iconBg: "bg-[#FFE8F0]",
    iconColor: "text-[#E11D48]",
  },
  {
    title: "Global by design",
    body: "Multi-currency cores, cross-border discovery, and workflows that travel from Lekki to London without translation debt.",
    icon: "pi-globe",
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
  },
];
</script>
