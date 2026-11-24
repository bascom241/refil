import mongoose, { Schema } from "mongoose";

const authSessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        refreshTokenHash: {
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 },
        },
    },
    { timestamps: true },
);

export default mongoose.model("AuthSession", authSessionSchema);
