import db from "@/app/server/pb";

export async function GET() {
  const drankList = await db.authAsAdmin();
  return new Response(JSON.stringify(drankList), { status: 200 });
}
