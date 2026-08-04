"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import { updateContactAction } from "@/actions/Contact.actions";
import { errorToast, successToast } from "@/lib/toast";

export default function ContactContainer({ shopId, contact }) {
    const [email, setEmail] = useState(contact?.email || "");
    const [contactNumbers, setContactNumbers] = useState(
        contact?.contactNumbers?.length ? contact.contactNumbers : [{ type: "phone", number: "" }]
    );
    const [workingHours, setWorkingHours] = useState(contact?.workingHours || "");
    const [googleMapLink, setGoogleMapLink] = useState(contact?.googleMapLink || "");
    const [isVisible, setIsVisible] = useState(contact?.isVisible ?? true);
    const [isPending, setIsPending] = useState(false);

    const handleAddNumber = () => {
        if (contactNumbers.length >= 2) return;
        setContactNumbers((prev) => [...prev, { type: "phone", number: "" }]);
    };

    const handleRemoveNumber = (index) => {
        setContactNumbers((prev) => prev.filter((_, i) => i !== index));
    };

    const handleNumberChange = (index, field) => (e) => {
        const value = e.target.value;
        setContactNumbers((prev) =>
            prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.set("email", email);
        formData.set("contactNumbers", JSON.stringify(contactNumbers));
        formData.set("workingHours", workingHours);
        formData.set("googleMapLink", googleMapLink);
        formData.set("isVisible", String(isVisible));

        const { data, error } = await updateContactAction(formData, shopId);

        setIsPending(false);

        if (error) {
            errorToast(error);
            return;
        }

        successToast("Contact info updated successfully!");
    };

    return (
        <ContactForm
            email={email}
            onEmailChange={setEmail}
            contactNumbers={contactNumbers}
            onNumberChange={handleNumberChange}
            onAddNumber={handleAddNumber}
            onRemoveNumber={handleRemoveNumber}
            workingHours={workingHours}
            onWorkingHoursChange={setWorkingHours}
            googleMapLink={googleMapLink}
            onGoogleMapLinkChange={setGoogleMapLink}
            isVisible={isVisible}
            onVisibleChange={setIsVisible}
            onSubmit={handleSubmit}
            isPending={isPending}
        />
    );
}