<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full">
      <nav class="text-[13px] text-bodytext flex flex-wrap items-center gap-1.5">
        <NuxtLink to="/bookings" class="hover:text-header">My Bookings</NuxtLink>
        <span class="text-bodytext2">›</span>
        <span class="text-header font-medium">{{ b?.reference || route.params.id }}</span>
      </nav>

      <p v-if="pending && !b" class="mt-6 text-sm text-bodytext">Loading booking…</p>
      <div v-else-if="!b" class="mt-6 bg-white rounded-2xl border border-border p-8 text-center max-w-[640px]">
        <p class="text-base font-semibold text-header">Booking not found</p>
        <NuxtLink to="/bookings" class="mt-3 inline-block text-[13px] font-semibold text-primary">Back to My Bookings</NuxtLink>
      </div>

      <template v-else>
        <div
          v-if="verifying"
          class="mt-4 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] text-[13px] px-4 py-3"
        >
          Confirming your payment…
        </div>

        <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold" :class="statusClass(b.status)">{{ b.statusLabel }}</span>
              <span v-if="b.eventTypeLabel" class="text-[12px] text-bodytext">{{ b.eventTypeLabel }}</span>
            </div>
            <h1 class="mt-1 text-[22px] md2:text-[26px] font-extrabold text-header tracking-tight">{{ b.eventName }}</h1>
            <p class="mt-0.5 text-[13px] text-bodytext">
              <NuxtLink :to="`/discover/${b.venue?.slug}`" class="font-medium text-header hover:text-primary">{{ b.venue?.name }}</NuxtLink>
              · {{ b.dateLabel }} · {{ b.timeLabel }} · {{ b.guestCount }} guests · {{ b.paymentLabel }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <NuxtLink
              :to="{ path: '/messages', query: { bookingId: b.id } }"
              class="h-10 px-4 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg inline-flex items-center gap-1.5"
            >
              <i class="pi pi-comment text-[12px]"></i>
              Message Host
            </NuxtLink>
            <button
              v-if="canReview"
              type="button"
              class="h-10 px-4 rounded-full bg-primary text-white text-[13px] font-semibold hover:bg-primary-dark"
              @click="reviewOpen = true"
            >
              Leave a review
            </button>
          </div>
        </div>

        <div class="mt-8">
          <BookingsBookingDossier
            :booking="b"
            :past="past.rows.slice(0, 2)"
            :past-total="past.total || past.rows.length"
            :messages="thread.rows"
            :sending="sending"
            :paying="paying"
            :cancel-loading="cancelLoading"
            @pay="pay"
            @cancel="openCancel"
            @message="navigateTo({ path: '/messages', query: { bookingId: b.id } })"
            @send-message="sendMessage"
          />
        </div>
      </template>
    </div>

    <Modal v-if="cancelOpen" :max-width="500" @close="cancelOpen = false">
      <div class="px-6 py-4">
        <h2 class="text-[18px] font-bold text-header">Cancel this booking?</h2>
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
            placeholder="Let the venue know why you’re cancelling"
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
            {{ cancelling ? "Cancelling…" : "Cancel booking" }}
          </button>
        </div>
      </div>
    </Modal>

    <Modal v-if="reviewOpen" :max-width="600" @close="reviewOpen = false">
      <form class="px-6 py-4" @submit.prevent="submitReview">
        <h2 class="text-[18px] font-bold text-header">Review {{ b?.venue?.name }}</h2>
        <p class="mt-1 text-[13px] text-bodytext">Your review helps other planners choose well.</p>

        <div class="mt-4">
          <p class="text-[13px] font-medium text-header">Overall rating</p>
          <div class="mt-1 flex gap-1">
            <button v-for="n in 5" :key="n" type="button" class="text-[22px]" :aria-label="`${n} stars`" @click="review.rating = n">
              <i class="pi" :class="n <= review.rating ? 'pi-star-fill text-[#F5A524]' : 'pi-star text-[#D1D5DB]'"></i>
            </button>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-3">
          <div v-for="dim in DIMENSIONS" :key="dim.key">
            <p class="text-[12px] text-bodytext">{{ dim.label }}</p>
            <div class="flex gap-0.5">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                class="text-[15px]"
                :aria-label="`${dim.label} ${n}`"
                @click="review.dimensions[dim.key] = n"
              >
                <i class="pi" :class="n <= review.dimensions[dim.key] ? 'pi-star-fill text-[#F5A524]' : 'pi-star text-[#D1D5DB]'"></i>
              </button>
            </div>
          </div>
        </div>

        <label class="block mt-4">
          <span class="text-[13px] font-medium text-header">Title</span>
          <input v-model="review.title" type="text" maxlength="191" class="mt-1 w-full h-10 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary" />
        </label>
        <label class="block mt-3">
          <span class="text-[13px] font-medium text-header">Your review <span class="text-primary">*</span></span>
          <textarea
            v-model="review.body"
            rows="4"
            maxlength="4000"
            class="mt-1 w-full rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
            placeholder="What went well? What should other planners know? (at least 20 characters)"
          ></textarea>
        </label>
        <p v-if="reviewError" class="mt-2 text-[12px] text-red-500">{{ reviewError }}</p>

        <div class="mt-5 flex justify-end gap-2">
          <button type="button" class="h-10 px-4 rounded-full border border-border text-[13px] font-semibold" @click="reviewOpen = false">
            Not now
          </button>
          <button
            type="submit"
            class="h-10 px-5 rounded-full bg-primary text-white text-[13px] font-semibold disabled:opacity-60"
            :disabled="reviewSubmitting || !reviewValid"
          >
            {{ reviewSubmitting ? "Posting…" : "Post review" }}
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const id = computed(() => String(route.params.id));

const { data: b, pending, refresh } = useResource(() => api.get(`/me/bookings/${encodeURIComponent(id.value)}`), {
  watch: [id],
});
const { data: past } = useResource(
  () => api.get("/me/bookings", { tab: "past", page: 1, limit: 4 }),
  { initial: { rows: [], total: 0 } }
);
const { data: convos, refresh: refreshConvos } = useResource(
  () => api.get("/conversations/mine", { limit: 50 }, { toast: false }),
  { initial: { rows: [] } }
);

useHead(() => ({ title: b.value ? `${b.value.eventName} · ${b.value.reference}` : "Booking" }));

const conversation = computed(() => (convos.value?.rows ?? []).find((c) => c.bookingId === b.value?.id) || null);
const threadId = computed(() => conversation.value?.id || "");
const { data: thread, refresh: refreshThread } = useResource(
  () => (threadId.value ? api.get(`/conversations/mine/${threadId.value}/messages`, { page: 1, limit: 20 }) : Promise.resolve({ rows: [] })),
  { watch: [threadId], initial: { rows: [] } }
);

const sending = ref(false);
async function sendMessage(body) {
  if (sending.value) return;
  sending.value = true;
  try {
    if (!threadId.value) {
      if (!b.value?.id) return;
      await api.post("/conversations/mine", { bookingId: b.value.id, body });
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
  paying.value = purpose;
  try {
    const start = await api.post(`/me/bookings/${encodeURIComponent(b.value.id)}/pay`, { purpose });
    if (start?.authorizationUrl) {
      window.location.href = start.authorizationUrl;
      return;
    }
  } catch {
    /* toast shown */
  }
  paying.value = "";
}

const verifying = ref(false);
onMounted(async () => {
  const payRef = route.query.payment || route.query.reference || route.query.trxref;
  if (!payRef) return;
  verifying.value = true;
  try {
    const result = await api.post(`/payments/${encodeURIComponent(String(payRef))}/verify`);
    if (result?.status === "success") notifySuccess("Payment received — thank you!");
  } catch {
    /* toast shown */
  } finally {
    verifying.value = false;
    router.replace({ query: {} });
    refresh();
  }
});

const cancelOpen = ref(false);
const cancelLoading = ref(false);
const cancelling = ref(false);
const cancelReason = ref("");
const preview = ref(null);

async function openCancel() {
  cancelLoading.value = true;
  try {
    preview.value = await api.get(`/me/bookings/${encodeURIComponent(b.value.id)}/cancellation-preview`);
    cancelReason.value = "";
    cancelOpen.value = true;
  } catch {
    /* toast shown */
  } finally {
    cancelLoading.value = false;
  }
}

async function confirmCancel() {
  cancelling.value = true;
  try {
    await api.post(`/me/bookings/${encodeURIComponent(b.value.id)}/cancel`, { reason: cancelReason.value.trim() });
    notifySuccess("Booking cancelled");
    cancelOpen.value = false;
    refresh();
  } catch {
    /* toast shown */
  } finally {
    cancelling.value = false;
  }
}

const DIMENSIONS = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "location", label: "Location" },
  { key: "communication", label: "Communication" },
  { key: "value", label: "Value" },
  { key: "accuracy", label: "Accuracy" },
  { key: "amenities", label: "Amenities" },
];

const { data: myReviews, refresh: refreshReviews } = useResource(() => api.get("/reviews/mine", { limit: 100 }, { toast: false }), {
  initial: { rows: [] },
});
const alreadyReviewed = computed(() => (myReviews.value?.rows ?? []).some((r) => r.bookingId === b.value?.id));
const canReview = computed(() => b.value?.status === "completed" && !alreadyReviewed.value);

const reviewOpen = ref(false);
const reviewSubmitting = ref(false);
const reviewError = ref("");
const review = reactive({
  rating: 5,
  title: "",
  body: "",
  dimensions: { cleanliness: 5, location: 5, communication: 5, value: 5, accuracy: 5, amenities: 5 },
});
const reviewValid = computed(() => review.rating >= 1 && review.body.trim().length >= 20);

async function submitReview() {
  reviewError.value = "";
  reviewSubmitting.value = true;
  try {
    await api.post("/reviews/mine", {
      bookingId: b.value.id,
      rating: review.rating,
      title: review.title.trim() || null,
      body: review.body.trim(),
      dimensionRatings: { ...review.dimensions },
    });
    notifySuccess("Thanks — your review is posted");
    reviewOpen.value = false;
    refreshReviews();
  } catch (e) {
    reviewError.value = e?.fields ? Object.values(e.fields)[0] : e?.message || "";
  } finally {
    reviewSubmitting.value = false;
  }
}
</script>
