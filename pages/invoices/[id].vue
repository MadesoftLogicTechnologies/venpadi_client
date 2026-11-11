<template>
  <div class="px-4 md2:px-8 py-5 md2:py-6">
    <p v-if="!pending && !invoice" class="text-sm text-bodytext">
      Invoice not found.
      <NuxtLink to="/invoices" class="text-primary font-semibold">Back to invoices</NuxtLink>
    </p>

    <template v-else-if="invoice">
      <p class="text-[12px] text-bodytext no-print">
        <NuxtLink to="/dashboards" class="hover:text-header">Dashboard</NuxtLink>
        <span class="text-bodytext2"> › </span>
        <NuxtLink to="/invoices" class="hover:text-header">Invoices</NuxtLink>
        <span class="text-bodytext2"> › </span>
        <span class="text-header font-medium">{{ displayNumber }}</span>
      </p>

      <div class="mt-2 flex flex-col md2:flex-row md2:items-center md2:justify-between gap-3">
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-[26px] md2:text-[30px] font-extrabold text-header tracking-tight">
            Invoice {{ displayNumber }}
          </h1>
          <span
            v-if="invoice.statusLabel"
            class="px-2.5 py-[3px] rounded-full text-[12px] font-semibold"
            :class="invoiceBadgeClass"
          >
            {{ invoice.statusLabel }}
          </span>
        </div>
        <div class="flex items-center gap-2 no-print">
          <button
            type="button"
            class="h-10 px-3 rounded-full text-[13px] font-semibold text-header inline-flex items-center gap-1.5 hover:bg-white"
            @click="printInvoice"
          >
            <i class="pi pi-print text-[13px]"></i>
            Print
          </button>
          <button
            v-if="invoicePdf"
            type="button"
            class="h-10 px-4 rounded-full bg-header text-white text-[13px] font-semibold inline-flex items-center gap-1.5"
            @click="downloadPdf"
          >
            <i class="pi pi-download text-[12px]"></i>
            Download PDF
          </button>
        </div>
      </div>

      <div class="mt-5 grid grid-cols-1 md2:grid-cols-[minmax(0,1fr)_260px] gap-6 lg:gap-8 items-start">
        <article class="invoice-sheet bg-white rounded-[20px] px-5 py-7 md2:px-10 md2:py-10">
          <div class="flex items-start justify-between gap-6">
            <div class="min-w-0">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-[10px] bg-header text-white flex items-center justify-center shrink-0">
                  <i class="pi pi-building text-[14px]"></i>
                </span>
                <p class="text-[16px] font-bold text-header">{{ issuer.name }}</p>
              </div>
              <div v-if="issuer.lines.length" class="mt-3 text-[12px] text-bodytext leading-[1.7]">
                <p v-for="(line, i) in issuer.lines" :key="i">{{ line }}</p>
              </div>
            </div>
            <div class="text-right shrink-0 pt-0.5">
              <p class="text-[28px] md2:text-[32px] font-extrabold tracking-[0.22em] text-[#E8EAED] leading-none">INVOICE</p>
              <div class="mt-4 space-y-1.5 text-[11px]">
                <p v-if="issuedLabel" class="uppercase tracking-wide text-bodytext2">
                  Date issued
                  <span class="ml-1 font-semibold normal-case tracking-normal text-header">{{ issuedLabel }}</span>
                </p>
                <p v-if="dueLabel" class="uppercase tracking-wide text-bodytext2">
                  Due date
                  <span
                    class="ml-1 font-semibold normal-case tracking-normal"
                    :class="invoice.status === 'overdue' ? 'text-primary' : 'text-header'"
                  >
                    {{ dueLabel }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10 text-[13px]">
            <div v-if="billTo.lines.length || billTo.name">
              <p class="text-[11px] uppercase tracking-[0.12em] text-bodytext2 font-semibold">Billed to</p>
              <p v-if="billTo.name" class="mt-2.5 text-[18px] font-extrabold text-header leading-[1.2] whitespace-pre-line">{{ billTo.name }}</p>
              <p v-for="(line, i) in billTo.lines" :key="i" class="text-bodytext leading-[1.65]">{{ line }}</p>
            </div>
            <div v-if="venue.lines.length || venue.name">
              <p class="text-[11px] uppercase tracking-[0.12em] text-bodytext2 font-semibold">Venue details</p>
              <p v-if="venue.name" class="mt-2.5 text-[15px] font-bold text-header leading-snug">{{ venue.name }}</p>
              <p v-for="(line, i) in venue.lines" :key="i" class="text-bodytext leading-[1.65]">{{ line }}</p>
            </div>
          </div>

          <table class="mt-12 w-full text-[13px]">
            <thead>
              <tr class="text-[11px] uppercase tracking-[0.12em] text-bodytext2 border-b border-border">
                <th class="text-left font-semibold py-2.5 pr-3">Description</th>
                <th class="text-left font-semibold py-2.5 px-3 w-[88px]">Qty</th>
                <th class="text-right font-semibold py-2.5 px-3 w-[120px]">Unit price</th>
                <th class="text-right font-semibold py-2.5 pl-3 w-[120px]">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in lineItems" :key="i" class="border-b border-border align-top">
                <td class="py-4 pr-3">
                  <p class="font-bold text-header">{{ item.description }}</p>
                  <p v-if="item.detail" class="mt-0.5 text-[12px] text-bodytext leading-snug">{{ item.detail }}</p>
                </td>
                <td class="py-4 px-3 text-bodytext whitespace-normal leading-snug">{{ item.qty }}</td>
                <td class="py-4 px-3 text-right text-bodytext whitespace-nowrap">{{ item.unitPriceMinor != null ? naira(item.unitPriceMinor) : "—" }}</td>
                <td class="py-4 pl-3 text-right font-bold text-header whitespace-nowrap">{{ naira(item.amountMinor) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="!lineItems.length" class="py-6 text-[13px] text-bodytext">No line items on this invoice.</p>

          <dl class="mt-8 ml-auto max-w-[260px] space-y-2 text-[13px]">
            <div v-if="invoice.subtotalMinor != null" class="flex justify-between gap-8">
              <dt class="text-bodytext">Subtotal</dt>
              <dd class="text-header">{{ naira(invoice.subtotalMinor) }}</dd>
            </div>
            <div v-if="invoice.discountMinor" class="flex justify-between gap-8">
              <dt class="text-bodytext">Discount</dt>
              <dd class="text-header">−{{ naira(invoice.discountMinor) }}</dd>
            </div>
            <div v-if="invoice.taxMinor" class="flex justify-between gap-8">
              <dt class="text-bodytext">{{ taxLabel }}</dt>
              <dd class="text-header">{{ naira(invoice.taxMinor) }}</dd>
            </div>
            <div v-if="paidMinor" class="flex justify-between gap-8">
              <dt class="text-bodytext">Paid</dt>
              <dd class="text-[#16A34A]">{{ naira(paidMinor) }}</dd>
            </div>
            <div class="flex justify-between gap-8 pt-2.5 border-t border-border">
              <dt class="font-semibold text-header">{{ balanceMinor > 0 ? "Total Due" : "Total" }}</dt>
              <dd class="font-extrabold text-header">{{ naira(balanceMinor > 0 ? balanceMinor : totalMinor) }}</dd>
            </div>
          </dl>

          <p v-if="invoice.customNote" class="mt-8 text-[13px] text-bodytext">{{ invoice.customNote }}</p>
          <p v-if="invoice.terms" class="mt-2 text-[12px] text-bodytext2">{{ invoice.terms }}</p>
        </article>

        <aside class="no-print md2:pt-2">
          <section v-if="timeline.length">
            <h2 class="text-[14px] font-bold text-header flex items-center gap-2">
              <i class="pi pi-clock text-[12px] text-bodytext"></i>
              Payment Timeline
            </h2>
            <ol class="mt-4 space-y-5">
              <li v-for="(ev, i) in timeline" :key="i" class="flex gap-3">
                <span class="mt-[7px] w-2 h-2 rounded-full shrink-0" :class="ev.dot"></span>
                <div class="min-w-0">
                  <p class="text-[13px] font-semibold leading-snug" :class="ev.tone">{{ ev.title }}</p>
                  <p v-if="ev.meta" class="mt-0.5 text-[12px] text-bodytext leading-snug">{{ ev.meta }}</p>
                </div>
              </li>
            </ol>
          </section>

          <NuxtLink
            v-if="payTo && balanceMinor > 0"
            :to="payTo"
            class="mt-8 w-full h-12 rounded-full bg-brand-gradient-soft text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,77,23,0.25)]"
          >
            Pay {{ naira(balanceMinor) }} Now
            <i class="pi pi-arrow-right text-[11px]"></i>
          </NuxtLink>

          <section v-if="dispute" class="mt-8 rounded-2xl bg-white border border-border p-4">
            <div class="flex items-center justify-between gap-2">
              <h2 class="text-[13px] font-bold text-header">Dispute</h2>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="disputeBadgeClass">
                {{ dispute.statusLabel || dispute.status }}
              </span>
            </div>
            <p class="mt-2 text-[12px] font-semibold text-header">{{ dispute.reasonLabel || dispute.reason }}</p>
            <p v-if="dispute.note" class="mt-1 text-[12px] text-bodytext leading-snug whitespace-pre-line">{{ dispute.note }}</p>
            <p class="mt-2 text-[11px] text-bodytext2">Raised {{ formatDateUS(dispute.createdAt) }}</p>
            <div v-if="dispute.vendorResponse" class="mt-3 pt-3 border-t border-border">
              <p class="text-[11px] uppercase tracking-wide font-semibold text-bodytext2">Venue response</p>
              <p class="mt-1 text-[12px] text-header leading-snug whitespace-pre-line">{{ dispute.vendorResponse }}</p>
              <p v-if="dispute.resolvedAt" class="mt-1 text-[11px] text-bodytext2">{{ formatDateUS(dispute.resolvedAt) }}</p>
            </div>
            <p v-else-if="dispute.status === 'open'" class="mt-3 text-[12px] text-bodytext">
              The venue has been asked to respond. Funds for this booking are held while the dispute is open.
            </p>
          </section>

          <button
            v-if="canDispute"
            type="button"
            class="mt-4 w-full text-center text-[13px] font-medium text-bodytext hover:text-header"
            @click="openDispute"
          >
            Dispute Invoice
          </button>
          <p class="mt-2 text-center text-[12px] text-bodytext">
            Need help?
            <NuxtLink to="/help" class="font-semibold text-header hover:text-primary">Contact Support</NuxtLink>
          </p>
        </aside>
      </div>
    </template>

    <Modal v-if="disputeOpen" :max-width="500" @close="disputeOpen = false">
      <form class="px-6 py-4" @submit.prevent="submitDispute">
        <h2 class="text-[18px] font-bold text-header">Dispute invoice {{ displayNumber }}</h2>
        <p class="mt-2 text-[13px] text-bodytext">
          The venue is notified and asked to respond. While the dispute is open, the money for this booking is
          not released to the venue.
        </p>
        <label class="block mt-4">
          <span class="text-[13px] font-medium text-header">Reason <span class="text-primary">*</span></span>
          <select
            v-model="disputeForm.reason"
            class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary bg-white"
          >
            <option v-for="r in DISPUTE_REASONS" :key="r.key" :value="r.key">{{ r.label }}</option>
          </select>
        </label>
        <label class="block mt-4">
          <span class="text-[13px] font-medium text-header">What’s wrong? <span class="text-primary">*</span></span>
          <textarea
            v-model="disputeForm.note"
            rows="4"
            maxlength="2000"
            class="mt-1 w-full rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
            placeholder="Describe the problem so the venue can put it right"
          ></textarea>
          <span class="mt-1 flex justify-between text-[11px]" :class="noteTooShort ? 'text-bodytext2' : 'text-bodytext'">
            <span>At least 10 characters.</span>
            <span>{{ disputeForm.note.trim().length }}/2000</span>
          </span>
        </label>
        <p v-if="disputeError" class="mt-2 text-[12px] text-[#DC2626]">{{ disputeError }}</p>
        <div class="mt-5 flex justify-end gap-2">
          <button type="button" class="h-10 px-4 rounded-full border border-border text-[13px] font-semibold" @click="disputeOpen = false">
            Cancel
          </button>
          <button
            type="submit"
            class="h-10 px-4 rounded-full bg-header text-white text-[13px] font-semibold disabled:opacity-60"
            :disabled="disputing || noteTooShort"
          >
            {{ disputing ? "Sending…" : "Raise dispute" }}
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
useHead({ title: "Invoice" });

const route = useRoute();
const { match } = useInvoicePreview();

const pending = ref(true);
const invoice = ref(null);
const schedule = ref(null);
const payments = ref([]);
usePageLoading(pending);

function asDate(value) {
  if (!value) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value;
}

function splitAddress(address) {
  if (!address) return [];
  const text = String(address).trim();
  if (!text) return [];
  if (text.includes("\n")) return text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const idx = text.indexOf(", ");
  if (idx > 8) return [text.slice(0, idx), text.slice(idx + 2)];
  return [text];
}

onMounted(async () => {
  const id = route.params.id;
  const passed = match(id);
  if (passed?.invoice) {
    invoice.value = passed.invoice;
    schedule.value = passed.schedule || null;
    payments.value = passed.payments || [];
    pending.value = false;
    useHead({ title: `Invoice ${passed.invoice.number || id}` });
    // The list row carries no dispute; only the detail read does.
    api
      .get(`/me/invoices/${encodeURIComponent(id)}`, undefined, { toast: false })
      .then((fresh) => (dispute.value = fresh?.dispute ?? null))
      .catch(() => {});
    return;
  }
  try {
    invoice.value = await api.get(`/me/invoices/${encodeURIComponent(id)}`);
    dispute.value = invoice.value?.dispute ?? null;
    schedule.value = null;
    payments.value = [];
  } catch {
    invoice.value = null;
  } finally {
    pending.value = false;
    if (invoice.value) useHead({ title: `Invoice ${invoice.value.number || id}` });
  }
});

const displayNumber = computed(() => {
  const n = invoice.value?.number;
  return n ? `#${String(n).replace(/^#/, "")}` : "—";
});

const issuedLabel = computed(() => {
  const iso = asDate(invoice.value?.issueDate);
  return iso ? formatDateUS(iso) : "";
});
const dueLabel = computed(() => {
  const iso = asDate(invoice.value?.dueDate);
  return iso ? formatDateUS(iso) : "";
});

const invoiceBadgeClass = computed(() => {
  const status = invoice.value?.status;
  if (status === "overdue") return "bg-[#FDE7E1] text-primary";
  if (status === "paid" || status === "success") return "bg-[#EAF8F0] text-[#16A34A]";
  if (status === "pending" || status === "sent" || status === "due") return "bg-[#FFF1E8] text-[#C2410C]";
  return statusClass(status);
});

const issuer = computed(() => {
  const src = invoice.value?.issuer || {};
  const name = src.name || invoice.value?.businessName || "Venpadi";
  const lines = [...splitAddress(src.address), src.email, src.phone, src.vatNumber].filter(Boolean);
  return { name, lines };
});

const billTo = computed(() => {
  const src = invoice.value?.billTo || {};
  const first = src.firstName;
  const last = src.lastName;
  const name = first || last ? [first, last].filter(Boolean).join("\n") : src.name || "";
  const lines = [src.company, src.email, src.phone, src.address].filter(Boolean);
  return { name, lines };
});

const venue = computed(() => {
  const inv = invoice.value || {};
  const sch = schedule.value || {};
  const name = inv.venueName || sch.venueName || "";
  const lines = [
    inv.spaceName || inv.hallName || sch.spaceName || sch.eventName,
    inv.bookingReference || sch.reference ? `Booking ID: #${String(inv.bookingReference || sch.reference).replace(/^#/, "")}` : "",
  ].filter((v, i, arr) => v && arr.indexOf(v) === i && v !== name);
  return { name, lines };
});

const lineItems = computed(() => {
  const inv = invoice.value || {};
  if (inv.items?.length) {
    return inv.items.map((item) => {
      const qtyNum = Number(item.quantity) || 0;
      const unit = item.unitPriceMinor != null
        ? item.unitPriceMinor
        : qtyNum > 0
          ? Math.round((Number(item.amountMinor) || 0) / qtyNum)
          : item.amountMinor;
      const qty = [item.quantity || (item.unitLabel ? "" : "1"), item.unitLabel].filter(Boolean).join(" ") || "1";
      return {
        description: item.description || item.label || "Item",
        detail: [item.group, item.detail].filter(Boolean).join(" · "),
        qty,
        unitPriceMinor: unit,
        amountMinor: item.amountMinor,
      };
    });
  }
  const milestones = inv.milestones?.length ? inv.milestones : schedule.value?.milestones;
  if (milestones?.length) {
    return milestones.map((m) => ({
      description: m.label || "Milestone",
      detail: m.description || (m.dueAt || m.dueDate ? `Due ${formatDateUS(asDate(m.dueAt || m.dueDate))}` : ""),
      qty: "1",
      unitPriceMinor: m.amountMinor,
      amountMinor: m.amountMinor,
    }));
  }
  if (inv.totalMinor != null) {
    return [
      {
        description: inv.venueName || inv.businessName || "Invoice",
        detail: inv.bookingReference || "",
        qty: "1",
        unitPriceMinor: inv.totalMinor,
        amountMinor: inv.totalMinor,
      },
    ];
  }
  return [];
});

const totalMinor = computed(() => Number(invoice.value?.totalMinor ?? schedule.value?.totalMinor) || 0);
const balanceMinor = computed(() => Number(invoice.value?.balanceMinor ?? schedule.value?.outstandingMinor) || 0);
const paidMinor = computed(() => {
  if (invoice.value?.amountPaidMinor != null) return Number(invoice.value.amountPaidMinor) || 0;
  if (totalMinor.value && balanceMinor.value != null) return Math.max(0, totalMinor.value - balanceMinor.value);
  return 0;
});
const taxLabel = computed(() => {
  const bps = invoice.value?.taxBps;
  if (bps) return `Tax (${pct(bps / 100, 1)} VAT)`;
  return "Tax";
});

const payTo = computed(() => {
  const bookingRef = invoice.value?.bookingReference || schedule.value?.reference;
  return bookingRef ? `/bookings/${bookingRef}` : "";
});

function metaWithTime(iso) {
  if (!iso) return "";
  const date = formatDateUS(asDate(iso));
  const raw = String(iso);
  if (raw.includes("T") && !raw.includes("T12:00:00Z")) return `${date} • ${formatTime(iso)}`;
  return date;
}

const timeline = computed(() => {
  const events = [];
  const inv = invoice.value || {};
  if (inv.issueDate) {
    const iso = asDate(inv.issueDate);
    events.push({
      title: "Invoice Generated",
      meta: metaWithTime(iso),
      dot: "bg-header",
      tone: "text-header",
      at: iso,
    });
  }
  const reminderAt = inv.lastReminderAt || inv.remindedAt || inv.reminderSentAt;
  if (reminderAt) {
    events.push({
      title: "Reminder Sent",
      meta: metaWithTime(reminderAt),
      dot: "bg-header",
      tone: "text-header",
      at: reminderAt,
    });
  }
  for (const p of payments.value) {
    if (!p.date) continue;
    events.push({
      title: p.purposeLabel || p.statusLabel || "Payment",
      meta: `${metaWithTime(p.date)}${p.amountMinor != null ? ` · ${naira(p.amountMinor)}` : ""}`,
      dot: p.status === "success" || p.status === "paid" ? "bg-[#16A34A]" : "bg-bodytext2",
      tone: "text-header",
      at: p.date,
    });
  }
  if (inv.status === "overdue") {
    events.push({
      title: "Overdue / Awaiting Payment",
      meta: inv.dueDate ? `Since ${formatDateUS(asDate(inv.dueDate))}` : "",
      dot: "bg-primary",
      tone: "text-primary",
      at: asDate(inv.dueDate) || "9999",
    });
  } else if (inv.status === "paid" || inv.status === "success") {
    events.push({
      title: "Paid",
      meta: "",
      dot: "bg-[#16A34A]",
      tone: "text-[#16A34A]",
      at: "9999",
    });
  } else if (balanceMinor.value > 0) {
    events.push({
      title: "Awaiting Payment",
      meta: inv.dueDate ? `Due ${formatDateUS(asDate(inv.dueDate))}` : "",
      dot: "bg-primary",
      tone: "text-header",
      at: asDate(inv.dueDate) || "9999",
    });
  }
  return events.sort((a, b) => String(a.at).localeCompare(String(b.at)));
});

function printInvoice() {
  window.print();
}
// The API has no invoice PDF yet; Print (browser "Save as PDF") covers it.
// The button stays hidden behind features.invoicePdf until it does.
const invoicePdf = useFeature("invoicePdf");
function downloadPdf() {
  const url = invoice.value?.pdfUrl;
  if (url) window.open(url, "_blank", "noopener");
}
/* ── dispute (C7) ──────────────────────────────────────────────────────────
 * POST /me/invoices/:id/dispute { reason, note (10–2000) }. The API accepts a
 * dispute only on a sent or paid invoice (not draft / void) and only one open
 * dispute at a time, so the button hides in those states rather than
 * offering a request that will be refused. */
const DISPUTE_REASONS = [
  { key: "incorrect_amount", label: "The amount is incorrect" },
  { key: "service_not_rendered", label: "The service was not provided" },
  { key: "duplicate_charge", label: "I was charged twice" },
  { key: "other", label: "Something else" },
];
const dispute = ref(null);
const disputeOpen = ref(false);
const disputing = ref(false);
const disputeError = ref("");
const disputeForm = reactive({ reason: "incorrect_amount", note: "" });
const noteTooShort = computed(() => disputeForm.note.trim().length < 10);

const canDispute = computed(() => {
  const s = invoice.value?.status;
  if (!invoice.value?.id || s === "draft" || s === "void") return false;
  return dispute.value?.status !== "open";
});
const disputeBadgeClass = computed(() => {
  const s = dispute.value?.status;
  if (s === "resolved") return "bg-[#EAF8F0] text-[#16A34A]";
  if (s === "rejected") return "bg-greybg text-header";
  return "bg-[#FFF1E8] text-[#C2410C]";
});

function openDispute() {
  disputeForm.reason = "incorrect_amount";
  disputeForm.note = "";
  disputeError.value = "";
  disputeOpen.value = true;
}

async function submitDispute() {
  if (disputing.value || noteTooShort.value) return;
  disputing.value = true;
  disputeError.value = "";
  try {
    dispute.value = await api.post(
      `/me/invoices/${encodeURIComponent(invoice.value.id)}/dispute`,
      { reason: disputeForm.reason, note: disputeForm.note.trim() },
      { toast: false }
    );
    disputeOpen.value = false;
    notifySuccess("Dispute raised — the venue has been notified");
  } catch (e) {
    // The modal covers the toast outlet, so the reason is shown in place.
    const field = e?.fields ? Object.values(e.fields)[0] : "";
    disputeError.value = field ? `${e.message}: ${field}` : e?.message || "Could not raise the dispute.";
  } finally {
    disputing.value = false;
  }
}
</script>

<style scoped>
.invoice-sheet {
  min-height: 640px;
}
@media print {
  .no-print {
    display: none !important;
  }
  .invoice-sheet {
    min-height: 0;
    border-radius: 0;
    padding: 0;
  }
}
</style>
