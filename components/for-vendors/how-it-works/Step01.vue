<template>
  <section id="step-01" class="bg-[#F7F8FA] py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-center">
        <div class="relative">
          <span
            class="pointer-events-none absolute -left-2 -top-8 text-[7rem] sm:text-[9rem] font-extrabold leading-none text-header/[0.04] select-none"
          >
            01
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-bold tracking-wide"
          >
            STEP 01
          </span>
          <h2
            class="relative mt-4 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
          >
            Start in under two minutes.
            <span class="text-primary">No card required.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
            Claim your venue workspace with a few details. Google sign-in is supported,
            verification is guided, and you can explore the full owner portal before you
            publish anything.
          </p>
          <ul class="relative mt-6 space-y-3">
            <li
              v-for="item in bullets"
              :key="item"
              class="flex items-start gap-2.5 text-sm text-header"
            >
              <span
                class="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
              >
                <i class="pi pi-check text-[10px] font-bold"></i>
              </span>
              {{ item }}
            </li>
          </ul>
        </div>

        <div
          class="rounded-[1.5rem] border border-border bg-white p-4 sm:p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
        >
          <div class="flex items-center gap-1.5 mb-4 px-1">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
            <span class="ml-2 text-[11px] text-bodytext">venpadi.com/claim</span>
          </div>
          <div class="rounded-2xl border border-border bg-[#F7F8FA] p-5 sm:p-6">
            <p class="text-base font-extrabold text-header">Claim your venue workspace</p>
            <p class="mt-1 text-xs text-bodytext">Free forever to list · Upgrade when you earn</p>

            <button
              type="button"
              class="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-white text-sm font-semibold text-header"
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
              Continue with Google
            </button>

            <div class="my-4 flex items-center gap-3 text-[11px] text-bodytext">
              <span class="flex-1 h-px bg-border"></span>
              or email
              <span class="flex-1 h-px bg-border"></span>
            </div>

            <label class="block text-xs font-semibold text-header mb-1.5">Venue name</label>
            <div class="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-bodytext">
              The Monarch Event Centre
            </div>

            <label class="block text-xs font-semibold text-header mt-3 mb-1.5">Phone number</label>
            <div class="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-bodytext">
              +234 801 234 5678
            </div>

            <div
              class="mt-5 w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold"
            >
              Create free account
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const bullets = [
  "Sign up with Google or email — no credit card at any step",
  "Guided venue verification so hosts know you’re legitimate",
  "Invite teammates later; start solo in minutes",
  "Explore the owner dashboard before you go live",
];
</script>
