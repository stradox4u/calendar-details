import { defineStore } from "pinia";
import { useEventStore } from "./eventStore";

export const useUserStore = defineStore('users', () => {
  const userEmail = ref('');
  const isLoggedIn = ref(false);
  const isAuthorized = ref(false);
  let GoogleAuth;
  const appConfig = useAppConfig();
  const scopes = appConfig.calendarScopes;
  const gapi = globalThis.gapi;
  const eventStore = useEventStore();
  
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    const discoveryUrl = appConfig.googleDiscoveryUrl;
    gapi.client.init({
      'apiKey': appConfig.googleApiKey,
      'clientId': appConfig.googleClientId,
      'discoveryDocs': [discoveryUrl],
      'scope': scopes,
      'plugin_name': appConfig.googlePluginName,
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      let user = GoogleAuth.currentUser.get();
      setSigninStatus();
    })
  }

  function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      GoogleAuth.signOut();
    } else {
      GoogleAuth.signIn();
    }
  }

  function revokeAccess() {
    console.log('Logging out now!');
    GoogleAuth.signOut();
    GoogleAuth.disconnect();
    eventStore.clearEvents();
  }

  async function setSigninStatus() {
    const user = await GoogleAuth.currentUser.get();
    const authorized = await user.hasGrantedScopes(scopes);
    isLoggedIn.value = await GoogleAuth.isSignedIn.get();
    isAuthorized.value = authorized;
    const email = await GoogleAuth.currentUser.get().getBasicProfile()?.getEmail();
    userEmail.value = email;

    if (isAuthorized.value && isLoggedIn.value) {
      // Fetch events
      // eventStore.getUpcomingEvents();
    }
  }

  function updateSigninStatus() {
    setSigninStatus();
  }

  return { handleAuthClick, revokeAccess, isLoggedIn, handleClientLoad, userEmail, isAuthorized };
})