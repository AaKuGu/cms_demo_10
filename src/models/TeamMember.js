import mongoose from "mongoose";

const shopTeamMemberSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppUser",
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

shopTeamMemberSchema.index({ shopId: 1, email: 1 }, { unique: true });

export default mongoose.models.ShopTeamMember || mongoose.model("ShopTeamMember", shopTeamMemberSchema);