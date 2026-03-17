import "dotenv/config";
import mongoose from "mongoose";

export function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err.message);
    });
}