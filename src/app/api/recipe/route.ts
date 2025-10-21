import { IRecipe, Recipe } from "@/app/server/models/recipe";
import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const recipes = await Recipe.find();
    return new NextResponse(JSON.stringify(recipes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
export async function POST(req: Request) {
  const formData = await req.formData();
  const recipe: IRecipe = {
    name: formData.get("name") as string,
    url: formData.get("recipe") as string,
  };

  try {
    await connectMongo();
    const newRecipe = new Recipe(recipe);
    const returnedRecipe = await newRecipe.save();
    console.log(returnedRecipe);
    return NextResponse.json(
      { returnedRecipe, message: "Your product has been created" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
