import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product.model";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
// import Category from "@/models/Category.model";

export async function createProduct(data) {
    await dbConnect();
    const created = await Product.create(data);
    logConsole("crud/Product : createProduct : created ", created)
    return serialize(created);
}

export async function getProductById(productId) {
    await dbConnect();
    const product = await Product.findById(productId);
    logConsole("crud/Product : getProductById : product ", product)
    return serialize(product);
}

export async function getProduct(filter) {
    await dbConnect();
    const product = await Product.findOne(filter);
    logConsole("crud/Product : getProduct : product ", product)
    return serialize(product);
}

export async function getProductList(filter = {}, populate = []) {
    await dbConnect();
    const products = await Product.find(filter)
        .populate(populate)
        .sort({ createdAt: -1 });

    logConsole("crud/Product : getProductList : products ", products)

    return serialize(products);
}

export async function updateProductById(id, data) {
    await dbConnect();
    const updated = await Product.findByIdAndUpdate(id, data, { new: true });
    logConsole("crud/Product : updateProductById : updated ", updated)
    return serialize(updated);
}

export async function deleteProductById(id) {
    await dbConnect();
    const deleted = await Product.findByIdAndDelete(id);
    logConsole("crud/Product : deleteProductById : deleted ", deleted)
    return serialize(deleted);
}
