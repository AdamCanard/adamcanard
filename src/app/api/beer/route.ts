import { Beer, IBeer } from "@/app/server/models/beer";
import connectMongo from "@/app/server/mongoose";
import { readFileSync } from "fs";
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
export async function POST(req: Request) {
  const formData = await req.formData();
  console.log(readFileSync(formData.get("image") as string));
  const image = formData.get("image") as File;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(buffer);
  const beer: IBeer = {
    name: formData.get("name") as string,
    brewery: formData.get("brewery") as string,
    drank: 1,
    rating: +(formData.get("rating") as string),
    keywords: formData.getAll("keywords") as string[],
    recommended: formData.get("recommended") as string,
    desc: formData.get("desc") as string,
    image: [""],
  };
  //name: string;
  //brewery: string;
  //drank?: number;
  //rating: number;
  //keywords?: string[];
  //recommended?: string;
  //desc?: string;
  //image: StaticImageData[];
  try {
    await connectMongo();
    const newBeer = new Beer(beer);
    newBeer.save();
    return NextResponse.json(
      { newBeer, message: "Your product has been created" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
