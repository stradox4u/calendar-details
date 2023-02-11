<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
const { getEvents: events } = storeToRefs(eventStore);

watch(events, (newVal) => {
  console.log({ events: newVal });
})

const filteredEvents = computed(() => {
  return events.value?.map((event) => {
    const attendees = event.attendees.filter((attendee) => {
      return attendee.responseStatus === 'accepted';
    }).map((el) => el.email);
    return {
      id: event.id,
      attendees,
      description: event.description || '',
      organizer: event.organizer.email,
      start: event.start,
      summary: event.summary,
    };
  })
})
</script>

<template>
  <ul>
    <li v-for="event in filteredEvents" :key="event.id">
      <span>Organizer: {{ event.organizer }}</span><br />
      <span>Description: {{ event.description }}</span><br />
      <div>Attendees:</div>
      <p v-for="attendee in event.attendees" :key="attendee">{{ attendee }}</p>
      <span>Summary: {{ event.summary }}</span>
      <hr/>
    </li>
  </ul>
</template>