<template>
  <article
    class="bg-white rounded-2xl border border-border shadow-[0_4px_16px_rgba(17,24,39,0.04)] p-3 md2:p-4 md2:flex md2:items-center md2:gap-5"
  >
    <div
      class="relative w-full h-[160px] md2:w-[196px] md2:h-[128px] rounded-xl overflow-hidden shrink-0 bg-greybg"
    >
      <img
        :src="space.imageUrl"
        :alt="space.name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <span
        class="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white text-[11px] font-semibold text-header shadow-sm"
      >
        <i class="pi pi-users text-[10px]"></i>
        {{ Number(space.maxCapacity).toLocaleString("en-US") }} guests
      </span>
    </div>

    <div class="mt-3 md2:mt-0 flex-1 min-w-0 md2:flex md2:items-start md2:justify-between md2:gap-4">
      <div class="min-w-0">
        <h3 class="text-[16px] font-bold text-header">{{ space.name }}</h3>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="tag in space.tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[11px] font-medium text-[#4B5563]"
          >
            {{ tag }}
          </span>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
          <span class="text-bodytext">
            Full day
            <span class="font-semibold text-header">{{ money(space.fullDayMinor) }}</span>
          </span>
          <button
            type="button"
            class="font-semibold text-header hover:text-primary inline-flex items-center gap-1"
            @click="$emit('select')"
          >
            View Details
            <i class="pi pi-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>

      <div
        class="mt-3 md2:mt-0 flex items-center justify-between md2:flex-col md2:items-end gap-3 shrink-0"
      >
        <div class="md2:text-right">
          <p class="text-[10px] uppercase tracking-[0.12em] text-bodytext2">From</p>
          <p class="text-[18px] font-extrabold text-header leading-tight">
            {{ money(space.fromHourMinor)
            }}<span class="text-[13px] font-medium text-bodytext">/hr</span>
          </p>
        </div>
        <button
          type="button"
          class="px-4 h-9 rounded-full bg-[#FF5C7A] text-white text-[13px] font-semibold hover:opacity-95"
          @click="$emit('select')"
        >
          Select Space
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  space: { type: Object, required: true },
});

defineEmits(["select"]);

const money = (minor) => (minor === null || minor === undefined ? "—" : naira(minor));
</script>
