import { IUser } from "../types";
export const postUser = async (authToken: string, userData: object) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/users/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      },
    );

    const data: IUser = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const deleteUser = async (authToken: string, userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/users/` + userId,
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
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const putUser = async (
  authToken: string,
  userId: string,
  userData: object,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/users/` + userId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(userData),
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
export const getUserById = async (authToken: string, userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/users/` + userId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    const data: IUser = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const putUserOnEvent = async (
  eventId: number,
  userId: number,
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/events/${eventId}/user`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ eventId: eventId, userId: userId }),
      },
    );

    const data: number = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getUserNames = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/users/`,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );

    const data: IUser[] = await response.json();
    const userNames: Record<number, string> = {};

    for (let i = 0; i < data.length; i++) {
      userNames[data[i].userId as keyof object] =
        data[i].firstName + " " + data[i].lastName;
    }
    return userNames;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
