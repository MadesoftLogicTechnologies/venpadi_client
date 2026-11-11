<template>
  <section id="step-1" class="scroll-mt-36 bg-[#F7F5F2] py-16 md:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-1 -top-10 text-[8rem] sm:text-[10rem] font-extrabold leading-none text-primary/[0.08] select-none"
          >
            01
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Step 1 of 7
          </span>
          <h2
            class="relative mt-5 text-2xl sm:text-3xl md2:text-[2.45rem] font-extrabold text-header tracking-tight leading-[1.15]"
          >
            Start today.
            <span class="text-primary">No card required.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
            Built for operators managing boutique spaces or convention centres. Claim your
            workspace, verify ownership, and explore the owner portal before you publish.
          </p>
          <ul class="relative mt-7 space-y-3.5">
            <li
              v-for="item in bullets"
              :key="item"
              class="flex items-start gap-3 text-sm text-header leading-snug"
            >
              <span
                class="mt-0.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0"
              >
                <i class="pi pi-check text-[10px] font-bold"></i>
              </span>
              {{ item }}
            </li>
          </ul>

          <div
            class="relative mt-8 inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white border border-border shadow-sm"
          >
            <span
              class="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center"
            >
              <i class="pi pi-check text-xs"></i>
            </span>
            <span class="text-xs font-semibold text-header">
              Free to register — no setup fee
            </span>
          </div>
        </div>

        <div
          class="rounded-[1.35rem] border border-border bg-white shadow-[0_28px_70px_rgba(15,23,42,0.1)] overflow-hidden"
        >
          <div class="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#FAFAF8]">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
            <div
              class="ml-3 flex-1 flex items-center justify-center gap-1.5 rounded-full bg-white border border-border px-3 py-1 text-[11px] text-bodytext"
            >
              <i class="pi pi-lock text-[9px] text-emerald-600"></i>
              venpadi.com/signup
            </div>
          </div>

          <div class="p-5 sm:p-6">
            <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
              Venue Registration
            </p>
            <p class="mt-1.5 text-lg font-extrabold text-header">Claim your venue workspace</p>

            <!-- No Google sign-in exists (DECISIONS §6), so the mock shows email only. -->
            <div class="mt-5"></div>
            <label class="block text-xs font-semibold text-header mb-1.5">Venue Name</label>
            <div
              class="rounded-xl border border-primary/50 bg-white px-3 py-2.5 text-sm text-header flex items-center justify-between gap-2"
            >
              <span>The Grandeur Hall &amp; Terraces</span>
              <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <i class="pi pi-check-circle text-xs"></i>
                Available
              </span>
            </div>

            <div class="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-header mb-1.5">Corporate Email</label>
                <div class="rounded-xl border border-border bg-[#F7F5F2] px-3 py-2.5 text-sm text-bodytext truncate">
                  admin@thegrandeur.ng
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-header mb-1.5">Location City</label>
                <div class="rounded-xl border border-border bg-[#F7F5F2] px-3 py-2.5 text-sm text-bodytext truncate">
                  Lagos, Victoria Island
                </div>
              </div>
            </div>

            <div
              class="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold"
            >
              Continue — It’s Free
              <i class="pi pi-arrow-right text-xs"></i>
            </div>

            <div
              class="mt-4 rounded-xl border border-primary/15 bg-primary/[0.06] px-3.5 py-3 flex items-start gap-2.5"
            >
              <span
                class="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0"
              >
                <i class="pi pi-envelope text-xs"></i>
              </span>
              <div>
                <p class="text-xs font-bold text-header">Verification email dispatched</p>
                <p class="mt-0.5 text-[11px] text-bodytext leading-snug">
                  Check your inbox to confirm administrative privileges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const bullets = [
  "Sign up with your business email.",
  "Get a public Venpadi page for your venue once it goes live.",
  "Prices and payouts in Naira (NGN).",
  "Submit your business documents for verification.",
];
</script>
