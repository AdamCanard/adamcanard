import db from "@/app/server/pb";
import { ISuggestion } from "@/app/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.getById("Suggestion", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.delete("Suggestion", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();
  const form: ISuggestion = {
    Beer: formData.get("Beer") as string,
    Brewery: formData.get("Brewery") as string,
    By: formData.get("By") as string,
  };
  const data = await db.update("Suggestion", params.id, form);
  return new Response(JSON.stringify(data), { status: 200 });
}
