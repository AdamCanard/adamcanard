import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username") as string;
  const data = await db.authenticate(username);

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
