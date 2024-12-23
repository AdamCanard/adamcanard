import db from "@/app/server/pb";
import { IIdea } from "@/app/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.getById("Ideas", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.delete("Ideas", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();
  const form: IIdea = {
    Idea: formData.get("Idea") as string,
  };
  const data = await db.update("Ideas", params.id, form);
  return new Response(JSON.stringify(data), { status: 200 });
}
