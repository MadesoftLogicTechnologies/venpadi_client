<template>
  <section id="owners" class="bg-white py-16 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div>
          <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
            Venue operating system
          </p>
          <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight leading-tight">
            Own a venue? Start earning with Venpadi.
          </h2>
          <p class="mt-4 text-bodytext text-sm sm:text-base leading-relaxed max-w-lg">
            List your space once and unlock automated bookings, digital
            contracts, and payout tools built for venue operators — without the
            ops overhead.
          </p>

          <ul class="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-start gap-2.5 text-sm text-header font-medium"
            >
              <span
                class="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
              >
                <i class="pi pi-check text-[10px] font-bold"></i>
              </span>
              {{ feature }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/auth/signup/venue"
              class="inline-flex items-center px-5 py-3 rounded-full bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95"
            >
              Get Started — It's Free
            </NuxtLink>
            <a
              href="#"
              class="inline-flex items-center px-5 py-3 rounded-full border border-border bg-white text-header text-sm font-semibold hover:bg-greybg"
            >
              Schedule Platform Demo
            </a>
          </div>
        </div>

        <div
          class="bg-greybg rounded-2xl border border-border p-5 sm:p-6 shadow-sm"
        >
          <div class="flex items-center justify-between mb-5">
            <p class="text-sm font-semibold text-header">Venue activity</p>
            <span class="text-xs text-bodytext">Live</span>
          </div>

          <ul class="space-y-3">
            <li
              v-for="item in activity"
              :key="item.title"
              class="flex items-center gap-3 bg-white rounded-xl border border-border px-4 py-3"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                :class="item.iconBg"
              >
                <i :class="['pi text-sm', item.icon, item.iconColor]"></i>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-header truncate">
                  {{ item.title }}
                </p>
                <p class="text-xs text-bodytext">{{ item.time }}</p>
              </div>
              <span
                class="text-xs font-semibold shrink-0 px-2.5 py-1 rounded-full"
                :class="item.badgeClass"
              >
                {{ item.badge }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  "Zero upfront listing fees",
  "Instant payout security",
  "Unlimited planner bookings",
  "Full calendar control",
];

const activity = [
  {
    title: "Survey Deposit Received",
    time: "2 min ago",
    badge: "+₦890,200",
    badgeClass: "bg-success/10 text-success",
    icon: "pi-wallet",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    title: "Calendar Auto-Updated",
    time: "18 min ago",
    badge: "Success",
    badgeClass: "bg-primary/10 text-primary",
    icon: "pi-calendar",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "New Site Tour Request",
    time: "1 hr ago",
    badge: "Pending",
    badgeClass: "bg-orange-50 text-[#C66A00]",
    icon: "pi-map-marker",
    iconBg: "bg-orange-50",
    iconColor: "text-[#FF8A00]",
  },
];
</script>
