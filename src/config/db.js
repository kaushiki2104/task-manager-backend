// const mongoose = require("mongoose");


// // import mongoose from "mongoose";

// const connectDB = async () => {
//   try {

//     const conn = await mongoose.connect(process.env.MONGODB_URL, {
//       serverSelectionTimeoutMS: 30000,
//     });

//     console.log("DB Connected:", conn.connection.host);

//   } catch (error) {

//     console.log("DB Error:", error.message);

//     process.exit(1);
//   }
// };

// module.exports=  connectDB;

import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};