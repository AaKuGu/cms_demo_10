import dbConnect from "@/lib/dbConnect";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import ShopTeamMember from "@/models/TeamMember";

export async function createTeamMember(data) {
    await dbConnect();
    const created = await ShopTeamMember.create(data);
    logConsole("crud/ShopTeamMember : createTeamMember : created ", created)
    return serialize(created);
}

export async function getTeamMemberById(teamMemberId) {
    await dbConnect();
    const teamMember = await ShopTeamMember.findById(teamMemberId);
    logConsole("crud/ShopTeamMember : getTeamMemberById : teamMember ", teamMember)
    return serialize(teamMember);
}

export async function getTeamMember(filter) {
    await dbConnect();
    const teamMember = await ShopTeamMember.findOne(filter);
    logConsole("crud/ShopTeamMember : getTeamMember : teamMember ", teamMember)
    return serialize(teamMember);
}

export async function getTeamMemberList(filter = {}, populate = [], sort = { createdAt: -1 }) {
    await dbConnect();
    const teamMembers = await ShopTeamMember.find(filter)
        .populate(populate)
        .sort(sort);

    logConsole("crud/ShopTeamMember : getTeamMemberList : teamMembers ", teamMembers)
    return serialize(teamMembers);
}

export async function updateTeamMemberById(id, data) {
    await dbConnect();
    const updated = await ShopTeamMember.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/ShopTeamMember : updateTeamMemberById : updated ", updated)
    return serialize(updated);
}

export async function deleteTeamMemberById(id) {
    await dbConnect();
    const deleted = await ShopTeamMember.findByIdAndDelete(id);
    logConsole("crud/ShopTeamMember : deleteTeamMemberById : deleted ", deleted)
    return serialize(deleted);
}