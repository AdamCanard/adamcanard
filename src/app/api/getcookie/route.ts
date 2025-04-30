import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const formData = await req.formData();
  const cookie = formData.get("cookie") as string;
  const data = cookies().get(cookie)?.value;
  if (data === undefined) {
    return NextResponse.json(
      { message: "No cookie with name: " + cookie },
      { status: 404 },
    );
  }
  const returnCookie: Record<string, string> = {};
  returnCookie[cookie as keyof object] = data;
  return new NextResponse(JSON.stringify(returnCookie), {
    status: 200,
  });
}
