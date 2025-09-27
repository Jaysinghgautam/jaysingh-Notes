 import mongoose from "mongoose";

const connectDB=async()=>{
  try {
  await mongoose.connect(`${process.env.MONGODB_URI}/Note-app`);
  console.log("Mongodb is connected");
} catch (error) {
  console.log("Error in mongodb connection", error);
}

}
export default connectDB