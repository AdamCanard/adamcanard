import db from "@/app/server/pb";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();

  const data = await db.update("users", params.id, formData);
  return new Response(JSON.stringify(data), { status: 200 });
}
