// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { removeCategoryAction, updateCategoryAction } from "@/actions/Category.actions";
// import { errorToast, successToast } from "@/lib/toast";
// import { logConsole } from "@/lib/console/console";
// import DeleteCategoryButton from "./DeleteCategoryButton";

// const defaultValues = {
//     name: "",
//     slug: "",
//     description: "",
// };

// export default function CategoryList({ categories = [], shopId }) {
//     const router = useRouter();
//     const [editingId, setEditingId] = useState(null);
//     const [formValues, setFormValues] = useState({ ...defaultValues });
//     const [isPendingId, setIsPendingId] = useState(null);

//     const startEdit = (category) => {
//         logConsole("category list : startEdit : category ", category);
//         setEditingId(category._id);
//         setFormValues({
//             name: category.name || "",
//             slug: category.slug || "",
//             description: category.description || "",
//         });
//     };

//     const cancelEdit = () => {
//         setEditingId(null);
//         setFormValues({ ...defaultValues });
//         setIsPendingId(null);
//     };

//     const updateField = (field) => (e) => {
//         setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
//     };

//     const handleDelete = async (categoryId) => {
//         logConsole("category list : handleDelete : categoryId ", categoryId);
//         setIsPendingId(categoryId);

//         const { data, error } = await removeCategoryAction(categoryId, shopId);
//         logConsole("category list : handleDelete result ", { data, error });

//         setIsPendingId(null);

//         if (error) {
//             errorToast(error);
//             return;
//         }

//         successToast("Category removed successfully!");
//         router.refresh();
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         if (!editingId) return;

//         setIsPendingId(editingId);

//         const formData = new FormData();
//         formData.set("categoryId", editingId);
//         formData.set("shopId", shopId);
//         formData.set("name", formValues.name);
//         formData.set("slug", formValues.slug);
//         formData.set("description", formValues.description || "");

//         logConsole("category list : handleUpdate : formData ", Object.fromEntries(formData.entries()));

//         const { data, error } = await updateCategoryAction(formData);
//         logConsole("category list : handleUpdate result ", { data, error });

//         setIsPendingId(null);

//         if (error) {
//             errorToast(error);
//             return;
//         }

//         successToast("Category updated successfully!");
//         cancelEdit();
//         router.refresh();
//     };

//     return (
//         <div className="space-y-3">
//             {categories.map((category) => {
//                 const isEditing = editingId === category._id;
//                 const isDeleting = isPendingId === category._id;

//                 return (
//                     <div
//                         key={category._id}
//                         className="rounded-xl border border-slate-200 bg-slate-50 p-4"
//                     >
//                         {isEditing ? (
//                             <form onSubmit={handleUpdate} className="space-y-4">
//                                 <div className="grid gap-4 md:grid-cols-3">
//                                     <div>
//                                         <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                                             Category name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={formValues.name}
//                                             onChange={updateField("name")}
//                                             className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                             required
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                                             Slug
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={formValues.slug}
//                                             onChange={updateField("slug")}
//                                             className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                             required
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                                             Description
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={formValues.description}
//                                             onChange={updateField("description")}
//                                             className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-end gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={cancelEdit}
//                                         className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-white"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         disabled={isPendingId === category._id}
//                                         className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-60"
//                                     >
//                                         {isPendingId === category._id ? "Updating..." : "Update Category"}
//                                     </button>
//                                 </div>
//                             </form>
//                         ) : (
//                             <div className="flex items-center justify-between gap-4">
//                                 <div>
//                                     <p className="font-medium text-slate-900">{category.name}</p>
//                                     <p className="text-sm text-slate-500">/{category.slug}</p>
//                                     {category.description ? (
//                                         <p className="mt-1 text-sm text-slate-500">{category.description}</p>
//                                     ) : null}
//                                 </div>

