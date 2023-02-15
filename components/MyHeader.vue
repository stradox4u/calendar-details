<script setup>
import { useUserStore } from '../stores/userStore';
import { useEventStore } from '../stores/eventStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const {isLoggedIn} = storeToRefs(userStore);
</script>

<template>
  <nav class="w-full h-[50px] bg-slate-300 px-6 py-2">
    <div class="flex justify-between items-center">
      <h1 class="font-poppins capitalize text-xl font-bold">Dev Meetings Calendar</h1>

      <div>
        <ui-primary-button v-if="!isLoggedIn" button-type="button" :handle-click="userStore.handleAuthClick">Login</ui-primary-button>
        <ui-primary-button v-else button-type="button" :handle-click="userStore.revokeAccess">Logout</ui-primary-button>
      </div>
    </div>
  </nav>
</template>