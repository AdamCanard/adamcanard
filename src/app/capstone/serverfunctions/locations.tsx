import { ILocation, ILocationEvent } from "../types";
export const getLocationById = async (
  authToken: string,
  locationId: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` + locationId,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );
    const data: ILocation = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getEventByLocation = async (
  locationId: string,
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` +
        locationId +
        "/event/",
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );

    const data: ILocationEvent = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const putLocation = async (
  authToken: string,
  locationId: string,
  locationData: object,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` + locationId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(locationData),
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
export const deleteLocation = async (authToken: string, locationId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` + locationId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      },
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const postLocation = async (authToken: string, locationData: object) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(locationData),
      },
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const getAllLocations = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/`,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );

    const data: ILocation[] = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getLocationNames = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/`,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );

    const data: ILocation[] = await response.json();
    const locationNames: Record<number, string> = {};
    for (let i = 0; i < data.length; i++) {
      locationNames[data[i].locationId as keyof object] = data[i].locationName;
    }
    return locationNames;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
