<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '../stores/eventStore';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek);

const eventStore = useEventStore();
const { getEvents: events } = storeToRefs(eventStore);

// watch(events, (newVal) => {
//   console.log({ events: newVal });
// })

const filteredEvents = computed(() => {
  return events.value?.map((event) => {
    const attendees = event.attendees?.filter((attendee) => {
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

const sortedEvents = computed(() => {
  const weekEventsHolder = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
  }
  filteredEvents.value?.forEach((evt) => {
    const day = dayjs(evt.start.dateTime).format('ddd');
    weekEventsHolder[day].push(evt);
  })

  return weekEventsHolder;
})
</script>

<template>
  <div>
    <ul v-if="events.length > 0" class="">
      <li v-for="(day, index) in sortedEvents" :key="index">
        <day-events :day-events="day" :day-of-week="index"></day-events>
      </li>
    </ul>
  </div>
</template>