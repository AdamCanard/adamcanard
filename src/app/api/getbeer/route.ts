import db from "../../server/pb";

export async function POST() {
  const drankList = await db.getBeer();
  return new Response(JSON.stringify(drankList), { status: 200 });
}

export async function GET() {
  const drankList = await db.getBeer();
  return new Response(JSON.stringify(drankList), { status: 200 });
}
