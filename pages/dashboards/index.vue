<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full">
      <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">
        {{ greeting }}{{ auth.firstName ? `, ${auth.firstName}` : "" }}
      </h1>
      <p class="mt-1 text-[14px] text-bodytext">
        Here is what’s happening with your venue planning today
      </p>

      <p v-if="pending && !data" class="mt-6 text-sm text-bodytext">Loading…</p>

      <template v-else-if="data">
        <!-- KPIs -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md2:gap-4">
          <NuxtLink
            v-for="card in kpis"
            :key="card.label"
            :to="card.to"
            class="bg-white rounded-[20px] border border-border p-5 hover:shadow-sm transition-shadow"
          >
            <div class="flex items-center gap-2.5">
              <span
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                :class="card.iconWrap"
              >
                <i :class="['pi text-[13px]', card.icon, card.iconColor]"></i>
              </span>
              <p class="text-[13px] font-medium text-header">{{ card.label }}</p>
            </div>
            <p class="mt-4 text-[36px] md2:text-[40px] leading-none font-extrabold text-header tracking-tight">
              {{ card.value }}
            </p>
            <p v-if="card.hint" class="mt-2 text-[12px] font-medium" :class="card.hintClass">
              {{ card.hint }}
            </p>
          </NuxtLink>
        </div>

        <div class="mt-6 grid grid-cols-1 md2:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
          <div class="space-y-6 min-w-0">
            <!-- Upcoming bookings -->
            <section>
              <div class="flex items-center justify-between gap-3 mb-3">
                <h2 class="text-[16px] font-bold text-header">Upcoming bookings</h2>
                <NuxtLink to="/bookings?tab=upcoming" class="text-[13px] font-semibold text-primary hover:opacity-80">
                  View all
                </NuxtLink>
              </div>

              <div v-if="!upcomingEvents.length" class="bg-white rounded-[20px] border border-border px-5 py-10 text-center">
                <p class="text-[14px] font-semibold text-header">No upcoming bookings</p>
                <p class="mt-1 text-[13px] text-bodytext">Find a venue and send your first booking request.</p>
                <NuxtLink
                  to="/discover"
                  class="mt-4 inline-flex h-9 px-4 items-center rounded-full border border-border text-[13px] font-semibold text-header hover:bg-greybg"
                >
                  Discover venues
                </NuxtLink>
              </div>

              <div v-else class="space-y-3">
                <NuxtLink
                  v-for="(b, i) in upcomingEvents"
                  :key="b.id"
                  :to="`/bookings/${b.reference}`"
                  class="flex items-center gap-4 bg-white rounded-[20px] border border-border px-4 py-3.5 hover:shadow-sm transition-shadow"
                >
                  <div
                    class="w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center shrink-0 leading-none"
                    :class="dateBadgeClass(i)"
                  >
                    <span class="text-[10px] font-bold uppercase tracking-wide">{{ dateMonth(b.startAt) }}</span>
                    <span class="mt-0.5 text-[18px] font-extrabold">{{ dateDay(b.startAt) }}</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-[15px] font-bold text-header truncate">{{ b.eventName }}</p>
                    <p class="mt-0.5 text-[12px] text-bodytext truncate inline-flex items-center gap-1">
                      <i class="pi pi-map-marker text-[10px] text-bodytext2"></i>
                      {{ b.venueName }}
                    </p>
                  </div>
                  <span
                    class="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0"
                    :class="statusClass(b.status)"
                  >
                    <i v-if="b.status === 'confirmed'" class="pi pi-check text-[10px]"></i>
                    {{ b.statusLabel }}
                  </span>
                </NuxtLink>
              </div>
            </section>

            <!-- Active Proposals -->
            <section>
              <h2 class="text-[16px] font-bold text-header mb-3">Active Proposals</h2>

              <div v-if="!proposals.length" class="bg-white rounded-[20px] border border-border px-5 py-10 text-center">
                <p class="text-[14px] font-semibold text-header">No active proposals</p>
                <p class="mt-1 text-[13px] text-bodytext">Proposals awaiting a venue reply or your action will show up here.</p>
              </div>

              <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <article
                  v-for="p in proposals"
                  :key="p.id"
                  class="bg-white rounded-[20px] border border-border p-4 flex flex-col"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-12 h-12 rounded-xl overflow-hidden bg-greybg shrink-0">
                      <img v-if="p.imageUrl" :src="p.imageUrl" :alt="p.venueName" class="w-full h-full object-cover" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-[14px] font-bold text-header leading-snug">{{ p.venueName || p.eventName }}</p>
                      <p class="mt-0.5 text-[12px] text-bodytext">{{ proposalDate(p) }}</p>
                    </div>
                    <span
                      class="px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0"
                      :class="proposalBadgeClass(p)"
                    >
                      {{ proposalBadgeLabel(p) }}
                    </span>
                  </div>

                  <div class="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p class="text-[11px] text-bodytext">{{ needsPay(p) ? "Deposit Amount" : "Total Value" }}</p>
                      <p class="mt-0.5 text-[18px] font-extrabold text-header leading-none">
                        {{ naira(needsPay(p) ? p.nextPaymentDueMinor || p.totalMinor : p.totalMinor, { decimals: true }) }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                    <p class="text-[12px]" :class="needsPay(p) ? 'text-primary font-medium' : 'text-bodytext'">
                      {{ proposalFooter(p) }}
                    </p>
                    <NuxtLink
                      :to="`/bookings/${p.reference}`"
                      class="text-[13px] font-semibold text-primary hover:opacity-80 shrink-0"
                    >
                      {{ needsPay(p) ? "Pay Now" : "Review Proposal" }}
                    </NuxtLink>
                  </div>
                </article>
              </div>
            </section>

            <!-- Saved Venues -->
            <section>
              <div class="flex items-center justify-between gap-3 mb-3">
                <h2 class="text-[16px] font-bold text-header">Saved Venues</h2>
                <NuxtLink
                  v-if="saved.count"
                  to="/settings?tab=saved"
                  class="text-[13px] font-semibold text-primary hover:opacity-80"
                >
                  View all
                </NuxtLink>
              </div>

              <div v-if="!saved.latest.length" class="bg-white rounded-[20px] border border-border px-5 py-10 text-center">
                <p class="text-[14px] font-semibold text-header">No saved venues yet</p>
                <p class="mt-1 text-[13px] text-bodytext">Tap the heart on any venue to save it here.</p>
              </div>

              <div v-else class="grid grid-cols-1 xs:grid-cols-2 md2:grid-cols-3 gap-3">
                <article
                  v-for="v in saved.latest"
                  :key="v.id"
                  class="bg-white rounded-[20px] border border-border overflow-hidden"
                >
                  <div class="relative aspect-[16/10] bg-greybg">
                    <NuxtLink :to="`/discover/${v.slug}`" class="absolute inset-0">
                      <img v-if="v.imageUrl" :src="v.imageUrl" :alt="v.name" class="w-full h-full object-cover" />
                    </NuxtLink>
                    <button
                      type="button"
                      class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-sm text-primary"
                      aria-label="Unsave venue"
                      :disabled="isBusy(v.id)"
                      @click="toggle(v.id)"
                    >
                      <i class="pi pi-heart-fill text-[13px]"></i>
                    </button>
                  </div>
                  <div class="p-3.5">
                    <NuxtLink :to="`/discover/${v.slug}`" class="text-[14px] font-bold text-header hover:text-primary">
                      {{ v.name }}
                    </NuxtLink>
                    <p class="mt-1 text-[12px] text-bodytext flex items-center gap-1.5 flex-wrap">
                      <span v-if="v.ratingAvg != null" class="inline-flex items-center gap-0.5 text-header font-medium">
                        <i class="pi pi-star-fill text-[#F5A524] text-[10px]"></i>
                        {{ Number(v.ratingAvg).toFixed(1) }}
                      </span>
                      <span class="truncate">{{ v.location }}</span>
                    </p>
                    <div class="mt-3 flex items-center justify-between gap-2">
                      <p v-if="v.fromPriceMinor !== null" class="text-[13px] font-semibold text-header">
                        From {{ naira(v.fromPriceMinor) }}/{{ v.priceUnit === "hour" ? "hr" : "day" }}
                      </p>
                      <span v-else></span>
                      <NuxtLink :to="`/discover/${v.slug}`" class="text-[13px] font-semibold text-primary hover:opacity-80">
                        View details
                      </NuxtLink>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <!-- Recent Activity -->
          <aside class="bg-white rounded-[20px] border border-border p-5 md2:sticky md2:top-[80px]">
            <div class="flex items-center justify-between gap-2">
              <h2 class="text-[16px] font-bold text-header">Recent Activity</h2>
              <NuxtLink
                to="/notifications"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-bodytext hover:bg-greybg"
                aria-label="Filter activity"
              >
                <i class="pi pi-filter text-[13px]"></i>
              </NuxtLink>
            </div>

            <p v-if="!activity.length" class="mt-6 text-[13px] text-bodytext text-center py-6">
              No activity yet. Bookings, messages and payments will appear here.
            </p>

            <ol v-else class="mt-4 space-y-4">
              <li v-for="item in activity" :key="item.id" class="flex gap-3">
                <span
                  class="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  :class="item.iconWrap"
                >
                  <i :class="['pi text-[12px]', item.icon, item.iconColor]"></i>
                </span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-[13px] font-semibold text-header">{{ item.title }}</p>
                    <p class="text-[11px] text-bodytext2 shrink-0">{{ item.when }}</p>
                  </div>
                  <p class="mt-0.5 text-[12px] text-bodytext leading-relaxed">{{ item.body }}</p>
                  <NuxtLink
                    v-if="item.href"
                    :to="item.href"
                    class="mt-1 inline-block text-[12px] font-semibold text-primary hover:opacity-80"
                  >
                    {{ item.linkLabel }}
                  </NuxtLink>
                </div>
              </li>
            </ol>

            <NuxtLink
              v-if="activity.length"
              to="/notifications"
              class="mt-5 flex items-center justify-center text-[13px] font-semibold text-primary hover:opacity-80"
            >
              Load more activity
            </NuxtLink>
          </aside>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

useHead({ title: "Dashboard" });

const auth = useAuthStore();
const { isBusy, toggle } = useFavorites();

const { data, pending } = useResource(() => api.get("/me/dashboard"));
const { data: pendingBookings } = useResource(
  () => api.get("/me/bookings", { tab: "pending", page: 1, limit: 4 }),
  { initial: { rows: [], total: 0 } }
);
const { data: notes } = useResource(
  () => api.get("/notifications", { page: 1, limit: 6 }),
  { initial: { rows: [], total: 0 } }
);

const PENDING_STATUSES = new Set(["pending", "draft"]);
const DATE_BADGES = [
  "bg-[#FFF1ED] text-primary",
  "bg-[#F3E8FF] text-[#7C3AED]",
  "bg-[#EFF6FF] text-[#2563EB]",
];

const greeting = computed(() => {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: "Africa/Lagos",
    }).formatToParts(new Date()).find((p) => p.type === "hour")?.value
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
});

