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
      ENVIRONMENT: process.env.ENVIRONMENT,
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
