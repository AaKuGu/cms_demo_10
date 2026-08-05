import mongoose from "mongoose";

// ---------- Sub-Schemas ----------

// 1. Dynamic Team Member (No limits, simple String photo URL)
const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    photo: {
      type: String, // Cloudinary URL String
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
    },
    socialLinks: {
      instagram: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      facebook: { type: String, trim: true, default: "" },
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

// 2. Milestones & Stats Item
const milestoneStatSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

// ---------- Section Sub-Schemas ----------

const storySectionSchema = new mongoose.Schema(
  {
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 1 },
    heading: { type: String, trim: true, default: "Our Story" },
    content: { type: String, trim: true, default: "" },
    establishedYear: { type: Number },
    coverImage: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const visionMissionSectionSchema = new mongoose.Schema(
  {
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 2 },
    vision: { type: String, trim: true, default: "" },
    mission: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const foundersMessageSectionSchema = new mongoose.Schema(
  {
    isVisible: { type: Boolean, default: false },
    order: { type: Number, default: 3 },
    founderName: { type: String, trim: true, default: "" },
    designation: { type: String, trim: true, default: "Founder" },
    photo: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    signatureImage: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const milestonesSectionSchema = new mongoose.Schema(
  {
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 4 },
    stats: {
      type: [milestoneStatSchema],
      default: [],
    },
  },
  { _id: false }
);

const teamSectionSchema = new mongoose.Schema(
  {
    isVisible: { type: Boolean, default: false },
    order: { type: Number, default: 5 },
    heading: { type: String, trim: true, default: "Meet Our Team" },
    members: {
      type: [teamMemberSchema], // Dynamic array - add 1, 5, or 20 members as needed
      default: [],
    },
  },
  { _id: false }
);

// ---------- Primary About Us Schema ----------

const aboutUsSchema = new mongoose.Schema(
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

    // 5 Core Sections
    story: {
      type: storySectionSchema,
      default: () => ({}),
    },
    visionMission: {
      type: visionMissionSectionSchema,
      default: () => ({}),
    },
    foundersMessage: {
      type: foundersMessageSectionSchema,
      default: () => ({}),
    },
    milestones: {
      type: milestonesSectionSchema,
      default: () => ({}),
    },
    team: {
      type: teamSectionSchema,
      default: () => ({}),
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSchema);