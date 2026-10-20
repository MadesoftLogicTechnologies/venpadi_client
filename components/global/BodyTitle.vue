<template>
  <div class="w-full">
    <h1 class="text-dark font-medium text-xl">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>
