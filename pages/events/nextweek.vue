<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '~~/stores/eventStore';
import useWaitForLogin from '~~/composables/useWaitForLogin';
import useDayJs from '~~/composables/useDayJs';

definePageMeta({
  middleware: ["auth"],
})

const eventStore = useEventStore();
const { getEvents: events } = storeToRefs(eventStore);

const dayjs = useDayJs();
const waitForLogin = useWaitForLogin;
onMounted(async () => {
  const nextMonday = dayjs().weekday(0).add(7, 'day').toISOString();
  const nextFriday = dayjs().weekday(6).add(7, 'day').toISOString();

  waitForLogin(
    eventStore.getEventsByDateRange,
    {
    start: nextMonday,
    end: nextFriday,
    }
  );
});

watch(events, (newVal) => {
  console.log({ Events: newVal });
})

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
    <div v-if="events.length > 0">
      <ul class="">
        <li v-for="({events, date}, index) in sortedEvents" :key="index">
          <day-events :day-events="events" :day-of-week="index" :date-string="date"></day-events>
        </li>
      </ul>
      <div class="my-8">
        <nuxt-link :to="{name: 'index'}"
          class="flex justify-around bg-cd-cblue px-6 py-3 rounded-md shadow-md hover:opacity-80
          hover:shadow-xl">
          <span class="font-montserrat text-2xl font-semibold">This Week</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>