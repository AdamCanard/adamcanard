import { User } from "@/app/server/models/user";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username") as string;
  try {
    await connectMongo();
    const user = await User.findOne({ username: username });
    if (user === null) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
