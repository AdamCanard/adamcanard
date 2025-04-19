import mongoose from "mongoose";

export interface IUser {
  username: string;
  losses: number;
  logs: number;
  lists: string[];
}

const UserSchema = new mongoose.Schema({
  username: String,
  losses: Number,
  logs: Number,
  lists: [String],
});

export const User = mongoose.model("User", UserSchema);
