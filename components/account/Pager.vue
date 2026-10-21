<template>
  <div v-if="pages > 1" class="flex items-center justify-between gap-3 text-[13px] text-bodytext">
    <span>
      Page {{ page }} of {{ pages }} · {{ Number(total).toLocaleString("en-US") }} total
    </span>
    <div class="flex items-center gap-1.5">
      <button
        type="button"
        class="w-8 h-8 rounded-lg border border-border bg-white hover:bg-greybg disabled:opacity-40"
        :disabled="page <= 1"
        aria-label="Previous page"
        @click="$emit('update:page', page - 1)"
      >
        <i class="pi pi-chevron-left text-[10px]"></i>
      </button>
      <button
        type="button"
        class="w-8 h-8 rounded-lg border border-border bg-white hover:bg-greybg disabled:opacity-40"
        :disabled="page >= pages"
        aria-label="Next page"
        @click="$emit('update:page', page + 1)"
      >
        <i class="pi pi-chevron-right text-[10px]"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  page: { type: Number, required: true },
  total: { type: Number, default: 0 },
  limit: { type: Number, default: 25 },
});
defineEmits(["update:page"]);
const pages = computed(() => Math.max(1, Math.ceil((props.total || 0) / (props.limit || 1))));
</script>
