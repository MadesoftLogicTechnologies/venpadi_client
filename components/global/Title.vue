<template>
  <div>
    <h1 :class="`text-header  capitalize font-semibold ${sizeClass}`">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "xl",
    validator: (value) =>
      ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"].includes(
        value
      ),
  },
});

const sizeClass = `text-${props.size}`;
</script>
