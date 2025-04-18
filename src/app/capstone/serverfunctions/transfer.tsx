import { IDrink, ITransfer } from "../types";

export const postTransfer = async (
  authToken: string,
  userId: number,
  fromLocationId: number,
  toLocationId: number,
  transferData: IDrink[],
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/transfers/`,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
          userId: userId,
          fromLocationId: fromLocationId,
          toLocationId: toLocationId,
          drinks: transferData,
        }),
      },
    );
    console.log(response);
    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
export const getTransferById = async (
  authToken: string,
  transferId: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/transfers/` + transferId,
      {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    const data: ITransfer = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
