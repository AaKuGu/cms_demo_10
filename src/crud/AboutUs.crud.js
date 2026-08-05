import dbConnect from "@/lib/dbConnect";
import AboutUs from "@/models/AboutUs.model";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function createAboutUs(data) {
    await dbConnect();
    const created = await AboutUs.create(data);
    logConsole("crud/AboutUs : createAboutUs : created ", created)
    return serialize(created);
}

export async function getAboutUsById(aboutUsId) {
    await dbConnect();
    const aboutUs = await AboutUs.findById(aboutUsId);
    logConsole("crud/AboutUs : getAboutUsById : aboutUs ", aboutUs)
    return serialize(aboutUs);
}

export async function getAboutUs(filter) {
    await dbConnect();
    const aboutUs = await AboutUs.findOne(filter);
    logConsole("crud/AboutUs : getAboutUs : aboutUs ", aboutUs)
    return serialize(aboutUs);
}

export async function getAboutUsList(filter = {}, populate = []) {
    await dbConnect();
    const aboutUsList = await AboutUs.find(filter)
        .populate(populate)
        .sort({ createdAt: -1 });

    logConsole("crud/AboutUs : getAboutUsList : aboutUsList ", aboutUsList)

    return serialize(aboutUsList);
}

export async function updateAboutUsById(id, data) {
    await dbConnect();
    const updated = await AboutUs.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/AboutUs : updateAboutUsById : updated ", updated)
    return serialize(updated);
}

export async function upsertAboutUsByShopId(shopId, data) {
    await dbConnect();
    const updated = await AboutUs.findOneAndUpdate(
        { shopId },
        { $set: data },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    logConsole("crud/AboutUs : upsertAboutUsByShopId : updated ", updated)
    return serialize(updated);
}

export async function deleteAboutUsById(id) {
    await dbConnect();
    const deleted = await AboutUs.findByIdAndDelete(id);
    logConsole("crud/AboutUs : deleteAboutUsById : deleted ", deleted)
    return serialize(deleted);
}