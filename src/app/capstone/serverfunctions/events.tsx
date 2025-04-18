import { IEvent, ILocationEvent } from "./types";

//Called in location/page.tsx
//If active event at location return event data
//If no active event at location, create event and return event data
//returns ILocationEvent
export const postLocationEvent = async (
  userId: number,
  locationId: number,
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/events/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          locationId: locationId,
          userId: userId,
        }),
      },
    );

    const data: ILocationEvent = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const putStartingEvent = async (
  eventId: number,
  authToken: string,
  functionId: string,
  clientName: string,
  eventType: number,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/events/` + eventId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          functionId: functionId,
          clientName: clientName,
          eventType: eventType, // 0 - cash, 1 - subsidized, 2 - host
        }),
      },
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const closeEvent = async (
  eventId: number,
  userId: number,
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/events/` +
        eventId +
        "/user/" +
        userId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getEventById = async (eventId: string, authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/events/` + eventId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    const data: IEvent = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
