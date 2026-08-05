import mongoose from "mongoose";

// ---------- Reusable sub-schemas ----------

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        altText: {
            type: String,
            trim: true,
            default: "",
        },
        publicId: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: false }
);

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
            type: imageSchema,
            default: () => ({}),
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

const certificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        issuingBody: {
            type: String,
            trim: true,
            default: "",
        },
        certificateImage: {
            type: imageSchema,
            default: () => ({}),
        },
        description: {
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

const valueItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
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

const storePhotoSchema = new mongoose.Schema(
    {
        photo: {
            type: imageSchema,
            default: () => ({}),
        },
        caption: {
            type: String,
            trim: true,
            default: "",
        },
        branchName: {
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

// ---------- Section sub-schemas ----------
// Each section carries its own isVisible + order so the storefront
// renderer can decide what to show and in what sequence.

const storySectionSchema = new mongoose.Schema(
    {
        isVisible: { type: Boolean, default: true },
        order: { type: Number, default: 1 },
        heading: { type: String, trim: true, default: "Our Story" },
        content: { type: String, trim: true, default: "" },
        establishedYear: { type: Number },
        coverImage: { type: imageSchema, default: () => ({}) },
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
        photo: { type: imageSchema, default: () => ({}) },
        message: { type: String, trim: true, default: "" },
        signatureImage: { type: imageSchema, default: () => ({}) },
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
            type: [teamMemberSchema],
            default: [],
        },
    },
    { _id: false }
);

const certificationsSectionSchema = new mongoose.Schema(
    {
        isVisible: { type: Boolean, default: true },
        order: { type: Number, default: 6 },
        heading: { type: String, trim: true, default: "Certifications & Trust" },
        items: {
            type: [certificationSchema],
            default: [],
        },
    },
    { _id: false }
);

const valuesSectionSchema = new mongoose.Schema(
    {
        isVisible: { type: Boolean, default: false },
        order: { type: Number, default: 7 },
        heading: { type: String, trim: true, default: "What We Stand For" },
        items: {
            type: [valueItemSchema],
            default: [],
        },
    },
    { _id: false }
);

const storeGallerySectionSchema = new mongoose.Schema(
    {
        isVisible: { type: Boolean, default: false },
        order: { type: Number, default: 8 },
        heading: { type: String, trim: true, default: "Visit Our Showroom" },
        photos: {
            type: [storePhotoSchema],
            default: [],
        },
    },
    { _id: false }
);

const ctaBlockSectionSchema = new mongoose.Schema(
    {
        isVisible: { type: Boolean, default: false },
        order: { type: Number, default: 9 },
        heading: { type: String, trim: true, default: "" },
        subtext: { type: String, trim: true, default: "" },
        buttonText: { type: String, trim: true, default: "Contact Us" },
        buttonLink: { type: String, trim: true, default: "" },
    },
    { _id: false }
);

// ---------- Main About Us schema ----------

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
        certifications: {
            type: certificationsSectionSchema,
            default: () => ({}),
        },
        values: {
            type: valuesSectionSchema,
            default: () => ({}),
        },
        storeGallery: {
            type: storeGallerySectionSchema,
            default: () => ({}),
        },
        ctaBlock: {
            type: ctaBlockSectionSchema,
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