import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getProduct, getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import { getCategoryList } from "@/crud/Category.crud";

export async function fetchDataForProductListing({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : product : fetchAllProducts : appUserId ", appUserId)
        logConsole("ssrcalls : product : fetchAllProducts : shopId ", shopId)

        const data = await getProductList({ appUserId, shopId }, ['categoryId']);
        logConsole("ssrcalls : product : fetchAllProducts : data ", data)

        return serialize(data);
    });
}

export async function fetchAProduct({ productId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : product : fetchAProduct : appUserId ", appUserId)
        logConsole("ssrcalls : product : fetchAProduct : productId ", productId)

        const product = await getProduct({ _id: productId, appUserId });
        logConsole("ssrcalls : product : fetchAProduct : product ", product)

        return serialize(product);
    });
}

export async function fetchProductAndCategoresForEditPage({ productId, shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : product : fetchAProduct : appUserId ", appUserId)
        logConsole("ssrcalls : product : fetchAProduct : productId ", productId)

        const [product, categories] = await Promise.all([
            getProduct({ _id: productId, shopId }),
            getCategoryList({ shopId }),
        ]);

        logConsole("ssrcalls : product : fetchAProduct : product ", product)
        logConsole("ssrCalls : product : fetchProductAndCategoresForEditPage : categories ", categories)

        return { product, categories }
    });
}