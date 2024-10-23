import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;
  const beer = await db.getById("Beer", id);
  return new Response(JSON.stringify(beer), { status: 200 });
}
