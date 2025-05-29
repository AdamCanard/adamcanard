import mongoose from "mongoose";
export interface IBeer {
  _id?: string;
  name: string;
  brewery: string;
  drank?: number;
  rating: number;
  keywords?: string[];
  recommended?: string;
  review?: string;
  desc?: string;
  image: string[];
}

const BeerSchema = new mongoose.Schema({
  name: String,
  brewery: String,
  keywords: [String],
  recommended: String,
  drank: Number,
  review: String,
  desc: String,
  rating: Number,
  image: [String],
});

export const Beer =
  mongoose.models["Beer"] || mongoose.model("Beer", BeerSchema);
