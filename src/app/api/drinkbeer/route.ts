import db from "../../server/pb";
import { BeerData } from "../../types";
import { cookies } from "next/headers";

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
  const email = cookies().get("adminEmail")?.value;
  const password = cookies().get("adminPass")?.value;
  if (email && password) {
    db.updateBeer(data, Id, email, password);
    return new Response(JSON.stringify({ data: data }), {
      status: 200,
    });
  }
  return new Response(JSON.stringify(""), {
    status: 400,
  });
}
