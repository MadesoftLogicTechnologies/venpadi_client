<template>
  <section id="step-2" class="scroll-mt-36 bg-white py-16 md:py-24">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div class="order-2 md2:order-1 space-y-4">
          <div
            class="rounded-[1.25rem] border border-border bg-white p-4 sm:p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]"
          >
            <div class="flex items-start justify-between gap-3 mb-1">
              <div class="flex items-center gap-2.5">
                <span
                  class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
                >
                  <i class="pi pi-images text-sm"></i>
                </span>
                <p class="text-sm font-extrabold text-header">High-Resolution Media Gallery</p>
              </div>
              <span class="text-[11px] font-bold text-primary shrink-0">In progress</span>
            </div>
            <p class="text-xs text-bodytext mb-3">Upload photos of every space.</p>
            <div class="h-2 rounded-full bg-greybg overflow-hidden mb-3.5">
              <div class="h-full w-[24%] rounded-full bg-brand-gradient-soft"></div>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-[11px] font-semibold text-emerald-700"
              >
                <i class="pi pi-check text-[9px]"></i>
                Event Hall
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-[11px] font-semibold text-emerald-700"
              >
                <i class="pi pi-check text-[9px]"></i>
                Garden &amp; Poolside
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border text-[11px] font-semibold text-bodytext"
              >
                + Add more photos
              </span>
            </div>
          </div>

          <div
            class="rounded-[1.25rem] border border-border bg-white p-4 sm:p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]"
          >
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2.5">
                <span
                  class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
                >
                  <i class="pi pi-align-left text-sm"></i>
                </span>
                <p class="text-sm font-extrabold text-header">Listing Storytelling</p>
              </div>
              <span
                class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold"
              >
                <i class="pi pi-check text-[9px]"></i>
                Description added
              </span>
            </div>
            <div class="rounded-xl bg-[#F7F5F2] px-3.5 py-3 text-sm italic text-bodytext leading-relaxed">
              “Set in the heart of Victoria Island, The Grandeur Hall balances monumental
              8-meter ceiling heights with discreet private VIP lounges. Engineered for
              international summits, galas, and luxury weddings…”
            </div>
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <p class="text-header">
                Shown on your public venue page
              </p>
            </div>
          </div>
        </div>

        <div class="order-1 md2:order-2 relative">
          <span
            class="pointer-events-none absolute -right-1 -top-10 text-[8rem] sm:text-[10rem] font-extrabold leading-none text-primary/[0.08] select-none"
          >
            02
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            Step 2 of 7
          </span>
          <h2
            class="relative mt-5 text-2xl sm:text-3xl md2:text-[2.45rem] font-extrabold text-header tracking-tight leading-[1.15]"
          >
            Your listing is your storefront.
            <span class="text-transparent bg-clip-text bg-brand-gradient-soft">
              Make it impossible to ignore.
            </span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
            Corporate bookers and wedding planners want the details up front.
            Venpadi’s structured listing turns your space specifications into a clear,
            comparable venue page.
          </p>

          <div class="relative mt-6 rounded-2xl border border-border bg-[#F7F5F2] p-3.5 sm:p-4">
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="(tab, i) in tabs"
                :key="tab"
                class="px-3 py-1.5 rounded-full text-xs font-semibold"
                :class="
                  i === 0
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-bodytext'
                "
              >
                {{ tab }}
              </span>
            </div>
            <div class="border-t border-border pt-3">
              <p class="text-xs sm:text-sm text-bodytext leading-relaxed">
                Configure capacity by layout (theatre, banquet, cocktail), floor area,
                amenities and add-ons for each space.
              </p>
            </div>
          </div>

          <div
            class="relative mt-5 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4 flex items-start gap-3"
          >
            <span
              class="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0"
            >
              <i class="pi pi-lightbulb text-sm"></i>
            </span>
            <div>
              <p class="text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-1">
                Listing tip
              </p>
              <p class="text-xs sm:text-sm text-header leading-relaxed">
                Planners compare venues side by side. Clear photos of every space,
                accurate capacities and your full pricing help them choose you with
                confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ["Overview", "Photos & Media", "Amenities", "Policies & Rules"];
</script>
