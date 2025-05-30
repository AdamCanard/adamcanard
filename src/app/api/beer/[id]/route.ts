import { Beer, IBeer } from "@/app/server/models/beer";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectMongo();
    const beer = await Beer.findOne({ _id: id });
    return new NextResponse(JSON.stringify(beer), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const formData = await req.formData();

  //const update: IBeer = {
  //  name: formData.get("name") as string,
  //  brewery: formData.get("brewery") as string,
  //  drank: 1,
  //  rating: +(formData.get("rating") as string),
  //  keywords: formData.getAll("keywords") as string[],
  //  recommended: formData.get("recommended") as string,
  //  review: formData.get("review") as string,
  //  desc: formData.get("desc") as string,
  //  image: [],
  //};
  //if ((formData.get("image") as string) !== null) {
  //  beer.image.push(formData.get("image") as string);
  //}
  try {
    await connectMongo();
    const beer = await Beer.findOne({ _id: id });
    const update: IBeer = {
      name: beer.name,
      brewery: beer.brewery,
      drank: beer.drank + 1,
      rating:
        beer.rating * beer.drank +
        (+(formData.get("rating") as string) / beer.drank + 1),
      keywords: formData.getAll("keywords") as string[],
      recommended: formData.get("recommended") as string,
      review: formData.get("review") as string,
      desc: formData.get("desc") as string,
      image: beer.image,
    };

    const newBeer = await Beer.findOneAndUpdate({ _id: id }, update);
    return NextResponse.json(
      { newBeer, message: "Your Beer has been updated" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
