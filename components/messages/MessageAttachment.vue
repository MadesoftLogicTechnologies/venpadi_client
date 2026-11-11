<template>
  <!-- One message attachment (C9): an image renders as a thumbnail, anything
       else as a file chip with name + size. Both open `url`, a 1-hour link —
       re-reading the conversation refreshes it. -->
  <a
    v-if="isImage"
    :href="attachment.url"
    target="_blank"
    rel="noopener"
    class="mt-2 block rounded-xl overflow-hidden max-w-[260px]"
    :class="mine ? 'bg-white/15' : 'bg-white border border-border'"
  >
    <img :src="attachment.url" :alt="name" class="block w-full max-h-[220px] object-cover" loading="lazy" />
    <span class="block px-3 py-1.5 text-[11px] truncate" :class="mine ? 'text-white/90' : 'text-bodytext'">
      {{ name }}<template v-if="size"> · {{ size }}</template>
    </span>
  </a>
  <a
    v-else
    :href="attachment.url"
    target="_blank"
    rel="noopener"
    class="mt-2 flex items-center gap-2 rounded-xl px-3 py-2"
    :class="mine ? 'bg-white/15 text-white' : 'bg-white border border-border'"
  >
    <span
      class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      :class="mine ? 'bg-white/15' : 'bg-[#FFF1ED] text-primary'"
    >
      <i :class="['pi text-[13px]', isPdf ? 'pi-file-pdf' : 'pi-file']"></i>
    </span>
    <span class="min-w-0">
      <span class="block text-[12px] font-semibold truncate" :class="mine ? '' : 'text-header'">{{ name }}</span>
      <span v-if="size" class="block text-[11px]" :class="mine ? 'opacity-80' : 'text-bodytext'">{{ size }}</span>
    </span>
    <i class="pi pi-external-link text-[12px] ml-auto" :class="mine ? '' : 'text-bodytext'"></i>
  </a>
</template>

<script setup>
const props = defineProps({
  // MessageAttachment = { id, fileName, contentType, sizeBytes, url }
  attachment: { type: Object, required: true },
  mine: { type: Boolean, default: false },
});

const name = computed(() => props.attachment.fileName || "Attachment");
const isImage = computed(() => String(props.attachment.contentType || "").startsWith("image/"));
const isPdf = computed(() => props.attachment.contentType === "application/pdf");
const size = computed(() => formatBytes(props.attachment.sizeBytes));
</script>
