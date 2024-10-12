import db from "../../server/pb";
import { cookies } from "next/headers";

export async function GET() {
  const email = cookies().get("adminEmail")?.value;
  const password = cookies().get("adminPass")?.value;
  if (email && password) {
    const drankList = await db.getSuggestion(email, password);
    return new Response(JSON.stringify(drankList), { status: 200 });
  }
  return new Response(JSON.stringify(""), { status: 400 });
}

export async function POST() {
  const email = cookies().get("adminEmail")?.value;
  const password = cookies().get("adminPass")?.value;
  if (email && password) {
    const drankList = await db.getSuggestion(email, password);
    return new Response(JSON.stringify(drankList), { status: 200 });
  }
  return new Response(JSON.stringify(""), { status: 400 });
}
