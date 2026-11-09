<template>
  <section class="relative overflow-hidden bg-[#1A1410] text-white">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,23,0.18),transparent_55%)]"
    ></div>

    <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 pt-14 pb-16 md2:pt-20 md2:pb-24">
      <div class="grid md2:grid-cols-2 gap-12 md2:gap-16 items-center">
        <div>
          <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
            About Venpadi · Built by Madesoft
          </p>
          <h1
            class="mt-4 text-[2.15rem] sm:text-[2.75rem] md2:text-[3.25rem] font-extrabold tracking-tight leading-[1.08]"
          >
            We built the platform we wished existed.
          </h1>
          <p class="mt-5 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl">
            Hotels and vacation stays got operating systems. High-value physical venues
            were left with WhatsApp threads and paper agreements. Venpadi was born to
            close that gap — infrastructure for the spaces that host real life.
          </p>

          <div class="mt-8 flex flex-wrap gap-2.5">
            <span
              class="inline-flex items-center px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white/80"
            >
              Built by Madesoft, Lagos, Nigeria
            </span>
            <span
              class="inline-flex items-center px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white/80"
            >
              Operating in 150+ countries
            </span>
          </div>

          <div
            class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/45"
          >
            <span>Founded 2023</span>
            <span class="hidden sm:inline text-white/20">·</span>
            <span>Version 1 shipped in 11 weeks</span>
            <span class="hidden sm:inline text-white/20">·</span>
            <span class="text-primary font-semibold">First booking: 82 hours later</span>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute -top-3 left-4 z-20 inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold shadow-lg"
          >
            1,200+ venues listed
          </div>

          <div
            class="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f29da8c2c4?w=900&h=700&fit=crop"
              alt="Prime Grand Hall, Victoria Island, Lagos"
              class="w-full h-[280px] sm:h-[340px] object-cover"
            />
            <div
              class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
            >
              <p class="text-[11px] font-bold tracking-wider uppercase text-white/90">
                Prime Grand Hall
              </p>
              <p class="text-xs text-white/65">
                Victoria Island, Lagos · 1,200 guests
              </p>
            </div>
          </div>

          <div
            class="absolute -bottom-6 right-2 sm:right-6 z-10 w-[220px] rounded-2xl bg-white text-header p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-border"
          >
            <p class="text-[10px] font-bold tracking-wider uppercase text-bodytext2">
              Total venue revenue
            </p>
            <p class="mt-1 text-xl font-extrabold tracking-tight">₦420,890,200</p>
            <p class="mt-1 text-xs font-semibold text-emerald-600">+24.8% MoM</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
