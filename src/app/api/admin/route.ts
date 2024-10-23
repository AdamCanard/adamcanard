import db from "@/app/server/pb";
import { cookies } from "next/headers";
export async function GET() {
  const email = cookies().get("adminEmail");
  const password = cookies().get("adminPass");
  if (email && password) {
    const admin = await db.authAsAdmin(email.value, password.value);
    return new Response(JSON.stringify(admin), { status: 200 });
  }
  return new Response(JSON.stringify(""), { status: 400 });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = await db.authAsAdminPanel(email, password);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
