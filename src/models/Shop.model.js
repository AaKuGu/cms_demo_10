import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        appUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppUser",
            required: true,
            index: true,
        },
        userIdFromAuthLibrary: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },
        googleMapLink: {
            type: String,
            trim: true,
            default: "",
        },
        logo: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

shopSchema.index({ appUserId: 1, name: 1 }, { unique: false });

export default mongoose.models.Shop || mongoose.model("Shop", shopSchema);