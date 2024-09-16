import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = await db.register(email, password);

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
