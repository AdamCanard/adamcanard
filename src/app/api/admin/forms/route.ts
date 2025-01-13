import db from "@/app/server/pb";

export async function GET() {
  const list = await db.getForms();
  return new Response(JSON.stringify(list), { status: 200 });
}
