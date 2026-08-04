import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getProduct, getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

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