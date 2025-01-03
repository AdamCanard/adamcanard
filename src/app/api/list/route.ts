import db from "@/app/server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const collection = formData.get("collection") as string;
  const data = db.addValue(formData, collection);
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}

export async function GET() {
  const ideaList = await db.getList("Suggestion");
  return new Response(JSON.stringify(ideaList), { status: 200 });
}
