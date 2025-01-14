import db from "@/app/server/pb";

export async function POST(
  req: Request,
  { params }: { params: { collection: string } },
) {
  const formData = await req.formData();
  const data = db.addValue(formData, params.collection);
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}
