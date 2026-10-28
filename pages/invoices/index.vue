<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full">
      <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">Invoices</h1>
      <p class="mt-1 text-[14px] text-bodytext">Manage and track your venue payments.</p>

      <p v-if="pending && !loaded" class="mt-6 text-sm text-bodytext">Loading…</p>

      <template v-else>
        <!-- KPIs -->
        <div class="mt-6 grid grid-cols-1 md2:grid-cols-3 gap-4">
          <article class="bg-white rounded-[20px] border border-border p-5">
            <p class="text-[13px] text-bodytext flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-greybg text-header flex items-center justify-center">
                <i class="pi pi-file text-[13px]"></i>
              </span>
              Total Spent (YTD)
            </p>
            <p class="mt-4 text-[32px] md2:text-[36px] font-extrabold text-header leading-[1.05] tracking-tight break-words">
              {{ naira(ytdSpentMinor) }}
            </p>
            <p v-if="ytdTrendText" class="mt-3 text-[12px] font-medium" :class="ytdTrend >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'">
              {{ ytdTrendText }} vs last year
            </p>
          </article>

          <article class="rounded-[20px] border border-[#FFD4C8] bg-[#FFF7F2] p-5">
            <p class="text-[13px] text-bodytext flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center">
                <i class="pi pi-clock text-[13px]"></i>
              </span>
              Pending Payments
            </p>
            <p class="mt-4 text-[32px] md2:text-[36px] font-extrabold text-header leading-[1.05] tracking-tight break-words">
              {{ naira(pendingMinor) }}
            </p>
            <NuxtLink
              v-if="payNowTo"
              :to="payNowTo"
              class="mt-4 inline-flex h-9 px-4 items-center gap-1.5 rounded-lg bg-header text-white text-[12px] font-semibold"
            >
              Pay Now <i class="pi pi-arrow-right text-[10px]"></i>
            </NuxtLink>
          </article>

          <article class="bg-white rounded-[20px] border border-border p-5">
            <p class="text-[13px] text-bodytext flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-greybg text-header flex items-center justify-center">
                <i class="pi pi-lock text-[13px]"></i>
              </span>
              Active Deposits Held
            </p>
            <p class="mt-4 text-[32px] md2:text-[36px] font-extrabold text-header leading-[1.05] tracking-tight break-words">
              {{ naira(depositsHeldMinor) }}
            </p>
            <p class="mt-3 text-[12px] text-bodytext">
              {{
                depositBookings
                  ? `Across ${depositBookings} upcoming booking${depositBookings === 1 ? "" : "s"}`
                  : "No deposits currently held"
              }}
            </p>
          </article>
        </div>

        <!-- table -->
        <section class="mt-6 bg-white rounded-[24px] border border-border overflow-hidden">
          <div class="p-4 md2:p-5 flex flex-col md2:flex-row md2:items-center gap-3">
            <div class="flex-1 min-w-0">
              <Search v-model="search" kind="grey" placeholder="Search by Invoice ID or Venue..." />
            </div>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="f in filters"
                :key="f.key"
                type="button"
                class="h-8 px-3 rounded-full text-[12px] font-semibold border inline-flex items-center gap-1.5"
                :class="statusFilter === f.key ? 'bg-white text-primary border-primary' : 'bg-white text-header border-border hover:bg-greybg'"
                @click="statusFilter = f.key"
              >
                {{ f.label }}
                <span
                  v-if="f.key === 'pending' && pendingCount"
                  class="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold inline-flex items-center justify-center"
                >
                  {{ pendingCount }}
                </span>
              </button>
            </div>
          </div>

          <p v-if="!visibleRows.length" class="px-5 py-10 text-center text-[13px] text-bodytext">
            {{ emptyCopy }}
          </p>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-[13px]">
              <thead>
                <tr class="text-[11px] uppercase tracking-wide text-bodytext2 border-t border-border">
                  <th class="text-left font-semibold px-5 py-3">Invoice ID</th>
                  <th class="text-left font-semibold px-3 py-3">Venue Name</th>
                  <th class="text-left font-semibold px-3 py-3">Event Date</th>
                  <th class="text-left font-semibold px-3 py-3">Amount</th>
                  <th class="text-left font-semibold px-3 py-3">Status</th>
                  <th class="text-right font-semibold px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in visibleRows"
                  :key="row.key"
                  class="border-t border-border"
                  :class="row.kind === 'invoice' || row.bookingReference ? 'cursor-pointer hover:bg-greybg/70' : ''"
                  @click="openRow(row)"
                >
                  <td class="px-5 py-3.5 font-semibold text-header whitespace-nowrap">{{ row.invoiceId }}</td>
                  <td class="px-3 py-3.5">
                    <span class="inline-flex items-center gap-2 min-w-0">
                      <span class="w-7 h-7 rounded-lg bg-greybg text-bodytext flex items-center justify-center shrink-0">
                        <i class="pi pi-building text-[11px]"></i>
                      </span>
                      <span class="min-w-0">
                        <span class="block truncate text-header">{{ row.venueName }}</span>
                        <span v-if="row.subtitle" class="block truncate text-[11px] text-bodytext2">{{ row.subtitle }}</span>
                      </span>
                    </span>
                  </td>
                  <td class="px-3 py-3.5 text-bodytext whitespace-nowrap">
                    {{ row.eventDate }}
                    <p v-if="row.dueLabel" class="text-[11px] text-bodytext2">Due {{ row.dueLabel }}</p>
                  </td>
                  <td class="px-3 py-3.5 font-semibold text-header whitespace-nowrap">
                    {{ naira(row.amountMinor) }}
                    <p v-if="row.balanceMinor" class="text-[11px] font-medium text-primary">Balance {{ naira(row.balanceMinor) }}</p>
                  </td>
                  <td class="px-3 py-3.5">
                    <span class="inline-flex items-center gap-1.5 text-[12px] font-semibold" :class="rowStatusText(row.status)">
                      <span class="w-1.5 h-1.5 rounded-full" :class="rowStatusDot(row.status)"></span>
                      {{ row.statusLabel }}
                    </span>
                  </td>
                  <td class="px-5 py-3.5">
                    <div class="flex items-center justify-end gap-2 text-bodytext">
                      <button
                        v-if="row.kind === 'invoice'"
                        type="button"
                        class="w-8 h-8 rounded-lg hover:bg-greybg hover:text-header"
                        aria-label="View invoice"
                        @click.stop="openInvoice(row)"
                      >
                        <i class="pi pi-eye text-[13px]"></i>
                      </button>
                      <NuxtLink
                        v-else-if="row.bookingReference"
                        :to="`/bookings/${row.bookingReference}`"
                        class="w-8 h-8 rounded-lg hover:bg-greybg hover:text-header inline-flex items-center justify-center"
                        aria-label="View booking"
                        @click.stop
                      >
                        <i class="pi pi-eye text-[13px]"></i>
                      </NuxtLink>
                      <button
                        type="button"
                        class="w-8 h-8 rounded-lg hover:bg-greybg hover:text-header"
                        aria-label="Download"
                        @click.stop="downloadRow(row)"
                      >
                        <i class="pi pi-download text-[13px]"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-5 py-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p class="text-[12px] text-bodytext">
              Showing {{ shownFrom }} to {{ shownTo }} of {{ tableTotal }} entries
            </p>
            <nav class="flex items-center gap-1 justify-end" aria-label="Invoice pages">
              <button
                type="button"
                class="w-8 h-8 rounded-lg border border-border bg-white text-bodytext hover:bg-greybg disabled:opacity-40"
                :disabled="invoicesPage <= 1"
                aria-label="Previous page"
                @click="invoicesPage -= 1"
              >
                <i class="pi pi-chevron-left text-[10px]"></i>
              </button>
              <button
                v-for="n in invoicePageNumbers"
                :key="n"
                type="button"
                class="w-8 h-8 rounded-lg text-[12px] font-semibold"
                :class="n === invoicesPage ? 'bg-header text-white' : 'border border-border bg-white text-header hover:bg-greybg'"
                @click="invoicesPage = n"
              >
                {{ n }}
              </button>
              <button
                type="button"
                class="w-8 h-8 rounded-lg border border-border bg-white text-bodytext hover:bg-greybg disabled:opacity-40"
                :disabled="invoicesPage >= invoicePages"
                aria-label="Next page"
                @click="invoicesPage += 1"
              >
                <i class="pi pi-chevron-right text-[10px]"></i>
              </button>
            </nav>
          </div>
        </section>

        <!-- leftover schedule detail that the table doesn’t list as invoices -->
        <section v-if="data.schedule.length" class="mt-5 bg-white rounded-[24px] border border-border">
          <div class="px-5 py-4 border-b border-border">
            <h2 class="text-[16px] font-bold text-header">Payment schedule</h2>
          </div>
          <div
            v-for="s in data.schedule"
            :key="s.bookingId"
            class="px-5 py-4 border-b border-border last:border-b-0 md2:flex md2:items-start md2:gap-6"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <NuxtLink :to="`/bookings/${s.reference}`" class="text-[15px] font-bold text-header hover:text-primary">
                  {{ s.eventName }}
                </NuxtLink>
                <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(s.status)">{{ s.statusLabel }}</span>
              </div>
              <p class="text-[12px] text-bodytext">{{ s.venueName }} · {{ formatDate(s.startAt) }} · {{ s.reference }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="m in s.milestones"
                  :key="m.key"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px]"
                  :class="m.paid ? 'bg-[#EAF8F0] text-[#16A34A]' : m.overdue ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#F3F4F6] text-header'"
                >
                  {{ m.label }} · {{ naira(m.amountMinor) }}
                  <span class="text-[11px] opacity-80">
                    {{ m.paid ? "Paid" : m.overdue ? "Overdue" : m.dueAt ? `due ${formatDate(m.dueAt)}` : "" }}
                  </span>
                </span>
              </div>
            </div>
            <div class="mt-3 md2:mt-0 md2:text-right shrink-0">
              <p class="text-[12px] text-bodytext">Outstanding</p>
              <p class="text-[17px] font-extrabold text-header">{{ naira(s.outstandingMinor) }}</p>
              <p class="text-[12px] text-bodytext">of {{ naira(s.totalMinor) }}</p>
              <NuxtLink
                v-if="s.outstandingMinor > 0"
                :to="`/bookings/${s.reference}`"
                class="mt-2 inline-flex h-9 px-4 items-center rounded-lg bg-header text-white text-[12px] font-semibold"
              >
                Pay now
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- payment history -->
        <section class="mt-5 bg-white rounded-[24px] border border-border overflow-hidden">
          <div class="px-5 py-4 border-b border-border">
            <h2 class="text-[16px] font-bold text-header">Payment history</h2>
          </div>
          <p v-if="!data.payments.rows.length" class="px-5 py-8 text-center text-[13px] text-bodytext">No payments yet.</p>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-[13px]">
              <thead class="text-[11px] uppercase tracking-wide text-bodytext2">
                <tr>
                  <th class="text-left font-semibold px-5 py-2.5">Date</th>
                  <th class="text-left font-semibold px-3 py-2.5">Reference</th>
                  <th class="text-left font-semibold px-3 py-2.5">Booking</th>
                  <th class="text-left font-semibold px-3 py-2.5">For</th>
                  <th class="text-left font-semibold px-3 py-2.5">Channel</th>
                  <th class="text-right font-semibold px-3 py-2.5">Amount</th>
                  <th class="text-right font-semibold px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in data.payments.rows" :key="p.id" class="border-t border-border">
                  <td class="px-5 py-3 whitespace-nowrap text-header">{{ formatDate(p.date) }}</td>
                  <td class="px-3 py-3 text-bodytext">{{ p.reference }}</td>
                  <td class="px-3 py-3">
                    <NuxtLink v-if="p.bookingReference" :to="`/bookings/${p.bookingReference}`" class="text-header hover:text-primary">
                      {{ p.bookingReference }}
                    </NuxtLink>
                    <span v-else class="text-bodytext">{{ p.invoiceNumber || "—" }}</span>
                    <p class="text-[11px] text-bodytext2">{{ p.venueName }}</p>
                  </td>
                  <td class="px-3 py-3 text-header">{{ p.purposeLabel }}</td>
                  <td class="px-3 py-3 text-bodytext">{{ p.channelLabel }}</td>
                  <td class="px-3 py-3 text-right font-semibold text-header whitespace-nowrap">{{ naira(p.amountMinor, { decimals: true }) }}</td>
                  <td class="px-5 py-3 text-right">
                    <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(p.status)">{{ p.statusLabel }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <AccountPager
            v-model:page="paymentsPage"
            class="px-5 py-3 border-t border-border"
            :total="data.payments.total"
            :limit="data.payments.limit || 25"
          />
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast";

