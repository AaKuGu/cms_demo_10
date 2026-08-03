import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getShopById } from "@/crud/Shop.crud";
import { getCategoryList } from "@/crud/Category.crud";
import { getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function fetchStorePreviewByShopId({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : appUserId ", appUserId);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : shopId ", shopId);

        const [shop, categories, products] = await Promise.all([
            getShopById(shopId),
            getCategoryList({ shopId }),
            getProductList({ shopId }),
        ]);

        logConsole("ssrcalls : store : fetchStorePreviewByShopId : shop ", shop);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : categories ", categories);
        logConsole("ssrcalls : store : fetchStorePreviewByShopId : products ", products);

        return serialize({ shop, categories, products });
    });
}