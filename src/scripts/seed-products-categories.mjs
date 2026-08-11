/**
 * Seed script — Categories + Products (textual data only, no images).
 *
 * Run with:
 *   node --env-file=.env.local src/scripts/seed-products-categories.mjs
 *
 * Requires your Mongo connection string available as process.env.MONGODB_URI.
 * --env-file loads .env.local for you — no dotenv package needed.
 */

import mongoose from "mongoose";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

// Standalone connection — deliberately NOT importing the project's
// dbConnect(), since that pulls in "@/..." path aliases (e.g. a models
// barrel file) that only Next.js's bundler knows how to resolve. Plain
// `node` has no alias support, so we connect directly here instead.
async function dbConnect() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not set. Check your .env.local file.");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected.");
}

const SHOP_ID = "6a7b2e2a7e1d8fed5b49ac95";
const APP_USER_ID = "6a7b2dc87e1d8fed5b49ac93";

const categoriesData = [
    {
        name: "T-Shirts",
        slug: "t-shirts",
        description: "Everyday casual tees in breathable cotton and blends.",
    },
    {
        name: "Dresses",
        slug: "dresses",
        description: "Casual and semi-formal dresses for every occasion.",
    },
    {
        name: "Footwear",
        slug: "footwear",
        description: "Sneakers, sandals, and everyday footwear.",
    },
    {
        name: "Bags",
        slug: "bags",
        description: "Totes, backpacks, and sling bags for daily use.",
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "Small add-ons to finish off an outfit.",
    },
];

