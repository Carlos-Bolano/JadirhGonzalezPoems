import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "jadirhBlog",
      bufferCommands: false,
    });
    console.log("Connected");
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw new Error("Error connecting to database");
  }
};

export default connectDB;
