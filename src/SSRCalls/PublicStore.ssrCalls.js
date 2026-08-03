// SSRCalls/PublicStore.ssrCalls.js
import { getShop, getShopBySlug } from "@/crud/Shop.crud";
import { getCategoryList } from "@/crud/Category.crud";
import { getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import { tryCatchAction } from "@/lib/tryCatchAction";
import { throwError } from "@/lib/throwError";

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

        const [categories, products] = await Promise.all([
            getCategoryList({ shopId: shop._id }),
            getProductList({ shopId: shop._id }),
        ]);

        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : categories ", categories);
        logConsole("ssrcalls : publicStore : fetchPublicStoreBySlug : products ", products);

        return serialize({ shop, categories, products });
    });
}