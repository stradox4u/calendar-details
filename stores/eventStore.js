import { defineStore } from "pinia";
import useDayJs from "~~/composables/useDayJs";


export const useEventStore = defineStore('events', () => {
  const events = ref([]);
  const gapi = globalThis.gapi;
  const dayjs = useDayJs();

  const getEvents = computed(() => {
    return events.value;
  });

  const getUpcomingEvents = async () => {
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': dayjs().weekday(0).toISOString(),
        'timeMax': dayjs().weekday(6).toISOString(),
        'timezone': 10,
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime',
      };
      const response = await gapi.client.calendar.events.list(request);
      events.value = response.result.items;
    } catch (err) {
      throw (err);
    }
  }

  const rsvpEvent = async ({ eventId, userEmail }) => {
    const eventIndex = events.value.findIndex((event) => {
      return event.id === eventId;
    });

    const relevantEvent = events.value[eventIndex];
    const myAttendanceIndex = relevantEvent.attendees.findIndex((attendee) => attendee.email === userEmail);
    const accepted = { email: userEmail, responseStatus: 'accepted' };
    events.value[eventIndex].attendees[myAttendanceIndex] = accepted;

    try {
      const request = {
        calendarId: 'primary',
        eventId: eventId,
        attendees: events.value[eventIndex].attendees,
      }

      const response = await gapi.client.calendar.events.patch(request);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  const saveAndAttend = async ({ eventId, userEmail, description }) => {
    const eventIndex = events.value.findIndex((event) => {
      return event.id === eventId;
    });

    const relevantEvent = events.value[eventIndex];
    const myAttendanceIndex = relevantEvent.attendees.findIndex((attendee) => attendee.email === userEmail);
    const accepted = { email: userEmail, responseStatus: 'accepted' };
    events.value[eventIndex].attendees[myAttendanceIndex] = accepted;
    events.value[eventIndex].description = description;

    try {
      const request = {
        calendarId: 'primary',
        eventId: eventId,
        attendees: events.value[eventIndex].attendees,
        description: events.value[eventIndex].description,
      }

      const response = await gapi.client.calendar.events.patch(request);
      await navigateTo({ name: 'index' });
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  const clearEvents = () => {
    events.value = [];
  }

  return {
    getUpcomingEvents,
    getEvents,
    rsvpEvent,
    saveAndAttend,
    clearEvents,
  }
})