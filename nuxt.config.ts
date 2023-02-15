// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://apis.google.com/js/api.js",
          type: "text/javascript",
        },
        {
          src: "https://accounts.google.com/gsi/client",
          type: "text/javascript",
        },
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
})
