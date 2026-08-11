import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
            index: true,
        },
        appUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppUser",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 120,
        },
        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: 1000,
        },
    },
    { timestamps: true }
);

categorySchema.index({ shopId: 1, name: 1 }, { unique: false });
categorySchema.index({ shopId: 1, slug: 1 }, { unique: true });

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
