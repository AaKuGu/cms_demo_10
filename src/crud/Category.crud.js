import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category.model";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function createCategory(data) {
    await dbConnect();
    const created = await Category.create(data);
    logConsole("crud/Category : createCategory : created ", created);
    return serialize(created);
}

export async function getCategoryById(categoryId) {
    await dbConnect();
    const category = await Category.findById(categoryId);
    logConsole("crud/Category : getCategoryById : category ", category);
    return serialize(category);
}

export async function getCategory(filter) {
    await dbConnect();
    const category = await Category.findOne(filter);
    logConsole("crud/Category : getCategory : category ", category);
    return serialize(category);
}

export async function getCategoryList(filter = {}) {
    await dbConnect();
    const categories = await Category.find(filter).sort({ createdAt: -1 });
    logConsole("crud/Category : getCategoryList : categories ", categories);
    return serialize(categories);
}

export async function updateCategoryById(id, data) {
    await dbConnect();
    const updated = await Category.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/Category : updateCategoryById : updated ", updated);
    return serialize(updated);
}

export async function deleteCategoryById(id) {
    await dbConnect();
    const deleted = await Category.findByIdAndDelete(id);
    logConsole("crud/Category : deleteCategoryById : deleted ", deleted);
    return serialize(deleted);
}
