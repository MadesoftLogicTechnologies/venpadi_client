<template>
  <section class="bg-white py-14 md2:py-16 border-t border-border">
    <div class="max-w-[1100px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
        Compliance &amp; documentation
      </p>
      <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold text-header tracking-tight">
        Related Legal Frameworks
      </h2>

      <div class="mt-8 grid sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="doc in docs"
          :key="doc.title"
          :to="doc.to"
          class="group rounded-2xl border border-border bg-[#F9F9F7] p-5 hover:border-primary/30 hover:bg-[#FFF7F2] transition-colors"
        >
          <div
            class="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary mb-4"
          >
            <i :class="['pi text-sm', doc.icon]"></i>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold text-header">{{ doc.title }}</h3>
              <p class="mt-1.5 text-xs text-bodytext leading-relaxed">{{ doc.body }}</p>
            </div>
            <i
              class="pi pi-chevron-right text-xs text-bodytext2 mt-1 group-hover:text-primary shrink-0"
            ></i>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const docs = [
  {
    title: "Privacy & Data Policy",
    body: "How we collect, use, and protect owner and guest information on Venpadi.",
    icon: "pi-shield",
    to: "/for-vendors/privacy",
  },
  {
    title: "Cookies & Tracking",
    body: "Types of cookies we use and how you can manage preferences.",
    icon: "pi-circle",
    to: "/for-vendors/privacy#priv-09",
  },
  {
    title: "Owner Conduct",
    body: "Operating standards that apply to messaging, listings, and payments.",
    icon: "pi-file",
    to: "/for-vendors/terms#sec-08",
  },
];
</script>
