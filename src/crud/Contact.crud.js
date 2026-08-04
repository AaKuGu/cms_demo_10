import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact.model";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function createContact(data) {
    await dbConnect();
    const created = await Contact.create(data);
    logConsole("crud/Contact : createContact : created ", created)
    return serialize(created);
}

export async function getContactById(contactId) {
    await dbConnect();
    const contact = await Contact.findById(contactId);
    logConsole("crud/Contact : getContactById : contact ", contact)
    return serialize(contact);
}

export async function getContact(filter) {
    await dbConnect();
    const contact = await Contact.findOne(filter);
    logConsole("crud/Contact : getContact : contact ", contact)
    return serialize(contact);
}

export async function getContactList(filter = {}, populate = []) {
    await dbConnect();
    const contactList = await Contact.find(filter)
        .populate(populate)
        .sort({ createdAt: -1 });

    logConsole("crud/Contact : getContactList : contactList ", contactList)

    return serialize(contactList);
}

export async function updateContactById(id, data) {
    await dbConnect();
    const updated = await Contact.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/Contact : updateContactById : updated ", updated)
    return serialize(updated);
}

export async function upsertContactByShopId(shopId, data) {
    await dbConnect();
    const updated = await Contact.findOneAndUpdate(
        { shopId },
        { $set: data },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    logConsole("crud/Contact : upsertContactByShopId : updated ", updated)
    return serialize(updated);
}

export async function deleteContactById(id) {
    await dbConnect();
    const deleted = await Contact.findByIdAndDelete(id);
    logConsole("crud/Contact : deleteContactById : deleted ", deleted)
    return serialize(deleted);
}