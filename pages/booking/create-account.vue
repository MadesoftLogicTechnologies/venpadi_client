<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

await navigateTo(
  {
    path: "/auth/signup",
    query: useRoute().query,
  },
  { replace: true }
);
</script>
