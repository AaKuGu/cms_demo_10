import { logConsole } from "@/lib/console/console";
import dbConnect from "@/lib/dbConnect";
import AppUser from "@/models/AppUsers.model";

export async function createAppUser(data) {
    logConsole("crud : createAppUser : ", data);
    await dbConnect();
    return AppUser.create(data);
}

export async function getAppUserById(appUserId) {
    await dbConnect();
    return AppUser.findById(appUserId);
}

export async function getAppUser(filter) {
    await dbConnect();
    return AppUser.findOne(filter);
}

export async function getAppUserList(filter = {}) {
    await dbConnect();
    return AppUser.find(filter).sort({ createdAt: -1 });
}

export async function updateAppUserById(id, data) {
    await dbConnect();
    return AppUser.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteAppUserById(id) {
    await dbConnect();
    return AppUser.findByIdAndDelete(id);
}