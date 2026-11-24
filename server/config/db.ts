import dotenv from "dotenv"
import mongoose from "mongoose";
import { DatabaseError } from "../src/errors/DatabaseError.js";
import { EnvError } from "../src/errors/EnvNotLoadedError.js";

dotenv.config()

export const connectToDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new EnvError()
    }

    try {
        await mongoose.connect(uri);
        console.log("DB connected successfully")
    } catch (error: unknown) {
        console.error("MongoDB connection failed:", error)
        throw new DatabaseError(error instanceof Error ? error.message : String(error))
    }
}
