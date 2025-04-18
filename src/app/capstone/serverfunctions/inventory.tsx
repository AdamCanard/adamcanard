export const addDrinksToLocation = async (
  locationId: string,
  drinkIds: number[],
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` +
        locationId +
        "/drinks",
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ drinks: drinkIds }),
      },
    );
    if (response.ok) {
      const data = response.ok;
      return data;
    } else {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const removeDrinksFromLocation = async (
  locationId: string,
  drinkIds: number[],
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` +
        locationId +
        "/drinks",
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ drinks: drinkIds }),
      },
    );
    if (response.ok) {
      const data = response.ok;
      return data;
    } else {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
