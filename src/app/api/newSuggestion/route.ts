import db from "../../server/pb";
import { cookies } from "next/headers";
import { ISuggestion } from "../../types";

export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = cookies().get("userId")?.value;
  if (userId != undefined) {
    const isBanned = await db.isBanned(userId);
    if (isBanned) {
      return new Response(JSON.stringify({ data: {} }), {
        status: 200,
      });
    }
    const data: ISuggestion = {
      Beer: formData.get("Beer") as string,
      Brewery: formData.get("Brewery") as string,
      Name: formData.get("Name") as string,
      userId: userId as string,
    };

    db.addSuggestion(data);
    return new Response(JSON.stringify({ data: data }), {
      status: 200,
    });
  }
}
