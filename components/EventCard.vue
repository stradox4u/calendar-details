<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/userStore";
import { useEventStore } from "~~/stores/eventStore";
import useDayJs from "~~/composables/useDayJs";
import { FilteredEventInterface } from "~~/types/events";

interface Props {
  event: FilteredEventInterface;
}
const props = defineProps<Props>();

const dayjs = useDayJs();
const startTime = computed(() => {
  return dayjs(props.event?.start.dateTime).format('HH:mm')
})

const userStore = useUserStore();
const eventStore = useEventStore();
const { userEmail } = storeToRefs(userStore);
const isFetching = ref(false);

const attendEvent = async () => {
  isFetching.value = true;
  await eventStore.rsvpEvent({ eventId: props.event.id, userEmail: userEmail.value });
  isFetching.value = false;
}

const editEvent = () => {
  navigateTo({ params: {id: props.event.id}, name: 'events-id' });
}
</script>

<template>
  <div class="w-full h-full flex flex-col bg-slate-100 rounded-md shadow-md">
    <div class="w-full bg-cd-ruby rounded-t-md px-4 py-2">
      <h3 class="font-montserrat text-sm font-semibold text-slate-100">{{ event.summary }}</h3>
    </div>
    <div class="p-4 grow">
      <div class="w-full">
        <h4 class="font-montserrat text-sm font-semibold">Attendees:</h4>
        <ul class="w-full list-inside">
          <li v-for="attendee in event.attendees">
            <p class="font-poppins text-xs truncate py-1">&gt;&nbsp;{{ userStore.userLookup[attendee] }}</p>
          </li>
        </ul>
      </div>
      <hr />
      <div class="w-full max-h-[20vh] overflow-auto">
        <h4 class="font-montserrat text-sm font-semibold">Description:</h4>
        <p class="font-poppins text-xs">{{ event.description }}</p>
      </div>
      <hr />
      <div class="w-full inline-flex gap-3 items-center">
        <h4 class="font-montserrat text-sm font-semibold">Start:</h4>
        <p class="font-poppins text-2xl text-cd-ruby">{{ startTime }}</p>
      </div>
      <hr />
      <div class="w-full">
        <h4 class="font-montserrat text-sm font-semibold">Organizer:</h4>
        <p class="font-poppins text-xs truncate">{{ event.organizer }}</p>
      </div>
    </div>
    <div v-if="event.attendees" class="flex flex-col gap-3 items-stretch p-4 justify-self-end">
      <ui-primary-button button-type="button" :handle-click="attendEvent" :is-working="isFetching">
        RSVP
      </ui-primary-button>
      <ui-primary-button button-type="button" :handle-click="editEvent">Edit</ui-primary-button>
    </div>
  </div>
</template>