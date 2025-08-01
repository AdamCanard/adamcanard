import { Beer, IBeer } from "@/app/server/models/beer";
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
export async function POST(req: Request) {
  const formData = await req.formData();
  const beer: IBeer = {
    name: formData.get("name") as string,
    brewery: formData.get("brewery") as string,
    drank: 1,
    rating: +(formData.get("rating") as string),
    keywords: formData.getAll("keywords") as string[],
    recommended: formData.get("recommended") as string,
    review: formData.get("review") as string,
    desc: formData.get("desc") as string,
    image: [],
  };
  if ((formData.get("image") as string) !== null) {
    beer.image.push(formData.get("image") as string);
  }
  try {
    await connectMongo();
    const newBeer = new Beer(beer);
    const returnedBeer = await newBeer.save();
    console.log(returnedBeer);
    return NextResponse.json(
      { returnedBeer, message: "Your product has been created" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
