import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;
  const data = db.deleteBeer(id);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
