import { cookies } from "next/headers";
export async function GET() {
  const authToken = cookies().get("authToken");

  return new Response(JSON.stringify({ data: authToken }), {
    status: 200,
  });
}