const upcomingEvents = computed(() => {
  const rows = data.value?.upcoming ?? [];
  const confirmed = rows.filter((b) => !PENDING_STATUSES.has(b.status));
  return confirmed.length ? confirmed : rows;
});

const proposals = computed(() => {
  const fromDash = data.value?.proposals ?? data.value?.pendingBookings;
  if (Array.isArray(fromDash) && fromDash.length) return fromDash.map(normalizeProposal);
  const rows = pendingBookings.value?.rows ?? [];
  if (rows.length) return rows.map(normalizeProposal);
  return (data.value?.upcoming ?? []).filter((b) => PENDING_STATUSES.has(b.status)).map(normalizeProposal);
});

const saved = computed(() => ({
  count: data.value?.savedVenues?.count ?? 0,
  latest: data.value?.savedVenues?.latest ?? [],
}));

const thisWeekCount = computed(() =>
  upcomingEvents.value.filter((b) => isThisWeek(b.startAt)).length
);

const kpis = computed(() => {
  const c = data.value?.counts ?? {};
  const unread = data.value?.unreadMessages ?? 0;
  const venues = data.value?.unreadConversations;
  return [
    {
      label: "Upcoming bookings",
      value: c.upcoming ?? upcomingEvents.value.length,
      icon: "pi-calendar",
      iconWrap: "bg-[#FFF1ED]",
      iconColor: "text-primary",
      to: "/bookings?tab=upcoming",
      hint: thisWeekCount.value ? `+${thisWeekCount.value} this week` : "this week",
      hintClass: thisWeekCount.value ? "text-[#16A34A]" : "text-bodytext2",
    },
    {
      label: "Active Proposals",
      value: c.pending ?? proposals.value.length,
      icon: "pi-file",
      iconWrap: "bg-[#FFF1ED]",
      iconColor: "text-primary",
      to: "/bookings?tab=pending",
      hint: (c.pending ?? proposals.value.length) ? `${c.pending ?? proposals.value.length} awaiting action` : "none awaiting",
      hintClass: (c.pending ?? 0) > 0 ? "text-[#EA580C]" : "text-bodytext2",
    },
    {
      label: "Unread Messages",
      value: unread,
      icon: "pi-comment",
      iconWrap: "bg-[#FFF1ED]",
      iconColor: "text-primary",
      to: "/messages",
      hint: venues ? `from ${venues} venues` : unread ? "unread" : "you’re all caught up",
      hintClass: "text-bodytext2",
    },
  ];
});

