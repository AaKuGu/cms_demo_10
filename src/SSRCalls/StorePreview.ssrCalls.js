import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getShopById } from "@/crud/Shop.crud";
import { getCategoryList } from "@/crud/Category.crud";
import { getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import { getSocials } from "@/crud/Socials.crud";
import { getContact } from "@/crud/Contact.crud";
import { getAboutUs } from "@/crud/AboutUs.crud";

export async function fetchStorePreviewByShopId({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : appUserId ", appUserId);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : shopId ", shopId);

        const [shop, categories, products, socials, contactUs, aboutUs] = await Promise.all([
            getShopById(shopId),
            getCategoryList({ shopId }),
            getProductList({ shopId }),
            getSocials({ shopId }),
            getContact({ shopId }),
            getAboutUs({ shopId }),
        ]);

        logConsole("ssrcalls : store : fetchStorePreviewByShopId : shop ", shop);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : categories ", categories);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : products ", products);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : socials ", socials);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : contactUs ", contactUs);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : aboutUs ", aboutUs);

        return serialize({ shop, categories, products, socials, contactUs, aboutUs });
    });
}