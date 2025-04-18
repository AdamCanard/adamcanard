export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  admin: boolean;
  email: string;
  password: string;
}
export interface ILocation {
  locationId: number;
  locationName: string;
}

export interface ILocationEvent {
  eventStatus: string;
  currentUserId: number;
  eventId: number;
}
export interface IEvent {
  eventId: number;
  functionNumber: string;
  locationId: number;
  clientName: string;
  eventType: string;
  prevCloseCountId: number;
  openCountId: number;
  closeCountId: number;
  startTime: string;
  endTime: string;
  status: string;
  currentUserId: number;
}
export type IDrink = {
  drinkId: number;
  drinkName: string;
  cost: number;
  active: boolean;
  category: string;
};
