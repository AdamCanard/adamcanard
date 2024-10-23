import db from "../../server/pb";
import { BeerData } from "../../types";

export async function POST(req: Request) {
  const formData = await req.formData();
  const Id = formData.get("id") as string;
  const data: BeerData = {
    Beer: formData.get("Beer") as string,
    Brewery: formData.get("Brewery") as string,
    By: formData.get("By") as string,
    Rating: +(formData.get("Rating") as string),
    Drank: (formData.get("Drank") as string) === "true",
  };
  db.updateBeer(data, Id);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
