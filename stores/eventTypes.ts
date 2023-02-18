export interface EventListResponseInterface {
  summary: string,
  description: string,
  updated: Date,
  timeZone: string,
  accessRole: string,
  items: EventInterface[]
}

export interface EventCreatorInterface {
  id?: string,
  email: string,
  displayName?: string,
  self?: boolean
}

export interface EventAttendeeInterface {
  id?: string,
  email: string,
  displayName?: string,
  organizer?: boolean,
  self?: boolean,
  resource?: boolean,
  optional?: boolean,
  responseStatus: string,
  comment?: string,
  additionalGuests?: number,
}

export interface EventTimeInterface {
  date: Date,
  dateTime: Date,
  timeZone: string,
}

export interface EventInterface {
  id: string,
  status: string,
  htmlLink: string,
  created: Date,
  updated: Date,
  summary: string,
  description?: string,
  location: string,
  creator?: EventCreatorInterface,
  organizer: EventCreatorInterface,
  start: EventTimeInterface,
  end: EventTimeInterface,
  attendees: EventAttendeeInterface[],
}

export interface FilteredEventInterface {
  id: string,
  attendees: string[],
  description?: string,
  organizer: string,
  start: EventTimeInterface,
  summary: string,
}

export interface DailyEventsInterface {
  events: FilteredEventInterface[],
  date?: string,
}

export interface WeekEventsInterface {
  Mon: DailyEventsInterface,
  Tue: DailyEventsInterface,
  Wed: DailyEventsInterface,
  Thu: DailyEventsInterface,
  Fri: DailyEventsInterface,
}