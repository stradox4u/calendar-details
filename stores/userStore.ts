import { defineStore } from "pinia";
import { UserLookupDictionary } from "~~/types/users";
import { useEventStore } from "./eventStore";

export const useUserStore = defineStore('users', () => {
  const userEmail = ref('');
  const isLoggedIn = ref(false);
  const isAuthorized = ref(false);
  let GoogleAuth: any;
  const config = useRuntimeConfig();
  const scopes = config.public.calendarScopes;
  const globalContext: any = globalThis;
  const gapi = globalContext.gapi;
  const eventStore = useEventStore();
  
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    const discoveryUrl = config.public.googleDiscoveryUrl;
    gapi.client.init({
      'apiKey': config.public.googleApiKey,
      'clientId': config.public.googleClientId,
      'discoveryDocs': [discoveryUrl],
      'scope': scopes,
      'plugin_name': config.public.googlePluginName,
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

  const userLookup: UserLookupDictionary<string> = {
    "caspar@labvanced.com": "Caspar",
    "team@labvanced.com": "Labvanced",
    "holger@labvanced.com": "Holger",
    "mo.aarif1986@gmail.com": "Aarif",
    "moiserushanika2006@gmail.com": "Moise",
    "sharma1997pushpak@gmail.com": "Pushpak",
    "stradox@gmail.com": "Umar",
  }

  const developers: string[] = [
    "mo.aarif1986@gmail.com",
    "moiserushanika2006@gmail.com",
    "sharma1997pushpak@gmail.com",
    "stradox@gmail.com",
  ]

  return {
    handleAuthClick,
    revokeAccess,
    isLoggedIn,
    handleClientLoad,
    userEmail,
    isAuthorized,
    userLookup,
    developers,
  };
})