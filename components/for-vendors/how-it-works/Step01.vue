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
            Start in under two minutes.
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
              <i class="pi pi-clock text-xs"></i>
            </span>
            <span class="text-xs font-semibold text-header">
              Takes 2 minutes to complete initial registration
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

            <button
              type="button"
              class="mt-5 w-full inline-flex items-center justify-center gap-2.5 py-3 rounded-xl border border-border bg-white text-sm font-semibold text-header"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
                />
              </svg>
              Continue with Google Workspace
            </button>

            <div class="my-4 flex items-center gap-3 text-[10px] font-bold tracking-[0.12em] uppercase text-bodytext">
              <span class="flex-1 h-px bg-border"></span>
              Or register with email
              <span class="flex-1 h-px bg-border"></span>
            </div>

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
  "Single-click signup with Google Workspace or corporate email.",
  "Claim your custom Venpadi venue vanity URL (e.g., venpadi.com/v/your-hall).",
  "Multi-currency setup configured instantly (NGN, USD, AED, GBP).",
  "Automated 60-second legal verification check.",
];
</script>
