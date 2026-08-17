import dbConnect from "@/lib/dbConnect";
import TeamMember from "@/models/TeamMember.model";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function createTeamMember(data) {
    await dbConnect();
    const created = await TeamMember.create(data);
    logConsole("crud/TeamMember : createTeamMember : created ", created);
    return serialize(created);
}

export async function getTeamMemberById(teamMemberId) {
    await dbConnect();
    const teamMember = await TeamMember.findById(teamMemberId);
    logConsole("crud/TeamMember : getTeamMemberById : teamMember ", teamMember);
    return serialize(teamMember);
}

export async function getTeamMember(filter) {
    await dbConnect();
    const teamMember = await TeamMember.findOne(filter);
    logConsole("crud/TeamMember : getTeamMember : teamMember ", teamMember);
    return serialize(teamMember);
}

export async function getTeamMemberList(filter = {}) {
    logConsole("crud/TeamMember : getTeamMemberList : filter : ", filter);
    await dbConnect();
    const teamMembers = await TeamMember.find(filter).sort({ createdAt: -1 });
    logConsole("crud/TeamMember : getTeamMemberList : teamMembers ", teamMembers);
    return serialize(teamMembers);
}

export async function updateTeamMemberById(id, data) {
    await dbConnect();
    const updated = await TeamMember.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/TeamMember : updateTeamMemberById : updated ", updated);
    return serialize(updated);
}

export async function deleteTeamMemberById(id) {
    await dbConnect();
    const deleted = await TeamMember.findByIdAndDelete(id);
    logConsole("crud/TeamMember : deleteTeamMemberById : deleted ", deleted);
    return serialize(deleted);
}