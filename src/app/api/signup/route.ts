import { User } from "@/app/server/models/user";
import connectMongo from "@/app/server/mongoose";
import { IUser } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username") as string;
  console.log(username);
  if (username === "") {
    return NextResponse.json(
      { message: "Username cannot be empty" },
      { status: 400 },
    );
  }

  try {
    await connectMongo();
    const user = await User.findOne({ username: username }).exec();
    if (user !== null) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 },
      );
    }
    const body: IUser = { username: username, losses: 0, logs: 0, lists: [] };
    const newUser = new User(body);
    newUser.save();
    return NextResponse.json(
      { newUser, message: "Your product has been created" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
