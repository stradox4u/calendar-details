import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/userStore"


export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);
  if (!isLoggedIn.value && to.fullPath !== from.fullPath) {
    return navigateTo(from.fullPath);
  }
});