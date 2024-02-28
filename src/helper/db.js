import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const { connextion } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "my-app-db",
    });
  } catch (error) {
    console.log("Error in db connection");
  }
};
