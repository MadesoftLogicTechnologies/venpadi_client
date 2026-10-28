<template>
  <div
    class="min-h-screen bg-white grid grid-cols-1 md2:grid-cols-[minmax(440px,40%)_1fr]"
  >
    <div class="flex flex-col justify-center px-6 sm:px-10 md2:px-12 lg:px-16 py-10 md2:py-12">
      <div class="w-full max-w-[400px] mx-auto">
        <NuxtLink to="/" class="inline-flex mb-10">
          <AuthVenpadiLogo brand text-class="text-xl" :icon-size="32" />
        </NuxtLink>

        <h1 class="text-3xl sm:text-[2.15rem] font-extrabold text-header tracking-tight">
          Forgot your password?
        </h1>
        <p class="mt-2 text-sm sm:text-base text-bodytext">
          Enter the email you signed up with and we’ll send you a link to reset it.
        </p>

        <div
          v-if="sent"
          class="mt-8 rounded-xl border border-border bg-greybg px-4 py-4 text-sm text-header"
        >
          <p class="font-semibold">Check your inbox</p>
          <p class="mt-1 text-bodytext">
            If an account exists for <span class="font-medium text-header">{{ email }}</span>,
            a reset link is on its way. The link expires after a short time.
          </p>
        </div>

        <form v-else class="mt-8 space-y-4" @submit.prevent="submit">
          <InputField
            v-model="email"
            label="Email address"
            type="email"
            placeholder=""
          />
          <button
            type="submit"
            class="w-full mt-2 h-12 inline-flex items-center justify-center rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-60"
            :disabled="submitting || !email.trim()"
          >
            {{ submitting ? "Sending…" : "Send reset link" }}
          </button>
        </form>

        <p class="mt-6 text-sm text-bodytext">
          Remembered it?
          <NuxtLink
            to="/auth/login"
            class="font-bold text-primary hover:text-primary-dark"
          >
            Back to sign in
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="hidden md2:block relative min-h-screen">
      <img
        src="/images/login-hero.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover object-[55%_center]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/40 from-0% via-transparent via-50% to-transparent"
      ></div>
      <div class="absolute bottom-0 left-0 right-0 p-10 lg:p-14 max-w-2xl">
        <h2
          class="text-3xl lg:text-[2.35rem] font-extrabold text-white tracking-tight leading-tight"
        >
          Discover the perfect space for your next event.
        </h2>
        <p class="mt-4 text-sm lg:text-base text-white/90 leading-relaxed">
          The modern platform for venue booking, designed to help you find,
          book, and manage unforgettable experiences.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { requestResetPassword } from "~/services/auth";

definePageMeta({ layout: "plain" });
useHead({ title: "Forgot password" });

const email = ref("");
const submitting = ref(false);
const sent = ref(false);

async function submit() {
  if (submitting.value) return;
  submitting.value = true;
  try {
    sent.value = await requestResetPassword(email.value.trim());
  } finally {
    submitting.value = false;
  }
}
</script>
