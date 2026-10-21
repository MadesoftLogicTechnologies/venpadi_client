<template>
  <div></div>
</template>

<script setup>
// Venue owners sign up on the vendor portal, not here: this route exists so the
// landing page's "List your venue" links keep working, and forwards them.
definePageMeta({ layout: "plain" });
const config = useRuntimeConfig();
onMounted(() => {
  navigateTo(`${config.public.VENDOR_PORTAL_URL}/auth/signup`, { external: true });
});
</script>
