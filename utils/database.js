import mongoose from "mongoose";

let isconnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isconnected) {
    // console.log("MongoDB is Already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      dbName: "buymyoldphone",
    });

    isconnected = true;

    // console.log("MongoDb connnected")
  } catch (error) {
    console.log(error);
  }
};
