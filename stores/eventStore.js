import { defineStore } from "pinia";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

export const useEventStore = defineStore('events', () => {
  const events = ref([]);
  const token = ref(null);

  const getEvents = computed(() => {
    return events.value;
  });

  

  const getUpcomingEvents = async () => {
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': dayjs().weekday(0).toISOString(),
        'timeMax': dayjs().weekday(6).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        // 'maxResults': 10,
        'orderBy': 'startTime',
      };
      const response = await gapi.client.calendar.events.list(request);
      events.value = response.result.items;
    } catch (err) {
      throw (err);
    }
  }

  return {
    getUpcomingEvents,
    getEvents,
  }
})