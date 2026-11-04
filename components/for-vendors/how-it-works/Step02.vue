<template>
  <section id="step-02" class="bg-white py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="grid md2:grid-cols-2 gap-10 md2:gap-14 items-center">
        <div
          class="order-2 md2:order-1 rounded-[1.5rem] border border-border bg-[#F7F8FA] p-4 sm:p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
        >
          <div class="rounded-2xl bg-white border border-border p-4 sm:p-5 mb-3">
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-extrabold text-header">Venue media gallery</p>
              <span class="text-[11px] font-semibold text-primary">4 / 12 uploaded</span>
            </div>
            <div class="grid grid-cols-3 gap-2 mb-3">
              <div
                v-for="n in 3"
                :key="n"
                class="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#E8EAED] to-[#D5D9E0]"
              ></div>
            </div>
            <div class="h-2 rounded-full bg-greybg overflow-hidden">
              <div class="h-full w-[35%] rounded-full bg-primary"></div>
            </div>
          </div>

          <div class="rounded-2xl bg-white border border-border p-4 sm:p-5">
            <p class="text-sm font-extrabold text-header mb-2">Venue branding</p>
            <div class="space-y-2">
              <div class="h-2.5 rounded-full bg-greybg w-[92%]"></div>
              <div class="h-2.5 rounded-full bg-greybg w-[78%]"></div>
              <div class="h-2.5 rounded-full bg-greybg w-[64%]"></div>
              <div class="h-2.5 rounded-full bg-greybg w-[40%]"></div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in ['Ballroom', 'Rooftop', 'Parking']"
                :key="tag"
                class="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="order-1 md2:order-2 relative">
          <span
            class="pointer-events-none absolute -right-2 -top-8 text-[7rem] sm:text-[9rem] font-extrabold leading-none text-header/[0.04] select-none"
          >
            02
          </span>
          <span
            class="relative inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide"
          >
            STEP 02
          </span>
          <h2
            class="relative mt-4 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight leading-tight"
          >
            Your listing is your storefront.
            <span class="text-primary">Make it impossible to ignore.</span>
          </h2>
          <p class="relative mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-md">
            Upload polished photos, write a clear description, and capture the amenities
            hosts filter for — so your venue wins the scroll before the enquiry lands.
          </p>

          <div class="relative mt-6 flex flex-wrap gap-2">
            <span
              v-for="(tab, i) in tabs"
              :key="tab"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border"
              :class="
                i === 0
                  ? 'bg-header text-white border-header'
                  : 'bg-white text-header border-border'
              "
            >
              {{ tab }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = ["Pictures", "Pricing & Rules", "Facilities", "Portfolio"];
</script>
