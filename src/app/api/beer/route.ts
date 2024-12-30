import { BeerData } from "@/app/types";
import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const data: BeerData = {
    Beer: formData.get("Beer") as string,
    Brewery: formData.get("Brewery") as string,
    By: formData.get("By") as string,
    Rating: +(formData.get("Rating") as string),
  };
  db.addBeer(data);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}

export async function GET() {
  const drankList = await db.getBeer();
  return new Response(JSON.stringify(drankList), { status: 200 });
}
