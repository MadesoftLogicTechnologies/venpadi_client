<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1180px]">
      <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">Invoices & Payments</h1>
      <p class="mt-1 text-[14px] text-bodytext">What you owe, what you’ve paid, and the invoices venues have sent you.</p>

      <p v-if="pending && !loaded" class="mt-6 text-sm text-bodytext">Loading…</p>

      <template v-else>
        <!-- schedule -->
        <section class="mt-6 bg-white rounded-2xl border border-border">
          <div class="px-5 py-4 border-b border-border">
            <h2 class="text-[16px] font-bold text-header">Payment schedule</h2>
          </div>
          <p v-if="!data.schedule.length" class="px-5 py-8 text-center text-[13px] text-bodytext">
            Nothing due — you’re all paid up.
          </p>
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
                class="mt-2 inline-flex h-9 px-4 items-center rounded-full bg-primary text-white text-[12px] font-semibold"
              >
                Pay now
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- payments -->
        <section class="mt-5 bg-white rounded-2xl border border-border overflow-hidden">
          <div class="px-5 py-4 border-b border-border">
            <h2 class="text-[16px] font-bold text-header">Payment history</h2>
          </div>
          <p v-if="!data.payments.rows.length" class="px-5 py-8 text-center text-[13px] text-bodytext">No payments yet.</p>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-[13px]">
              <thead class="bg-greybg text-[11px] uppercase tracking-wide text-bodytext2">
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

        <!-- invoices -->
        <section class="mt-5 bg-white rounded-2xl border border-border overflow-hidden">
          <div class="px-5 py-4 border-b border-border">
            <h2 class="text-[16px] font-bold text-header">Invoices</h2>
          </div>
          <p v-if="!data.invoices.rows.length" class="px-5 py-8 text-center text-[13px] text-bodytext">
            No invoices yet. Venues send invoices here when they bill you directly.
          </p>
          <button
            v-for="inv in data.invoices.rows"
            :key="inv.id"
            type="button"
            class="w-full text-left px-5 py-4 border-b border-border last:border-b-0 hover:bg-greybg md2:flex md2:items-center md2:gap-6"
            @click="openInvoice(inv.id)"
          >
            <div class="flex-1 min-w-0">
              <p class="text-[14px] font-bold text-header">{{ inv.number }}</p>
              <p class="text-[12px] text-bodytext">
                {{ inv.businessName }}<template v-if="inv.venueName"> · {{ inv.venueName }}</template>
                <template v-if="inv.bookingReference"> · {{ inv.bookingReference }}</template>
              </p>
            </div>
            <div class="text-[12px] text-bodytext md2:w-[200px]">
              Issued {{ formatDate(`${inv.issueDate}T12:00:00Z`) }} · Due {{ formatDate(`${inv.dueDate}T12:00:00Z`) }}
            </div>
            <div class="md2:w-[160px] md2:text-right">
              <p class="text-[14px] font-extrabold text-header">{{ naira(inv.totalMinor) }}</p>
              <p v-if="inv.balanceMinor" class="text-[12px] text-primary">Balance {{ naira(inv.balanceMinor) }}</p>
            </div>
            <span class="inline-block mt-2 md2:mt-0 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(inv.status)">
              {{ inv.statusLabel }}
            </span>
          </button>
          <AccountPager
            v-model:page="invoicesPage"
            class="px-5 py-3 border-t border-border"
            :total="data.invoices.total"
            :limit="data.invoices.limit || 25"
          />
        </section>
      </template>
    </div>

    <Modal v-if="invoiceId" :max-width="700" @close="invoiceId = ''">
      <div class="px-6 py-4">
        <p v-if="invoiceLoading && !invoice" class="text-sm text-bodytext">Loading invoice…</p>
        <template v-else-if="invoice">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[11px] uppercase tracking-[0.14em] text-bodytext2">Invoice</p>
              <h2 class="text-[22px] font-extrabold text-header">{{ invoice.number }}</h2>
              <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusClass(invoice.status)">
                {{ invoice.statusLabel }}
              </span>
            </div>
            <button type="button" class="text-bodytext hover:text-header" aria-label="Close" @click="invoiceId = ''">
              <i class="pi pi-times"></i>
            </button>
          </div>

          <div class="mt-5 grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <p class="text-[11px] uppercase tracking-wide text-bodytext2">From</p>
              <p class="font-semibold text-header">{{ invoice.issuer?.name }}</p>
              <p v-if="invoice.issuer?.address" class="text-bodytext">{{ invoice.issuer.address }}</p>
              <p v-if="invoice.issuer?.vatNumber" class="text-bodytext">{{ invoice.issuer.vatNumber }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-wide text-bodytext2">Bill to</p>
              <p class="font-semibold text-header">{{ invoice.billTo?.name }}</p>
              <p v-if="invoice.billTo?.company" class="text-bodytext">{{ invoice.billTo.company }}</p>
              <p v-if="invoice.billTo?.email" class="text-bodytext">{{ invoice.billTo.email }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-wide text-bodytext2">Issued</p>
              <p class="text-header">{{ formatDate(`${invoice.issueDate}T12:00:00Z`) }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-wide text-bodytext2">Due</p>
              <p class="text-header">{{ formatDate(`${invoice.dueDate}T12:00:00Z`) }}</p>
            </div>
          </div>

          <table class="mt-5 w-full text-[13px]">
            <thead class="text-[11px] uppercase tracking-wide text-bodytext2 border-b border-border">
              <tr>
                <th class="text-left font-semibold py-2">Item</th>
                <th class="text-left font-semibold py-2">Qty</th>
                <th class="text-right font-semibold py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in invoice.items" :key="i" class="border-b border-border">
                <td class="py-2.5">
                  <p class="text-header">{{ item.description }}</p>
                  <p class="text-[11px] text-bodytext2">{{ [item.group, item.detail].filter(Boolean).join(" · ") }}</p>
                </td>
                <td class="py-2.5 text-bodytext">{{ item.unitLabel || item.quantity }}</td>
                <td class="py-2.5 text-right font-medium text-header">{{ naira(item.amountMinor) }}</td>
              </tr>
            </tbody>
          </table>

          <dl class="mt-4 ml-auto max-w-[280px] space-y-1.5 text-[13px]">
            <div class="flex justify-between"><dt class="text-bodytext">Subtotal</dt><dd class="text-header">{{ naira(invoice.subtotalMinor) }}</dd></div>
            <div v-if="invoice.discountMinor" class="flex justify-between"><dt class="text-bodytext">Discount</dt><dd class="text-header">−{{ naira(invoice.discountMinor) }}</dd></div>
            <div v-if="invoice.taxMinor" class="flex justify-between"><dt class="text-bodytext">Tax ({{ pct(invoice.taxBps / 100, 1) }})</dt><dd class="text-header">{{ naira(invoice.taxMinor) }}</dd></div>
            <div class="flex justify-between pt-1.5 border-t border-border"><dt class="font-semibold text-header">Total</dt><dd class="font-extrabold text-header">{{ naira(invoice.totalMinor) }}</dd></div>
            <div class="flex justify-between"><dt class="text-bodytext">Paid</dt><dd class="text-[#16A34A]">{{ naira(invoice.amountPaidMinor) }}</dd></div>
            <div class="flex justify-between"><dt class="text-bodytext">Balance</dt><dd class="font-semibold text-header">{{ naira(invoice.balanceMinor) }}</dd></div>
          </dl>

          <div v-if="invoice.milestones?.length" class="mt-5">
            <p class="text-[12px] font-semibold text-header">Payment milestones</p>
            <div class="mt-2 space-y-2">
              <div v-for="(m, i) in invoice.milestones" :key="i" class="flex items-start justify-between gap-3 rounded-xl bg-greybg px-3 py-2 text-[12px]">
                <div>
                  <p class="font-semibold text-header">{{ m.label }}</p>
                  <p class="text-bodytext">{{ m.description }}<template v-if="m.dueDate"> · {{ formatDate(`${m.dueDate}T12:00:00Z`) }}</template></p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-header">{{ naira(m.amountMinor) }}</p>
                  <span class="text-[11px] capitalize" :class="m.status === 'paid' ? 'text-[#16A34A]' : 'text-bodytext'">{{ m.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <p v-if="invoice.customNote" class="mt-4 text-[12px] text-bodytext">{{ invoice.customNote }}</p>
          <p v-if="invoice.terms" class="mt-2 text-[11px] text-bodytext2">{{ invoice.terms }}</p>

          <div class="mt-5 flex justify-end gap-2">
            <button type="button" class="h-10 px-4 rounded-full border border-border text-[13px] font-semibold text-bodytext" title="Coming soon" @click="comingSoon">
              <i class="pi pi-download text-[11px] mr-1"></i> Download PDF
            </button>
            <NuxtLink
              v-if="invoice.bookingReference"
              :to="`/bookings/${invoice.bookingReference}`"
              class="h-10 px-4 rounded-full bg-primary text-white text-[13px] font-semibold inline-flex items-center"
            >
              View booking
            </NuxtLink>
          </div>
        </template>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast";

useHead({ title: "Invoices" });

const paymentsPage = ref(1);
const invoicesPage = ref(1);

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

const invoiceId = ref("");
const invoice = ref(null);
const invoiceLoading = ref(false);

async function openInvoice(id) {
  invoiceId.value = id;
  invoice.value = null;
  invoiceLoading.value = true;
  try {
    invoice.value = await api.get(`/me/invoices/${encodeURIComponent(id)}`);
  } catch {
    invoiceId.value = "";
  } finally {
    invoiceLoading.value = false;
  }
}

function comingSoon() {
  useToastStore().setMessage({ text: "PDF download is coming soon.", type: "info" });
}
</script>
