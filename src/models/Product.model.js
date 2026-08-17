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
        name: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.length <= 4,
                message: "A product can have a maximum of 4 images.",
            },
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