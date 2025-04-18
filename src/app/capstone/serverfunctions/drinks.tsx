import { IDrink } from "../types";

export const postDrink = async (authToken: string, drinkData: object) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/drinks/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(drinkData),
      },
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return new Error(await response.text());
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const deleteDrink = async (authToken: string, drinkId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/drinks/` + drinkId,
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
      return new Error(await response.text());
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const putDrink = async (
  authToken: string,
  drinkId: string,
  drinkData: object,
) => {
  console.log(drinkData);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/drinks/` + drinkId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(drinkData),
      },
    );
    if (response.ok) {
      return true;
    } else {
      return new Error(await response.text());
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getDrinkById = async (authToken: string, drinkId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/drinks/` + drinkId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    const data: IDrink = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getDrinkNames = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/drinks/`,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );

    const data: IDrink[] = await response.json();
    const drinkNames: Record<number, string> = {};

    for (let i = 0; i < data.length; i++) {
      drinkNames[data[i].drinkId as keyof object] = data[i].drinkName;
    }
    return drinkNames;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
