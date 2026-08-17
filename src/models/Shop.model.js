import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppUser",
            required: true,
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
        settings: {
            products: {
                showPricing: { type: Boolean, default: true },
            },
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