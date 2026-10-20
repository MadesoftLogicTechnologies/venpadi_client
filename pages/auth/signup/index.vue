<template>
  <div class="bg-greybg min-h-screen flex flex-col">
    <LandingNav />

    <main class="flex-1">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8 py-10 md2:py-14">
        <div
          class="grid grid-cols-1 md2:grid-cols-2 gap-10 md2:gap-14 items-start"
        >
          <div class="max-w-lg w-full mx-auto md2:mx-0 md2:max-w-none">
            <h1
              class="text-2xl sm:text-3xl md2:text-[2.15rem] font-extrabold text-header tracking-tight leading-tight"
            >
              Create your account to continue
            </h1>
            <p class="mt-3 text-sm sm:text-base text-bodytext leading-relaxed">
              Check availability, save your booking progress and manage your
              event details in one place.
            </p>

            <button
              type="button"
              class="mt-8 w-full inline-flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-white text-sm font-semibold text-header hover:bg-whitebg transition-colors shadow-sm"
              @click="continueWithGoogle"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
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
              Continue with Google
            </button>

            <div class="relative my-7">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-border"></div>
              </div>
              <div class="relative flex justify-center">
                <span class="bg-greybg px-3 text-xs text-bodytext2">
                  or sign up with email
                </span>
              </div>
            </div>

            <form class="space-y-4" @submit.prevent="createAccount">
              <InputField
                v-model="form.fullName"
                label="Full Name"
                placeholder="John Doe"
                required
              />
              <InputField
                v-model="form.email"
                label="Email Address"
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

              <button
                type="submit"
                class="w-full mt-2 inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-brand-gradient-soft text-white text-sm font-semibold hover:opacity-95 transition-opacity shadow-sm"
                :disabled="submitting"
              >
                {{ submitting ? "Creating account…" : "Create Account & Continue" }}
              </button>
            </form>

            <p class="mt-5 text-xs text-bodytext leading-relaxed">
              By creating an account, you agree to our
              <a href="#" class="underline text-header hover:text-primary">
                Terms of Service
              </a>
              and
              <a href="#" class="underline text-header hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>

            <p class="mt-6 text-sm text-bodytext">
              Already have an account?
              <NuxtLink
                to="/auth/login"
                class="font-semibold text-primary hover:opacity-80"
              >
                Sign In
              </NuxtLink>
            </p>
          </div>

          <div class="w-full max-w-xl mx-auto md2:mx-0 md2:max-w-[520px] md2:justify-self-end">
            <div
              class="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md"
            >
              <img
                :src="venue.image"
                :alt="venue.name"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>

              <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span
                  class="inline-flex px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-white/20 text-[11px] font-semibold tracking-wide"
                >
                  Booking Summary
                </span>
                <h2 class="mt-3 text-lg sm:text-xl font-bold leading-snug">
                  {{ venue.name }}
                </h2>
                <p class="mt-1 text-sm text-white/85 flex items-center gap-1.5">
                  <i class="pi pi-map-marker text-xs"></i>
                  {{ venue.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <LandingFooter />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "plain",
});

useHead({
  title: "Create your account",
  meta: [
    {
      name: "description",
      content:
        "Create a Venpadi account to continue your venue booking and manage event details.",
    },
  ],
});

const route = useRoute();
const authStore = useAuthStore();
const submitting = ref(false);

const form = reactive({
  fullName: "",
  email: "",
  password: "",
});

const venue = computed(() => ({
  name: (route.query.venue && String(route.query.venue)) || "The Grand Pavilion",
  location:
    (route.query.location && String(route.query.location)) ||
    "Victoria Island, Lagos",
  image: "/images/grand-atrium.jpg",
}));

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function continueAsBooker() {
  const name = form.fullName.trim() || "Emma";
  authStore.token = "booker-demo";
  authStore.isLoggedIn = true;
  authStore.role = "booker";
  authStore.user = {
    name,
    email: form.email || "emma@example.com",
    avatar: "",
  };

  await navigateTo({
    path: `/discover/${slugify(venue.value.name)}`,
    query: {
      venue: venue.value.name,
      location: venue.value.location,
    },
  });
}

async function createAccount() {
  submitting.value = true;
  try {
    await new Promise((r) => setTimeout(r, 600));
    await continueAsBooker();
  } finally {
    submitting.value = false;
  }
}

async function continueWithGoogle() {
  submitting.value = true;
  try {
    await new Promise((r) => setTimeout(r, 400));
    form.fullName = form.fullName || "Emma";
    await continueAsBooker();
  } finally {
    submitting.value = false;
  }
}
</script>
