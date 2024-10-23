import db from "../../server/pb";
import { ISuggestion } from "../../types";

export async function POST(req: Request) {
  const formData = await req.formData();

  const data: ISuggestion = {
    Beer: formData.get("Beer") as string,
    Brewery: formData.get("Brewery") as string,
  };

  db.addSuggestion(data);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
