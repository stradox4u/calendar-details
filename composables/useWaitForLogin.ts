import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/userStore";


export default function useWaitForLogin(callback: Function, args: any) {
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);
  const loggedInInterval = setInterval(() => {
    if (isLoggedIn.value) {
      clearInterval(loggedInInterval);
      return callback(args);
    }
  }, 100);
}