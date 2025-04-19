import { IUser, User } from "@/app/server/models/user";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username") as string;
  console.log(username);
  try {
    await connectMongo();
    const body: IUser = { username: username, losses: 0, logs: 0, lists: [] };
    const user = new User(body);
    user.save();
    return NextResponse.json(
      { user, message: "Your product has been created" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
