import mongoose from "mongoose";

const contactNumberSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            enum: ["phone", "whatsapp"],
        },
        number: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const contactSchema = new mongoose.Schema(
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
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },
        contactNumbers: {
            type: [contactNumberSchema],
            default: [],
        },
        workingHours: {
            type: String,
            trim: true,
            default: "",
        },
        googleMapLink: {
            type: String,
            trim: true,
            default: "",
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);