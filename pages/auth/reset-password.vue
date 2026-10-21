<template>
  <div class="min-h-screen bg-white grid grid-cols-1 md2:grid-cols-2">
    <div class="flex flex-col justify-center px-6 sm:px-10 md2:px-12 lg:px-16 py-10 md2:py-12">
      <div class="w-full max-w-[420px] mx-auto md2:mx-0 md2:ml-auto md2:mr-[8%] lg:mr-[12%]">
        <NuxtLink to="/" class="inline-flex mb-10">
          <AuthVenpadiLogo text-class="text-xl" :icon-size="28" />
        </NuxtLink>

        <h1 class="text-3xl sm:text-[2.15rem] font-extrabold text-header tracking-tight">
          Set a new password
        </h1>
        <p class="mt-2 text-sm sm:text-base text-bodytext">
          Choose a password you haven’t used before.
        </p>

        <div
          v-if="!token"
          class="mt-8 rounded-xl border border-border bg-greybg px-4 py-4 text-sm text-bodytext"
        >
          This reset link is missing its token. Request a new one from
          <NuxtLink to="/auth/forgot-password" class="font-semibold text-primary">Forgot password</NuxtLink>.
        </div>

        <form v-else class="mt-8 space-y-4" @submit.prevent="submit">
          <InputField
            v-model="password"
            label="New password"
            type="password"
            placeholder="********"
            hint="At least 8 characters, with a number and a special character."
            required
          />
          <InputField
            v-model="confirm"
            label="Confirm new password"
            type="password"
            placeholder="********"
            required
          />
          <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
          <button
            type="submit"
            class="w-full mt-2 h-12 inline-flex items-center justify-center rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity shadow-sm disabled:opacity-60"
            :disabled="submitting"
          >
            {{ submitting ? "Saving…" : "Update password" }}
          </button>
        </form>

        <p class="mt-6 text-sm text-bodytext">
          <NuxtLink to="/auth/login" class="font-bold text-header hover:text-primary">
            Back to sign in
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="hidden md2:block relative min-h-screen">
      <img src="/images/login-hero.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"></div>
    </div>
  </div>
</template>

<script setup>
import { confirmResetPassword } from "~/services/auth";

definePageMeta({ layout: "plain" });
useHead({ title: "Reset password" });

const route = useRoute();
const token = computed(() => (route.query.token ? String(route.query.token) : ""));
const password = ref("");
const confirm = ref("");
const error = ref("");
const submitting = ref(false);

async function submit() {
  error.value = "";
  if (password.value !== confirm.value) {
    error.value = "The passwords don’t match.";
    return;
  }
  submitting.value = true;
  try {
    await confirmResetPassword(token.value, password.value);
    await navigateTo("/auth/login");
  } catch (err) {
    error.value = err?.fields?.password ? `Password ${err.fields.password}` : err?.message || "Could not reset the password.";
  } finally {
    submitting.value = false;
  }
}
</script>
