import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("not connected to database" , {error: error.message});
  }
};

export default connectDB;
