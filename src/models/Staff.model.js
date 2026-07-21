import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    userId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    permissions: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["invited", "active", "revoked"],
      default: "invited",
    },
  },
  { timestamps: true }
);

staffSchema.index({ clinicId: 1, email: 1 }, { unique: true });

export default mongoose.models.Staff || mongoose.model("Staff", staffSchema);