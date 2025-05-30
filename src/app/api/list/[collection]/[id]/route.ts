import db from "@/app/server/pb";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string; collection: string }> },
) {
  const { id, collection } = await params;
  const data = await db.getById(collection, id);

  return new Response(JSON.stringify(data), { status: 200 });
}
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string; collection: string }> },
) {
  const { id, collection } = await params;
  const data = await db.delete(collection, id);
  return new Response(JSON.stringify(data), { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; collection: string }> },
) {
  const { id, collection } = await params;
  const formData = await req.formData();

  const data = await db.update(collection, id, formData);
  return new Response(JSON.stringify(data), { status: 200 });
}
