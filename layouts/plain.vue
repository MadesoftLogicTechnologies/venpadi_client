<template>
  <div>
    <slot />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import ConfirmDialog from "~/components/global/ConfirmDialog.vue";
</script>
