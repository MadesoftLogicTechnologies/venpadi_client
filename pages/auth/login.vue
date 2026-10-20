<template>
  <div class="min-h-screen bg-white grid grid-cols-1 md2:grid-cols-2">
    <!-- Form panel -->
    <div
      class="flex flex-col justify-center px-6 sm:px-10 md2:px-12 lg:px-16 py-10 md2:py-12"
    >
      <div class="w-full max-w-[420px] mx-auto md2:mx-0 md2:ml-auto md2:mr-[8%] lg:mr-[12%]">
        <NuxtLink to="/" class="inline-flex mb-10">
          <AuthVenpadiLogo text-class="text-xl" :icon-size="28" />
        </NuxtLink>

        <h1 class="text-3xl sm:text-[2.15rem] font-extrabold text-header tracking-tight">
          Welcome back
        </h1>
        <p class="mt-2 text-sm sm:text-base text-bodytext">
          Sign in to book and manage your events.
        </p>

        <button
          type="button"
          class="mt-8 w-full h-12 inline-flex items-center justify-center rounded-xl border border-border bg-white hover:bg-greybg transition-colors"
          aria-label="Continue with Google"
          @click="continueWithGoogle"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
            />
            <path
              fill="#FBBC05"
              d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
            />
          </svg>
        </button>

        <div class="relative my-7">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-3 text-xs text-bodytext2">
              Or continue with
            </span>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="signIn">
          <InputField
            v-model="form.email"
            label="Email address"
            type="email"
            placeholder="john@example.com"
            required
          />
          <InputField
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="********"
            required
          />

          <div class="flex items-center justify-between gap-3 pt-1">
            <label class="inline-flex items-center gap-2 text-sm text-header cursor-pointer">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 rounded accent-primary border-border"
              />
              Remember me
            </label>
            <NuxtLink
              to="/auth/forgot-password"
              class="text-sm font-semibold text-header hover:text-primary"
            >
              Forgot password?
            </NuxtLink>
          </div>

          <button
            type="submit"
            class="w-full mt-2 h-12 inline-flex items-center justify-center rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity shadow-sm"
            :disabled="submitting"
          >
            {{ submitting ? "Signing in…" : "Sign in" }}
          </button>
        </form>

        <p class="mt-6 text-sm text-bodytext">
          Don't have an account?
          <NuxtLink
            to="/auth/signup"
            class="font-bold text-header hover:text-primary"
          >
            Create an account
          </NuxtLink>
        </p>

        <p class="mt-8 text-xs text-bodytext2 leading-relaxed">
          By signing in, you agree to our
          <a href="#" class="underline text-bodytext hover:text-primary">
            Terms of Service
          </a>
          and
          <a href="#" class="underline text-bodytext hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>

    <!-- Visual panel — desktop from md2 -->
    <div class="hidden md2:block relative min-h-screen">
      <img
        :src="heroImage"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
      ></div>
      <div class="absolute bottom-0 left-0 right-0 p-10 lg:p-14 max-w-xl">
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Discover the perfect space for your next event.
        </h2>
        <p class="mt-4 text-sm lg:text-base text-white/85 leading-relaxed">
          The modern platform for venue booking, designed to help you find,
          book, and manage unforgettable experiences.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Sign in",
  meta: [
    {
      name: "description",
      content: "Sign in to Venpadi to book and manage your events.",
    },
  ],
});

const submitting = ref(false);

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const heroImage = "/images/login-hero.jpg";

async function signIn() {
  submitting.value = true;
  try {
    await new Promise((r) => setTimeout(r, 600));
    await navigateTo("/search");
  } finally {
    submitting.value = false;
  }
}

function continueWithGoogle() {
  // Placeholder for Google OAuth
}
</script>
