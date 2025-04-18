import { CountType, IDrink, INonAlcCount } from "../types";

export const postCount = async (
  countData: IDrink[] | INonAlcCount[],
  authToken: string,
  userId: number,
  eventId: number,
  countType: CountType,
  locationId?: number,
) => {
  const body =
    countType === CountType.Alcoholic
      ? JSON.stringify({
          userId: userId,
          eventId: eventId,
          countData: countData,
        })
      : JSON.stringify({
          userId: userId,
          counts: countData,
        });

  //console.log(
  //  (countData as INonAlcCount[]).filter(
  //    (d: INonAlcCount) => d.item.nonAlcItemId === 1,
  //  ),
  //);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/${countType === CountType.Alcoholic ? "counts" : countType === CountType.NonAlcoholic && `nonalcoholic/location/${locationId}/count`}/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",

        body: body,
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

export const getCountById = async (authToken: string, countId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/counts/` + countId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export { CountType };
