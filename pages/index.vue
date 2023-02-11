<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
const {getEvents: events} = storeToRefs(eventStore);

watch(events, (newVal) => {
  console.log(newVal);
}, {immediate: true});

onMounted(async () => {

})
</script>

<template>
  <div>Index page!</div>
</template>