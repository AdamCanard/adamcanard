import db from "@/app/server/pb";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const formData = await req.formData();
  const data = db.addValue(formData, collection);
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const list = await db.getList(collection);
  return new Response(JSON.stringify(list), { status: 200 });
}
