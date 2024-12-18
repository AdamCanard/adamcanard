import db from "@/app/server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = await db.authAsAdminPanel(email, password);
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}
