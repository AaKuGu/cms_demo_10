import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
            index: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
            index: true,
        },
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
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
            default: "",
        },
        desc: {
            type: String,
            trim: true,
            default: "",
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

productSchema.index({ shopId: 1, name: 1 }, { unique: false });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
