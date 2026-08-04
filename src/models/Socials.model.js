import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            enum: [
                "instagram",
                "facebook",
                "whatsapp",
                "youtube",
                "twitter",
                "linkedin",
                "tiktok",
                "pinterest",
            ],
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const socialsSchema = new mongoose.Schema(
    {
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
            unique: true,
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
        links: {
            type: [socialLinkSchema],
            default: [],
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Socials || mongoose.model("Socials", socialsSchema);