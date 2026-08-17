// models/TeamMember.js
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
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
            lowercase: true,
            trim: true,
        },
    },
    { timestamps: true }
);

teamMemberSchema.index({ ownerId: 1, email: 1 }, { unique: true });

export default mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);