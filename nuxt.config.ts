// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  css: [
    "@/assets/css/style.css",
    "@/assets/css/fonts.css",
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.min.css",
    "primeicons/primeicons.css",
  ],

  build: {
    transpile: ["primevue"],
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      // Where venue owners sign up ("List your venue" links leave this portal).
      VENDOR_PORTAL_URL: process.env.VENDOR_PORTAL_URL || "http://localhost:3001",
      ENVIRONMENT: process.env.ENVIRONMENT,
      // Browser key for the Google Maps JS API, restricted to this portal's
      // domain. Empty means no map widget: <VenueMap> falls back to the address
      // and an "Open in Google Maps" link rather than a placeholder (WP4).
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
      // Controls for actions the API cannot perform yet stay HIDDEN until the
      // backend ships them — a "coming soon" toast is a promise the product
      // can't keep. Flip one with NUXT_PUBLIC_FEATURES_<NAME>=true once the
      // endpoint exists. Read through useFeature(name).
      features: {
        invoicePdf: false, // no PDF endpoint on /me/invoices yet
        savedCards: false, // no saved payment methods (contract WP5)
        googleSignIn: false, // no OAuth flow on /auth
        twoFactor: false, // no 2FA enrolment on /account
      },
    },
  },

  app: {
    head: {
      title: "Venpadi",
      titleTemplate: "%s | Venpadi",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Venpadi — venue management for business" },
        { name: "robots", content: "noindex, nofollow" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  devServer: {
    port: 3002,
  },

  devtools: { enabled: true },
  ssr: false,
});
