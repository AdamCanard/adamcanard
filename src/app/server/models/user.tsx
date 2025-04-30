import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  losses: Number,
  logs: Number,
  lists: [String],
});

export const User =
  mongoose.models["User"] || mongoose.model("User", UserSchema);
