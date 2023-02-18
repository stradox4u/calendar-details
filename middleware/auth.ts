import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/userStore"


export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);
  if (!isLoggedIn.value) {
    return navigateTo({name: 'index'});
  }
});