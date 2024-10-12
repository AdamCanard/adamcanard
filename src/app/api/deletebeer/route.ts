import db from "../../server/pb";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;
  const email = cookies().get("adminEmail")?.value;
  const password = cookies().get("adminPass")?.value;
  if (email && password) {
    const data = await db.deleteBeer(id, email, password);
    return new Response(JSON.stringify({ data: data }), {
      status: 200,
    });
  }
  return new Response(JSON.stringify(""), {
    status: 400,
  });
}
