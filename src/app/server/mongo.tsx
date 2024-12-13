import mongoose from "mongoose";

const uri = async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
};
run().catch(console.dir);
