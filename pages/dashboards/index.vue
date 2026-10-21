<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1180px]">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">
            Welcome back{{ auth.firstName ? `, ${auth.firstName}` : "" }}
          </h1>
          <p class="mt-1 text-[14px] text-bodytext">Here’s what’s happening with your events.</p>
        </div>
        <NuxtLink
          to="/discover"
          class="self-start inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-brand-gradient-soft text-white text-[13px] font-semibold"
        >
          <i class="pi pi-plus text-[11px]"></i>
          Book a venue
        </NuxtLink>
      </div>

      <p v-if="pending && !data" class="mt-6 text-sm text-bodytext">Loading…</p>

      <template v-if="data">
        <div class="mt-6 grid grid-cols-2 md2:grid-cols-4 gap-3 md2:gap-4">
          <NuxtLink
            v-for="card in kpis"
            :key="card.label"
            :to="card.to"
            class="bg-white rounded-2xl border border-border p-4 hover:shadow-sm transition-shadow"
          >
            <div class="flex items-center justify-between">
              <p class="text-[12px] text-bodytext">{{ card.label }}</p>
              <span class="w-8 h-8 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center">
                <i :class="['pi text-[12px]', card.icon]"></i>
              </span>
            </div>
            <p class="mt-2 text-[24px] font-extrabold text-header leading-none">{{ card.value }}</p>
          </NuxtLink>
        </div>

        <div class="mt-6 grid grid-cols-1 md2:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
          <section class="bg-white rounded-2xl border border-border">
            <div class="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 class="text-[16px] font-bold text-header">Upcoming bookings</h2>
              <NuxtLink to="/bookings" class="text-[13px] font-semibold text-primary hover:opacity-80">
                View all
              </NuxtLink>
            </div>
            <div v-if="!data.upcoming.length" class="px-5 py-10 text-center">
              <p class="text-[14px] font-semibold text-header">No upcoming events</p>
              <p class="mt-1 text-[13px] text-bodytext">Find a venue and send your first booking request.</p>
              <NuxtLink
                to="/discover"
                class="mt-4 inline-flex h-9 px-4 items-center rounded-full border border-border text-[13px] font-semibold text-header hover:bg-greybg"
              >
                Discover venues
              </NuxtLink>
            </div>
            <NuxtLink
              v-for="b in data.upcoming"
              :key="b.id"
              :to="`/bookings/${b.reference}`"
              class="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 border-b border-border last:border-b-0 hover:bg-greybg"
            >
              <div class="w-full sm:w-[112px] h-[120px] sm:h-[76px] rounded-xl overflow-hidden bg-greybg shrink-0">
                <img v-if="b.imageUrl" :src="b.imageUrl" :alt="b.venueName" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-[15px] font-bold text-header truncate">{{ b.eventName }}</p>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(b.status)">
                    {{ b.statusLabel }}
                  </span>
                </div>
                <p class="mt-0.5 text-[12px] text-bodytext">
                  {{ b.venueName }} · {{ formatDateLong(b.startAt) }} · {{ timeRange(b.startAt, b.endAt) }}
                </p>
                <p class="mt-0.5 text-[11px] text-bodytext2">{{ b.reference }}</p>
              </div>
              <div class="sm:text-right shrink-0">
                <p class="text-[15px] font-extrabold text-header">{{ naira(b.totalMinor) }}</p>
                <p v-if="b.nextPaymentDueMinor" class="text-[12px] text-primary font-semibold">
                  {{ naira(b.nextPaymentDueMinor) }} due {{ b.nextPaymentDueAt ? formatDate(b.nextPaymentDueAt) : "" }}
                </p>
                <p v-else class="text-[12px] text-bodytext">Paid {{ naira(b.amountPaidMinor) }}</p>
              </div>
            </NuxtLink>
          </section>

          <div class="space-y-5">
            <section class="bg-white rounded-2xl border border-border p-5">
              <h2 class="text-[16px] font-bold text-header">Inbox</h2>
              <div class="mt-3 space-y-2 text-[13px]">
                <NuxtLink to="/messages" class="flex items-center justify-between rounded-xl bg-greybg px-3 py-2.5 hover:bg-[#F3F4F6]">
                  <span class="flex items-center gap-2 text-header"><i class="pi pi-comment text-primary text-[12px]"></i>Unread messages</span>
                  <span class="font-bold text-header">{{ data.unreadMessages }}</span>
                </NuxtLink>
                <NuxtLink to="/notifications" class="flex items-center justify-between rounded-xl bg-greybg px-3 py-2.5 hover:bg-[#F3F4F6]">
                  <span class="flex items-center gap-2 text-header"><i class="pi pi-bell text-primary text-[12px]"></i>Unread notifications</span>
                  <span class="font-bold text-header">{{ data.unreadNotifications }}</span>
                </NuxtLink>
              </div>
            </section>

            <section class="bg-white rounded-2xl border border-border p-5">
              <div class="flex items-center justify-between">
                <h2 class="text-[16px] font-bold text-header">Saved venues</h2>
                <span class="text-[12px] text-bodytext">{{ data.savedVenues.count }} saved</span>
              </div>
              <p v-if="!data.savedVenues.latest.length" class="mt-3 text-[13px] text-bodytext">
                Tap the heart on any venue to save it here.
              </p>
              <div class="mt-3 space-y-3">
                <NuxtLink
                  v-for="v in data.savedVenues.latest"
                  :key="v.id"
                  :to="`/discover/${v.slug}`"
                  class="flex items-center gap-3 group"
                >
                  <div class="w-14 h-14 rounded-xl overflow-hidden bg-greybg shrink-0">
                    <img v-if="v.imageUrl" :src="v.imageUrl" :alt="v.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-[13px] font-semibold text-header truncate group-hover:text-primary">{{ v.name }}</p>
                    <p class="text-[12px] text-bodytext truncate">{{ v.location }}</p>
                    <p v-if="v.fromPriceMinor !== null" class="text-[12px] text-header">
                      From {{ naira(v.fromPriceMinor) }}/{{ v.priceUnit === "hour" ? "hr" : "day" }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
              <NuxtLink
                v-if="data.savedVenues.count"
                to="/settings?tab=saved"
                class="mt-4 inline-block text-[13px] font-semibold text-primary hover:opacity-80"
              >
                See all saved venues
              </NuxtLink>
            </section>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

useHead({ title: "Dashboard" });

const auth = useAuthStore();
const { data, pending } = useResource(() => api.get("/me/dashboard"));

const kpis = computed(() => {
  const c = data.value?.counts ?? {};
  return [
    { label: "Upcoming", value: c.upcoming ?? 0, icon: "pi-calendar", to: "/bookings?tab=upcoming" },
    { label: "Awaiting approval", value: c.pending ?? 0, icon: "pi-clock", to: "/bookings?tab=pending" },
    { label: "Completed", value: c.completed ?? 0, icon: "pi-check-circle", to: "/bookings?tab=past" },
    { label: "Cancelled", value: c.cancelled ?? 0, icon: "pi-times-circle", to: "/bookings?tab=cancelled" },
  ];
});
</script>
