<script setup>
import dayjs from "dayjs";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  }
})

const startTime = computed(() => {
  return dayjs(props.event?.start.dateTime).format('HH:mm')
})

const attendEvent = async () => {
  const user = await getCurrentUser();
  console.log({ user });
}
const editEvent = () => {
  const user = getCurrentUser();
  console.log({ user });
}
</script>

<template>
  <div class="w-full h-full bg-slate-100 rounded-md shadow-md">
    <div class="w-full bg-cd-ruby rounded-t-md px-4 py-2">
      <h3 class="font-montserrat text-sm font-semibold text-slate-100">{{ event.summary }}</h3>
    </div>
    <div class="p-4">
      <div class="w-full">
        <h4 class="font-montserrat text-sm font-semibold">Attendees:</h4>
        <ul class="w-full list-inside">
          <li v-for="attendee in event.attendees">
            <p class="font-poppins text-xs truncate py-1">{{ attendee }}</p>
          </li>
        </ul>
      </div>
      <hr />
      <div class="w-full max-h-[20vh] overflow-auto">
        <h4 class="font-montserrat text-sm font-semibold">Description:</h4>
        <p class="font-poppins text-xs">{{ event.description }}</p>
      </div>
      <hr />
      <div class="w-full">
        <h4 class="font-montserrat text-sm font-semibold">Start:</h4>
        <p class="font-poppins text-xs text-rose-700">{{ startTime }}</p>
      </div>
      <hr />
      <div class="w-full">
        <h4 class="font-montserrat text-sm font-semibold">Organizer:</h4>
        <p class="font-poppins text-xs truncate">{{ event.organizer }}</p>
      </div>
    </div>
    <div class="flex flex-col gap-3 items-stretch p-4">
      <ui-primary-button button-type="button" :handle-click="attendEvent">RSVP</ui-primary-button>
      <ui-primary-button button-type="button" :handle-click="editEvent">Edit</ui-primary-button>
    </div>
  </div>
</template>