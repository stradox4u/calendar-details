<script setup>
useHead({
  script: [
    {
      src: "https://apis.google.com/js/api.js",
      type: "text/javascript",
    }
  ]
})
const getUser = async () => {
  const response = await getCurrentUser();
  // useState('access_token', () => accessToken);
  console.log({ response });
}
const initClient = () => {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.auth2.getAuthInstance({
        apiKey: ' AIzaSyDDaKPdpxCKFKPU98fagwZLJVVPfaabmVU',
        clientId: '121663165487-dtef1h3on975351m5qk9c959a01pknff.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
}

onMounted(() => {
  initClient();
  getUser();
})
</script>

<template>
  <NuxtLayout>
    <nuxt-page></nuxt-page>
  </NuxtLayout>
</template>
