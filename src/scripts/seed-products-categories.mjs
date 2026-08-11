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
// const SHOP_ID = "6a7b55341e016659b49a8085"; live
const APP_USER_ID = "6a7b2dc87e1d8fed5b49ac93"; 
// const APP_USER_ID = "6a7b54ded2494d6e73176fdc"; live

// Generates a stable, keyword-matched product photo for seeding.
// Uses LoremFlickr (https://loremflickr.com) — a free placeholder-image
// service built specifically for dev/demo seeding. It returns real photos
// matched to your keywords and are safe to hotlink (unlike scraping random
// product pages, which can break or violate hotlink/copyright terms).
// `lock` pins a specific image per product so it doesn't change on re-seeds.
function productImage(keywords, lock) {
    const query = keywords.join(",");
    return `https://loremflickr.com/640/480/${query}?lock=${lock}`;
}

const categoriesData = [
    {
        name: "T-Shirts",
        slug: "t-shirts",
        description: "Everyday casual tees in breathable cotton and blends.",
        image: productImage(["tshirt", "apparel"], 101),
    },
    {
        name: "Dresses",
        slug: "dresses",
        description: "Casual and semi-formal dresses for every occasion.",
        image: productImage(["dress", "fashion"], 102),
    },
    {
        name: "Footwear",
        slug: "footwear",
        description: "Sneakers, sandals, and everyday footwear.",
        image: productImage(["shoes", "footwear"], 103),
    },
    {
        name: "Bags",
        slug: "bags",
        description: "Totes, backpacks, and sling bags for daily use.",
        image: productImage(["handbag", "bag"], 104),
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "Small add-ons to finish off an outfit.",
        image: productImage(["accessories", "jewelry"], 105),
    },
];

