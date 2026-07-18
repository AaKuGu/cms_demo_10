import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // matches better-auth's user._id (string) in the "user" collection
      required: true,
      index: true,
    },
    clinicName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Clinic =
  mongoose.models.Clinic || mongoose.model("Clinic", clinicSchema);

export default Clinic;