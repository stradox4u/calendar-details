import { defineStore } from "pinia";
import { signInWithPopup, signOut, GoogleAuthProvider, getAuth } from "firebase/auth";

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const token = ref('');
  const isLoggedIn = computed(() => !!user.value)

  const loginUser = () => {
    const auth = useFirebaseAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar');
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log({result})
        const credential = GoogleAuthProvider.credentialFromResult(result);
        token.value = credential.accessToken;
        user.value = result.user
      }).catch((error) => {
        console.error(error);
    })
  }

  const refreshUser = async () => {
    const currentUser = await getCurrentUser();
    user.value = currentUser;
    console.log({ currentUser });
  }

  const logoutUser = async () => {
    const auth = getAuth();
    await signOut(auth);
    user.value = null;
  }
  return { loginUser, refreshUser, user, logoutUser, isLoggedIn };
})