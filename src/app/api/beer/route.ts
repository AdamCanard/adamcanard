import { Beer } from "@/app/server/models/beer";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const beers = await Beer.find();
    return new NextResponse(JSON.stringify(beers), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
