// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-vuefire',
  ],
  vuefire: {
    auth: true,
    config: {
      apiKey: 'AIzaSyDDaKPdpxCKFKPU98fagwZLJVVPfaabmVU',
      authDomain: 'calendar-details-377421.firebaseapp.com',
      projectId: 'calendar-details-377421',
      storageBucket: 'calendar-details-377421.appspot.com',
      messagingSenderId: '121663165487',
      appId: '1:121663165487:web:12b4af4870486be151a2da',
      measurementId: 'G-ZSF14N5YQE', 
    },
    admin: {
      serviceAccount: './credentials.json',
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
})
