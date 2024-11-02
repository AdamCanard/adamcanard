import db from "../../server/pb";
import { BeerData } from "../../types";

export async function POST(req: Request) {
  const formData = await req.formData();
  const data: BeerData = {
    Beer: formData.get("Beer") as string,
    Brewery: formData.get("Brewery") as string,
    By: "Adam Cunard",
    Drank: (formData.get("Drank") as string) === "true",
    Start: +(formData.get("Start") as string),
  };
  db.addBeer(data);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
