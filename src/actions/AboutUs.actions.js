// "use server";

// import { revalidatePath } from "next/cache";
// import { upsertAboutUsByShopId } from "@/crud/AboutUs.crud";
// import { getShopById } from "@/crud/Shop.crud";
// import { afterOnboardingActionGuard } from "@/lib/actions/action";
// import { logConsole } from "@/lib/console/console";
// import { serialize } from "@/lib/serialize";
// import { throwError } from "@/lib/throwError";
// import { validateInputs } from "@/lib/validateInputs";
// import { createAboutUsValidator } from "@/validators/AboutUs.validators";

// export async function updateAboutUsAction(formData, shopId) {
//     return afterOnboardingActionGuard(async ({ appUserId, userIdFromAuthLibrary }) => {
//         logConsole("actions/aboutUs : updateAboutUsAction : formData ", formData);
//         logConsole("actions/aboutUs : updateAboutUsAction : shopId ", shopId);

//         if (!shopId) {
//             throwError("Shop ID is required.");
//         }

//         const rawValues = {
//             shopId,
//             story: JSON.parse(formData.get("story") || "{}"),
//             visionMission: JSON.parse(formData.get("visionMission") || "{}"),
//             foundersMessage: JSON.parse(formData.get("foundersMessage") || "{}"),
//             milestones: JSON.parse(formData.get("milestones") || "{}"),
//             team: JSON.parse(formData.get("team") || "{}"),
//             certifications: JSON.parse(formData.get("certifications") || "{}"),
//             values: JSON.parse(formData.get("values") || "{}"),
//             storeGallery: JSON.parse(formData.get("storeGallery") || "{}"),
//             ctaBlock: JSON.parse(formData.get("ctaBlock") || "{}"),
//             isVisible: formData.get("isVisible") === "true",
//         };

//         logConsole("actions/aboutUs : updateAboutUsAction : rawValues ", rawValues);

//         const validated = validateInputs(createAboutUsValidator, rawValues);
//         logConsole("actions/aboutUs : updateAboutUsAction : validated ", validated);

//         if (!validated.success) {
//             throwError(validated.error);
//         }

//         const shop = await getShopById(shopId);
//         logConsole("actions/aboutUs : updateAboutUsAction : shop ", shop);

//         if (!shop) {
//             throwError("Selected shop not found.");
//         }

//         if (shop.appUserId?.toString() !== appUserId.toString()) {
//             throwError("You are not authorized to update this shop's About Us page.");
//         }

//         const updated = await upsertAboutUsByShopId(shopId, {
//             ...validated.data,
//             appUserId,
//             userIdFromAuthLibrary,
//         });
//         logConsole("actions/aboutUs : updateAboutUsAction : updated ", updated);

//         if (!updated) {
//             throwError("Failed to update About Us page. Please try again.");
//         }

//         revalidatePath(`/shop-manage/${shopId}/about-us`);

//         return serialize(updated);
//     });
// }


"use server";

import { revalidatePath } from "next/cache";
import { upsertAboutUsByShopId } from "@/crud/AboutUs.crud";
import { getShopById } from "@/crud/Shop.crud";
import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { logConsole } from "@/lib/console/console";
import { throwError } from "@/lib/throwError";
import { validateInputs } from "@/lib/validateInputs";
import { createAboutUsValidator } from "@/validators/AboutUs.validators";
import { serialize } from "@/lib/serialize";

// src/actions/AboutUs.actions.js

const parseJson = (val) => (val ? JSON.parse(val) : {});

export async function updateAboutUsAction(formData, shopId) {
  return afterOnboardingActionGuard(async ({ appUserId, userIdFromAuthLibrary }) => {
    if (!shopId) {
      throwError("Shop ID is required.");
    }

    const rawValues = {
      shopId,
      story: parseJson(formData.get("story")),
      visionMission: parseJson(formData.get("visionMission")),
      foundersMessage: parseJson(formData.get("foundersMessage")),
      milestones: parseJson(formData.get("milestones")),
      team: parseJson(formData.get("team")),
      isVisible: formData.get("isVisible") === "true",
    };

    const validated = validateInputs(createAboutUsValidator, rawValues);

    if (!validated.success) {
      throwError(validated.error);
    }

    // Standardize validated output data
    const cleanData = { ...validated.data };

    // Ensure array paths are strictly Javascript arrays
    if (cleanData.team && cleanData.team.members) {
      cleanData.team.members = Array.isArray(cleanData.team.members)
        ? cleanData.team.members
        : [cleanData.team.members];
    }

    if (cleanData.milestones && cleanData.milestones.stats) {
      cleanData.milestones.stats = Array.isArray(cleanData.milestones.stats)
        ? cleanData.milestones.stats
        : [cleanData.milestones.stats];
    }

    const shop = await getShopById(shopId);
    if (!shop) {
      throwError("Selected shop not found.");
    }

    if (shop.appUserId?.toString() !== appUserId.toString()) {
      throwError("You are not authorized to update this shop's About Us page.");
    }

    const updated = await upsertAboutUsByShopId(shopId, {
      ...cleanData,
      appUserId,
      userIdFromAuthLibrary,
    });

    if (!updated) {
      throwError("Failed to update About Us page. Please try again.");
    }

    revalidatePath(`/shop-manage/${shopId}/about-us`);

    return serialize(updated);
  });
}