const productsByCategorySlug = {
    "t-shirts": [
        { name: "Classic Crew Neck Tee", desc: "100% cotton crew neck tee, relaxed fit, breathable everyday wear.", price: 499, image: productImage(["tshirt", "crewneck"], 1001) },
        { name: "Graphic Print Tee", desc: "Soft cotton tee with a minimal front print, unisex fit.", price: 599, image: productImage(["tshirt", "graphic"], 1002) },
        { name: "Henley Half-Sleeve Tee", desc: "Button placket henley tee with a slightly tailored fit.", price: 649, image: productImage(["henley", "shirt"], 1003) },
        { name: "Striped V-Neck Tee", desc: "Lightweight striped tee, breathable cotton blend, V-neck cut.", price: 549, image: productImage(["tshirt", "striped"], 1004) },
        { name: "Oversized Drop-Shoulder Tee", desc: "Relaxed oversized fit with dropped shoulders, heavyweight cotton.", price: 699, image: productImage(["tshirt", "oversized"], 1005) },
        { name: "Full-Sleeve Waffle Tee", desc: "Textured waffle-knit full-sleeve tee, layering-friendly fit.", price: 749, image: productImage(["tshirt", "longsleeve"], 1006) },
        { name: "Solid Pocket Tee", desc: "Everyday solid tee with a chest pocket, soft-washed cotton.", price: 529, image: productImage(["tshirt", "pocket"], 1007) },
        { name: "Ringer Tee", desc: "Contrast-trim ringer tee, retro fit, midweight cotton jersey.", price: 579, image: productImage(["tshirt", "retro"], 1008) },
        { name: "Tie-Dye Tee", desc: "Hand-finished tie-dye print tee, relaxed unisex fit.", price: 649, image: productImage(["tshirt", "tiedye"], 1009) },
        { name: "Muscle Fit Tee", desc: "Fitted crew neck tee with a tapered cut, stretch cotton blend.", price: 599, image: productImage(["tshirt", "fitted"], 1010) },
        { name: "Long Line Tee", desc: "Extended-length crew neck tee, curved hem, streetwear fit.", price: 679, image: productImage(["tshirt", "streetwear"], 1011) },
        { name: "Raglan Sleeve Tee", desc: "Two-tone raglan sleeve tee, soft brushed cotton.", price: 619, image: productImage(["tshirt", "raglan"], 1012) },
    ],
    dresses: [
        { name: "Floral Wrap Dress", desc: "Midi wrap dress with a floral print, tie waist, flowy fabric.", price: 1299, image: productImage(["dress", "floral"], 2001) },
        { name: "A-Line Casual Dress", desc: "Knee-length A-line dress in solid color, everyday comfort fit.", price: 999, image: productImage(["dress", "aline"], 2002) },
        { name: "Maxi Summer Dress", desc: "Flowy full-length maxi dress, lightweight fabric, adjustable straps.", price: 1499, image: productImage(["dress", "maxi"], 2003) },
        { name: "Belted Shirt Dress", desc: "Button-down shirt dress with a fabric belt, smart-casual look.", price: 1199, image: productImage(["dress", "shirtdress"], 2004) },
        { name: "Bodycon Midi Dress", desc: "Fitted midi dress in stretch fabric, round neck, sleeveless.", price: 1099, image: productImage(["dress", "bodycon"], 2005) },
        { name: "Puff-Sleeve Fit and Flare Dress", desc: "Fit-and-flare dress with puff sleeves, cinched waist.", price: 1349, image: productImage(["dress", "puffsleeve"], 2006) },
        { name: "Denim Shirt Dress", desc: "Casual denim shirt dress with front buttons and chest pockets.", price: 1249, image: productImage(["dress", "denim"], 2007) },
        { name: "Off-Shoulder Ruffle Dress", desc: "Off-shoulder dress with ruffle detail, midi length.", price: 1399, image: productImage(["dress", "offshoulder"], 2008) },
        { name: "Printed Shift Dress", desc: "Loose-fit shift dress with an all-over print, short sleeves.", price: 949, image: productImage(["dress", "printed"], 2009) },
        { name: "Halter Neck Slip Dress", desc: "Satin-finish halter neck slip dress, minimal and sleek.", price: 1149, image: productImage(["dress", "slipdress"], 2010) },
    ],
    footwear: [
        { name: "Classic Canvas Sneakers", desc: "Everyday low-top canvas sneakers with cushioned insole.", price: 1099, image: productImage(["sneakers", "canvas"], 3001) },
        { name: "Slip-On Loafers", desc: "Lightweight slip-on loafers, suede finish, cushioned footbed.", price: 1399, image: productImage(["loafers", "shoes"], 3002) },
        { name: "Flat Strap Sandals", desc: "Minimal flat sandals with adjustable ankle strap.", price: 799, image: productImage(["sandals", "flat"], 3003) },
        { name: "Running Sports Shoes", desc: "Breathable mesh sports shoes with shock-absorbing sole.", price: 1799, image: productImage(["running", "sportshoes"], 3004) },
        { name: "Casual Slides", desc: "Everyday indoor-outdoor slides with a cushioned footbed.", price: 599, image: productImage(["slides", "sandals"], 3005) },
        { name: "High-Top Sneakers", desc: "Ankle-length high-top sneakers with lace-up front.", price: 1499, image: productImage(["sneakers", "hightop"], 3006) },
        { name: "Espadrille Wedges", desc: "Jute-wrapped espadrille wedges, ankle tie-up straps.", price: 1299, image: productImage(["espadrille", "wedges"], 3007) },
        { name: "Chunky Platform Sneakers", desc: "Thick-sole platform sneakers, chunky silhouette.", price: 1699, image: productImage(["sneakers", "platform"], 3008) },
        { name: "Formal Derby Shoes", desc: "Polished derby shoes in faux leather, lace-up formal fit.", price: 1899, image: productImage(["derby", "formalshoes"], 3009) },
        { name: "Ankle Strap Block Heels", desc: "Block heel sandals with an adjustable ankle strap.", price: 1249, image: productImage(["heels", "blockheel"], 3010) },
    ],
    bags: [
        { name: "Canvas Tote Bag", desc: "Sturdy canvas tote with inner pocket, everyday carry.", price: 799, image: productImage(["tote", "canvasbag"], 4001) },
        { name: "Minimal Sling Bag", desc: "Compact sling bag with adjustable strap, faux leather finish.", price: 999, image: productImage(["slingbag", "bag"], 4002) },
        { name: "Everyday Backpack", desc: "Lightweight backpack with padded laptop compartment.", price: 1599, image: productImage(["backpack"], 4003) },
        { name: "Structured Handbag", desc: "Structured top-handle handbag with detachable sling strap.", price: 1899, image: productImage(["handbag"], 4004) },
        { name: "Quilted Shoulder Bag", desc: "Quilted-finish shoulder bag with a chain strap.", price: 1699, image: productImage(["shoulderbag", "quilted"], 4005) },
        { name: "Drawstring Potli Bag", desc: "Fabric potli-style drawstring bag, compact and lightweight.", price: 549, image: productImage(["potlibag", "drawstring"], 4006) },
        { name: "Weekender Duffel Bag", desc: "Spacious duffel bag with a padded shoulder strap.", price: 1999, image: productImage(["duffelbag"], 4007) },
        { name: "Mini Crossbody Bag", desc: "Compact crossbody bag with a long adjustable strap.", price: 899, image: productImage(["crossbodybag"], 4008) },
        { name: "Laptop Messenger Bag", desc: "Padded messenger bag with a dedicated laptop sleeve.", price: 1799, image: productImage(["messengerbag"], 4009) },
        { name: "Clutch Purse", desc: "Compact evening clutch with a magnetic snap closure.", price: 749, image: productImage(["clutch", "purse"], 4010) },
    ],
    accessories: [
        { name: "Leather Wrap Bracelet", desc: "Adjustable faux-leather wrap bracelet with metal clasp.", price: 299, image: productImage(["bracelet", "leather"], 5001) },
        { name: "Classic Aviator Sunglasses", desc: "UV-protected aviator sunglasses with metal frame.", price: 699, image: productImage(["sunglasses", "aviator"], 5002) },
        { name: "Woven Fabric Belt", desc: "Adjustable woven belt with a metal buckle, casual wear.", price: 449, image: productImage(["belt", "woven"], 5003) },
        { name: "Minimal Stud Earrings", desc: "Everyday stud earrings, lightweight and hypoallergenic.", price: 349, image: productImage(["earrings", "studs"], 5004) },
        { name: "Canvas Cap", desc: "Adjustable cotton canvas cap, curved brim, everyday casual wear.", price: 399, image: productImage(["cap", "hat"], 5005) },
        { name: "Layered Chain Necklace", desc: "Multi-layer chain necklace with a delicate pendant.", price: 449, image: productImage(["necklace", "chain"], 5006) },
        { name: "Printed Silk Scarf", desc: "Lightweight printed scarf, versatile styling accessory.", price: 599, image: productImage(["scarf", "silk"], 5007) },
        { name: "Beaded Hair Clip Set", desc: "Set of beaded hair clips, assorted everyday designs.", price: 249, image: productImage(["hairclip", "beaded"], 5008) },
        { name: "Leather Card Wallet", desc: "Slim faux-leather card wallet with multiple slots.", price: 549, image: productImage(["wallet", "leather"], 5009) },
        { name: "Statement Hoop Earrings", desc: "Bold hoop earrings in a lightweight metal finish.", price: 399, image: productImage(["earrings", "hoops"], 5010) },
        { name: "Woven Friendship Bracelet Set", desc: "Set of three woven bracelets, adjustable fit.", price: 249, image: productImage(["bracelet", "woven"], 5011) },
    ],
};

export { categoriesData, productsByCategorySlug };


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
