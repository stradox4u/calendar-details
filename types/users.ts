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

export interface UserLookupDictionary<T> {
  [index: string]: T;
}