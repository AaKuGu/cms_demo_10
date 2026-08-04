import mongoose from "mongoose";

const appUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userIdFromAuthLibrary: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        role: {
            type: String,
            trim: true,
            default: "owner",
        },
    },
    { timestamps: true }
);

appUserSchema.index({ email: 1 }, { unique: true });
appUserSchema.index({ userIdFromAuthLibrary: 1 }, { unique: true });

export default mongoose.models.AppUser || mongoose.model("AppUser", appUserSchema);