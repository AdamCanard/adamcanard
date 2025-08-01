import { cookies } from "next/headers";
export async function POST(req: Request) {
  const formData = await req.formData();
  const cookieName = formData.get("cookieName") as string;
  const cookieData = formData.get("cookieData") as string;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, cookieData);

  return new Response(JSON.stringify({ hello: "hello" }), {
    status: 200,
  });
}
