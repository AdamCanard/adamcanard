import db from "@/app/server/pb";
import { BeerData } from "@/app/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.getById("Beer", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.delete("Beer", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();
  const form: BeerData = {
    Beer: formData.get("Beer") as string,
    Brewery: formData.get("Brewery") as string,
    By: formData.get("By") as string,
    Rating: +(formData.get("Rating") as string),
    Drank: true,
  };
  const data = await db.update("Beer", params.id, form);
  return new Response(JSON.stringify(data), { status: 200 });
}
