<template>
  <div class="px-4 md2:px-8 py-10">
    <div class="max-w-[480px] mx-auto bg-white rounded-[24px] border border-border p-8 text-center">
      <template v-if="state === 'verifying'">
        <i class="pi pi-spin pi-spinner text-2xl text-primary"></i>
        <p class="mt-3 text-[15px] font-semibold text-header">Confirming your payment…</p>
        <p class="mt-1 text-[13px] text-bodytext">Please don’t close this page.</p>
      </template>
      <template v-else-if="state === 'missing'">
        <p class="text-[15px] font-semibold text-header">No payment reference</p>
        <NuxtLink to="/bookings" class="mt-3 inline-block text-[13px] font-semibold text-primary">Go to My Bookings</NuxtLink>
      </template>
      <template v-else>
        <i class="pi pi-exclamation-circle text-2xl text-[#DC2626]"></i>
        <p class="mt-3 text-[15px] font-semibold text-header">We couldn’t confirm this payment</p>
        <p class="mt-1 text-[13px] text-bodytext">{{ message }}</p>
        <div class="mt-5 flex justify-center gap-2">
          <button type="button" class="h-10 px-4 rounded-full bg-primary text-white text-[13px] font-semibold" @click="verify">
            Try again
          </button>
          <NuxtLink to="/bookings" class="h-10 px-4 rounded-full border border-border text-[13px] font-semibold inline-flex items-center">
            My Bookings
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
/* Return page for the real gateway: ?reference= (or Paystack's ?trxref=) → verify → booking. */
useHead({ title: "Confirming payment" });

const route = useRoute();
const reference = String(route.query.reference || route.query.trxref || route.query.payment || "");
const state = ref(reference ? "verifying" : "missing");
const message = ref("");

async function verify() {
  state.value = "verifying";
  try {
    const result = await api.post(`/payments/${encodeURIComponent(reference)}/verify`, {}, { toast: false });
    if (result?.status === "success") {
      notifySuccess("Payment successful");
      return navigateTo(result.bookingReference ? `/bookings/${result.bookingReference}` : "/bookings", { replace: true });
    }
    state.value = "failed";
    message.value = `The gateway reports this payment as “${result?.status ?? "unknown"}”.`;
  } catch (e) {
    state.value = "failed";
    message.value = e?.message || "";
  }
}

onMounted(() => {
  if (reference) verify();
});
</script>
