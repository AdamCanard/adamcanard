import db from "@/app/server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const recordId = formData.get("recordId") as string;

  const data = await db.getUsername(recordId);

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
