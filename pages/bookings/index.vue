<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">My Bookings</h1>
          <p class="mt-1 text-[14px] text-bodytext">
            Manage all your upcoming and past venue bookings, contracts, and scheduled payments.
          </p>
        </div>
        <NuxtLink
          to="/discover"
          class="self-start inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-brand-gradient-soft text-white text-[13px] font-semibold"
        >
          <i class="pi pi-plus text-[11px]"></i>
          Book a New Venue
        </NuxtLink>
      </div>

      <!-- KPIs -->
      <div class="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="card in kpis"
          :key="card.label"
          class="rounded-[20px] border p-4"
          :class="card.hot ? 'border-[#FFD4C8] bg-[#FFF4F0]' : 'border-border bg-white'"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="text-[12px] text-bodytext">{{ card.label }}</p>
              <p class="mt-1 text-[28px] font-extrabold text-header leading-none">{{ card.value }}</p>
              <p class="mt-2 text-[11px] font-medium" :class="card.hintClass">{{ card.hint }}</p>
            </div>
            <span class="w-9 h-9 rounded-xl flex items-center justify-center" :class="card.iconWrap">
              <i :class="['pi text-[14px]', card.icon, card.iconColor]"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- filters -->
      <div class="mt-5 flex flex-col md2:flex-row md2:items-center gap-3">
        <div class="flex-1 flex items-center gap-2 overflow-x-auto slim-scrollbar">
          <div class="w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center shrink-0">
            <i class="pi pi-search text-[13px] text-bodytext"></i>
          </div>
          <button
            v-for="t in tabs"
            :key="t.key"
            type="button"
            class="h-9 px-3.5 rounded-full text-[13px] font-semibold border whitespace-nowrap transition-colors"
            :class="chipClass(t)"
            @click="setTab(t.key)"
          >
            {{ t.label }}
          </button>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <div class="w-full md2:w-[240px]">
            <Search v-model="search" kind="white" placeholder="Search event, venue or reference" />
          </div>
        </div>
      </div>

      <!-- Upcoming -->
      <section v-if="showUpcoming" class="mt-7">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-[16px] font-bold text-header">
            Upcoming Bookings
            <span class="font-medium text-bodytext text-[13px]">({{ upcomingVisible.length }} active reservations)</span>
          </h2>
          <button
            v-if="featured"
            type="button"
            class="text-[12px] font-semibold text-primary hover:opacity-80"
            @click="downloadIcs(active || featured)"
          >
            Download calendar sync (.ics)
          </button>
        </div>

        <p v-if="upcomingPending && !upcoming.rows.length" class="mt-4 text-sm text-bodytext">Loading…</p>
        <div v-else-if="!upcomingVisible.length" class="mt-4 bg-white rounded-[20px] border border-border px-5 py-10 text-center">
          <p class="text-[14px] font-semibold text-header">No upcoming bookings</p>
          <p class="mt-1 text-[13px] text-bodytext">Find a venue and send a booking request.</p>
          <NuxtLink to="/discover" class="mt-4 inline-flex h-9 px-4 items-center rounded-full border border-border text-[13px] font-semibold">
            Discover venues
          </NuxtLink>
        </div>

        <div v-else class="mt-4 space-y-3">
          <!-- featured -->
          <article v-if="featured" class="bg-white rounded-[24px] border border-border overflow-hidden">
            <div class="p-4 md2:p-5 md2:flex md2:gap-5">
              <div class="relative w-full md2:w-[280px] h-[180px] md2:h-auto md2:min-h-[200px] rounded-2xl overflow-hidden bg-greybg shrink-0">
                <img
                  v-if="bookingImage(featuredCard)"
                  :src="bookingImage(featuredCard)"
                  :alt="venueName(featuredCard)"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <span
                  v-if="daysAwayLabel(bookingStart(featuredCard))"
                  class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-semibold"
                >
                  {{ daysAwayLabel(bookingStart(featuredCard)) }}
                </span>
                <span class="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/55 text-white text-[10px] font-medium">
                  #{{ featuredCard.reference }}
                </span>
              </div>

              <div class="mt-4 md2:mt-0 flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(featuredCard.status)">
                    <i v-if="featuredCard.status === 'confirmed'" class="pi pi-check text-[10px]"></i>
                    {{ featuredCard.statusLabel }}
                  </span>
                  <span v-if="featuredCard.eventTypeLabel" class="px-2 py-0.5 rounded-full bg-greybg text-[11px] font-medium text-header">
                    {{ featuredCard.eventTypeLabel }}
                  </span>
                  <span v-if="featuredCard.dateLabel || bookingStart(featuredCard)" class="text-[12px] text-bodytext">
                    Booked {{ featuredCard.dateLabel || formatDateUS(bookingStart(featuredCard)) }}
                  </span>
                </div>
                <h3 class="mt-2 text-[22px] font-extrabold text-header tracking-tight">{{ venueName(featuredCard) || featuredCard.eventName }}</h3>
                <p v-if="venueLocation(featuredCard)" class="mt-1 text-[13px] text-bodytext inline-flex items-center gap-1">
                  <i class="pi pi-map-marker text-[11px] text-bodytext2"></i>
                  {{ venueLocation(featuredCard) }}
                </p>

                <div class="mt-4 grid grid-cols-1 md2:grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <div class="grid grid-cols-3 gap-2">
                    <div class="rounded-xl bg-greybg px-3 py-2">
                      <p class="text-[11px] text-bodytext">Date &amp; Time</p>
                      <p class="mt-0.5 text-[12px] font-semibold text-header leading-snug">{{ featuredCard.dateLabel || formatDate(bookingStart(featuredCard)) }}</p>
                      <p class="text-[11px] text-bodytext">{{ formatTimeRange(featuredCard) }}</p>
                    </div>
                    <div class="rounded-xl bg-greybg px-3 py-2">
                      <p class="text-[11px] text-bodytext">Duration</p>
                      <p class="mt-0.5 text-[12px] font-semibold text-header">
                        {{ durationHours(featuredCard) ? `${durationHours(featuredCard)} Hours` : "—" }}
                      </p>
                    </div>
                    <div class="rounded-xl bg-greybg px-3 py-2">
                      <p class="text-[11px] text-bodytext">Capacity</p>
                      <p class="mt-0.5 text-[12px] font-semibold text-header">
                        {{ guestCount(featuredCard) ? `${guestCount(featuredCard)} guests confirmed` : "—" }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2 md2:w-[180px] shrink-0">
                    <button
                      v-if="featuredCard.canPay"
                      type="button"
                      class="h-10 px-4 rounded-full bg-brand-gradient-soft text-white text-[13px] font-semibold disabled:opacity-60"
                      :disabled="!!paying"
                      @click="payPrimary"
                    >
                      {{ paying ? "Starting…" : `Pay ${naira(payAmount)}` }}
                    </button>
                    <button
                      type="button"
                      class="h-10 px-4 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg inline-flex items-center justify-center gap-1.5"
                      @click="openDossier(featured)"
                    >
                      <i class="pi pi-eye text-[12px]"></i>
                      View Details
                    </button>
                    <NuxtLink
                      :to="{ path: '/messages', query: { bookingId: featuredCard.id } }"
                      class="h-10 px-4 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg inline-flex items-center justify-center gap-1.5"
                    >
                      <i class="pi pi-comment text-[12px]"></i>
                      Message Host
                    </NuxtLink>
                    <details class="relative">
                      <summary class="h-9 list-none cursor-pointer text-center text-[12px] font-medium text-bodytext hover:text-header">
                        More Actions
                      </summary>
                      <div class="absolute right-0 mt-1 w-44 rounded-xl border border-border bg-white shadow-lg p-1 z-10">
                        <button type="button" class="w-full text-left px-3 py-2 rounded-lg text-[12px] hover:bg-greybg" @click="downloadIcs(featuredCard)">
                          Download .ics
                        </button>
                        <button
                          v-if="featuredCard.canCancel"
                          type="button"
                          class="w-full text-left px-3 py-2 rounded-lg text-[12px] text-[#DC2626] hover:bg-[#FEF2F2]"
                          @click="openCancel"
                        >
                          Cancel booking
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 md2:px-5 pb-4">
              <div class="flex flex-wrap gap-2 text-[11px]">
                <span
                  v-for="step in paymentProgress(featuredCard)"
                  :key="step.key"
                  class="inline-flex items-center gap-1 font-medium"
                  :class="step.done ? 'text-[#16A34A]' : step.current ? 'text-primary' : 'text-bodytext2'"
                >
                  <i v-if="step.done" class="pi pi-check text-[10px]"></i>
                  {{ step.label }}
                </span>
              </div>
              <div
                v-if="Number(featuredCard.outstandingMinor) > 0"
                class="mt-3 rounded-xl bg-[#FFF4F0] border border-[#FFD4C8] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <p class="text-[12px] text-[#C2410C] font-medium">
                  Remaining balance of {{ naira(featuredCard.outstandingMinor) }} is due
                  <template v-if="nextDueAt">{{ formatDateFull(nextDueAt) }} ({{ daysUntilCopy(nextDueAt) }})</template>
                </p>
                <button
                  type="button"
                  class="text-[12px] font-semibold text-primary inline-flex items-center gap-1 shrink-0"
                  :disabled="!!paying"
                  @click="payPrimary"
                >
                  Pay Balance Now <i class="pi pi-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </article>

          <!-- compact upcoming -->
          <article
            v-for="row in compactUpcoming"
            :key="row.id"
            class="bg-white rounded-[20px] border border-border px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div class="w-full sm:w-[72px] h-[72px] rounded-xl overflow-hidden bg-greybg shrink-0">
              <img v-if="bookingImage(row)" :src="bookingImage(row)" :alt="venueName(row)" class="w-full h-full object-cover" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold" :class="statusClass(row.status)">{{ row.statusLabel }}</span>
                <span v-if="row.eventTypeLabel" class="text-[11px] text-bodytext">{{ row.eventTypeLabel }}</span>
              </div>
              <p class="mt-0.5 text-[15px] font-bold text-header">{{ venueName(row) || row.eventName }}</p>
              <p class="text-[12px] text-bodytext">
                {{ row.dateLabel }}
                <template v-if="row.eventName"> · {{ row.eventName }}</template>
                <template v-if="row.guestCount"> · {{ row.guestCount }} Guests</template>
              </p>
            </div>
            <div class="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                class="h-9 px-3 rounded-full border border-border text-[12px] font-semibold text-header hover:bg-greybg"
                @click="openDossier(row)"
              >
                Manage Booking
              </button>
              <NuxtLink to="/invoices" class="h-9 px-3 rounded-full border border-border text-[12px] font-semibold text-header hover:bg-greybg inline-flex items-center">
                Download Invoice
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <!-- Awaiting confirmation -->
      <section v-if="showPending" class="mt-8">
        <h2 class="text-[16px] font-bold text-header">
          Awaiting Venue Confirmation
          <span class="font-medium text-bodytext text-[13px]">({{ pendingVisible.length }} pending request{{ pendingVisible.length === 1 ? "" : "s" }})</span>
        </h2>

        <p v-if="pendingPending && !pendingList.rows.length" class="mt-4 text-sm text-bodytext">Loading…</p>
        <div v-else-if="!pendingVisible.length" class="mt-4 bg-white rounded-[20px] border border-border px-5 py-8 text-center text-[13px] text-bodytext">
          No pending requests.
        </div>

        <article
          v-for="row in pendingVisible"
          :key="row.id"
          class="mt-3 rounded-[20px] border border-dashed border-[#FFD4C8] bg-[#FFFBF8] p-4 md2:p-5"
        >
          <div class="flex flex-col md2:flex-row md2:items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#FFF1ED] text-primary flex items-center justify-center shrink-0">
              <i class="pi pi-hourglass text-[16px]"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded-full bg-[#FFF1ED] text-primary text-[11px] font-semibold">Pending Review</span>
                <span v-if="row.respondBy || row.reviewDueAt" class="text-[11px] text-primary font-medium">
                  Owner has {{ countdownTo(row.respondBy || row.reviewDueAt) }}
                </span>
              </div>
              <p class="mt-1 text-[18px] font-extrabold text-header">{{ venueName(row) || row.eventName }}</p>
              <p class="text-[13px] text-bodytext">
                {{ row.dateLabel }}
                <template v-if="row.eventTypeLabel"> · {{ row.eventTypeLabel }}</template>
                <template v-if="row.guestCount"> · {{ row.guestCount }} Guests</template>
              </p>
              <div class="mt-3 flex flex-wrap gap-3 text-[11px]">
                <span
                  v-for="step in pendingProgress(row)"
                  :key="step.key"
                  class="font-medium"
                  :class="step.done ? 'text-[#16A34A]' : step.current ? 'text-primary' : 'text-bodytext2'"
                >
                  {{ step.label }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 shrink-0">
              <NuxtLink
                :to="{ path: '/messages', query: { bookingId: row.id } }"
                class="h-9 px-3 rounded-full border border-border bg-white text-[12px] font-semibold text-header inline-flex items-center gap-1.5"
              >
                Message Host
              </NuxtLink>
              <button
                type="button"
                class="h-9 px-3 rounded-full border border-[#FFD4C8] bg-white text-[12px] font-semibold text-primary"
                @click="withdraw(row)"
              >
                Withdraw Request
              </button>
            </div>
          </div>
        </article>
      </section>

      <!-- Past -->
      <section v-if="showPast" class="mt-8">
        <h2 class="text-[16px] font-bold text-header">Past</h2>
        <p v-if="pastPending && !past.rows.length" class="mt-4 text-sm text-bodytext">Loading…</p>
        <div v-else-if="!pastVisible.length" class="mt-4 bg-white rounded-[20px] border border-border px-5 py-8 text-center text-[13px] text-bodytext">
          No past bookings.
        </div>
        <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NuxtLink
            v-for="row in pastVisible"
            :key="row.id"
            :to="`/bookings/${row.reference}`"
            class="bg-white rounded-[20px] border border-border p-3 flex gap-3 hover:shadow-sm"
          >
            <div class="w-[72px] h-[72px] rounded-xl overflow-hidden bg-greybg shrink-0">
              <img v-if="bookingImage(row)" :src="bookingImage(row)" alt="" class="w-full h-full object-cover" />
            </div>
            <div class="min-w-0">
              <p class="text-[11px] text-bodytext">{{ row.statusLabel }} · {{ row.dateLabel }}</p>
              <p class="text-[14px] font-bold text-header truncate">{{ venueName(row) || row.eventName }}</p>
              <p class="text-[12px] text-bodytext truncate">{{ row.eventName }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Cancelled -->
      <section v-if="showCancelled" class="mt-8">
        <h2 class="text-[16px] font-bold text-header">Cancelled</h2>
        <p v-if="cancelledPending && !cancelled.rows.length" class="mt-4 text-sm text-bodytext">Loading…</p>
        <div v-else-if="!cancelledVisible.length" class="mt-4 bg-white rounded-[20px] border border-border px-5 py-8 text-center text-[13px] text-bodytext">
          No cancelled bookings.
        </div>
        <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NuxtLink
            v-for="row in cancelledVisible"
            :key="row.id"
            :to="`/bookings/${row.reference}`"
            class="bg-white rounded-[20px] border border-border p-3 flex gap-3 hover:shadow-sm"
          >
            <div class="w-[72px] h-[72px] rounded-xl overflow-hidden bg-greybg shrink-0">
              <img v-if="bookingImage(row)" :src="bookingImage(row)" alt="" class="w-full h-full object-cover" />
            </div>
            <div class="min-w-0">
              <p class="text-[11px] text-bodytext">{{ row.statusLabel }} · {{ row.dateLabel }}</p>
              <p class="text-[14px] font-bold text-header truncate">{{ venueName(row) || row.eventName }}</p>
              <p class="text-[12px] text-bodytext truncate">{{ row.eventName }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Dossier (second half of the same page) -->
      <div v-if="showDossier" class="mt-10">
        <p v-if="activePending && !active" class="text-sm text-bodytext">Loading workspace…</p>
        <BookingsBookingDossier
          v-else-if="active"
          :booking="active"
          :past="past.rows.slice(0, 2)"
          :past-total="past.total || past.rows.length"
          :messages="thread.rows"
          :sending="sending"
          :paying="paying"
          :cancel-loading="cancelLoading"
          @pay="pay"
          @cancel="openCancel"
          @message="goMessage"
          @send-message="sendMessage"
        />
      </div>
    </div>

    <Modal v-if="cancelOpen" :max-width="500" @close="cancelOpen = false">
      <div class="px-6 py-4">
        <h2 class="text-[18px] font-bold text-header">{{ withdrawTarget ? "Withdraw this request?" : "Cancel this booking?" }}</h2>
        <p class="mt-2 text-[13px] text-bodytext">
          {{ preview?.policy?.title }} policy · {{ preview?.hoursBefore }}h before the event.
        </p>
        <div class="mt-4 rounded-xl bg-greybg px-4 py-3 text-[13px] space-y-1">
          <div class="flex justify-between"><span class="text-bodytext">Paid so far</span><span class="font-semibold text-header">{{ naira(preview?.amountPaidMinor) }}</span></div>
          <div class="flex justify-between"><span class="text-bodytext">Refund</span><span class="font-semibold text-[#16A34A]">{{ naira(preview?.refundMinor) }}</span></div>
          <p class="pt-1 text-[12px] text-bodytext">{{ preview?.explanation }}</p>
        </div>
        <label class="block mt-4">
          <span class="text-[13px] font-medium text-header">Reason <span class="text-primary">*</span></span>
          <textarea
            v-model="cancelReason"
            rows="3"
            maxlength="500"
            class="mt-1 w-full rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
            :placeholder="withdrawTarget ? 'Let the venue know why you’re withdrawing' : 'Let the venue know why you’re cancelling'"
          ></textarea>
        </label>
        <div class="mt-5 flex justify-end gap-2">
          <button type="button" class="h-10 px-4 rounded-full border border-border text-[13px] font-semibold" @click="cancelOpen = false">
            Keep booking
          </button>
          <button
            type="button"
            class="h-10 px-4 rounded-full bg-[#DC2626] text-white text-[13px] font-semibold disabled:opacity-60"
            :disabled="cancelling || !cancelReason.trim()"
            @click="confirmCancel"
          >
            {{ cancelling ? "Please wait…" : withdrawTarget ? "Withdraw request" : "Cancel booking" }}
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
useHead({ title: "My Bookings" });

const route = useRoute();
const router = useRouter();

const TAB_KEYS = ["upcoming", "pending", "past", "cancelled"];
const tab = ref(TAB_KEYS.includes(String(route.query.tab)) ? String(route.query.tab) : "upcoming");
const search = ref("");
const selectedRef = ref("");

const { data: dash } = useResource(() => api.get("/me/dashboard"), { initial: null });
const { data: invoices } = useResource(
  () => api.get("/me/invoices", { page: 1, invoicesPage: 1 }),
  { initial: { schedule: [], payments: { rows: [] }, invoices: { rows: [] } } }
);
const { data: upcoming, pending: upcomingPending } = useResource(
  () => api.get("/me/bookings", { tab: "upcoming", page: 1, limit: 20, search: search.value.trim() || undefined }),
  { watch: [search], initial: { rows: [], total: 0 }, debounce: 250 }
);
const { data: pendingList, pending: pendingPending } = useResource(
  () => api.get("/me/bookings", { tab: "pending", page: 1, limit: 20, search: search.value.trim() || undefined }),
  { watch: [search], initial: { rows: [], total: 0 }, debounce: 250 }
);
const { data: past, pending: pastPending } = useResource(
  () => api.get("/me/bookings", { tab: "past", page: 1, limit: 12, search: search.value.trim() || undefined }),
  { watch: [search], initial: { rows: [], total: 0 }, debounce: 250 }
);
const { data: cancelled, pending: cancelledPending } = useResource(
  () => api.get("/me/bookings", { tab: "cancelled", page: 1, limit: 20, search: search.value.trim() || undefined }),
  { watch: [search], initial: { rows: [], total: 0 }, debounce: 250 }
);

const { data: convos, refresh: refreshConvos } = useResource(
  () => api.get("/conversations/mine", { limit: 50 }, { toast: false }),
  { initial: { rows: [] } }
);

function matches(row) {
  const q = search.value.trim().toLowerCase();
  if (!q) return true;
  const blob = [row.eventName, row.reference, venueName(row), row.statusLabel, row.eventTypeLabel].filter(Boolean).join(" ").toLowerCase();
  return blob.includes(q);
}

const upcomingVisible = computed(() => (upcoming.value?.rows ?? []).filter(matches));
const pendingVisible = computed(() => (pendingList.value?.rows ?? []).filter(matches));
const pastVisible = computed(() => (past.value?.rows ?? []).filter(matches));
const cancelledVisible = computed(() => (cancelled.value?.rows ?? []).filter(matches));

const featured = computed(() => {
  const rows = upcomingVisible.value;
  return rows.find((r) => r.canPay) || rows[0] || null;
});
const compactUpcoming = computed(() => upcomingVisible.value.filter((r) => r.id !== featured.value?.id));

const showUpcoming = computed(() => tab.value === "upcoming");
const showPending = computed(() => tab.value === "pending");
const showPast = computed(() => tab.value === "past");
const showCancelled = computed(() => tab.value === "cancelled");
const showDossier = computed(() => tab.value === "upcoming");

const counts = computed(() => ({
  upcoming: dash.value?.counts?.upcoming ?? upcoming.value?.total ?? 0,
  pending: dash.value?.counts?.pending ?? pendingList.value?.total ?? 0,
  past: dash.value?.counts?.completed ?? past.value?.total ?? 0,
  cancelled: dash.value?.counts?.cancelled ?? cancelled.value?.total ?? 0,
  payment: (invoices.value?.schedule ?? []).filter((s) => Number(s.outstandingMinor) > 0).length,
}));

const tabs = [
  { key: "upcoming", label: "Upcoming" },
  { key: "pending", label: "Pending" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

function chipClass(t) {
  if (tab.value === t.key) return "bg-primary text-white border-primary";
  return "bg-white text-header border-border hover:bg-greybg";
}

function setTab(key) {
  tab.value = key;
  router.replace({ query: { ...route.query, tab: key } });
}

const nextDue = computed(() => {
  const sched = invoices.value?.schedule ?? [];
  const due = sched.filter((s) => Number(s.outstandingMinor) > 0);
  return due[0] || null;
});

const kpis = computed(() => {
  const firstUp = featured.value || upcomingVisible.value[0];
  const nextIso = firstUp ? bookingStart(firstUp) : null;
  const away = nextIso ? daysAway(nextIso) : null;
  const unread = dash.value?.unreadMessages ?? 0;
  return [
    {
      label: "Upcoming Events",
      value: counts.value.upcoming,
      hint: away !== null && away >= 0 ? `Next in ${away} days` : "No dates locked in",
      hintClass: "text-bodytext",
      icon: "pi-calendar",
      iconWrap: "bg-greybg",
      iconColor: "text-header",
    },
    {
      label: "Events Completed",
      value: counts.value.past,
      hint: counts.value.past ? "100% verified" : "None yet",
      hintClass: "text-[#16A34A]",
      icon: "pi-check-circle",
      iconWrap: "bg-[#EAF8F0]",
      iconColor: "text-[#16A34A]",
    },
    {
      label: "Payment Due",
      value: counts.value.payment,
      hint: nextDue.value ? `${naira(nextDue.value.outstandingMinor)} ${daysUntilCopy(nextDue.value.milestones?.find((m) => !m.paid)?.dueAt || nextDue.value.startAt)}` : "You’re all paid up",
      hintClass: counts.value.payment ? "text-primary" : "text-bodytext",
      icon: "pi-credit-card",
      iconWrap: "bg-white",
      iconColor: "text-primary",
      hot: counts.value.payment > 0,
    },
    {
      label: "Unread Messages",
      value: unread,
      hint: unread ? "From your venue hosts" : "You’re all caught up",
      hintClass: "text-bodytext",
      icon: "pi-comment",
      iconWrap: "bg-greybg",
      iconColor: "text-header",
    },
  ];
});

const activeKey = computed(
  () =>
    selectedRef.value ||
    featured.value?.reference ||
    featured.value?.id ||
    pendingVisible.value[0]?.reference ||
    pendingVisible.value[0]?.id ||
    ""
);
const { data: active, pending: activePending, refresh } = useResource(
  () => (activeKey.value ? api.get(`/me/bookings/${encodeURIComponent(activeKey.value)}`) : Promise.resolve(null)),
  { watch: [activeKey] }
);

const featuredCard = computed(() => {
  const a = active.value;
  const f = featured.value;
  if (a && f && (a.reference === f.reference || a.id === f.id)) return a;
  return f || a || {};
});

const payAmount = computed(() => {
  const b = featuredCard.value;
  const opt = b.payOptions?.[0];
  return opt?.amountMinor ?? b.outstandingMinor ?? b.totalMinor;
});
const nextDueAt = computed(() => {
  const b = featuredCard.value;
  const m = (b.paymentSchedule || []).find((x) => !x.paid && x.status !== "paid" && x.dueAt);
  return m?.dueAt || b.nextPaymentDueAt || null;
});

const conversation = computed(() => {
  const id = active.value?.id;
  if (!id) return null;
  return (convos.value?.rows ?? []).find((c) => c.bookingId === id) || null;
});
const threadId = computed(() => conversation.value?.id || "");
const { data: thread, refresh: refreshThread } = useResource(
  () => (threadId.value ? api.get(`/conversations/mine/${threadId.value}/messages`, { page: 1, limit: 20 }) : Promise.resolve({ rows: [] })),
  { watch: [threadId], initial: { rows: [] } }
);

function openDossier(row) {
  selectedRef.value = row.reference || row.id;
  nextTick(() => document.getElementById("dossier")?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function goMessage() {
  if (active.value?.id) navigateTo({ path: "/messages", query: { bookingId: active.value.id } });
}

const sending = ref(false);
async function sendMessage(body) {
  if (sending.value) return;
  sending.value = true;
  try {
    if (!threadId.value) {
      const bookingId = active.value?.id || featured.value?.id;
      if (!bookingId) return;
      await api.post("/conversations/mine", { bookingId, body });
      await refreshConvos();
      return;
    }
    await api.post(`/conversations/mine/${threadId.value}/messages`, { body });
    refreshThread();
  } catch {
    /* toast */
  } finally {
    sending.value = false;
  }
}

const paying = ref("");
async function pay(purpose) {
  const id = active.value?.id || featured.value?.id;
  if (!id) return;
  paying.value = purpose;
  try {
    const start = await api.post(`/me/bookings/${encodeURIComponent(id)}/pay`, { purpose });
    if (start?.authorizationUrl) {
      window.location.href = start.authorizationUrl;
      return;
    }
  } catch {
    /* toast */
  }
  paying.value = "";
}
function payPrimary() {
  const opt = featuredCard.value?.payOptions?.[0];
  pay(opt?.purpose || "balance");
}

const cancelOpen = ref(false);
const cancelLoading = ref(false);
const cancelling = ref(false);
const cancelReason = ref("");
const preview = ref(null);
const withdrawTarget = ref(null);

async function openCancelFor(id) {
  cancelLoading.value = true;
  try {
    preview.value = await api.get(`/me/bookings/${encodeURIComponent(id)}/cancellation-preview`);
    cancelReason.value = "";
    cancelOpen.value = true;
  } catch {
    /* toast */
  } finally {
    cancelLoading.value = false;
  }
}
function openCancel() {
  withdrawTarget.value = null;
  const id = active.value?.id || featured.value?.id;
  if (id) openCancelFor(id);
}
function withdraw(row) {
  withdrawTarget.value = row;
  openCancelFor(row.id);
}
async function confirmCancel() {
  const id = withdrawTarget.value?.id || active.value?.id || featured.value?.id;
  if (!id) return;
  cancelling.value = true;
  try {
    await api.post(`/me/bookings/${encodeURIComponent(id)}/cancel`, { reason: cancelReason.value.trim() });
    notifySuccess(withdrawTarget.value ? "Request withdrawn" : "Booking cancelled");
    cancelOpen.value = false;
    refresh();
  } catch {
    /* toast */
  } finally {
    cancelling.value = false;
  }
}
</script>
