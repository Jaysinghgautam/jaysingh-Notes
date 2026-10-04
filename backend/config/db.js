import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined in environment variables!");
      return;
    }

    // Safely ensure database name 'Note-app' is present before query parameters
    if (mongoUri.includes("?")) {
      const [base, query] = mongoUri.split("?");
      if (!base.endsWith("/Note-app") && !base.includes("/Note-app")) {
        mongoUri = `${base.replace(/\/$/, "")}/Note-app?${query}`;
      }
    } else if (!mongoUri.endsWith("/Note-app")) {
      mongoUri = `${mongoUri.replace(/\/$/, "")}/Note-app`;
    }

    await mongoose.connect(mongoUri);
    console.log("Mongodb is connected");
  } catch (error) {
    console.log("Error in mongodb connection", error);
  }
};

export default connectDB;