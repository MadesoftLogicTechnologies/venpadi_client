<template>
  <section class="bg-[#F9F9F7] py-12 md2:py-16">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-[260px_minmax(0,1fr)] gap-8 md2:gap-12 items-start">
        <aside
          class="md2:sticky md2:top-24 rounded-2xl border border-border bg-white p-5 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
        >
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            In this policy
          </p>
          <p class="text-xs text-bodytext2 mt-1 mb-4">12 comprehensive chapters</p>
          <nav class="space-y-0.5 max-h-[55vh] overflow-y-auto pr-1">
            <a
              v-for="item in nav"
              :key="item.id"
              :href="`#${item.id}`"
              class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
              :class="
                active === item.id
                  ? 'bg-[#FFF1ED] text-primary'
                  : 'text-header hover:bg-greybg'
              "
              @click="active = item.id"
            >
              <span class="text-[10px] font-bold text-bodytext2 w-5 shrink-0">{{
                item.num
              }}</span>
              <span class="leading-snug">{{ item.label }}</span>
            </a>
          </nav>
          <a
            href="mailto:privacy@venpadi.com?subject=Privacy%20Policy%20PDF"
            class="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FFF1ED] text-primary text-xs font-semibold hover:opacity-90"
          >
            <i class="pi pi-file-pdf text-[11px]"></i>
            Download this policy (PDF)
          </a>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <div class="rounded-xl border border-border bg-greybg/60 px-2.5 py-2">
              <p class="text-[10px] font-bold text-header">GDPR</p>
              <p class="text-[10px] text-bodytext2 mt-0.5">EU / UK aligned</p>
            </div>
            <div class="rounded-xl border border-border bg-greybg/60 px-2.5 py-2">
              <p class="text-[10px] font-bold text-header">NDPR</p>
              <p class="text-[10px] text-bodytext2 mt-0.5">Nigeria aligned</p>
            </div>
          </div>
        </aside>

        <div class="space-y-8 md2:space-y-10 min-w-0">
          <!-- 01 -->
          <article
            :id="nav[0].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >01</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 01
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              Who We Are
            </h2>
            <div
              class="mt-4 border-l-4 border-primary bg-[#FFF7F2] rounded-r-xl px-4 py-3 text-sm text-header leading-relaxed"
            >
              Venpadi is a venue booking and management platform operated by
              <strong>Madesoft Limited</strong>. References to “Venpadi,” “we,” “us,” or
              “our” mean Madesoft Limited as data controller for owner accounts.
            </div>
            <div class="mt-5 rounded-xl bg-greybg px-4 py-4 text-sm">
              <p class="font-bold text-header">Designated data controller</p>
              <p class="mt-1 text-bodytext">
                Madesoft Limited · Victoria Island, Lagos, Nigeria
              </p>
              <p
                class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
              >
                <i class="pi pi-clock text-[11px]"></i>
                72-hour guaranteed response on privacy requests
              </p>
            </div>
          </article>

          <!-- 02 -->
          <article
            :id="nav[1].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >02</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 02
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              What We Collect
            </h2>
            <p class="mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              We practise strict data minimisation — collecting only what is required to
              operate listings, bookings, payouts, and legal compliance.
            </p>
            <div class="mt-5 grid sm:grid-cols-3 gap-3">
              <div
                v-for="col in collectCols"
                :key="col.title"
                class="rounded-xl border border-border bg-[#F9F9F7] p-4"
              >
                <p class="text-[10px] font-bold tracking-[0.12em] uppercase text-primary">
                  {{ col.title }}
                </p>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="item in col.items"
                    :key="item"
                    class="text-xs text-bodytext leading-snug flex gap-2"
                  >
                    <span class="text-primary mt-0.5">·</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="mt-5 rounded-xl border border-primary/20 bg-[#FFF1ED] px-4 py-3 text-sm text-header leading-relaxed"
            >
              <strong>Data minimisation pledge:</strong>
              We do not collect data “just in case.” If it is not needed for a booking,
              verified business admission, payouts, or AML/tax law, we do not ask for it.
            </div>
          </article>

          <!-- 03 -->
          <article :id="nav[2].id" class="scroll-mt-28">
            <div class="rounded-3xl bg-[#1A1614] text-white p-6 sm:p-8">
              <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                Chapter 03
              </p>
              <h2 class="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight">
                Why We Collect It (Legal Basis)
              </h2>
              <p class="mt-3 text-sm text-white/55 leading-relaxed max-w-2xl">
                Every processing purpose maps to a legal basis under GDPR and NDPR Section
                2.2.
              </p>
              <div class="mt-6 grid sm:grid-cols-2 md2:grid-cols-3 gap-3">
                <div
                  v-for="basis in legalBases"
                  :key="basis.num"
                  class="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-xs font-bold text-primary">{{ basis.num }}</p>
                  <h3 class="mt-1 text-sm font-bold">{{ basis.title }}</h3>
                  <p class="mt-1.5 text-xs text-white/50 leading-relaxed">{{ basis.body }}</p>
                </div>
              </div>
            </div>
          </article>

          <!-- 04 -->
          <article
            :id="nav[3].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >04</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 04
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              How We Use Your Data
            </h2>
            <p class="mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              The table below maps each platform purpose to the data involved and our
              retention target.
            </p>
            <div class="mt-5 overflow-x-auto rounded-xl border border-border">
              <table class="w-full text-left text-xs sm:text-sm min-w-[560px]">
                <thead class="bg-greybg text-header">
                  <tr>
                    <th class="px-4 py-3 font-bold">Platform purpose</th>
                    <th class="px-4 py-3 font-bold">Data processed</th>
                    <th class="px-4 py-3 font-bold">Retention</th>
                  </tr>
                </thead>
                <tbody class="text-bodytext">
                  <tr
                    v-for="row in useTable"
                    :key="row.purpose"
                    class="border-t border-border"
                  >
                    <td class="px-4 py-3 font-semibold text-header">{{ row.purpose }}</td>
                    <td class="px-4 py-3">{{ row.data }}</td>
                    <td class="px-4 py-3">{{ row.retention }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-5 rounded-2xl bg-[#0B0F14] text-white px-5 py-4 flex gap-3 items-start">
              <span
                class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0"
              >
                <i class="pi pi-ban text-sm"></i>
              </span>
              <div>
                <p class="text-sm font-bold text-primary">The Venpadi data absolute</p>
                <p class="mt-1 text-xs text-white/60 leading-relaxed">
                  We will never sell or rent your data to brokers or ad syndicates. We will
                  never feed your venue photography, conversations, or booking logs into
                  external AI training models.
                </p>
              </div>
            </div>
          </article>

          <!-- 05 -->
          <article
            :id="nav[4].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >05</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 05
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              Who We Share Data With
            </h2>
            <p class="mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              We share data with processors only as needed to run Venpadi — never for sale.
            </p>
            <ul class="mt-5 space-y-2">
              <li
                v-for="partner in partners"
                :key="partner.name"
                class="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-[#F9F9F7] px-4 py-3"
              >
                <div>
                  <p class="text-sm font-bold text-header">{{ partner.name }}</p>
                  <p class="text-xs text-bodytext mt-0.5">{{ partner.role }}</p>
                </div>
                <span
                  class="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white border border-border text-bodytext2"
                >
                  {{ partner.tag }}
                </span>
              </li>
            </ul>
            <p
              class="mt-5 text-center text-sm italic text-bodytext border border-border rounded-xl px-4 py-3 bg-[#F9F9F7]"
            >
              “We only share what is strictly necessary. We don’t sell. We don’t trade.”
            </p>
          </article>

          <!-- 06 -->
          <article :id="nav[5].id" class="scroll-mt-28">
            <div class="rounded-3xl bg-[#1A1614] text-white p-6 sm:p-8">
              <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                Chapter 06
              </p>
              <h2 class="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight">
                International Data Transfers
              </h2>
              <p class="mt-3 text-sm text-white/55 leading-relaxed max-w-2xl">
                Some processors host data outside Nigeria (including the US/EU). Transfers
                are protected with appropriate safeguards.
              </p>
              <div class="mt-6 grid sm:grid-cols-3 gap-3">
                <div
                  v-for="item in transfers"
                  :key="item.title"
                  class="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-3"
                  >
                    <i :class="['pi text-xs', item.icon]"></i>
                  </div>
                  <h3 class="text-sm font-bold">{{ item.title }}</h3>
                  <p class="mt-1.5 text-xs text-white/50 leading-relaxed">{{ item.body }}</p>
                </div>
              </div>
            </div>
          </article>

          <!-- 07 -->
          <article
            :id="nav[6].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >07</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 07
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              How Long We Keep Data
            </h2>
            <div class="mt-5 overflow-x-auto rounded-xl border border-border">
              <table class="w-full text-left text-xs sm:text-sm min-w-[560px]">
                <thead class="bg-greybg text-header">
                  <tr>
                    <th class="px-4 py-3 font-bold">Category</th>
                    <th class="px-4 py-3 font-bold">Standard retention</th>
                    <th class="px-4 py-3 font-bold">Justification</th>
                  </tr>
                </thead>
                <tbody class="text-bodytext">
                  <tr
                    v-for="row in retentionTable"
                    :key="row.cat"
                    class="border-t border-border"
                  >
                    <td class="px-4 py-3 font-semibold text-header">{{ row.cat }}</td>
                    <td class="px-4 py-3">{{ row.period }}</td>
                    <td class="px-4 py-3">{{ row.why }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-4 text-xs text-bodytext leading-relaxed">
              You may request erasure (right to be forgotten) where no statutory retention
              applies. Contact
              <a href="mailto:privacy@venpadi.com" class="text-primary font-semibold"
                >privacy@venpadi.com</a
              >.
            </p>
          </article>

          <!-- 08 -->
          <article
            :id="nav[7].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >08</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 08
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              Your Rights
            </h2>
            <p class="mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              Subject to local law, you can exercise these rights at any time via email or
              the owner portal.
            </p>
            <div class="mt-5 grid sm:grid-cols-2 gap-3">
              <div
                v-for="right in rights"
                :key="right.title"
                class="rounded-xl border border-border bg-[#F9F9F7] p-4"
              >
                <h3 class="text-sm font-bold text-header">{{ right.title }}</h3>
                <p class="mt-1 text-xs text-bodytext leading-relaxed">{{ right.body }}</p>
              </div>
            </div>
            <div
              class="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-primary/20 bg-[#FFF7F2] px-4 py-4"
            >
              <div class="flex-1 flex gap-3 items-start">
                <i class="pi pi-shield text-primary mt-0.5"></i>
                <p class="text-sm text-header leading-relaxed">
                  <strong>Protecting your rights:</strong>
                  Requests are handled securely. You can also update many preferences
                  directly in your owner account.
                </p>
              </div>
              <a
                href="mailto:privacy@venpadi.com?subject=Data%20subject%20request"
                class="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-gradient-soft text-white text-xs font-semibold hover:opacity-95"
              >
                Submit a rights request
              </a>
            </div>
          </article>

          <!-- 09 -->
          <article
            :id="nav[8].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >09</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 09
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              Cookies &amp; Tracking
            </h2>
            <p class="mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              We use cookies and similar technologies to keep you signed in, secure the
              platform, and understand performance.
            </p>
            <div class="mt-5 overflow-x-auto rounded-xl border border-border">
              <table class="w-full text-left text-xs sm:text-sm min-w-[560px]">
                <thead class="bg-greybg text-header">
                  <tr>
                    <th class="px-4 py-3 font-bold">Cookie / key</th>
                    <th class="px-4 py-3 font-bold">Classification</th>
                    <th class="px-4 py-3 font-bold">Lifespan</th>
                    <th class="px-4 py-3 font-bold">Purpose</th>
                  </tr>
                </thead>
                <tbody class="text-bodytext">
                  <tr
                    v-for="row in cookies"
                    :key="row.key"
                    class="border-t border-border"
                  >
                    <td class="px-4 py-3 font-mono text-[11px] text-header">{{ row.key }}</td>
                    <td class="px-4 py-3">
                      <span
                        class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold"
                        :class="row.badgeClass"
                        >{{ row.class }}</span
                      >
                    </td>
                    <td class="px-4 py-3">{{ row.life }}</td>
                    <td class="px-4 py-3">{{ row.purpose }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-5 text-center">
              <a
                href="mailto:privacy@venpadi.com?subject=Cookie%20preferences"
                class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-gradient-soft text-white text-xs font-semibold hover:opacity-95"
              >
                Manage cookie preferences
              </a>
            </div>
          </article>

          <!-- 10 -->
          <article
            :id="nav[9].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >10</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 10
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              Children’s Privacy
            </h2>
            <div class="mt-4 flex gap-3 items-start">
              <span
                class="w-9 h-9 rounded-xl bg-[#FFF1ED] text-primary flex items-center justify-center shrink-0"
              >
                <i class="pi pi-exclamation-triangle text-sm"></i>
              </span>
              <p class="text-sm text-bodytext leading-relaxed">
                Venpadi owner services are not directed at children under 18. We do not
                knowingly collect personal data from minors. If you believe a child has
                provided data, contact us and we will delete it promptly.
              </p>
            </div>
          </article>

          <!-- 11 -->
          <article
            :id="nav[10].id"
            class="scroll-mt-28 relative rounded-2xl bg-white border border-border/80 p-5 sm:p-7 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
          >
            <span
              class="absolute right-5 top-4 text-[4.5rem] font-extrabold text-header/[0.06] leading-none select-none"
              >11</span
            >
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Chapter 11
            </p>
            <h2 class="mt-1 text-xl sm:text-2xl font-extrabold text-header tracking-tight">
              Changes to This Policy
            </h2>
            <p class="mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              We may update this policy periodically. Material changes are notified by email
              or dashboard notice before they take effect. The version stamp in the hero
              always reflects the current text.
            </p>
            <a
              href="mailto:privacy@venpadi.com?subject=Privacy%20changelog"
              class="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              View policy revision &amp; changelog →
            </a>
          </article>

          <!-- 12 -->
          <article :id="nav[11].id" class="scroll-mt-28">
            <div class="rounded-3xl bg-[#0B0F14] text-white p-6 sm:p-8">
              <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                Chapter 12
              </p>
              <h2 class="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight">
                Contact &amp; Data Protection Officer
              </h2>
              <p class="mt-3 text-sm text-white/55 max-w-xl">
                Questions or concerns about our privacy practices? Reach the right team
                below.
              </p>
              <div class="mt-6 grid sm:grid-cols-2 gap-3">
                <div
                  v-for="c in contacts"
                  :key="c.title"
                  class="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-[10px] font-bold tracking-wider uppercase text-white/40">
                    {{ c.title }}
                  </p>
                  <p class="mt-2 text-sm font-semibold text-white">{{ c.value }}</p>
                  <p v-if="c.note" class="mt-1 text-xs text-white/45">{{ c.note }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const active = ref("priv-01");

const nav = [
  { id: "priv-01", num: "01", label: "Who We Are" },
  { id: "priv-02", num: "02", label: "What We Collect" },
  { id: "priv-03", num: "03", label: "Why We Collect It" },
  { id: "priv-04", num: "04", label: "How We Use Your Data" },
  { id: "priv-05", num: "05", label: "Who We Share Data With" },
  { id: "priv-06", num: "06", label: "International Transfers" },
  { id: "priv-07", num: "07", label: "How Long We Keep Data" },
  { id: "priv-08", num: "08", label: "Your Rights" },
  { id: "priv-09", num: "09", label: "Cookies & Tracking" },
  { id: "priv-10", num: "10", label: "Children’s Privacy" },
  { id: "priv-11", num: "11", label: "Changes to This Policy" },
  { id: "priv-12", num: "12", label: "Contact & DPO" },
];

const collectCols = [
  {
    title: "Data you give us",
    items: [
      "Account name, email, phone",
      "Venue metadata & photos",
      "Identity / KYC documents",
      "Payout bank details",
      "Support communications",
    ],
  },
  {
    title: "Platform generated",
    items: [
      "Transaction & ledger logs",
      "Booking timestamps",
      "Aggregate revenue metrics",
      "Security & session tokens",
      "Audit signatures",
    ],
  },
  {
    title: "Data we receive",
    items: [
      "Payment status from processors",
      "Identity verification signals",
      "Bank routing confirmations",
      "Approximate geolocation",
      "Device / browser diagnostics",
    ],
  },
];

const legalBases = [
  {
    num: "01",
    title: "Contract performance",
    body: "Fulfil booking contracts, calendars, receipts, and payouts with venue owners and guests.",
  },
  {
    num: "02",
    title: "Legitimate interests",
    body: "Platform security, fraud and chargeback prevention, and soft product metrics.",
  },
  {
    num: "03",
    title: "Legal obligation",
    body: "VAT, tax, and financial reporting required by FIRS, CBN, and related rules.",
  },
  {
    num: "04",
    title: "Vital interests",
    body: "Sharing contact details with emergency responders when safety events require it.",
  },
  {
    num: "05",
    title: "Explicit consent",
    body: "Marketing emails, venue spotlights, and optional SMS — withdraw anytime.",
  },
  {
    num: "06",
    title: "Public task / AML",
    body: "Mandatory anti-money-laundering reports to authorised agencies when required.",
  },
];

const useTable = [
  {
    purpose: "Listing venue inventory",
    data: "Specs, geo, photos, rates",
    retention: "While listing is active",
  },
  {
    purpose: "Processing reservations",
    data: "Guest contacts, dates, headcount",
    retention: "7 years (tax)",
  },
  {
    purpose: "Payout settlements",
    data: "Encrypted bank tokens, txn IDs",
    retention: "7 years (statutory)",
  },
  {
    purpose: "Auth & platform shielding",
    data: "Hashed passwords, 2FA, sessions",
    retention: "Session + 90 days",
  },
  {
    purpose: "Dispute resolution",
    data: "Chat logs, booking notes",
    retention: "12 months post-case",
  },
  {
    purpose: "Diagnostics",
    data: "Anonymised latency & errors",
    retention: "30 days rolling",
  },
];

const partners = [
  { name: "Stripe / local rails", role: "Payment processing & verification", tag: "Payments" },
  { name: "Cloud infrastructure", role: "Hosting, databases, CDN", tag: "Infrastructure" },
  { name: "Transactional email / SMS", role: "Booking and security notifications", tag: "Communications" },
  { name: "Support & CRM tools", role: "Owner support tickets and outreach", tag: "CRM & support" },
  { name: "Error diagnostics", role: "Performance and crash monitoring", tag: "Diagnostics" },
  { name: "Regulators / courts", role: "Only when required by law or process", tag: "Legal" },
];

const transfers = [
  {
    title: "Appropriate frameworks",
    body: "Where available, transfers rely on recognised adequacy or privacy frameworks.",
    icon: "pi-globe",
  },
  {
    title: "Standard contractual clauses",
    body: "EU-approved SCCs (or equivalents) with processors outside your region.",
    icon: "pi-file",
  },
  {
    title: "Enterprise localisation",
    body: "Data residency options may be available for qualifying venue groups.",
    icon: "pi-map-marker",
  },
];

const retentionTable = [
  {
    cat: "Account & profile",
    period: "12 months after deletion",
    why: "Service wind-down",
  },
  {
    cat: "Support communications",
    period: "2 years since last activity",
    why: "Service & audit",
  },
  {
    cat: "Usage logs",
    period: "90 days rolling",
    why: "Security & optimisation",
  },
  {
    cat: "Marketing contacts",
    period: "Until opt-out + 30 days",
    why: "Consent-based",
  },
  {
    cat: "Financial & billing",
    period: "7 years",
    why: "Tax / statutory",
  },
];

const rights = [
  { title: "Right to access", body: "Confirm whether we process your data and obtain a copy." },
  { title: "Right to rectification", body: "Correct inaccurate or incomplete personal data." },
  { title: "Right to erasure", body: "Request deletion where no overriding retention applies." },
  { title: "Right to restrict", body: "Ask us to pause certain processing in defined cases." },
  { title: "Right to portability", body: "Receive structured data you provided to us." },
  { title: "Right to object", body: "Object to processing based on legitimate interests or marketing." },
  {
    title: "Automated decisions",
    body: "Request human review where automated decisions produce legal effects.",
  },
  {
    title: "Right to complain",
    body: "Lodge a complaint with a supervisory authority (e.g. NDPC in Nigeria).",
  },
];

const cookies = [
  {
    key: "session_token",
    class: "Strictly necessary",
    badgeClass: "bg-emerald-100 text-emerald-800",
    life: "Session",
    purpose: "Keep you signed in securely",
  },
  {
    key: "csrf_token",
    class: "Strictly necessary",
    badgeClass: "bg-emerald-100 text-emerald-800",
    life: "Session",
    purpose: "Protect forms from CSRF attacks",
  },
  {
    key: "_ga / analytics",
    class: "Performance",
    badgeClass: "bg-sky-100 text-sky-800",
    life: "13 months",
    purpose: "Aggregated traffic and funnel metrics",
  },
  {
    key: "prefs_locale",
    class: "Functional",
    badgeClass: "bg-violet-100 text-violet-800",
    life: "1 year",
    purpose: "Remember language and UI preferences",
  },
];

const contacts = [
  {
    title: "Privacy inbox",
    value: "privacy@venpadi.com",
    note: "General privacy questions",
  },
  {
    title: "Data Protection Officer",
    value: "dpo@venpadi.com",
    note: "Formal data-subject requests",
  },
  {
    title: "Registered address",
    value: "Victoria Island, Lagos, Nigeria",
    note: "Madesoft Limited",
  },
  {
    title: "Compliance posture",
    value: "GDPR · NDPR",
    note: "Aligned controls; ask for current attestations",
  },
];
</script>
