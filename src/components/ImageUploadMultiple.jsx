"use client";

import { useRef, useState } from "react";

const MAX_IMAGES = 4;

export default function ImageUploadMultiple({ value = [], onChange, label = "Product Images" }) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const remainingSlots = MAX_IMAGES - value.length;

    const handleFilesSelect = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        if (files.length > remainingSlots) {
            setError(`You can add ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"} (max ${MAX_IMAGES}).`);
        }

        const filesToUpload = files.slice(0, remainingSlots);

        const invalidFile = filesToUpload.find((f) => !f.type.startsWith("image/"));
        if (invalidFile) {
            setError("Please select image files only.");
            if (inputRef.current) inputRef.current.value = "";
            return;
        }

        const oversizedFile = filesToUpload.find((f) => f.size > 5 * 1024 * 1024);
        if (oversizedFile) {
            setError("Each image must be under 5MB.");
            if (inputRef.current) inputRef.current.value = "";
            return;
        }

        setError("");
        setIsUploading(true);

        try {
            const uploadedUrls = await Promise.all(
                filesToUpload.map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append(
                        "upload_preset",
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    );

                    const res = await fetch(
                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                        { method: "POST", body: formData }
                    );

                    if (!res.ok) throw new Error("Upload failed");
                    const data = await res.json();
                    return data.secure_url;
                })
            );

            onChange([...value, ...uploadedUrls]);
        } catch (err) {
            setError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleRemove = (indexToRemove) => {
        onChange(value.filter((_, i) => i !== indexToRemove));
        setError("");
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
                {label} <span className="font-normal text-slate-400">({value.length}/{MAX_IMAGES})</span>
            </label>

            <div className="flex flex-wrap gap-3">
                {value.map((url, index) => (
                    <div key={url + index} className="relative h-24 w-24">
                        <img
                            src={url}
                            alt={`Product ${index + 1}`}
                            className="h-24 w-24 rounded-lg border border-slate-200 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white shadow hover:bg-gray-700"
                            aria-label="Remove image"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}

                {remainingSlots > 0 && (
                    <label
                        className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-slate-400 hover:text-slate-500 ${isUploading ? "pointer-events-none opacity-60" : ""
                            }`}
                    >
                        {isUploading ? (
                            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        ) : (
                            <>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-[10px]">Add image</span>
                            </>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFilesSelect}
                            className="hidden"
                            disabled={isUploading}
                        />
                    </label>
                )}
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}