useHead({ title: "Invoices" });

const paymentsPage = ref(1);
const invoicesPage = ref(1);
const search = ref("");
const statusFilter = ref("all");

const filters = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "overdue", label: "Overdue" },
];

const EMPTY = {
  payments: { rows: [], total: 0, page: 1, limit: 25 },
  schedule: [],
  invoices: { rows: [], total: 0, page: 1, limit: 25 },
};

const { data, pending } = useResource(
  () => api.get("/me/invoices", { page: paymentsPage.value, invoicesPage: invoicesPage.value }),
  { watch: [paymentsPage, invoicesPage], initial: EMPTY }
);
const loaded = ref(false);
watch(pending, (p) => {
  if (!p) loaded.value = true;
});

const { stash } = useInvoicePreview();

function relatedPayments(inv) {
  return (data.value.payments.rows ?? []).filter((p) => {
    if (inv.bookingReference && p.bookingReference === inv.bookingReference) return true;
    if (inv.number && (p.invoiceNumber === inv.number || p.invoiceId === inv.id)) return true;
    return false;
  });
}

function openInvoice(row) {
  const inv = (data.value.invoices.rows ?? []).find((i) => String(i.id) === String(row.id));
  if (!inv) return;
  stash({
    id: inv.id,
    invoice: inv,
    schedule: inv.bookingReference ? scheduleByRef.value[inv.bookingReference] || null : null,
    payments: relatedPayments(inv),
  });
  navigateTo(`/invoices/${encodeURIComponent(inv.id)}`);
}

