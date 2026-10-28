<template>
  <section v-if="booking" id="dossier" class="scroll-mt-24">
    <div class="flex flex-col md2:flex-row md2:items-center md2:justify-between gap-3">
      <div>
        <div class="flex flex-wrap items-center gap-2 text-[11px]">
          <span class="px-2 py-0.5 rounded-md bg-primary text-white font-bold tracking-wide uppercase">
            Active workspace
          </span>
          <span class="text-bodytext">Ref: {{ booking.reference }}</span>
        </div>
        <h2 class="mt-2 text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">
          {{ venueName(booking) }} Dossier
        </h2>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="h-9 px-3 rounded-full border border-border bg-white text-[12px] font-semibold text-header hover:bg-greybg inline-flex items-center gap-1.5"
          @click="print"
        >
          <i class="pi pi-print text-[11px]"></i>
          Print Summary
        </button>
        <button
          type="button"
          class="h-9 px-3 rounded-full border border-border bg-white text-[12px] font-semibold text-header hover:bg-greybg inline-flex items-center gap-1.5"
          @click="share"
        >
          <i class="pi pi-share-alt text-[11px]"></i>
          Share Access
        </button>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-1 md2:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
      <div class="space-y-4 min-w-0">
        <!-- specs -->
        <article class="bg-white rounded-[20px] border border-border p-5">
          <h3 class="text-[15px] font-bold text-header flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center">
              <i class="pi pi-clock text-[11px]"></i>
            </span>
            Booking Specifications &amp; Setup
          </h3>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div v-for="spec in specs" :key="spec.label" class="rounded-xl bg-greybg px-3 py-2.5">
              <p class="text-[11px] text-bodytext">{{ spec.label }}</p>
              <p class="mt-0.5 text-[13px] font-semibold text-header">{{ spec.value }}</p>
            </div>
          </div>
          <p v-if="notesOf(booking)" class="mt-3 rounded-xl bg-greybg px-3 py-2.5 text-[12px] text-bodytext leading-relaxed">
            <span class="font-semibold text-header">Client Notes:</span>
            {{ notesOf(booking) }}
          </p>

          <div v-if="booking.segments?.length" class="mt-4 space-y-2">
            <div
              v-for="seg in booking.segments"
              :key="seg.id"
              class="rounded-xl border border-border px-3 py-2.5 flex items-center justify-between gap-3"
            >
              <div class="min-w-0">
                <p class="text-[13px] font-semibold text-header">
                  Day {{ (seg.index ?? 0) + 1 }}<template v-if="seg.title">: {{ seg.title }}</template>
                </p>
                <p class="text-[12px] text-bodytext">
                  {{ formatDateFull(seg.startAt) }} · {{ seg.timeLabel }} · {{ seg.hours }}h
                  <template v-if="seg.space?.name"> · {{ seg.space.name }}</template>
                  <template v-if="seg.guestCount"> · {{ seg.guestCount }} guests</template>
                  <template v-if="seg.layout"> · {{ seg.layout }}</template>
                </p>
              </div>
              <p class="text-[13px] font-bold text-header shrink-0">{{ naira(seg.subtotalMinor || seg.spaceAmountMinor) }}</p>
            </div>
          </div>
        </article>

        <!-- payment schedule -->
        <article class="bg-white rounded-[20px] border border-border p-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-[15px] font-bold text-header flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center">
                  <i class="pi pi-wallet text-[11px]"></i>
                </span>
                Payment Schedule &amp; Balance
              </h3>
              <p class="mt-1 text-[12px] text-bodytext">Held safely in Venpadi Escrow until 24 hours post-event.</p>
            </div>
            <p v-if="booking.totals?.totalMinor != null" class="text-[13px] font-bold text-primary shrink-0">
              Total: {{ naira(booking.totals.totalMinor) }}
            </p>
          </div>

          <div v-if="booking.paymentSchedule?.length" class="mt-4 overflow-x-auto">
            <table class="w-full text-[12px]">
              <thead class="text-bodytext2">
                <tr class="border-b border-border">
                  <th class="text-left font-medium py-2 pr-3">Installment / Item</th>
                  <th class="text-left font-medium py-2 pr-3">Due Date</th>
                  <th class="text-left font-medium py-2 pr-3">Amount</th>
                  <th class="text-right font-medium py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in booking.paymentSchedule" :key="m.key || m.label" class="border-b border-border last:border-0">
                  <td class="py-2.5 pr-3 font-medium text-header">{{ m.label }}</td>
                  <td class="py-2.5 pr-3 text-bodytext">{{ m.dueAt ? formatDate(m.dueAt) : "—" }}</td>
                  <td class="py-2.5 pr-3 font-semibold text-header">{{ naira(m.amountMinor) }}</td>
                  <td class="py-2.5 text-right">
                    <span class="font-semibold" :class="milestoneStatusClass(m)">{{ milestoneStatusLabel(m) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px]">
            <div class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">Paid</dt>
              <dd class="font-semibold text-[#16A34A]">{{ naira(booking.amountPaidMinor) }}</dd>
            </div>
            <div class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">Outstanding</dt>
              <dd class="font-semibold text-header">{{ naira(booking.outstandingMinor) }}</dd>
            </div>
            <div v-if="booking.totals?.subtotalMinor != null" class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">Subtotal</dt>
              <dd class="font-medium text-header">{{ naira(booking.totals.subtotalMinor) }}</dd>
            </div>
            <div v-if="booking.totals?.serviceFeeMinor" class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">Service fee</dt>
              <dd class="font-medium text-header">{{ naira(booking.totals.serviceFeeMinor) }}</dd>
            </div>
            <div v-if="booking.totals?.vatMinor" class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">VAT</dt>
              <dd class="font-medium text-header">{{ naira(booking.totals.vatMinor) }}</dd>
            </div>
            <div v-if="booking.totals?.cautionMinor" class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">Caution</dt>
              <dd class="font-medium text-header">{{ naira(booking.totals.cautionMinor) }}</dd>
            </div>
            <div v-if="booking.refundMinor" class="flex justify-between gap-2 col-span-2 sm:col-span-1">
              <dt class="text-bodytext">Refunded</dt>
              <dd class="font-medium text-header">{{ naira(booking.refundMinor) }}</dd>
            </div>
          </dl>

          <div v-if="booking.canPay && booking.payOptions?.length" class="mt-4 rounded-xl bg-greybg p-3">
            <p class="text-[12px] text-bodytext">
              Pay remaining {{ naira(booking.outstandingMinor) }} with Venpadi Pay.
            </p>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="(opt, i) in booking.payOptions"
                :key="opt.purpose"
                type="button"
                class="h-9 px-4 rounded-full text-[12px] font-semibold disabled:opacity-60"
                :class="i === 0 ? 'bg-brand-gradient-soft text-white' : 'border border-border bg-white text-header'"
                :disabled="!!paying"
                @click="$emit('pay', opt.purpose)"
              >
                {{ paying === opt.purpose ? "Starting…" : `${payLabel(opt.purpose)} · ${naira(opt.amountMinor)}` }}
              </button>
            </div>
          </div>
        </article>

        <!-- contracts -->
        <article class="bg-white rounded-[20px] border border-border p-5">
          <h3 class="text-[15px] font-bold text-header flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center">
              <i class="pi pi-file text-[11px]"></i>
            </span>
            Contracts &amp; Venue Documentation
          </h3>
          <div v-if="documentsOf(booking).length" class="mt-3 space-y-2">
            <div
              v-for="doc in documentsOf(booking)"
              :key="doc.id || doc.name"
              class="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5"
            >
              <i class="pi pi-file text-bodytext"></i>
              <div class="min-w-0 flex-1">
                <p class="text-[13px] font-semibold text-header truncate">{{ doc.name || doc.title }}</p>
                <p class="text-[11px] text-bodytext">{{ doc.meta || doc.sizeLabel || (doc.issuedAt ? formatDate(doc.issuedAt) : "") }}</p>
              </div>
              <a
                v-if="doc.url"
                :href="doc.url"
                target="_blank"
                rel="noopener"
                class="text-bodytext hover:text-header"
                aria-label="Download"
              >
                <i class="pi pi-download text-[13px]"></i>
              </a>
            </div>
          </div>
          <p v-else class="mt-3 text-[13px] text-bodytext">No documents attached yet.</p>
        </article>

        <!-- add-ons -->
        <article v-if="addons.length" class="bg-white rounded-[20px] border border-border p-5">
          <h3 class="text-[15px] font-bold text-header flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center">
              <i class="pi pi-box text-[11px]"></i>
            </span>
            Included Amenities &amp; Add-Ons
          </h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="line in addons"
              :key="line.id || line.name"
              class="inline-flex items-center gap-2 rounded-xl bg-greybg px-3 py-2 text-[12px]"
            >
              <i class="pi pi-check text-[10px] text-bodytext"></i>
              <span class="font-medium text-header">{{ line.name }}</span>
              <span v-if="line.amountMinor" class="font-semibold text-header">{{ naira(line.amountMinor) }}</span>
            </span>
          </div>
        </article>

        <!-- timeline (existing data) -->
        <article v-if="booking.timeline?.length" class="bg-white rounded-[20px] border border-border p-5">
          <h3 class="text-[15px] font-bold text-header">Timeline</h3>
          <ol class="mt-3 space-y-3">
            <li v-for="ev in booking.timeline" :key="ev.id" class="flex gap-3">
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
        </article>

        <!-- next steps -->
        <article v-if="booking.nextSteps?.length" class="bg-[#FFF6F0] rounded-[20px] border border-[#FFD4C8] p-5">
          <h3 class="text-[15px] font-bold text-header">Next steps</h3>
          <div class="mt-3 space-y-3">
            <div v-for="(step, i) in booking.nextSteps" :key="step.key || i" class="flex gap-3">
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
        </article>

        <!-- policy -->
        <article v-if="booking.policy?.copy" class="bg-white rounded-[20px] border border-border p-5">
          <h3 class="text-[15px] font-bold text-header">{{ booking.policy?.title }} cancellation policy</h3>
          <p class="mt-2 text-[13px] text-bodytext leading-relaxed">{{ booking.policy?.copy }}</p>
          <p v-if="booking.refundPreview && booking.canCancel" class="mt-3 text-[12px] text-header bg-greybg rounded-xl px-3 py-2">
            If you cancel now: refund {{ naira(booking.refundPreview.refundMinor) }}.
            <span class="text-bodytext">{{ booking.refundPreview.explanation }}</span>
          </p>
          <p v-if="booking.cancellation?.reason" class="mt-3 text-[12px] text-bodytext">
            Cancelled {{ booking.cancellation.cancelledAt ? formatDate(booking.cancellation.cancelledAt) : "" }}:
            {{ booking.cancellation.reason }}
          </p>
          <button
            v-if="booking.canCancel"
            type="button"
            class="mt-4 h-10 px-4 rounded-full border border-[#FCA5A5] text-[#DC2626] text-[13px] font-semibold hover:bg-[#FEF2F2] disabled:opacity-60"
            :disabled="cancelLoading"
            @click="$emit('cancel')"
          >
            {{ cancelLoading ? "Checking…" : "Cancel booking" }}
          </button>
        </article>
      </div>

      <!-- right column -->
      <aside class="space-y-4">
        <article class="bg-white rounded-[20px] border border-border p-5">
          <h3 class="text-[15px] font-bold text-header flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#FFF1ED] text-primary flex items-center justify-center">
              <i class="pi pi-calendar text-[11px]"></i>
            </span>
            Key Deadlines
          </h3>
          <ol class="mt-4 space-y-3">
            <li v-for="(d, i) in deadlines" :key="d.key" class="flex gap-3">
              <span
                class="w-8 h-8 rounded-lg flex flex-col items-center justify-center shrink-0 leading-none text-[10px] font-bold"
                :class="i === 0 ? 'bg-primary text-white' : 'bg-greybg text-header'"
              >
                {{ d.day }}
              </span>
              <div class="min-w-0">
                <p class="text-[13px] font-semibold text-header">{{ d.title }}</p>
                <p class="text-[11px] text-bodytext">{{ d.meta }}</p>
                <p v-if="d.hint" class="text-[11px] font-medium" :class="d.hintClass">{{ d.hint }}</p>
              </div>
            </li>
          </ol>
          <p v-if="!deadlines.length" class="mt-3 text-[13px] text-bodytext">No upcoming deadlines.</p>
        </article>

        <article v-if="host" class="bg-white rounded-[20px] border border-border p-5">
          <p class="text-[11px] font-semibold tracking-wide text-bodytext2 uppercase">Venue manager</p>
          <div class="mt-3 flex items-center gap-3">
            <span class="w-11 h-11 rounded-full overflow-hidden bg-greybg shrink-0">
              <img v-if="host.logoUrl || host.avatarUrl" :src="host.logoUrl || host.avatarUrl" alt="" class="w-full h-full object-cover" />
            </span>
            <div class="min-w-0">
              <p class="text-[14px] font-bold text-header">{{ host.displayName || host.name }}</p>
              <p class="text-[12px] text-bodytext">{{ host.role || host.title || venueName(booking) }}</p>
              <p v-if="host.responseTime" class="text-[11px] text-bodytext2">{{ host.responseTime }}</p>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <a
              v-if="host.phone"
              :href="`tel:${host.phone}`"
              class="text-[13px] font-semibold text-header inline-flex items-center gap-1"
            >
              <i class="pi pi-phone text-[11px] text-primary"></i>
              {{ host.phone }}
            </a>
            <button
              type="button"
              class="ml-auto h-8 px-3 rounded-full border border-border text-[12px] font-semibold text-header hover:bg-greybg"
              @click="$emit('message')"
            >
              Direct Line
            </button>
          </div>
        </article>

        <article class="bg-white rounded-[20px] border border-border p-5">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-[14px] font-bold text-header">Event Readiness Checklist</h3>
            <span class="text-[12px] font-semibold text-primary">{{ checklistDone }}/{{ checklist.length }} Done</span>
          </div>
          <div class="mt-2 h-1.5 rounded-full bg-[#FFE4DA] overflow-hidden">
            <div class="h-full bg-primary rounded-full" :style="{ width: checklistPct + '%' }"></div>
          </div>
          <ul class="mt-3 space-y-2">
            <li v-for="item in checklist" :key="item.label" class="flex items-start gap-2 text-[13px]">
              <i
                class="pi mt-0.5 text-[12px]"
                :class="item.done ? 'pi-check-square text-primary' : 'pi-stop text-bodytext2'"
              ></i>
              <span :class="item.done ? 'text-header' : 'text-bodytext'">{{ item.label }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white rounded-[20px] border border-border p-5">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-[14px] font-bold text-header flex items-center gap-2">
              <i class="pi pi-comment text-primary text-[12px]"></i>
              Host Thread
            </h3>
            <button type="button" class="text-[12px] font-semibold text-primary" @click="$emit('message')">
              Full chat →
            </button>
          </div>
          <div v-if="!messages.length" class="mt-3 text-[12px] text-bodytext">No messages on this booking yet.</div>
          <div v-else class="mt-3 space-y-2 max-h-[220px] overflow-y-auto slim-scrollbar">
            <div
              v-for="m in messages"
              :key="m.id"
              class="rounded-xl px-3 py-2 text-[12px]"
              :class="m.mine ? 'bg-[#FFF1ED] ml-6' : 'bg-greybg mr-6'"
            >
              <p class="font-semibold text-header">{{ m.mine ? "You" : host?.displayName || host?.name || "Host" }}</p>
              <p class="mt-0.5 text-bodytext leading-relaxed">{{ m.body }}</p>
              <p class="mt-1 text-[10px] text-bodytext2">{{ formatTime(m.createdAt) }}</p>
            </div>
          </div>
          <form class="mt-3 flex items-center gap-2" @submit.prevent="send">
            <input
              v-model="draft"
              type="text"
              class="flex-1 h-9 rounded-full border border-border px-3 text-[12px] outline-none focus:border-primary"
              :placeholder="`Type a quick reply${host?.displayName ? ` to ${host.displayName.split(' ')[0]}` : ''}…`"
            />
            <button
              type="submit"
              class="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50"
              :disabled="sending || !draft.trim()"
              aria-label="Send"
            >
              <i class="pi pi-send text-[11px]"></i>
            </button>
          </form>
        </article>
      </aside>
    </div>

    <!-- past events -->
    <section v-if="past.length" class="mt-8">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-[16px] font-bold text-header">
          Past Events &amp; History
          <span class="font-medium text-bodytext text-[13px]">({{ pastTotal }} bookings completed)</span>
        </h3>
        <NuxtLink to="/bookings?tab=past" class="text-[13px] font-semibold text-primary">View all past receipts</NuxtLink>
      </div>
      <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <article
          v-for="row in past"
          :key="row.id"
          class="bg-white rounded-[20px] border border-border p-3 flex gap-3"
        >
          <div class="w-[72px] h-[72px] rounded-xl overflow-hidden bg-greybg shrink-0">
            <img v-if="bookingImage(row)" :src="bookingImage(row)" :alt="venueName(row)" class="w-full h-full object-cover" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] text-bodytext">{{ row.statusLabel }} · {{ row.dateLabel }}</p>
            <p class="text-[14px] font-bold text-header truncate">{{ venueName(row) || row.eventName }}</p>
            <p class="text-[12px] text-bodytext truncate">
              {{ row.eventName }}<template v-if="row.guestCount"> · {{ row.guestCount }} Guests</template>
            </p>
            <div class="mt-2 flex items-center gap-3">
              <NuxtLink :to="`/bookings/${row.reference}`" class="text-[12px] font-semibold text-header hover:text-primary">
                Rebook
              </NuxtLink>
              <NuxtLink to="/invoices" class="text-[12px] font-semibold text-header hover:text-primary">
                Tax Invoice
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup>
const props = defineProps({
  booking: { type: Object, default: null },
  past: { type: Array, default: () => [] },
  pastTotal: { type: Number, default: 0 },
  messages: { type: Array, default: () => [] },
  sending: { type: Boolean, default: false },
  paying: { type: String, default: "" },
  cancelLoading: { type: Boolean, default: false },
});

const emit = defineEmits(["pay", "cancel", "message", "send-message"]);

const PAY_LABELS = { deposit: "Pay deposit", balance: "Pay balance", full: "Pay in full" };
const payLabel = (p) => PAY_LABELS[p] ?? "Pay";

const draft = ref("");
const host = computed(() => hostOf(props.booking));
const addons = computed(() => flattenAddons(props.booking));

const specs = computed(() => {
  const b = props.booking;
  if (!b) return [];
  const items = [];
  const start = bookingStart(b);
  const end = bookingEnd(b);
  const hours = durationHours(b);
  if (start) items.push({ label: "Access & Setup Time", value: formatTime(start) });
  if (end) items.push({ label: "Event Finish / Teardown", value: formatTime(end) });
  if (b.eventTypeLabel) items.push({ label: "Package / Event", value: b.eventTypeLabel });
  const layout = b.segments?.find((s) => s.layout)?.layout;
  if (layout) items.push({ label: "Seating Arrangement", value: layout });
  const spaceNames = (b.segments || []).map((s) => s.space?.name).filter(Boolean);
  if (spaceNames.length) items.push({ label: "Spaces", value: [...new Set(spaceNames)].join(", ") });
  const guests = guestCount(b);
  if (guests) items.push({ label: "Capacity", value: `${guests} guests confirmed` });
  if (hours) items.push({ label: "Duration", value: `${hours} Hours` });
  return items;
});

const deadlines = computed(() => {
  const b = props.booking;
  if (!b) return [];
  const rows = [];
  for (const m of b.paymentSchedule ?? []) {
    if (!m.dueAt || m.status === "paid" || m.paid) continue;
    rows.push({
      key: m.key || m.label,
      day: dateDay(m.dueAt),
      title: formatDateUS(m.dueAt),
      meta: `${m.label} (${naira(m.amountMinor)})`,
      hint: daysUntilCopy(m.dueAt),
      hintClass: "text-primary",
    });
  }
  const eventAt = bookingStart(b);
  if (eventAt) {
    rows.push({
      key: "event",
      day: dateDay(eventAt),
      title: formatDateUS(eventAt),
      meta: "Event Execution Day",
      hint: b.timeLabel ? `Doors ${b.timeLabel}` : formatTime(eventAt),
      hintClass: "text-[#16A34A]",
    });
  }
  return rows.slice(0, 4);
});

const checklist = computed(() => {
  const b = props.booking;
  if (!b) return [];
  return [
    { label: "Venue reservation confirmed", done: ["confirmed", "approved", "completed"].includes(b.status) },
    { label: "Sign venue hire agreement", done: documentsOf(b).some((d) => d.signed || d.status === "signed") || ["confirmed", "completed"].includes(b.status) },
    { label: `Clear ${naira(b.outstandingMinor)} balance payment`, done: !(Number(b.outstandingMinor) > 0) },
  ];
});
const checklistDone = computed(() => checklist.value.filter((i) => i.done).length);
const checklistPct = computed(() => (checklist.value.length ? Math.round((checklistDone.value / checklist.value.length) * 100) : 0));

function dateDay(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", timeZone: "Africa/Lagos" });
}

function milestoneStatusClass(m) {
  if (m.paid || m.status === "paid" || m.status === "success") return "text-[#16A34A]";
  if (m.overdue || m.status === "overdue") return "text-[#DC2626]";
  if (m.status === "due" || m.status === "pending") return "text-primary";
  return "text-bodytext";
}

function milestoneStatusLabel(m) {
  if (m.paid || m.status === "paid") return m.receiptLabel || "Paid";
  if (m.overdue || m.status === "overdue") return "Overdue";
  if (m.dueAt) return daysUntilCopy(m.dueAt) || m.status;
  return m.status || "—";
}

function print() {
  if (import.meta.client) window.print();
}

async function share() {
  const url = import.meta.client ? window.location.href : "";
  try {
    if (navigator.share) {
      await navigator.share({ title: `${venueName(props.booking)} Dossier`, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    notifySuccess("Link copied");
  } catch {
    /* user cancelled share */
  }
}

function send() {
  const body = draft.value.trim();
  if (!body) return;
  emit("send-message", body);
  draft.value = "";
}
</script>
