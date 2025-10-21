import mongoose from "mongoose";
export interface IRecipe {
  name: string;
  url: string;
}

const RecipeSchema = new mongoose.Schema({
  name: String,
  url: String,
});

export const Recipe =
  mongoose.models["Recipe"] || mongoose.model("Recipe", RecipeSchema);
