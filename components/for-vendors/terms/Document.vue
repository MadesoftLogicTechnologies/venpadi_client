<template>
  <section id="terms-document" class="bg-[#F9F9F7] py-12 md2:py-16">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-[260px_minmax(0,1fr)] gap-8 md2:gap-12 items-start">
        <aside
          class="md2:sticky md2:top-24 rounded-2xl border border-border bg-white p-5 shadow-[0_8px_24px_rgba(26,22,20,0.04)]"
        >
          <p class="text-sm font-extrabold text-header">Terms of Service</p>
          <p class="text-[11px] text-bodytext2 mt-0.5 mb-4">Version 1.2.0</p>
          <nav class="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
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
              <i :class="['pi text-[11px] shrink-0 opacity-70', item.icon]"></i>
              <span class="leading-snug">{{ item.label }}</span>
            </a>
          </nav>
          <a
            href="mailto:legal@venpadi.com?subject=Terms%20of%20Service%20PDF"
            class="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border text-xs font-semibold text-header hover:bg-greybg"
          >
            <i class="pi pi-download text-[11px]"></i>
            Download PDF
          </a>
        </aside>

        <div class="space-y-10 md2:space-y-14 min-w-0">
          <!-- 01 -->
          <article :id="nav[0].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >01</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 01
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Scope &amp; Definitions
            </h2>
            <p class="relative mt-2 text-sm text-bodytext max-w-2xl leading-relaxed">
              Foundational terms that establish the legal framework for the Venue Owner
              relationship.
            </p>
            <div class="relative mt-6 grid sm:grid-cols-2 gap-3">
              <div
                v-for="def in definitions"
                :key="def.term"
                class="rounded-2xl bg-white border border-border/80 p-4"
              >
                <h3 class="text-sm font-bold text-header">{{ def.term }}</h3>
                <p class="mt-1.5 text-xs text-bodytext leading-relaxed">{{ def.body }}</p>
              </div>
            </div>
          </article>

          <!-- 02 -->
          <article :id="nav[1].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >02</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 02
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Venue Eligibility &amp; Registration
            </h2>
            <div
              class="relative mt-4 rounded-2xl border border-primary/20 bg-[#FFF7F2] p-4 flex gap-3"
            >
              <i class="pi pi-info-circle text-primary mt-0.5 shrink-0"></i>
              <p class="text-sm text-header leading-relaxed">
                <span class="font-semibold">Plain language:</span>
                Be legal and be who you say you are. This section covers who can join and
                what you must provide to start.
              </p>
            </div>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-5">
              <div v-for="clause in eligibility" :key="clause.title">
                <h3 class="text-sm font-bold text-header">{{ clause.title }}</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">{{ clause.body }}</p>
              </div>
            </div>
          </article>

          <!-- 03 -->
          <article :id="nav[2].id" class="scroll-mt-28 relative">
            <div class="rounded-3xl bg-[#1A1614] text-white p-6 sm:p-8 md2:p-10">
              <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                Section 03
              </p>
              <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
                Platform Services &amp; Infrastructure
              </h2>
              <p class="mt-2 text-sm text-white/55 max-w-xl">
                Our commitment to you: an operating system for modern hospitality.
              </p>
              <div class="mt-8 grid sm:grid-cols-2 md2:grid-cols-4 gap-3">
                <div
                  v-for="svc in services"
                  :key="svc.title"
                  class="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    :class="svc.iconBg"
                  >
                    <i :class="['pi text-xs', svc.icon]"></i>
                  </div>
                  <h3 class="text-sm font-bold">{{ svc.title }}</h3>
                  <p class="mt-1.5 text-xs text-white/50 leading-relaxed">{{ svc.body }}</p>
                </div>
              </div>
              <div class="mt-6 grid sm:grid-cols-2 gap-3">
                <div class="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
                  <p class="text-sm font-bold text-primary">99.9% Service Level Agreement</p>
                  <p class="mt-1 text-xs text-white/60">
                    Target monthly uptime for core booking and payout services.
                  </p>
                </div>
                <div class="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
                  <p class="text-sm font-bold text-primary">30-Day Planned Maintenance Notice</p>
                  <p class="mt-1 text-xs text-white/60">
                    Material scheduled downtime is communicated in advance where practicable.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <!-- 04 -->
          <article :id="nav[3].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >04</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 04
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Listing Standards &amp; Accuracy
            </h2>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-5">
              <div v-for="clause in listing" :key="clause.title">
                <h3 class="text-sm font-bold text-header">{{ clause.title }}</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">{{ clause.body }}</p>
              </div>
              <div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex gap-3">
                <i class="pi pi-exclamation-triangle text-amber-600 mt-0.5 shrink-0"></i>
                <div>
                  <p class="text-sm font-bold text-header">Prohibited content restrictions</p>
                  <p class="mt-1 text-xs text-bodytext leading-relaxed">
                    Do not upload sensitive identity documents publicly, off-platform contact
                    details meant to bypass Venpadi, or content that infringes third-party
                    rights or community standards.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <!-- 05 -->
          <article :id="nav[4].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >05</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 05
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Platform Fee Schedule &amp; Escrow
            </h2>
            <div class="relative mt-5 grid sm:grid-cols-3 gap-3">
              <div
                v-for="tier in feeTiers"
                :key="tier.name"
                class="rounded-2xl bg-white border p-5 relative"
                :class="
                  tier.popular
                    ? 'border-primary shadow-[0_12px_32px_rgba(255,77,23,0.12)]'
                    : 'border-border/80'
                "
              >
                <span
                  v-if="tier.popular"
                  class="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold tracking-wide"
                >
                  MOST POPULAR
                </span>
                <p class="text-sm font-bold text-header">{{ tier.name }}</p>
                <p class="mt-1 text-2xl font-extrabold text-header">
                  {{ tier.rate }}
                  <span class="text-sm font-semibold text-bodytext2">per booking</span>
                </p>
                <p class="mt-2 text-xs text-bodytext leading-relaxed">{{ tier.body }}</p>
              </div>
            </div>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-4">
              <div>
                <h3 class="text-sm font-bold text-header">5.1 Automatic fee deduction</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">
                  The applicable platform fee is deducted automatically from the booking
                  total before payout. Fee rates shown at booking confirmation control.
                </p>
              </div>
              <div>
                <h3 class="text-sm font-bold text-header">5.2 Zero hidden fees commitment</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">
                  Listing is free. There are no annual membership retainers. Optional paid
                  add-ons (e.g. photography) are disclosed separately before purchase.
                </p>
              </div>
            </div>
          </article>

          <!-- 06 -->
          <article :id="nav[5].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >06</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 06
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Booking Lifecycle &amp; Cancellation Rules
            </h2>

            <div class="relative mt-6 overflow-x-auto pb-2">
              <div class="flex items-start gap-0 min-w-[720px]">
                <div
                  v-for="(step, i) in lifecycle"
                  :key="step.label"
                  class="flex items-center flex-1"
                >
                  <div class="flex flex-col items-center text-center w-full px-1">
                    <div
                      class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      :style="{ background: step.color }"
                    >
                      {{ i + 1 }}
                    </div>
                    <p class="mt-2 text-[10px] font-semibold text-header leading-tight">
                      {{ step.label }}
                    </p>
                  </div>
                  <div
                    v-if="i < lifecycle.length - 1"
                    class="h-px flex-1 bg-border -mt-6 min-w-[12px]"
                  ></div>
                </div>
              </div>
            </div>

            <div
              class="relative mt-6 rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <h3 class="text-sm font-bold text-header">
                Summary: Host-initiated cancellations
              </h3>
              <ul class="mt-3 grid sm:grid-cols-2 gap-2 text-xs text-bodytext">
                <li v-for="item in hostCancelSummary" :key="item" class="flex gap-2">
                  <i class="pi pi-times-circle text-red-500 text-[11px] mt-0.5 shrink-0"></i>
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="relative mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
              <table class="w-full text-left text-xs sm:text-sm min-w-[560px]">
                <thead class="bg-greybg text-header">
                  <tr>
                    <th class="px-4 py-3 font-bold">Policy</th>
                    <th class="px-4 py-3 font-bold">Guest free cancel window</th>
                    <th class="px-4 py-3 font-bold">Admin fee if late</th>
                    <th class="px-4 py-3 font-bold">Owner retention</th>
                  </tr>
                </thead>
                <tbody class="text-bodytext">
                  <tr
                    v-for="row in cancelTable"
                    :key="row.policy"
                    class="border-t border-border"
                  >
                    <td class="px-4 py-3 font-semibold text-header">{{ row.policy }}</td>
                    <td class="px-4 py-3">{{ row.window }}</td>
                    <td class="px-4 py-3">{{ row.fee }}</td>
                    <td class="px-4 py-3">{{ row.retention }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <!-- 07 -->
          <article :id="nav[6].id" class="scroll-mt-28 relative">
            <div class="rounded-3xl bg-[#1A1614] text-white p-6 sm:p-8 md2:p-10">
              <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                Section 07
              </p>
              <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
                Payments, Escrow &amp; Payout Channels
              </h2>

              <div class="mt-8 grid sm:grid-cols-3 gap-3">
                <div
                  v-for="(step, i) in escrowFlow"
                  :key="step.title"
                  class="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p class="text-[10px] font-bold tracking-wider uppercase text-white/40">
                    Step {{ i + 1 }}
                  </p>
                  <div
                    class="mt-2 w-8 h-8 rounded-lg flex items-center justify-center"
                    :class="step.iconBg"
                  >
                    <i :class="['pi text-xs', step.icon]"></i>
                  </div>
                  <h3 class="mt-3 text-sm font-bold">{{ step.title }}</h3>
                  <p class="mt-1 text-xs text-white/50 leading-relaxed">{{ step.body }}</p>
                </div>
              </div>
              <p class="mt-4 text-xs text-white/50">
                Escrow release typically occurs within 24–48 hours after the event ends
                without an active dispute.
              </p>

              <h3 class="mt-8 text-sm font-bold">Supported payout channels</h3>
              <div class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div
                  v-for="ch in payoutChannels"
                  :key="ch"
                  class="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/70"
                >
                  {{ ch }}
                </div>
              </div>
            </div>
          </article>

          <!-- 08 -->
          <article :id="nav[7].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >08</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 08
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Owner Conduct &amp; Operating Standards
            </h2>
            <p class="relative mt-3 text-sm text-bodytext leading-relaxed max-w-2xl">
              Venue owners belong to a hospitality network that expects safety, cleanliness,
              professionalism, and respectful guest communication.
            </p>
            <div class="relative mt-4 rounded-2xl border border-red-200 bg-red-50 p-5">
              <h3 class="text-sm font-bold text-header">Prohibited habits</h3>
              <p class="mt-2 text-sm text-bodytext leading-relaxed">
                Bypassing Venpadi for payment, soliciting off-platform side deals, or
                requesting cash tips outside disclosed packages may result in suspension or
                termination.
              </p>
            </div>
            <div class="relative mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in responseTags"
                :key="tag.label"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                :class="tag.class"
              >
                {{ tag.label }}
                <span class="font-normal opacity-80">· {{ tag.meta }}</span>
              </span>
            </div>
          </article>

          <!-- 09 -->
          <article :id="nav[8].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >09</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 09
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Intellectual Property &amp; Content Licensing
            </h2>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-5">
              <div v-for="clause in ipClauses" :key="clause.title">
                <h3 class="text-sm font-bold text-header">{{ clause.title }}</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">{{ clause.body }}</p>
              </div>
            </div>
          </article>

          <!-- 10 -->
          <article :id="nav[9].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >10</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 10
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Limitation of Liability &amp; Indemnification
            </h2>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-5">
              <div v-for="clause in liability" :key="clause.title">
                <h3 class="text-sm font-bold text-header">{{ clause.title }}</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">{{ clause.body }}</p>
              </div>
            </div>
          </article>

          <!-- 11 -->
          <article :id="nav[10].id" class="scroll-mt-28 relative">
            <div class="rounded-3xl bg-[#1A1614] text-white p-6 sm:p-8 md2:p-10">
              <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                Section 11
              </p>
              <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
                Structured Dispute Resolution Timeline
              </h2>
              <p class="mt-2 text-sm text-white/55">
                Clear stages before litigation or external arbitration.
              </p>
              <ol class="mt-8 space-y-5 relative">
                <li
                  v-for="(stage, i) in disputeStages"
                  :key="stage.title"
                  class="relative pl-8"
                >
                  <span
                    class="absolute left-0 top-1.5 w-3 h-3 rounded-full ring-4 ring-[#1A1614]"
                    :style="{ background: stage.color }"
                  ></span>
                  <div
                    v-if="i < disputeStages.length - 1"
                    class="absolute left-[5px] top-5 bottom-[-20px] w-px bg-white/15"
                  ></div>
                  <p class="text-[10px] font-bold tracking-wider uppercase text-white/40">
                    Stage {{ i + 1 }} · {{ stage.timing }}
                  </p>
                  <h3 class="mt-0.5 text-sm font-bold">{{ stage.title }}</h3>
                  <p class="mt-1 text-xs text-white/55 leading-relaxed">{{ stage.body }}</p>
                </li>
              </ol>
            </div>
          </article>

          <!-- 12 -->
          <article :id="nav[11].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >12</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 12
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Contract Term &amp; Termination Protocol
            </h2>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-5">
              <div v-for="clause in termination" :key="clause.title">
                <h3 class="text-sm font-bold text-header">{{ clause.title }}</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">{{ clause.body }}</p>
              </div>
            </div>
          </article>

          <!-- 13 -->
          <article :id="nav[12].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >13</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 13
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Modifications &amp; Version Governance
            </h2>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6 space-y-5">
              <div>
                <h3 class="text-sm font-bold text-header">13.1 Material amendments</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">
                  Significant changes to fees, liability, or termination rights are notified
                  at least 30 days in advance via email or dashboard notice. Continued use
                  after the effective date constitutes acceptance.
                </p>
              </div>
              <div>
                <h3 class="text-sm font-bold text-header">13.2 Non-material tweaks</h3>
                <p class="mt-1.5 text-sm text-bodytext leading-relaxed">
                  Typos, clarifications, and non-substantive formatting updates may be made
                  without prior notice. The version stamp at the top of this page always
                  reflects the current text.
                </p>
              </div>
            </div>
          </article>

          <!-- 14 -->
          <article :id="nav[13].id" class="scroll-mt-28 relative">
            <span
              class="pointer-events-none absolute -left-1 -top-6 text-[6.5rem] font-extrabold text-header/[0.05] leading-none select-none"
            >14</span>
            <p class="relative text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Section 14
            </p>
            <h2 class="relative mt-1 text-2xl font-extrabold text-header tracking-tight">
              Governing Law, Jurisdiction &amp; Legal Notices
            </h2>
            <div class="relative mt-4 rounded-2xl bg-white border border-border/80 p-5 sm:p-6">
              <h3 class="text-sm font-bold text-header">14.1 Applicable law &amp; forum</h3>
              <p class="mt-1.5 text-sm text-bodytext leading-relaxed">
                These Terms are governed by the laws of the Federal Republic of Nigeria.
                Subject to the dispute timeline in Section 11, courts of competent
                jurisdiction in Lagos State (including the High Court of Lagos State) have
                exclusive venue for unresolved disputes.
              </p>
            </div>
            <div class="relative mt-4 rounded-2xl bg-[#0B0F14] text-white p-5 sm:p-6">
              <h3 class="text-sm font-bold">Official channels for service of process</h3>
              <dl class="mt-4 space-y-3 text-sm">
                <div class="flex flex-col sm:flex-row sm:gap-4">
                  <dt class="text-white/45 shrink-0 w-28">Nigeria</dt>
                  <dd>
                    <a href="mailto:legal@venpadi.com" class="text-primary hover:underline"
                      >legal@venpadi.com</a
                    >
                  </dd>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-4">
                  <dt class="text-white/45 shrink-0 w-28">General</dt>
                  <dd>
                    <a href="mailto:support@venpadi.com" class="text-primary hover:underline"
                      >support@venpadi.com</a
                    >
                  </dd>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-4">
                  <dt class="text-white/45 shrink-0 w-28">Address</dt>
                  <dd class="text-white/80">
                    Venpadi Technologies Inc., Maryland Mall, Ikeja, Lagos, Nigeria
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const active = ref("sec-01");

const nav = [
  { id: "sec-01", label: "1. Scope & Definitions", icon: "pi-globe" },
  { id: "sec-02", label: "2. Venue Eligibility", icon: "pi-user" },
  { id: "sec-03", label: "3. Platform Services", icon: "pi-server" },
  { id: "sec-04", label: "4. Listing Standards", icon: "pi-image" },
  { id: "sec-05", label: "5. Fee Schedule & Escrow", icon: "pi-percentage" },
  { id: "sec-06", label: "6. Bookings & Cancellations", icon: "pi-calendar" },
  { id: "sec-07", label: "7. Payments & Payouts", icon: "pi-wallet" },
  { id: "sec-08", label: "8. Owner Conduct", icon: "pi-heart" },
  { id: "sec-09", label: "9. Intellectual Property", icon: "pi-copyright" },
  { id: "sec-10", label: "10. Liability & Indemnity", icon: "pi-shield" },
  { id: "sec-11", label: "11. Dispute Resolution", icon: "pi-comments" },
  { id: "sec-12", label: "12. Term & Termination", icon: "pi-times-circle" },
  { id: "sec-13", label: "13. Modifications", icon: "pi-file-edit" },
  { id: "sec-14", label: "14. Governing Law", icon: "pi-map-marker" },
];

const definitions = [
  {
    term: "Platform",
    body: "Venpadi Technologies Inc. and the websites, apps, and tools we operate for venue discovery and bookings.",
  },
  {
    term: "Venue Owner / Partner",
    body: "You — the individual or entity authorised to list and accept bookings for a space on Venpadi.",
  },
  {
    term: "Client (“Booker”)",
    body: "The guest, planner, or organisation that requests or pays for a booking of your listing.",
  },
  {
    term: "Listing",
    body: "The digital profile of your venue including photos, amenities, rules, pricing, and availability.",
  },
  {
    term: "Booking lifecycle",
    body: "The path from enquiry through confirmation, event day, completion, and payout or dispute.",
  },
  {
    term: "Platform fee",
    body: "The transparent commission deducted from successful bookings under your fee tier.",
  },
  {
    term: "Payout window",
    body: "The period after a completed event during which funds are released to your nominated account.",
  },
  {
    term: "Force majeure",
    body: "Events beyond reasonable control (e.g. natural disaster, war, government action) that prevent performance.",
  },
];

const eligibility = [
  {
    title: "2.1 Legal capacity & corporate existence",
    body: "You must be at least 18, legally able to contract, and — if listing as a company — duly registered with authority to bind that entity.",
  },
  {
    title: "2.2 Ownership & licensing authority",
    body: "You warrant you own the venue or hold a management mandate that permits listing, pricing, and honouring paid bookings.",
  },
  {
    title: "2.3 Know-Your-Customer (KYC) verification",
    body: "We may require government ID, proof of authority, and bank details before activating payouts. Incomplete KYC may pause listings.",
  },
  {
    title: "2.4 Single master account principle",
    body: "One master owner account per legal entity. Teammates may be invited with role-based access under that master account.",
  },
];

const services = [
  {
    title: "Inventory management",
    body: "Calendars, pricing, packages, and digital assets in one control centre.",
    icon: "pi-calendar",
    iconBg: "bg-[#FF2D55]/15 text-[#FF2D55]",
  },
  {
    title: "Payment processing",
    body: "Secure collection of deposits and balances through integrated rails.",
    icon: "pi-credit-card",
    iconBg: "bg-primary/20 text-primary",
  },
  {
    title: "Analytics dashboard",
    body: "Enquiry, conversion, and revenue visibility for operational decisions.",
    icon: "pi-chart-line",
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
  {
    title: "Trust & safety",
    body: "Verification, mediation support, and fraud controls around bookings.",
    icon: "pi-shield",
    iconBg: "bg-sky-500/15 text-sky-400",
  },
];

const listing = [
  {
    title: "4.1 Venue and feature integrity",
    body: "Descriptions, capacities, amenities, and photography must fairly represent the space guests will receive on the event date.",
  },
  {
    title: "4.2 Price & availability maintenance",
    body: "Keep rates and calendars synced. Stale availability that causes confirmed conflicts may trigger penalties under Section 06.",
  },
  {
    title: "4.3 Content quality review rights",
    body: "Venpadi may audit, request edits, or temporarily unpublish listings that fail accuracy, safety, or quality standards.",
  },
];

const feeTiers = [
  {
    name: "Standard",
    rate: "10%",
    body: "Individual venues. Standard support and standard payout timing.",
    popular: false,
  },
  {
    name: "Verified",
    rate: "8%",
    body: "Priority support and faster payout eligibility after verification milestones.",
    popular: true,
  },
  {
    name: "Premier",
    rate: "6%",
    body: "Multi-space groups (5+). Dedicated success manager and custom integrations.",
    popular: false,
  },
];

const lifecycle = [
  { label: "Enquiry", color: "#FF2D55" },
  { label: "Review", color: "#FF7A00" },
  { label: "Deposit", color: "#EAB308" },
  { label: "Confirmed", color: "#16A34A" },
  { label: "Balance due", color: "#0EA5E9" },
  { label: "Paid", color: "#14B8A6" },
  { label: "In progress", color: "#8B5CF6" },
  { label: "Completed", color: "#4B5563" },
];

const hostCancelSummary = [
  "Guest receives a full refund when the host cancels a confirmed booking.",
  "Search visibility may be reduced for up to 90 days after repeated host cancels.",
  "A public “Host canceled” signal may appear on affected booking history.",
  "System or force-majeure cancellations follow separate published rules.",
];

const cancelTable = [
  {
    policy: "Flexible",
    window: "24 hours before event",
    fee: "10% admin",
    retention: "Remainder per policy",
  },
  {
    policy: "Moderate",
    window: "Up to 30 days before",
    fee: "20% admin",
    retention: "50% after cutoff",
  },
  {
    policy: "Strict",
    window: "Up to 60 days before",
    fee: "50% admin",
    retention: "Full after cutoff",
  },
  {
    policy: "Custom",
    window: "As published on listing",
    fee: "Variable",
    retention: "As disclosed at booking",
  },
];

const escrowFlow = [
  {
    title: "Client pays",
    body: "Deposit and balance collected through Venpadi payment rails.",
    icon: "pi-credit-card",
    iconBg: "bg-[#FF2D55]/15 text-[#FF2D55]",
  },
  {
    title: "Held in escrow",
    body: "Funds secured until event completion or policy-based release.",
    icon: "pi-lock",
    iconBg: "bg-primary/20 text-primary",
  },
  {
    title: "Payout released",
    body: "Net amount (after platform fee) sent to your nominated account.",
    icon: "pi-check-circle",
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
];

const payoutChannels = [
  "Nigerian bank transfer",
  "Integrated settlement rails",
  "Business account payout",
  "Multi-currency host pay-in*",
  "Manual wire (enterprise)",
  "Caution deposit hold",
];

const responseTags = [
  { label: "Fast responder", meta: "< 1 hr", class: "bg-emerald-100 text-emerald-800" },
  { label: "Standard", meta: "1–12 hrs", class: "bg-amber-100 text-amber-800" },
  { label: "Slow responder", meta: "> 24 hrs", class: "bg-red-100 text-red-800" },
  { label: "Unavailable", meta: "Paused / inactive", class: "bg-greybg text-header" },
];

const ipClauses = [
  {
    title: "9.1 Ownership of profile assets",
    body: "You retain copyright in original photos, logos, and copy you upload. You grant Venpadi a licence to host and display them on the Platform.",
  },
  {
    title: "9.2 Limited marketing licence",
    body: "You grant a non-exclusive, royalty-free licence to format and distribute listing assets to promote your venue across Venpadi channels and partners.",
  },
  {
    title: "9.3 De-listing on termination",
    body: "On termination we remove your listing from live search. Archived transaction records may be retained as required by law or accounting needs.",
  },
];

const liability = [
  {
    title: "10.1 Liability ceiling",
    body: "To the extent permitted by law, Venpadi’s aggregate liability arising from these Terms is capped at the platform fees paid by you in the twelve months preceding the claim.",
  },
  {
    title: "10.2 Exclusion of consequential losses",
    body: "Neither party is liable for indirect, incidental, special, or consequential damages, including lost profits, except where prohibited by law.",
  },
  {
    title: "10.3 Mutual indemnification",
    body: "Each party will defend and indemnify the other against third-party claims arising from that party’s material breach, negligence, or unlawful content — subject to prompt notice and reasonable cooperation.",
  },
];

const disputeStages = [
  {
    timing: "Within 48 hours",
    title: "Formal dispute lodged",
    body: "Claim submitted via the owner or guest portal with booking reference.",
    color: "#FF2D55",
  },
  {
    timing: "1–5 working days",
    title: "Evidence submission",
    body: "Messages, photos, contracts, and other proof collected from both sides.",
    color: "#FF7A00",
  },
  {
    timing: "5–10 working days",
    title: "Trust & Safety review",
    body: "Internal review of evidence and independent fact-finding as needed.",
    color: "#EAB308",
  },
  {
    timing: "By day 15",
    title: "Binding internal decision",
    body: "Written outcome issued covering refunds, payouts, or account actions.",
    color: "#16A34A",
  },
  {
    timing: "If unresolved",
    title: "External arbitration / courts",
    body: "Parties may escalate under Section 14 after exhausting Platform mediation.",
    color: "#8B5CF6",
  },
];

const termination = [
  {
    title: "12.1 Termination for convenience",
    body: "Either party may terminate with 30 days’ written notice. Confirmed bookings already paid must still be honoured or settled under cancellation rules.",
  },
  {
    title: "12.2 Termination for cause",
    body: "Material breach, fraud, safety risk, or repeated policy violations may result in immediate suspension or termination.",
  },
  {
    title: "12.3 Data export window",
    body: "After termination you may request an export of your listing and booking records for a limited window before inactive account data is deleted or anonymised per our retention policy.",
  },
];
</script>
