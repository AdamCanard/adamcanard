import { IDrink } from "../types";

export const postCompare = async (
  countData: IDrink[],
  authToken: string,
  userId: number,
  eventId: number,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/compare/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
          userId: userId,
          eventId: eventId,
          countData: countData,
        }),
      },
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getClosingUser = async (authToken: string, eventId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/compare/closinguser/` + eventId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const updateCountFromCompare = async (
  countId: number,
  countData: IDrink[],
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/compare/` + countId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
          countData: countData,
        }),
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
