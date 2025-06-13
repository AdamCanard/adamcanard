import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local",
    );
  }
  mongoose.connect(MONGO_URI).catch((err) => console.log(err));
}
export default connectMongo;
