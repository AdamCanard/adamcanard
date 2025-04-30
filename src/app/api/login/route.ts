import { User } from "@/app/server/models/user";
import connectMongo from "@/app/server/mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username") as string;
  try {
    await connectMongo();
    const user = await User.findOne({ username: username });
    if (user === null) {
      return NextResponse.json(
        { message: "Username does not exist" },
        { status: 404 },
      );
    }
    const logsUpdate = { logs: user.logs + 1 };
    await User.updateOne({ username: username }, logsUpdate);
    user.logs = logsUpdate;
    await user.save();
    cookies().set(username, username);
    return NextResponse.json(
      { user, message: "Username found, Logging you in" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