const activity = computed(() => {
  const fromDash = data.value?.activity ?? data.value?.recentActivity;
  const rows = Array.isArray(fromDash) && fromDash.length ? fromDash : notes.value?.rows ?? [];
  return rows.slice(0, 6).map(toActivity);
});

function normalizeProposal(b) {
  return {
    id: b.id,
    reference: b.reference,
    eventName: b.eventName,
    venueName: b.venueName || b.venue?.name || "",
    imageUrl: b.imageUrl || b.venue?.imageUrl || "",
    status: b.status,
    statusLabel: b.statusLabel,
    startAt: b.startAt,
    dateLabel: b.dateLabel,
    totalMinor: b.totalMinor,
    nextPaymentDueMinor: b.nextPaymentDueMinor,
    nextPaymentDueAt: b.nextPaymentDueAt,
    canPay: b.canPay,
    paymentLabel: b.paymentLabel,
  };
}

function needsPay(p) {
  return !!(p.canPay || (p.nextPaymentDueMinor && p.nextPaymentDueMinor > 0));
}

function proposalDate(p) {
  if (p.startAt) return formatDateUS(p.startAt);
  return p.dateLabel || "—";
}

function proposalBadgeClass(p) {
  if (needsPay(p)) return "bg-[#FEF2F2] text-[#DC2626]";
  return statusClass(p.status);
}

