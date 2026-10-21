<template>
  <div class="px-4 md2:px-8 py-10">
    <div class="max-w-[480px] mx-auto bg-white rounded-[24px] border border-border shadow-[0_16px_40px_rgba(17,24,39,0.08)] p-6 md2:p-8">
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C] text-[11px] font-semibold">Test mode</span>
        <span class="text-[12px] text-bodytext2">No real money moves</span>
      </div>
      <h1 class="mt-4 text-[22px] font-extrabold text-header">Test payment</h1>
      <p class="mt-1 text-[13px] text-bodytext">
        The payment gateway is running in dry-run mode. Completing this page marks the
        payment as successful, exactly as a real checkout would.
      </p>

      <p v-if="!reference" class="mt-6 text-[13px] text-[#DC2626]">This link has no payment reference.</p>
      <template v-else>
        <div class="mt-6 rounded-2xl bg-greybg px-4 py-4 space-y-2 text-[13px]">
          <div class="flex justify-between gap-3">
            <span class="text-bodytext">Reference</span>
            <span class="font-semibold text-header">{{ reference }}</span>
          </div>
          <template v-if="payment">
            <div class="flex justify-between gap-3">
              <span class="text-bodytext">For</span>
              <span class="font-semibold text-header capitalize">{{ payment.purpose }}</span>
            </div>
            <div class="flex justify-between gap-3">
              <span class="text-bodytext">Status</span>
              <span class="font-semibold text-header capitalize">{{ payment.status }}</span>
            </div>
            <div class="flex justify-between gap-3 pt-2 border-t border-border">
              <span class="font-semibold text-header">Amount</span>
              <span class="text-[18px] font-extrabold text-header">{{ naira(payment.amountMinor, { decimals: true }) }}</span>
            </div>
          </template>
          <p v-else-if="loading" class="text-bodytext">Loading payment…</p>
        </div>

        <button
          type="button"
          class="mt-6 w-full h-12 rounded-full bg-brand-gradient-soft text-white text-[14px] font-semibold disabled:opacity-60"
          :disabled="completing || payment?.status === 'success'"
          @click="complete"
        >
          {{ completing ? "Completing…" : payment?.status === "success" ? "Already paid" : "Complete payment" }}
        </button>
        <NuxtLink
          to="/bookings"
          class="mt-2 w-full h-11 rounded-full border border-border text-[13px] font-semibold text-header inline-flex items-center justify-center hover:bg-greybg"
        >
          Cancel and go back
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast";

/*
 * Where the API's DRY-RUN gateway sends the client (authorizationUrl =
 * /payments/dry-run?reference=…). "Complete payment" runs the same verify path
 * a real checkout callback would.
 */
useHead({ title: "Test payment" });

const route = useRoute();
const reference = computed(() => String(route.query.reference || ""));

const payment = ref(null);
const loading = ref(false);
const completing = ref(false);

onMounted(async () => {
  if (!reference.value) return;
  loading.value = true;
  try {
    payment.value = await api.get(`/payments/${encodeURIComponent(reference.value)}`, undefined, { toast: false });
  } catch {
    payment.value = null;
  } finally {
    loading.value = false;
  }
});

async function complete() {
  completing.value = true;
  try {
    const result = await api.post(`/payments/${encodeURIComponent(reference.value)}/verify`);
    if (result?.status === "success") {
      notifySuccess("Payment successful");
      return navigateTo(result.bookingReference ? `/bookings/${result.bookingReference}` : "/bookings");
    }
    useToastStore().setMessage({ text: `Payment ${result?.status ?? "not completed"}`, type: "warning" });
  } catch {
    /* toast shown */
  } finally {
    completing.value = false;
  }
}
</script>
