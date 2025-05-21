import { Beer } from "@/app/server/models/beer";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const beer = await Beer.findOne({ _id: params.id });
    return new NextResponse(JSON.stringify(beer), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
