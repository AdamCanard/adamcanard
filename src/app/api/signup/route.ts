import db from "../../server/pb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const emailSplit = email.split("@");
  const username = emailSplit[0] + emailSplit[1].split(".")[0];
  const data = await db.register(username, email, password);

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
