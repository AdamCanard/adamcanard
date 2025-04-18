import { INonAlc, INonAlcCategory } from "../types";

export const getNonAlcoholicByLocation = async (
  authToken: string,
  locationId: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/nonalcoholic/location/${locationId}/count`,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );
    const data: INonAlc[] = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};

export const getNonAlcNames = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/nonalcoholic/`,
      {
        headers: {
          Authorization: authToken,
        },
        method: "GET",
      },
    );

    const data: INonAlcCategory = await response.json();
    const nonAlcNames: Record<number, string> = {};
    for (let i = 0; i < Object.keys(data).length; i++) {
      const tempData: INonAlc[] = Object.values(data)[i];
      for (let j = 0; j < tempData.length; j++) {
        nonAlcNames[tempData[j].nonAlcItemId as keyof object] =
          tempData[j].nonAlcItemName;
      }
    }

    return nonAlcNames;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