function proposalBadgeLabel(p) {
  if (needsPay(p) && p.status !== "pending") return p.statusLabel || "Deposit Due";
  if (needsPay(p)) return "Deposit Due";
  return p.statusLabel || "Pending";
}

function proposalFooter(p) {
  if (!needsPay(p)) return "Awaiting your review";
  const n = daysUntil(p.nextPaymentDueAt);
  if (n === null) return p.paymentLabel || "Payment due";
  if (n < 0) return "Overdue";
  if (n === 0) return "Due today";
  if (n === 1) return "Due in 1 day";
  return `Due in ${n} days`;
}

function dateBadgeClass(i) {
  return DATE_BADGES[i % DATE_BADGES.length];
}

function dateMonth(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return "—";
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", timeZone: "Africa/Lagos" })
    .toUpperCase();
}

function dateDay(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", timeZone: "Africa/Lagos" });
}

function isThisWeek(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return false;
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const t = new Date(iso).getTime();
  return t >= start.getTime() && t < end.getTime();
}

function daysUntil(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return null;
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

function toActivity(n) {
  const text = `${n.title || ""} ${n.body || ""} ${n.type || ""}`.toLowerCase();
  let icon = "pi-bell";
  let iconWrap = "bg-[#FFF1ED]";
  let iconColor = "text-primary";
  if (/paid|invoice|payment|success/.test(text)) {
    icon = "pi-check";
    iconWrap = "bg-[#EAF8F0]";
    iconColor = "text-[#16A34A]";
  } else if (/message/.test(text)) {
    icon = "pi-comment";
    iconWrap = "bg-[#FFF1ED]";
    iconColor = "text-primary";
  } else if (/proposal/.test(text)) {
    icon = "pi-file";
    iconWrap = "bg-[#FFF1ED]";
    iconColor = "text-primary";
  } else if (/booking|confirm/.test(text)) {
    icon = "pi-calendar";
    iconWrap = "bg-[#F3F4F6]";
    iconColor = "text-header";
  }

  const href = n.link && String(n.link).startsWith("/") ? n.link : n.href && String(n.href).startsWith("/") ? n.href : "";
  let linkLabel = "";
  if (href) {
    if (/proposal/i.test(n.title || "") || href.includes("/bookings/")) linkLabel = "View Proposal";
    else if (href.includes("/messages")) linkLabel = "View message";
    else if (href.includes("/invoices")) linkLabel = "View invoice";
    else linkLabel = "View";
  }

  return {
    id: n.id,
    title: n.title || n.typeLabel || "Update",
    body: n.body || n.description || "",
    when: timeAgo(n.createdAt || n.at),
    href,
    linkLabel,
    icon,
    iconWrap,
    iconColor,
  };
}
</script>
