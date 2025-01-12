import db from "@/app/server/pb";

export async function GET(
  req: Request,
  { params }: { params: { collection: string; id: string } },
) {
  const data = await db.getById(params.collection, params.id);

  return new Response(JSON.stringify(data), { status: 200 });
}
export async function DELETE(
  req: Request,
  { params }: { params: { collection: string; id: string } },
) {
  const data = await db.delete(params.collection, params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: { collection: string; id: string } },
) {
  const formData = await req.formData();

  const data = await db.update(params.collection, params.id, formData);
  return new Response(JSON.stringify(data), { status: 200 });
}
