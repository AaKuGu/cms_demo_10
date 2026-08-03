"use client";

import { useState, useRef } from "react";

export default function ImageUpload({ value, onChange, label = "Product Image" }) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be under 5MB.");
            return;
        }

        setError("");
        setIsUploading(true);

        try {
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
            onChange(data.secure_url);
        } catch (err) {
            setError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        onChange("");
        setError("");
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">{label}</label>

            {value ? (
                <div className="relative w-fit">
                    <img
                        src={value}
                        alt="Product"
                        className="h-32 w-32 rounded-lg border border-slate-200 object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white shadow hover:bg-gray-700"
                        aria-label="Remove image"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <label
                    className={`flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-slate-400 hover:text-slate-500 ${isUploading ? "pointer-events-none opacity-60" : ""
                        }`}
                >
                    {isUploading ? (
                        <>
                            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <span className="text-xs">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-xs">Upload image</span>
                        </>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isUploading}
                    />
                </label>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}