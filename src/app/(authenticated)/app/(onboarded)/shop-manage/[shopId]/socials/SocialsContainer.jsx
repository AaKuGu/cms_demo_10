"use client";

import { useState } from "react";
import SocialsForm from "./SocialsForm";
import { updateSocialsAction } from "@/actions/Socials.actions";
import { errorToast, successToast } from "@/lib/toast";

export default function SocialsContainer({ shopId, socials }) {
    const [links, setLinks] = useState(socials?.links?.length ? socials.links : [{ platform: "instagram", url: "" }]);
    const [isVisible, setIsVisible] = useState(socials?.isVisible ?? true);
    const [isPending, setIsPending] = useState(false);

    const handleAddLink = () => {
        setLinks((prev) => [...prev, { platform: "instagram", url: "" }]);
    };

    const handleRemoveLink = (index) => {
        setLinks((prev) => prev.filter((_, i) => i !== index));
    };

    const handleLinkChange = (index, field) => (e) => {
        const value = e.target.value;
        setLinks((prev) =>
            prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("links", JSON.stringify(links));
        formData.set("isVisible", String(isVisible));

        const { data, error } = await updateSocialsAction(formData, shopId);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Social links updated successfully!");
    };

    return (
        <SocialsForm
            links={links}
            isVisible={isVisible}
            onVisibleChange={setIsVisible}
            onLinkChange={handleLinkChange}
            onAddLink={handleAddLink}
            onRemoveLink={handleRemoveLink}
            onSubmit={handleSubmit}
            isPending={isPending}
        />
    );
}