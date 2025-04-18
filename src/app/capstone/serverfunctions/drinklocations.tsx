export const getLocationDrinks = async (
  locationId: string,
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
        method: "GET",
      },
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const getNotLocationDrinks = async (
  locationId: string,
  authToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/locations/` +
        locationId +
        "/drinks/notatlocation",
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const getNonAlcItems = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/nonalcoholic/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
