import db from "@/app/server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = formData.get("userId") as string;

  const data = await db.getUsername(userId);
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
