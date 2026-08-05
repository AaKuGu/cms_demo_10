// SSRCalls/PublicStore.ssrCalls.js
import { getShop, getShopBySlug } from "@/crud/Shop.crud";
import { getCategoryList } from "@/crud/Category.crud";
import { getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { throwError } from "@/lib/throwError";
import { getSocials } from "@/crud/Socials.crud";
import { getContact } from "@/crud/Contact.crud";
import { getAboutUs } from "@/crud/AboutUs.crud";

export async function fetchPublicStoreBySlug({ shopSlug } = {}) {
    return tryCatchAction(async () => {
        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : shopSlug ", shopSlug);

        if (!shopSlug) {
            throwError("Store not found");
        }

        const shop = await getShop({ slug: shopSlug });
        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : shop ", shop);

        if (!shop) {
            throwError("Store not found");
        }

        const [categories, products, socials, contact, aboutUs] = await Promise.all([
            getCategoryList({ shopId: shop._id }),
            getProductList({ shopId: shop._id }),
            getSocials({ shopId: shop._id }),
            getContact({ shopId: shop._id }),
            getAboutUs({ shopId: shop._id }),
        ]);

        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : categories ", categories);
        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : products ", products);
        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : socials ", socials);
        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : contact ", contact);

        return serialize({ shop, categories, products, socials, contact, aboutUs });
    });
}