import { cookies } from "next/headers";
export async function POST(req: Request) {
  const formData = await req.formData();
  const cookieName = formData.get("cookieName") as string;
  const cookieData = formData.get("cookieData") as string;
  cookies().set(cookieName, cookieData);

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
