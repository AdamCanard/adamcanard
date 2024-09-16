import { cookies } from "next/headers";
export async function POST(req: Request) {
  const formData = await req.formData();
  const authToken = formData.get("authToken") as string;
  const userId = formData.get("userId") as string;
  console.log(authToken);
  cookies().set("authToken", authToken);
  cookies().set("userId", userId);

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
