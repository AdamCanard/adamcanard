import mongoose from "mongoose";
export interface IBeer {
  _id?: string;
  name: string;
  brewery: string;
  time: string;
  rating: number;
  keywords?: string[];
  recommended?: string;
  desc?: string;
}

const BeerSchema = new mongoose.Schema({
  name: String,
  brewery: String,
  keywords: [String],
  recommended: String,
  time: String,
  desc: String,
  rating: Number,
});

export const Beer =
  mongoose.models["Beer"] || mongoose.model("Beer", BeerSchema);
