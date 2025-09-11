 import mongoose from "mongoose";

const DbCon=async()=>{
  try {
  await mongoose.connect(`${process.env.MONGODB_URI}/rani`);
  console.log("Mongodb is connected");
} catch (error) {
  console.log("Error in mongodb connection", error);
}

}
export default DbCon