function openRow(row) {
  if (row.kind === "invoice") return openInvoice(row);
  if (row.bookingReference) navigateTo(`/bookings/${row.bookingReference}`);
}

function comingSoon() {
  useToastStore().setMessage({ text: "PDF download is coming soon.", type: "info" });
}

function downloadRow(row) {
  const url = row.pdfUrl || row.receiptUrl || row.invoiceUrl;
  if (url) {
    window.open(url, "_blank", "noopener");
    return;
  }
  comingSoon();
}

function yearOf(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.getFullYear();
}

const ytdSpentMinor = computed(() => {
  const year = new Date().getFullYear();
  return (data.value.payments.rows ?? []).reduce((sum, p) => {
    if (p.status !== "success" && p.status !== "paid") return sum;
    if (yearOf(p.date) !== year) return sum;
    return sum + (Number(p.amountMinor) || 0);
  }, 0);
});
const lastYearSpentMinor = computed(() => {
  const year = new Date().getFullYear() - 1;
  return (data.value.payments.rows ?? []).reduce((sum, p) => {
    if (p.status !== "success" && p.status !== "paid") return sum;
    if (yearOf(p.date) !== year) return sum;
    return sum + (Number(p.amountMinor) || 0);
  }, 0);
});
const ytdTrend = computed(() => {
  const prev = lastYearSpentMinor.value;
  if (!prev) return null;
  return ((ytdSpentMinor.value - prev) / prev) * 100;
});
const ytdTrendText = computed(() => {
  if (ytdTrend.value === null) return "";
  const n = ytdTrend.value;
  const abs = Math.abs(n).toFixed(0);
  return `${n >= 0 ? "+" : "−"}${abs}%`;
});