const productsByCategorySlug = {
    "t-shirts": [
        { name: "Classic Crew Neck Tee", desc: "100% cotton crew neck tee, relaxed fit, breathable everyday wear.", price: 499 },
        { name: "Graphic Print Tee", desc: "Soft cotton tee with a minimal front print, unisex fit.", price: 599 },
        { name: "Henley Half-Sleeve Tee", desc: "Button placket henley tee with a slightly tailored fit.", price: 649 },
        { name: "Striped V-Neck Tee", desc: "Lightweight striped tee, breathable cotton blend, V-neck cut.", price: 549 },
        { name: "Oversized Drop-Shoulder Tee", desc: "Relaxed oversized fit with dropped shoulders, heavyweight cotton.", price: 699 },
        { name: "Full-Sleeve Waffle Tee", desc: "Textured waffle-knit full-sleeve tee, layering-friendly fit.", price: 749 },
        { name: "Solid Pocket Tee", desc: "Everyday solid tee with a chest pocket, soft-washed cotton.", price: 529 },
        { name: "Ringer Tee", desc: "Contrast-trim ringer tee, retro fit, midweight cotton jersey.", price: 579 },
        { name: "Tie-Dye Tee", desc: "Hand-finished tie-dye print tee, relaxed unisex fit.", price: 649 },
        { name: "Muscle Fit Tee", desc: "Fitted crew neck tee with a tapered cut, stretch cotton blend.", price: 599 },
        { name: "Long Line Tee", desc: "Extended-length crew neck tee, curved hem, streetwear fit.", price: 679 },
        { name: "Raglan Sleeve Tee", desc: "Two-tone raglan sleeve tee, soft brushed cotton.", price: 619 },
    ],
    dresses: [
        { name: "Floral Wrap Dress", desc: "Midi wrap dress with a floral print, tie waist, flowy fabric.", price: 1299 },
        { name: "A-Line Casual Dress", desc: "Knee-length A-line dress in solid color, everyday comfort fit.", price: 999 },
        { name: "Maxi Summer Dress", desc: "Flowy full-length maxi dress, lightweight fabric, adjustable straps.", price: 1499 },
        { name: "Belted Shirt Dress", desc: "Button-down shirt dress with a fabric belt, smart-casual look.", price: 1199 },
        { name: "Bodycon Midi Dress", desc: "Fitted midi dress in stretch fabric, round neck, sleeveless.", price: 1099 },
        { name: "Puff-Sleeve Fit and Flare Dress", desc: "Fit-and-flare dress with puff sleeves, cinched waist.", price: 1349 },
        { name: "Denim Shirt Dress", desc: "Casual denim shirt dress with front buttons and chest pockets.", price: 1249 },
        { name: "Off-Shoulder Ruffle Dress", desc: "Off-shoulder dress with ruffle detail, midi length.", price: 1399 },
        { name: "Printed Shift Dress", desc: "Loose-fit shift dress with an all-over print, short sleeves.", price: 949 },
        { name: "Halter Neck Slip Dress", desc: "Satin-finish halter neck slip dress, minimal and sleek.", price: 1149 },
    ],
    footwear: [
        { name: "Classic Canvas Sneakers", desc: "Everyday low-top canvas sneakers with cushioned insole.", price: 1099 },
        { name: "Slip-On Loafers", desc: "Lightweight slip-on loafers, suede finish, cushioned footbed.", price: 1399 },
        { name: "Flat Strap Sandals", desc: "Minimal flat sandals with adjustable ankle strap.", price: 799 },
        { name: "Running Sports Shoes", desc: "Breathable mesh sports shoes with shock-absorbing sole.", price: 1799 },
        { name: "Casual Slides", desc: "Everyday indoor-outdoor slides with a cushioned footbed.", price: 599 },
        { name: "High-Top Sneakers", desc: "Ankle-length high-top sneakers with lace-up front.", price: 1499 },
        { name: "Espadrille Wedges", desc: "Jute-wrapped espadrille wedges, ankle tie-up straps.", price: 1299 },
        { name: "Chunky Platform Sneakers", desc: "Thick-sole platform sneakers, chunky silhouette.", price: 1699 },
        { name: "Formal Derby Shoes", desc: "Polished derby shoes in faux leather, lace-up formal fit.", price: 1899 },
        { name: "Ankle Strap Block Heels", desc: "Block heel sandals with an adjustable ankle strap.", price: 1249 },
    ],
    bags: [
        { name: "Canvas Tote Bag", desc: "Sturdy canvas tote with inner pocket, everyday carry.", price: 799 },
        { name: "Minimal Sling Bag", desc: "Compact sling bag with adjustable strap, faux leather finish.", price: 999 },
        { name: "Everyday Backpack", desc: "Lightweight backpack with padded laptop compartment.", price: 1599 },
        { name: "Structured Handbag", desc: "Structured top-handle handbag with detachable sling strap.", price: 1899 },
        { name: "Quilted Shoulder Bag", desc: "Quilted-finish shoulder bag with a chain strap.", price: 1699 },
        { name: "Drawstring Potli Bag", desc: "Fabric potli-style drawstring bag, compact and lightweight.", price: 549 },
        { name: "Weekender Duffel Bag", desc: "Spacious duffel bag with a padded shoulder strap.", price: 1999 },
        { name: "Mini Crossbody Bag", desc: "Compact crossbody bag with a long adjustable strap.", price: 899 },
        { name: "Laptop Messenger Bag", desc: "Padded messenger bag with a dedicated laptop sleeve.", price: 1799 },
        { name: "Clutch Purse", desc: "Compact evening clutch with a magnetic snap closure.", price: 749 },
    ],
    accessories: [
        { name: "Leather Wrap Bracelet", desc: "Adjustable faux-leather wrap bracelet with metal clasp.", price: 299 },
        { name: "Classic Aviator Sunglasses", desc: "UV-protected aviator sunglasses with metal frame.", price: 699 },
        { name: "Woven Fabric Belt", desc: "Adjustable woven belt with a metal buckle, casual wear.", price: 449 },
        { name: "Minimal Stud Earrings", desc: "Everyday stud earrings, lightweight and hypoallergenic.", price: 349 },
        { name: "Canvas Cap", desc: "Adjustable cotton canvas cap, curved brim, everyday casual wear.", price: 399 },
        { name: "Layered Chain Necklace", desc: "Multi-layer chain necklace with a delicate pendant.", price: 449 },
        { name: "Printed Silk Scarf", desc: "Lightweight printed scarf, versatile styling accessory.", price: 599 },
        { name: "Beaded Hair Clip Set", desc: "Set of beaded hair clips, assorted everyday designs.", price: 249 },
        { name: "Leather Card Wallet", desc: "Slim faux-leather card wallet with multiple slots.", price: 549 },
        { name: "Statement Hoop Earrings", desc: "Bold hoop earrings in a lightweight metal finish.", price: 399 },
        { name: "Woven Friendship Bracelet Set", desc: "Set of three woven bracelets, adjustable fit.", price: 249 },
    ],
};

async function seed() {
    await dbConnect();

    const shopId = new mongoose.Types.ObjectId(SHOP_ID);
    const appUserId = new mongoose.Types.ObjectId(APP_USER_ID);

    console.log("Connected. Seeding categories + products for shop:", SHOP_ID);

    // Clears any previously seeded categories/products for THIS shop only
    // before reseeding, so the script is safe to re-run.
    await Category.deleteMany({ shopId });
    await Product.deleteMany({ shopId });

    const categoryIdBySlug = {};

    for (const cat of categoriesData) {
        const created = await Category.create({
            shopId,
            appUserId,
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
        });
        categoryIdBySlug[cat.slug] = created._id;
        console.log("Created category:", created.name);
    }

    let productCount = 0;
    for (const [slug, products] of Object.entries(productsByCategorySlug)) {
        const categoryId = categoryIdBySlug[slug];
        for (const p of products) {
            await Product.create({
                shopId,
                appUserId,
                categoryId,
                name: p.name,
                desc: p.desc,
                price: p.price,
                // image intentionally left blank — add images manually later
            });
            productCount++;
        }
    }

    console.log(`Done. Seeded ${categoriesData.length} categories and ${productCount} products.`);

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
