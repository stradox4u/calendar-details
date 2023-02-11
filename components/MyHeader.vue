<script setup>
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
const isLoggedIn = computed(() => !!eventStore.token);
</script>

<template>
  <nav class="w-full h-[50px] bg-slate-300 px-6 py-2">
    <div class="flex justify-between items-center">
      <h1 class="font-poppins capitalize text-xl font-bold">Dev Meetings Calendar</h1>

      <div>
        <ui-primary-button v-if="!isLoggedIn" button-type="button" :handle-click="eventStore.handleAuthClick">Login</ui-primary-button>
        <ui-primary-button v-else button-type="button" :handle-click="eventStore.handleLogout">Logout</ui-primary-button>
      </div>
    </div>
  </nav>
</template>