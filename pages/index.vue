<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '../stores/eventStore';
import { useUserStore } from '~~/stores/userStore';
import useDayJs from '~~/composables/useDayJs';

const eventStore = useEventStore();
const { getEvents: events } = storeToRefs(eventStore);

watch(events, (newVal) => {
  console.log({ Events: newVal });
})

const dayjs = useDayJs();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

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

const appConfig = useAppConfig();
const sortedEvents = computed(() => {
  const weekEventsHolder = {
    Mon: { events:[]},
    Tue: { events:[]},
    Wed: { events:[]},
    Thu: { events:[]},
    Fri: { events:[]},
  }
  filteredEvents.value?.filter((event) => event.organizer === appConfig.eventOrganizer).forEach((evt) => {
    const day = dayjs(evt.start.dateTime).format('ddd');
    weekEventsHolder[day].events.push(evt);
    weekEventsHolder[day].date = dayjs(evt.start.dateTime).format('DD-MMM-YYYY');
  })

  return weekEventsHolder;
})
</script>

<template>
  <div>
    <ul v-if="events.length > 0" class="">
      <li v-for="({events, date}, index) in sortedEvents" :key="index">
        <day-events :day-events="events" :day-of-week="index" :date-string="date"></day-events>
      </li>
    </ul>
    <div v-if="!isLoggedIn" class="w-full my-12">
      <p class="font-montserrat text-2xl font-semibold text-center">Login To Begin</p>
    </div>
  </div>
</template>