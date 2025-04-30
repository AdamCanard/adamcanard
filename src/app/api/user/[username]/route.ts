import { User } from "@/app/server/models/user";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { username: string } },
) {
  const formData = await req.formData();
  try {
    await connectMongo();
    const user = await User.findOneAndUpdate({ username: params.username }, {});
    if (user === null) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }
    const userUpdate = {
      logs: formData.get("logs") as string,
      losses: formData.get("losses") as string,
    };
    await User.updateOne({ username: params.username }, userUpdate);
    return NextResponse.json(
      { user, message: "Username found, Logging you in" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
