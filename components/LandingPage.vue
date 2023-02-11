<script setup>
import { signInWithPopup, GoogleAuthProvider, reauthenticateWithCredential } from '@firebase/auth';
import { useCurrentUser, useFirebaseApp, useFirebaseAuth } from 'vuefire';

const app = useFirebaseApp();
const auth = useFirebaseAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');

const login = async () => {
  // const googleAuth = gapi.auth2.getAuthInstance();
  // console.log(googleAuth);
  // const googleUser = await googleAuth.signIn();

  // const token = googleUser.getAuthResponse().id_token;
  // console.log({ googleUser });
  const response = await signInWithPopup(auth, provider);
  console.log(response);
  const credential = GoogleAuthProvider.credentialFromResult(response);
  const token = credential.accessToken;
  useState('access_token', () => token);
  useState('userCredential', () => credential);
}

const reauthenticate = async () => {
  const user = useCurrentUser();
  const credential = useState('userCredential');
  const response = await reauthenticateWithCredential(user.value, credential.value);
  console.log(response);
}


const getCalendar = async () => {
  const accessToken = useState('access_token');
  const response = await useFetch('https://www.googleapis.com/calendar/v3/calendars/primary?access_token=' + accessToken.value);
  console.log(response);
}

const logout = async () => {
  auth.signOut();
}
</script>

<template>
  <button @click="login">Login</button>
  <button @click="reauthenticate">Get User</button>
  <button @click="getCalendar">Get Calendar</button>
  <button @click="logout">Sign Out</button>
</template>