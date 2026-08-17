import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getShopList, getShop } from "@/crud/Shop.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function fetchAllShops() {
    return afterOnboardingActionGuard(async ({ appUserId }) => {

        logConsole("ssrcalls : shop : fetchAllShops : appUserId ", appUserId)

        const shops = await getShopList({ ownerId: appUserId });

        logConsole("ssrcalls : shop : fetchAllShops : shops ", shops)

        return serialize(shops);
    });
}

import { getShopById } from "@/crud/Shop.crud";
import TeamMember from "@/models/TeamMember";

export async function fetchAShop({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {

        logConsole("ssrcalls : shop : fetchAShop : appUserId ", appUserId)
        logConsole("ssrcalls : shop : fetchAShop : shopId ", shopId)

        const shop = await getShopById(shopId);

        logConsole("ssrcalls : shop : fetchAShop : shop ", shop)

        return serialize(shop);
    });
}



export async function fetchProductParentSettings({ shopId }) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : shop : fetchAShop : appUserId ", appUserId);
        logConsole("ssrcalls : shop : fetchAShop : shopId ", shopId);

        const productParentSettings = await getShop({ _id: shopId }, "settings.products");

        logConsole("ssrcalls : shop : fetchAShop : productParentSettings ", productParentSettings);
        return serialize(productParentSettings);
    });
}

export async function fetchBusinessIManageForOthers() {
    return afterOnboardingActionGuard(async ({ appUser, appUserId }) => {
        logConsole("ssrcalls : shop : fetchAShop : appUserId ", appUserId);

        const email = appUser?.email;

        logConsole("ssrcalls : shop : fetchAShop : email ", email);

        // const productParentSettings = await getShop({ _id: shopId }, "settings.products");
        // const businesses = await

        const businessesToManage = await TeamMember.find({ email }).populate("ownerId", "name phone");


        logConsole("ssrcalls : shop : fetchAShop : businessesToManage ", businessesToManage);


        return serialize(businessesToManage);
    });
}