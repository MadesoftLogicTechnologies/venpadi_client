<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <p v-if="pending" class="text-sm text-bodytext">Loading invoice…</p>
    <p v-else-if="!invoice" class="text-sm text-bodytext">
      Invoice not found.
      <NuxtLink to="/invoices" class="text-primary font-semibold">Back to invoices</NuxtLink>
    </p>

    <template v-else>
      <p class="text-[12px] text-bodytext no-print">
        <NuxtLink to="/dashboards" class="hover:text-header">Dashboard</NuxtLink>
        <span class="text-bodytext2"> › </span>
        <NuxtLink to="/invoices" class="hover:text-header">Invoices</NuxtLink>
        <span class="text-bodytext2"> › </span>
        <span class="text-header font-medium">{{ displayNumber }}</span>
      </p>

      <div class="mt-2 flex flex-col md2:flex-row md2:items-start md2:justify-between gap-3">
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">
            Invoice {{ displayNumber }}
          </h1>
          <span
            v-if="invoice.statusLabel"
            class="px-2.5 py-1 rounded-full text-[12px] font-semibold"
            :class="statusClass(invoice.status)"
          >
            {{ invoice.statusLabel }}
          </span>
        </div>
        <div class="flex items-center gap-2 no-print">
          <button
            type="button"
            class="h-10 px-4 rounded-lg border border-border bg-white text-[13px] font-semibold text-header inline-flex items-center gap-1.5"
            @click="printInvoice"
          >
            <i class="pi pi-print text-[12px]"></i>
            Print
          </button>
          <button
            type="button"
            class="h-10 px-4 rounded-lg bg-header text-white text-[13px] font-semibold inline-flex items-center gap-1.5"
            @click="downloadPdf"
          >
            <i class="pi pi-download text-[12px]"></i>
            Download PDF
          </button>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-5 items-start">
        <article class="bg-white rounded-[24px] border border-border p-5 md2:p-8">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <AuthVenpadiLogo v-if="issuer.isVenpadi" brand :icon-size="32" text-class="text-[16px] font-bold" />
                <template v-else>
                  <span class="w-9 h-9 rounded-lg bg-header text-white flex items-center justify-center shrink-0">
                    <i class="pi pi-building text-[14px]"></i>
                  </span>
                  <p class="text-[16px] font-bold text-header">{{ issuer.name }}</p>
                </template>
              </div>
              <div v-if="issuer.lines.length" class="mt-3 text-[12px] text-bodytext leading-relaxed space-y-0.5">
                <p v-for="(line, i) in issuer.lines" :key="i">{{ line }}</p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <p class="text-[28px] md2:text-[34px] font-extrabold tracking-[0.18em] text-[#E5E7EB] leading-none">INVOICE</p>
              <dl class="mt-4 text-[12px] space-y-1">
                <div v-if="issuedLabel">
                  <dt class="uppercase tracking-wide text-bodytext2">Date issued</dt>
                  <dd class="font-semibold text-header">{{ issuedLabel }}</dd>
                </div>
                <div v-if="dueLabel">
                  <dt class="uppercase tracking-wide text-bodytext2">Due date</dt>
                  <dd class="font-semibold" :class="invoice.status === 'overdue' ? 'text-primary' : 'text-header'">
                    {{ dueLabel }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[13px]">
            <div v-if="billTo.lines.length || billTo.name">
              <p class="text-[11px] uppercase tracking-wide text-bodytext2 font-semibold">Billed to</p>
              <p v-if="billTo.name" class="mt-2 text-[18px] font-extrabold text-header leading-tight whitespace-pre-line">{{ billTo.name }}</p>
              <p v-for="(line, i) in billTo.lines" :key="i" class="text-bodytext leading-relaxed">{{ line }}</p>
            </div>
            <div v-if="venue.lines.length || venue.name">
              <p class="text-[11px] uppercase tracking-wide text-bodytext2 font-semibold">Venue details</p>
              <p v-if="venue.name" class="mt-2 text-[15px] font-bold text-header">{{ venue.name }}</p>
              <p v-for="(line, i) in venue.lines" :key="i" class="text-bodytext">{{ line }}</p>
            </div>
          </div>

          <table class="mt-10 w-full text-[13px]">
            <thead>
              <tr class="text-[11px] uppercase tracking-wide text-bodytext2 border-b border-border">
                <th class="text-left font-semibold py-2 pr-3">Description</th>
                <th class="text-left font-semibold py-2 px-3 w-[72px]">Qty</th>
                <th class="text-right font-semibold py-2 px-3 w-[120px]">Unit price</th>
                <th class="text-right font-semibold py-2 pl-3 w-[120px]">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in lineItems" :key="i" class="border-b border-border align-top">
                <td class="py-4 pr-3">
                  <p class="font-semibold text-header">{{ item.description }}</p>
                  <p v-if="item.detail" class="text-[12px] text-bodytext">{{ item.detail }}</p>
                </td>
                <td class="py-4 px-3 text-bodytext whitespace-nowrap">{{ item.qty }}</td>
                <td class="py-4 px-3 text-right text-bodytext whitespace-nowrap">{{ item.unitPriceMinor != null ? naira(item.unitPriceMinor) : "—" }}</td>
                <td class="py-4 pl-3 text-right font-bold text-header whitespace-nowrap">{{ naira(item.amountMinor) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="!lineItems.length" class="py-6 text-[13px] text-bodytext">No line items on this invoice.</p>

          <dl class="mt-6 ml-auto max-w-[280px] space-y-2 text-[13px]">
            <div v-if="invoice.subtotalMinor != null" class="flex justify-between gap-6">
              <dt class="text-bodytext">Subtotal</dt>
              <dd class="text-header">{{ naira(invoice.subtotalMinor) }}</dd>
            </div>
            <div v-if="invoice.discountMinor" class="flex justify-between gap-6">
              <dt class="text-bodytext">Discount</dt>
              <dd class="text-header">−{{ naira(invoice.discountMinor) }}</dd>
            </div>
            <div v-if="invoice.taxMinor" class="flex justify-between gap-6">
              <dt class="text-bodytext">{{ taxLabel }}</dt>
              <dd class="text-header">{{ naira(invoice.taxMinor) }}</dd>
            </div>
            <div v-if="paidMinor" class="flex justify-between gap-6">
              <dt class="text-bodytext">Paid</dt>
              <dd class="text-[#16A34A]">{{ naira(paidMinor) }}</dd>
            </div>
            <div class="flex justify-between gap-6 pt-2 border-t border-border">
              <dt class="font-semibold text-header">{{ balanceMinor > 0 ? "Total Due" : "Total" }}</dt>
              <dd class="font-extrabold text-header">{{ naira(balanceMinor > 0 ? balanceMinor : totalMinor) }}</dd>
            </div>
          </dl>

          <p v-if="invoice.customNote" class="mt-8 text-[13px] text-bodytext">{{ invoice.customNote }}</p>
          <p v-if="invoice.terms" class="mt-2 text-[12px] text-bodytext2">{{ invoice.terms }}</p>
        </article>

        <aside class="no-print space-y-4">
          <section v-if="timeline.length" class="bg-white rounded-[24px] border border-border p-5">
            <h2 class="text-[14px] font-bold text-header flex items-center gap-2">
              <i class="pi pi-clock text-[12px] text-bodytext"></i>
              Payment Timeline
            </h2>
            <ol class="mt-4 space-y-4">
              <li v-for="(ev, i) in timeline" :key="i" class="flex gap-3">
                <span class="mt-1.5 w-2 h-2 rounded-full shrink-0" :class="ev.dot"></span>
                <div class="min-w-0">
                  <p class="text-[13px] font-semibold leading-snug" :class="ev.tone">{{ ev.title }}</p>
                  <p v-if="ev.meta" class="text-[12px] text-bodytext">{{ ev.meta }}</p>
                </div>
              </li>
            </ol>
          </section>

          <NuxtLink
            v-if="payTo && balanceMinor > 0"
            :to="payTo"
            class="w-full h-12 rounded-xl bg-brand-gradient-soft text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2"
          >
            Pay {{ naira(balanceMinor) }} Now
            <i class="pi pi-arrow-right text-[11px]"></i>
          </NuxtLink>

          <button
            type="button"
            class="w-full text-center text-[13px] font-medium text-bodytext hover:text-header"
            @click="disputeInvoice"
          >
            Dispute Invoice
          </button>
          <p class="text-center text-[12px] text-bodytext">
            Need help?
            <NuxtLink to="/help" class="font-semibold text-header hover:text-primary">Contact Support</NuxtLink>
          </p>
        </aside>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast";

useHead({ title: "Invoice" });

const route = useRoute();
const { match } = useInvoicePreview();

const pending = ref(true);
const invoice = ref(null);
const schedule = ref(null);
const payments = ref([]);

function asDate(value) {
  if (!value) return "";
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value;
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
    return;
  }
  try {
    invoice.value = await api.get(`/me/invoices/${encodeURIComponent(id)}`);
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

const issuer = computed(() => {
  const src = invoice.value?.issuer || {};
  const name = src.name || invoice.value?.businessName || "Venpadi";
  const lines = [src.address, src.email, src.phone, src.vatNumber].filter(Boolean);
  return { name, lines, isVenpadi: /venpadi/i.test(name) };
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
    sch.startAt ? formatDateUS(sch.startAt) : "",
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
      return {
        description: item.description || item.label || "Item",
        detail: [item.group, item.detail].filter(Boolean).join(" · "),
        qty: item.unitLabel || item.quantity || "1",
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
  const ref = invoice.value?.bookingReference || schedule.value?.reference;
  return ref ? `/bookings/${ref}` : "";
});

const timeline = computed(() => {
  const events = [];
  const inv = invoice.value || {};
  if (inv.issueDate) {
    const iso = asDate(inv.issueDate);
    events.push({
      title: "Invoice Generated",
      meta: `${formatDateUS(iso)}${iso.includes("T") && !iso.includes("T12:00:00Z") ? ` • ${formatTime(iso)}` : ""}`,
      dot: "bg-header",
      tone: "text-header",
      at: iso,
    });
  }
  for (const p of payments.value) {
    if (!p.date) continue;
    events.push({
      title: p.purposeLabel || p.statusLabel || "Payment",
      meta: `${formatDateUS(p.date)}${p.date?.includes?.("T") ? ` • ${formatTime(p.date)}` : ""}${p.amountMinor != null ? ` · ${naira(p.amountMinor)}` : ""}`,
      dot: p.status === "success" || p.status === "paid" ? "bg-[#16A34A]" : "bg-bodytext2",
      tone: "text-header",
      at: p.date,
    });
  }
  const milestones = inv.milestones?.length ? inv.milestones : schedule.value?.milestones || [];
  for (const m of milestones) {
    const at = m.dueAt || m.paidAt || asDate(m.dueDate);
    if (!at && !m.label) continue;
    events.push({
      title: `${m.label || "Milestone"}${m.paid ? " · Paid" : m.overdue ? " · Overdue" : ""}`,
      meta: at ? formatDateUS(asDate(at)) : "",
      dot: m.paid ? "bg-[#16A34A]" : m.overdue ? "bg-[#DC2626]" : "bg-bodytext2",
      tone: m.overdue ? "text-[#DC2626]" : "text-header",
      at: at || "",
    });
  }
  if (inv.status === "overdue") {
    events.push({
      title: "Overdue / Awaiting Payment",
      meta: inv.dueDate ? `Since ${formatDateUS(asDate(inv.dueDate))}` : "",
      dot: "bg-[#DC2626]",
      tone: "text-[#DC2626]",
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
function downloadPdf() {
  const url = invoice.value?.pdfUrl || invoice.value?.receiptUrl || invoice.value?.invoiceUrl;
  if (url) {
    window.open(url, "_blank", "noopener");
    return;
  }
  useToastStore().setMessage({ text: "PDF download is coming soon.", type: "info" });
}
function disputeInvoice() {
  useToastStore().setMessage({ text: "Invoice disputes are coming soon.", type: "info" });
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