//                                 <div className="flex items-center gap-3">
//                                     <button
//                                         type="button"
//                                         onClick={() => startEdit(category)}
//                                         className="text-sm font-medium text-slate-700 hover:text-slate-900"
//                                     >
//                                         Update
//                                     </button>
//                                     <DeleteCategoryButton
//                                         categoryId={category._id}
//                                         shopId={shopId}
//                                         onDelete={handleDelete}
//                                         isPending={isDeleting}
//                                     />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeCategoryAction, updateCategoryAction } from "@/actions/Category.actions";
import { errorToast, successToast } from "@/lib/toast";
import { logConsole } from "@/lib/console/console";
import DeleteCategoryButton from "./DeleteCategoryButton";
import ImageUpload from "@/components/ImageUpload";

const defaultValues = {
    name: "",
    slug: "",
    description: "",
    image: "",
};

export default function CategoryList({ categories = [], shopId }) {
    const router = useRouter();
    const [editingId, setEditingId] = useState(null);
    const [formValues, setFormValues] = useState({ ...defaultValues });
    const [isPendingId, setIsPendingId] = useState(null);

    const startEdit = (category) => {
        logConsole("category list : startEdit : category ", category);
        setEditingId(category._id);
        setFormValues({
            name: category.name || "",
            slug: category.slug || "",
            description: category.description || "",
            image: category.image || "", // older categories won't have this field — default to ""
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormValues({ ...defaultValues });
        setIsPendingId(null);
    };

    const updateField = (field) => (e) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleDelete = async (categoryId) => {
        logConsole("category list : handleDelete : categoryId ", categoryId);
        setIsPendingId(categoryId);

        const { data, error } = await removeCategoryAction(categoryId, shopId);
        logConsole("category list : handleDelete result ", { data, error });

        setIsPendingId(null);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Category removed successfully!");
        router.refresh();
    };

    const handleUpdate = async (e) => {

        e.preventDefault();
        if (!editingId) return;

        setIsPendingId(editingId);

        const formData = new FormData();
        formData.set("categoryId", editingId);
        formData.set("shopId", shopId);
        formData.set("name", formValues.name);
        formData.set("slug", formValues.slug);
        formData.set("description", formValues.description || "");
        formData.set("image", formValues.image || "");

        logConsole("category list : handleUpdate : formData ", Object.fromEntries(formData.entries()));

        const { data, error } = await updateCategoryAction(formData);
        logConsole("category list : handleUpdate result ", { data, error });

        setIsPendingId(null);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Category updated successfully!");
        cancelEdit();
        router.refresh();
    };

    return (
        <div className="space-y-3">
            {categories.map((category) => {
                const isEditing = editingId === category._id;
                const isDeleting = isPendingId === category._id;

                return (
                    <div
                        key={category._id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <ImageUpload
                                    label="Category Image"
                                    value={formValues.image}
                                    onChange={(url) => updateField("image")({ target: { value: url } })}
                                />

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Category name
                                        </label>
                                        <input
                                            type="text"
                                            value={formValues.name}
                                            onChange={updateField("name")}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={formValues.slug}
                                            onChange={updateField("slug")}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            value={formValues.description}
                                            onChange={updateField("description")}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPendingId === category._id}
                                        className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-60"
                                    >
                                        {isPendingId === category._id ? "Updating..." : "Update Category"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    {category.image ? (
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 text-[10px] text-slate-400">
                                            No image
                                        </div>
                                    )}

                                    <div>
                                        <p className="font-medium text-slate-900">{category.name}</p>
                                        <p className="text-sm text-slate-500">/{category.slug}</p>
                                        {category.description ? (
                                            <p className="mt-1 text-sm text-slate-500">{category.description}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(category)}
                                        className="text-sm font-medium text-slate-700 hover:text-slate-900"
                                    >
                                        Update
                                    </button>
                                    <DeleteCategoryButton
                                        categoryId={category._id}
                                        shopId={shopId}
                                        onDelete={handleDelete}
                                        isPending={isDeleting}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}