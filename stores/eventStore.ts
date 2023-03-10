import { defineStore } from "pinia";
import useDayJs from "~~/composables/useDayJs";
import { EventInterface } from "../types/events";


export const useEventStore = defineStore('events', () => {
  const events: Ref<EventInterface[]> = ref([]);
  const globalContext: any = globalThis;
  const gapi = globalContext.gapi;
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
        'timezone': dayjs.tz.guess(),
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

  const rsvpEvent = async ({ eventId, userEmail }: {eventId: string, userEmail: string}) => {
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

  const saveAndAttend = async ({ eventId, userEmail, description }: {eventId: string|undefined, userEmail: string, description: string|undefined}) => {
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

  const getEventsByDateRange = async ({start, end}: {start: Date, end: Date}) => {
    clearEvents();
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': start,
        'timeMax': end,
        'timezone': dayjs.tz.guess(),
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

  return {
    getUpcomingEvents,
    getEvents,
    rsvpEvent,
    saveAndAttend,
    clearEvents,
    getEventsByDateRange,
  }
})