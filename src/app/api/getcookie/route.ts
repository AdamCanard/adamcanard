import { cookies } from "next/headers";
export async function POST(req: Request) {
  const formData = await req.formData();
  const cookie = formData.get("cookie") as string;
  const data = cookies().get(cookie);
  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
