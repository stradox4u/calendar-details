import { defineStore } from "pinia";
import { signInWithPopup, signOut, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useEventStore } from "./eventStore";

export const useUserStore = defineStore('users', () => {
  const userEmail = ref('');
  const isLoggedIn = ref(false);
  const isAuthorized = ref(false);
  let GoogleAuth;
  const scopes = "https://www.googleapis.com/auth/calendar";
  const gapi = globalThis.gapi;
  const eventStore = useEventStore();
  
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    const discoveryUrl = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
    gapi.client.init({
      'apiKey': "AIzaSyDDaKPdpxCKFKPU98fagwZLJVVPfaabmVU",
      'clientId': "121663165487-dtef1h3on975351m5qk9c959a01pknff.apps.googleusercontent.com",
      'discoveryDocs': [discoveryUrl],
      'scope': scopes,
      'plugin_name': "letMeGo",
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
  }

  function setSigninStatus() {
    const user = GoogleAuth.currentUser.get();
    const authorized = user.hasGrantedScopes(scopes);
    const email = GoogleAuth.currentUser.get().getBasicProfile().getEmail();
    isLoggedIn.value = GoogleAuth.isSignedIn.get();
    isAuthorized.value = authorized;
    userEmail.value = email;

    if (isAuthorized.value && isLoggedIn.value) {
      // Fetch events
      eventStore.getUpcomingEvents();
    }
  }

  function updateSigninStatus() {
    setSigninStatus();
  }

  return { handleAuthClick, revokeAccess, isLoggedIn, handleClientLoad, userEmail };
})