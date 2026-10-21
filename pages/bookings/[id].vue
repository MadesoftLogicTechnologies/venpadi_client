<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1180px]">
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

        <!-- header -->
        <section class="mt-4 bg-white rounded-2xl border border-border p-4 md2:p-5 md2:flex md2:items-center md2:gap-5">
          <div class="w-full md2:w-[150px] h-[140px] md2:h-[100px] rounded-xl overflow-hidden bg-greybg shrink-0">
            <img v-if="b.venue?.imageUrl" :src="b.venue.imageUrl" :alt="b.venue.name" class="w-full h-full object-cover" />
          </div>
          <div class="mt-3 md2:mt-0 flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-[22px] md2:text-[24px] font-extrabold text-header tracking-tight">{{ b.eventName }}</h1>
              <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold" :class="statusClass(b.status)">
                {{ b.statusLabel }}
              </span>
            </div>
            <p class="mt-1 text-[13px] text-bodytext">
              <NuxtLink :to="`/discover/${b.venue?.slug}`" class="font-medium text-header hover:text-primary">{{ b.venue?.name }}</NuxtLink>
              · {{ b.dateLabel }} · {{ b.timeLabel }}
            </p>
            <p class="mt-0.5 text-[12px] text-bodytext2">
              {{ b.reference }} · {{ b.eventTypeLabel }} · {{ b.guestCount }} guests · {{ b.paymentLabel }}
            </p>
          </div>
          <div class="mt-4 md2:mt-0 flex flex-wrap gap-2 shrink-0">
            <NuxtLink
              :to="{ path: '/messages', query: { bookingId: b.id } }"
              class="h-10 px-4 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg inline-flex items-center gap-1.5"
            >
              <i class="pi pi-comment text-[12px]"></i>
              Message venue
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
        </section>

        <div class="mt-5 grid grid-cols-1 md2:grid-cols-[minmax(0,1fr)_340px] gap-5 items-start">
          <div class="space-y-5 min-w-0">
            <!-- next steps -->
            <section v-if="b.nextSteps?.length" class="bg-[#FFF6F0] rounded-2xl border border-[#FFD4C8] p-5">
              <h2 class="text-[15px] font-bold text-header">Next steps</h2>
              <div class="mt-3 space-y-3">
                <div v-for="(step, i) in b.nextSteps" :key="step.key || i" class="flex gap-3">
                  <span class="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">{{ i + 1 }}</span>
                  <div class="min-w-0">
                    <p class="text-[14px] font-semibold text-header">{{ step.title }}</p>
                    <p class="text-[13px] text-bodytext">
                      {{ step.description }}
                      <template v-if="step.when"> · by {{ formatDateTime(step.when) }}</template>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- days -->
            <section
              v-for="seg in b.segments"
              :key="seg.id"
              class="bg-white rounded-2xl border border-border overflow-hidden"
            >
              <div class="px-5 py-4 border-b border-border md2:flex md2:items-center md2:justify-between gap-3">
                <div>
                  <p class="text-[15px] font-bold text-header">Day {{ seg.index + 1 }}: {{ seg.title }}</p>
                  <p class="text-[12px] text-bodytext">{{ formatDateFull(seg.startAt) }} · {{ seg.timeLabel }} · {{ seg.hours }}h</p>
                </div>
                <span v-if="seg.completed" class="mt-2 md2:mt-0 inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EAF8F0] text-[#16A34A]">
                  Completed
                </span>
              </div>
              <div class="px-5 py-4 flex gap-4 items-center">
                <div class="w-[96px] h-[72px] rounded-xl overflow-hidden bg-greybg shrink-0">
                  <img v-if="seg.space?.imageUrl" :src="seg.space.imageUrl" :alt="seg.space?.name" class="w-full h-full object-cover" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-[14px] font-bold text-header">{{ seg.space?.name }}</p>
                  <p class="text-[12px] text-bodytext">{{ seg.space?.meta }}</p>
                  <p class="text-[12px] text-bodytext">
                    {{ seg.guestCount }} guests<template v-if="seg.layout"> · {{ seg.layout }}</template>
                  </p>
                </div>
                <p class="text-[15px] font-extrabold text-header">{{ naira(seg.spaceAmountMinor) }}</p>
              </div>
              <div v-if="seg.fees?.length || seg.addons?.length" class="px-5 pb-4 space-y-1.5 text-[13px]">
                <div v-for="line in [...(seg.fees ?? []), ...(seg.addons ?? [])]" :key="line.id" class="flex justify-between gap-3">
                  <span class="text-bodytext">{{ line.name }} <span class="text-bodytext2">· {{ line.unitLabel }}</span></span>
                  <span class="font-medium text-header">{{ naira(line.amountMinor) }}</span>
                </div>
              </div>
              <div class="px-5 py-3 bg-greybg flex justify-between text-[13px]">
                <span class="text-bodytext">Day {{ seg.index + 1 }} subtotal</span>
                <span class="font-bold text-header">{{ naira(seg.subtotalMinor) }}</span>
              </div>
            </section>

            <!-- timeline -->
            <section v-if="b.timeline?.length" class="bg-white rounded-2xl border border-border p-5">
              <h2 class="text-[15px] font-bold text-header">Timeline</h2>
              <ol class="mt-4 space-y-4">
                <li v-for="ev in b.timeline" :key="ev.id" class="flex gap-3">
                  <span
                    class="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
                    :class="ev.current ? 'bg-primary ring-4 ring-[#FFE4DA]' : 'bg-[#D1D5DB]'"
                  ></span>
                  <div>
                    <p class="text-[13px] font-semibold text-header">{{ ev.title }}</p>
                    <p class="text-[12px] text-bodytext">{{ ev.description }}</p>
                    <p class="text-[11px] text-bodytext2">{{ formatDateTime(ev.at) }}</p>
                  </div>
                </li>
              </ol>
            </section>
          </div>

          <!-- money -->
          <aside class="space-y-5">
            <section class="bg-white rounded-2xl border border-border p-5">
              <h2 class="text-[15px] font-bold text-header">Payment summary</h2>
              <dl class="mt-3 space-y-2 text-[13px]">
                <div class="flex justify-between gap-3">
                  <dt class="text-bodytext">Subtotal</dt>
                  <dd class="font-medium text-header">{{ naira(b.totals.subtotalMinor) }}</dd>
                </div>
                <div v-if="b.totals.discountMinor" class="flex justify-between gap-3">
                  <dt class="text-bodytext">Discount</dt>
                  <dd class="font-medium text-header">−{{ naira(b.totals.discountMinor) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-bodytext">Service fee ({{ pct(b.totals.serviceFeeBps / 100, 1) }})</dt>
                  <dd class="font-medium text-header">{{ naira(b.totals.serviceFeeMinor) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-bodytext">VAT ({{ pct(b.totals.vatBps / 100, 1) }})</dt>
                  <dd class="font-medium text-header">{{ naira(b.totals.vatMinor) }}</dd>
                </div>
                <div v-if="b.totals.cautionMinor" class="flex justify-between gap-3">
                  <dt class="text-bodytext">Refundable caution</dt>
                  <dd class="font-medium text-header">{{ naira(b.totals.cautionMinor) }}</dd>
                </div>
                <div class="flex justify-between gap-3 pt-2 border-t border-border">
                  <dt class="font-semibold text-header">Total</dt>
                  <dd class="font-extrabold text-header">{{ naira(b.totals.totalMinor) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-bodytext">Paid</dt>
                  <dd class="font-semibold text-[#16A34A]">{{ naira(b.amountPaidMinor) }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-bodytext">Outstanding</dt>
                  <dd class="font-semibold text-header">{{ naira(b.outstandingMinor) }}</dd>
                </div>
                <div v-if="b.refundMinor" class="flex justify-between gap-3">
                  <dt class="text-bodytext">Refunded</dt>
                  <dd class="font-semibold text-header">{{ naira(b.refundMinor) }}</dd>
                </div>
              </dl>

              <div v-if="b.canPay && b.payOptions?.length" class="mt-4 space-y-2">
                <button
                  v-for="(opt, i) in b.payOptions"
                  :key="opt.purpose"
                  type="button"
                  class="w-full h-11 rounded-full text-[13px] font-semibold disabled:opacity-60"
                  :class="i === 0 ? 'bg-brand-gradient-soft text-white' : 'border border-border bg-white text-header hover:bg-greybg'"
                  :disabled="!!paying"
                  @click="pay(opt.purpose)"
                >
                  {{ paying === opt.purpose ? "Starting payment…" : `${PAY_LABELS[opt.purpose] ?? "Pay"} · ${naira(opt.amountMinor)}` }}
                </button>
                <p class="text-center text-[11px] text-bodytext2">Secure checkout via Venpadi Pay</p>
              </div>
            </section>

            <section v-if="b.paymentSchedule?.length" class="bg-white rounded-2xl border border-border p-5">
              <h2 class="text-[15px] font-bold text-header">Payment schedule</h2>
              <div class="mt-3 space-y-3">
                <div v-for="m in b.paymentSchedule" :key="m.key" class="flex items-start justify-between gap-3 text-[13px]">
                  <div>
                    <p class="font-medium text-header">{{ m.label }}</p>
                    <p class="text-[12px] text-bodytext">{{ m.dueAt ? `Due ${formatDate(m.dueAt)}` : "After the event" }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-header">{{ naira(m.amountMinor) }}</p>
                    <span class="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize" :class="statusClass(m.status)">
                      {{ m.status }}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white rounded-2xl border border-border p-5">
              <h2 class="text-[15px] font-bold text-header">{{ b.policy?.title }} cancellation policy</h2>
              <p class="mt-2 text-[13px] text-bodytext leading-relaxed">{{ b.policy?.copy }}</p>
              <p v-if="b.refundPreview && b.canCancel" class="mt-3 text-[12px] text-header bg-greybg rounded-xl px-3 py-2">
                If you cancel now: refund {{ naira(b.refundPreview.refundMinor) }}.
                <span class="text-bodytext">{{ b.refundPreview.explanation }}</span>
              </p>
              <p v-if="b.cancellation?.reason" class="mt-3 text-[12px] text-bodytext">
                Cancelled {{ b.cancellation.cancelledAt ? formatDate(b.cancellation.cancelledAt) : "" }}: {{ b.cancellation.reason }}
              </p>
              <button
                v-if="b.canCancel"
                type="button"
                class="mt-4 w-full h-10 rounded-full border border-[#FCA5A5] text-[#DC2626] text-[13px] font-semibold hover:bg-[#FEF2F2] disabled:opacity-60"
                :disabled="cancelLoading"
                @click="openCancel"
              >
                {{ cancelLoading ? "Checking…" : "Cancel booking" }}
              </button>
            </section>
          </aside>
        </div>
      </template>
    </div>

    <!-- cancel modal -->
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

    <!-- review modal -->
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

useHead(() => ({ title: b.value ? `${b.value.eventName} · ${b.value.reference}` : "Booking" }));

const PAY_LABELS = { deposit: "Pay deposit", balance: "Pay balance", full: "Pay in full" };

/* ── pay ─────────────────────────────────────────────────────────────────── */
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

// Real gateway return: /bookings/<ref>?payment=<reference> (Paystack also adds ?reference=/&trxref=).
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

/* ── cancel ──────────────────────────────────────────────────────────────── */
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

/* ── review ──────────────────────────────────────────────────────────────── */
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
