<template>
  <div
    @click.self="$emit('close')"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center z-40"
    :class="{
      'justify-center': kind === 'Normal',
      'justify-end': kind === 'Side',
    }"
  >
    <div
      @click.stop
      class="bg-white text-black flex flex-col my-10 overflow-y-auto hide-scrollbar"
      :class="{
        'mx-6 max-h-[90%] my-10 py-4 w-full rounded-2xl': kind === 'Normal',
        'min-h-screen max-h-screen my-10 md:px-10 py-4 w-full md:w-[80%] lg:w-[60%]':
          kind === 'Side',
        'max-w-[350px]': maxWidth === 350,
        'max-w-[400px]': maxWidth === 400,
        'max-w-[500px]': maxWidth === 500,
        'max-w-[600px]': maxWidth === 600,
        'max-w-[700px]': maxWidth === 700,
        'max-w-[1100px]': maxWidth === 1000,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: Boolean,
  kind: {
    type: String,
    default: "Normal",
  },
  maxWidth: {
    type: Number,
    default: 600,
    validator: (value) => [350, 400, 500, 600, 1000].includes(value),
  },
});
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
