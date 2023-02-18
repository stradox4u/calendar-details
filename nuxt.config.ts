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
  runtimeConfig: {
    public: {
      calendarScopes: "https://www.googleapis.com/auth/calendar",
      googleDiscoveryUrl: "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      googleApiKey: process.env.NUXT_GOOGLE_API_KEY,
      googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      googlePluginName: "letMeGo",
      eventOrganizer: process.env.NUXT_EVENT_ORGANIZER
    }
  }
})