const pendingMinor = computed(() => {
  const fromSchedule = (data.value.schedule ?? []).reduce((s, r) => s + (Number(r.outstandingMinor) || 0), 0);
  const fromInvoices = (data.value.invoices.rows ?? []).reduce((s, inv) => {
    if (inv.status === "paid" || inv.status === "void") return s;
    return s + (Number(inv.balanceMinor ?? inv.totalMinor) || 0);
  }, 0);
  return Math.max(fromSchedule, fromInvoices);
});

const depositsHeldMinor = computed(() =>
  (data.value.schedule ?? []).reduce((sum, s) => {
    const parts = (s.milestones ?? []).filter(
      (m) => m.paid && /deposit|caution/i.test(`${m.label || ""} ${m.key || ""}`)
    );
    if (parts.length) return sum + parts.reduce((a, m) => a + (Number(m.amountMinor) || 0), 0);
    return sum;
  }, 0)
);
const depositBookings = computed(
  () =>
    (data.value.schedule ?? []).filter((s) =>
      (s.milestones ?? []).some((m) => m.paid && /deposit|caution/i.test(`${m.label || ""} ${m.key || ""}`))
    ).length
);

const payNowTo = computed(() => {
  const due = (data.value.schedule ?? []).find((s) => Number(s.outstandingMinor) > 0);
  if (due?.reference) return `/bookings/${due.reference}`;
  const inv = (data.value.invoices.rows ?? []).find((i) => i.status !== "paid" && i.bookingReference);
  return inv ? `/bookings/${inv.bookingReference}` : "";
});

