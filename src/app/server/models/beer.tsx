import mongoose from "mongoose";
export interface IBeer {
  name: string;
  brewery: string;
  keywords: string[];
  recommended: string;
  desc: string;
  rating: number;
}

const BeerSchema = new mongoose.Schema({
  name: String,
  brewery: String,
  keywords: [String],
  recommended: String,
  desc: String,
  rating: Number,
});

export const Beer =
  mongoose.models["Beer"] || mongoose.model("Beer", BeerSchema);
