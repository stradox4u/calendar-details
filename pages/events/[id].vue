<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '~~/stores/eventStore';
import { useUserStore } from '~~/stores/userStore';

const userStore = useUserStore();
const { userEmail } = storeToRefs(userStore);

const eventStore = useEventStore();
const { getEvents: events } = storeToRefs(eventStore);

const route = useRoute();
const { id: eventId } = route.params;

const event = computed(() => {
  const ev = events.value.find((evt) => evt.id === eventId);
  return ev;
});

const descValue = ref(event.value?.description);

const isFetching = ref(false);
const saveAndAttend = async () => {
  isFetching.value = true;
  await eventStore.saveAndAttend({
    eventId: event.value.id,
    userEmail: userEmail.value,
    description: descValue
  });
  isFetching.value = false;
}
</script>

<template>
  <div class="w-full my-6 px-8 py-12 bg-cd-cblue rounded-md shadow-md">
    <div class="flex flex-col items-start gap-3">
      <label class="font-montserrat text-lg font-bold">Description:</label>
      <ui-base-textarea v-model="descValue" input-type="text" class="w-full"
        placeholder-text="Enter Description Here"></ui-base-textarea>
    </div>
    <div class="w-full mt-6">
      <ui-primary-button :handle-click="saveAndAttend" class="w-full" button-type="button" :is-working="isFetching">
        Save & Attend
      </ui-primary-button>
    </div>
  </div>
</template>