function bucket(status) {
  if (status === "paid" || status === "success") return "paid";
  if (status === "overdue") return "overdue";
  if (status === "void" || status === "failed" || status === "abandoned") return "other";
  return "pending";
}

const scheduleByRef = computed(() => {
  const map = {};
  for (const s of data.value.schedule ?? []) {
    if (s.reference) map[s.reference] = s;
  }
  return map;
});

const tableRows = computed(() => {
  const invoices = (data.value.invoices.rows ?? []).map((inv) => {
    const linked = inv.bookingReference ? scheduleByRef.value[inv.bookingReference] : null;
    const eventIso = inv.eventDate || linked?.startAt || (inv.dueDate ? `${inv.dueDate}T12:00:00Z` : "");
    const dueIso = inv.dueDate ? `${inv.dueDate}T12:00:00Z` : "";
    const subtitle = [inv.businessName && inv.businessName !== inv.venueName ? inv.businessName : null, inv.bookingReference]
      .filter(Boolean)
      .join(" · ");
    return {
      key: `inv-${inv.id}`,
      kind: "invoice",
      id: inv.id,
      invoiceId: inv.number ? `#${String(inv.number).replace(/^#/, "")}` : "—",
      venueName: inv.venueName || inv.businessName || "—",
      subtitle,
      eventDate: eventIso ? formatDateUS(eventIso) : "—",
      dueLabel: dueIso && eventIso !== dueIso ? formatDateUS(dueIso) : "",
      amountMinor: inv.totalMinor,
      balanceMinor: inv.status === "paid" ? 0 : Number(inv.balanceMinor) || 0,
      status: inv.status,
      statusLabel: inv.statusLabel,
      bookingReference: inv.bookingReference,
      pdfUrl: inv.pdfUrl,
      receiptUrl: inv.receiptUrl,
      invoiceUrl: inv.invoiceUrl,
    };
  });
  const covered = new Set(invoices.map((r) => r.bookingReference).filter(Boolean));
  const extras = (data.value.schedule ?? [])
    .filter((s) => s.reference && !covered.has(s.reference))
    .map((s) => {
      const overdue = (s.milestones || []).some((m) => m.overdue);
      const pending = Number(s.outstandingMinor) > 0;
      return {
        key: `sch-${s.bookingId}`,
        kind: "schedule",
        id: s.bookingId,
        invoiceId: s.reference,
        venueName: s.venueName || s.eventName || "—",
        subtitle: s.eventName && s.eventName !== s.venueName ? s.eventName : "",
        eventDate: s.startAt ? formatDateUS(s.startAt) : "—",
        dueLabel: "",
        amountMinor: s.totalMinor,
        balanceMinor: Number(s.outstandingMinor) || 0,
        status: pending ? (overdue ? "overdue" : "pending") : "paid",
        statusLabel: pending ? (overdue ? "Overdue" : "Pending") : "Paid",
        bookingReference: s.reference,
        pdfUrl: "",
        receiptUrl: "",
        invoiceUrl: "",
      };
    });
  return [...invoices, ...extras];
});

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  return tableRows.value.filter((r) => {
    if (statusFilter.value !== "all" && bucket(r.status) !== statusFilter.value) return false;
    if (!q) return true;
    return `${r.invoiceId} ${r.venueName} ${r.subtitle} ${r.bookingReference || ""}`.toLowerCase().includes(q);
  });
});

