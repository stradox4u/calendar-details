<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEventStore } from '../stores/eventStore';
import { useUserStore } from '~~/stores/userStore';
import useDayJs from '~~/composables/useDayJs';
import useWaitForLogin from '~~/composables/useWaitForLogin';
import { WeekEventsInterface, FilteredEventInterface, DailyEventsInterface } from '~~/types/events';

const eventStore = useEventStore();
const { getEvents: events } = storeToRefs(eventStore);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const waitForLogin = useWaitForLogin;

onMounted(() => {
  waitForLogin(eventStore.getUpcomingEvents, {});
})
watch(events, (newVal) => {
  console.log({ Events: newVal });
})

const dayjs = useDayJs();

const filteredEvents: ComputedRef<FilteredEventInterface[]> = computed(() => {
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

const config = useRuntimeConfig();
const sortedEvents = computed(() => {
  const weekEventsHolder: WeekEventsInterface<DailyEventsInterface> = {};
  filteredEvents.value?.filter((event) => event.organizer === config.public.eventOrganizer).forEach((evt) => {
    const day = dayjs(evt.start.dateTime).format('ddd') as 'Mon'|'Tue'|'Wed'|'Thu'|'Fri';
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
        <nuxt-link :to="{name: 'events-nextweek'}"
          class="flex justify-around bg-cd-cblue px-6 py-3 rounded-md shadow-md hover:opacity-80
          hover:shadow-xl">
          <span class="font-montserrat text-2xl font-semibold">Next Week</span>
        </nuxt-link>
      </div>
    </div>
    <div v-if="!isLoggedIn" class="w-full my-12">
      <p class="font-montserrat text-2xl font-semibold text-center">Login To Begin</p>
    </div>
  </div>
</template>