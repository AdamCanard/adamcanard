import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = await db.authenticate(email, password);
  console.log(data);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
