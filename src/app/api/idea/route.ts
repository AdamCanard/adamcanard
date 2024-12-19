import { IIdea } from "@/app/types";
import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const data: IIdea = {
    Idea: formData.get("Idea") as string,
  };
  db.addIdea(data);
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}

export async function GET() {
  const ideaList = await db.getIdeas();
  return new Response(JSON.stringify(ideaList), { status: 200 });
}
