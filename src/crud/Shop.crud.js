import dbConnect from "@/lib/dbConnect";
import Shop from "@/models/Shop.model";
import { serialize } from "@/lib/serialize";

export async function createShop(data) {
    await dbConnect();
    const created = await Shop.create(data);
    return serialize(created);
}

export async function getShopById(shopId) {
    await dbConnect();
    const shop = await Shop.findById(shopId);
    return serialize(shop);
}

// export async function getShop(filter) {
//     await dbConnect();
//     const shop = await Shop.findOne(filter);
//     return serialize(shop);
// }

export async function getShop(filter, select) {
    await dbConnect();
    const query = Shop.findOne(filter);
    if (select) query.select(select);
    const shop = await query;
    return serialize(shop);
}
 
export async function getShopList(filter = {}) {
    await dbConnect();
    const shops = await Shop.find(filter).sort({ createdAt: -1 });
    return serialize(shops);
}

export async function updateShopById(id, data) {
    await dbConnect();
    const updated = await Shop.findByIdAndUpdate(id, data, { new: true });
    return serialize(updated);
}

export async function deleteShopById(id) {
    await dbConnect();
    const deleted = await Shop.findByIdAndDelete(id);
    return serialize(deleted);
}