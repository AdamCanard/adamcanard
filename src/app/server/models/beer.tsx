import mongoose from "mongoose";
import { StaticImageData } from "next/image";
export interface IBeer {
  _id?: string;
  name: string;
  brewery: string;
  drank: number;
  rating: number;
  keywords?: string[];
  recommended?: string;
  desc?: string;
  image: StaticImageData[];
}

const BeerSchema = new mongoose.Schema({
  name: String,
  brewery: String,
  keywords: [String],
  recommended: String,
  drank: Number,
  desc: String,
  rating: Number,
  image: [Buffer],
});

export const Beer =
  mongoose.models["Beer"] || mongoose.model("Beer", BeerSchema);