const pendingCount = computed(() => tableRows.value.filter((r) => bucket(r.status) === "pending").length);
const visibleRows = computed(() => filteredRows.value);
const filtering = computed(() => Boolean(search.value.trim()) || statusFilter.value !== "all");
const tableTotal = computed(() =>
  filtering.value ? filteredRows.value.length : data.value.invoices.total || filteredRows.value.length
);
const shownFrom = computed(() => {
  if (!visibleRows.value.length) return 0;
  if (filtering.value) return 1;
  const limit = data.value.invoices.limit || 25;
  return (invoicesPage.value - 1) * limit + 1;
});
const shownTo = computed(() => {
  if (!visibleRows.value.length) return 0;
  if (filtering.value) return visibleRows.value.length;
  const limit = data.value.invoices.limit || 25;
  return Math.min(invoicesPage.value * limit, data.value.invoices.total || visibleRows.value.length);
});
const invoicePages = computed(() => Math.max(1, Math.ceil((data.value.invoices.total || 0) / (data.value.invoices.limit || 25))));
const invoicePageNumbers = computed(() => {
  const total = invoicePages.value;
  const current = invoicesPage.value;
  let end = Math.min(total, Math.max(current + 1, 3));
  let start = Math.max(1, end - 2);
  end = Math.min(total, start + 2);
  const pages = [];
  for (let n = start; n <= end; n += 1) pages.push(n);
  return pages;
});

const emptyCopy = computed(() => {
  if (search.value.trim()) return "No invoices match that search.";
  if (statusFilter.value !== "all") return `No ${statusFilter.value} invoices.`;
  return "No invoices yet. Venues send invoices here when they bill you directly.";
});

function rowStatusText(status) {
  if (status === "paid" || status === "success") return "text-[#16A34A]";
  if (status === "overdue") return "text-[#DC2626]";
  return "text-[#D97706]";
}
function rowStatusDot(status) {
  if (status === "paid" || status === "success") return "bg-[#16A34A]";
  if (status === "overdue") return "bg-[#DC2626]";
  return "bg-[#D97706]";
}
</script>
