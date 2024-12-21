import db from "@/app/server/pb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await db.getById("Beer", params.id);
  return new Response(JSON.stringify(data), { status: 200 });
}
