import dbConnect from "@/lib/dbConnect";
import Socials from "@/models/Socials.model";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function createSocials(data) {
    await dbConnect();
    const created = await Socials.create(data);
    logConsole("crud/Socials : createSocials : created ", created)
    return serialize(created);
}

export async function getSocialsById(socialsId) {
    await dbConnect();
    const socials = await Socials.findById(socialsId);
    logConsole("crud/Socials : getSocialsById : socials ", socials)
    return serialize(socials);
}

export async function getSocials(filter) {
    await dbConnect();
    const socials = await Socials.findOne(filter);
    logConsole("crud/Socials : getSocials : socials ", socials)
    return serialize(socials);
}

export async function getSocialsList(filter = {}, populate = []) {
    await dbConnect();
    const socialsList = await Socials.find(filter)
        .populate(populate)
        .sort({ createdAt: -1 });

    logConsole("crud/Socials : getSocialsList : socialsList ", socialsList)

    return serialize(socialsList);
}

export async function updateSocialsById(id, data) {
    await dbConnect();
    const updated = await Socials.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/Socials : updateSocialsById : updated ", updated)
    return serialize(updated);
}

export async function deleteSocialsById(id) {
    await dbConnect();
    const deleted = await Socials.findByIdAndDelete(id);
    logConsole("crud/Socials : deleteSocialsById : deleted ", deleted)
    return serialize(deleted);
}
// add this to crud/Socials.crud.js
export async function upsertSocialsByShopId(shopId, data) {
    await dbConnect();
    const updated = await Socials.findOneAndUpdate(
        { shopId },
        { $set: data },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    logConsole("crud/Socials : upsertSocialsByShopId : updated ", updated)
    return serialize(updated);
}