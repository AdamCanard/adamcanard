import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = formData.get("userId") as string;
  const email = formData.get("email") as string;
  console.log(userId, email);
  const data = db.addEmail(userId, email);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
