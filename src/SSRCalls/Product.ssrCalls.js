import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getProduct, getProductList } from "@/crud/Product.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";
import { getCategoryList } from "@/crud/Category.crud";
import { buildProductFilter } from "@/app/(authenticated)/app/(onboarded)/(workspace)/shop-manage/[shopId]/products/lib/buildProductFilter";

export async function fetchDataForProductListing({ shopId, searchParams = {} } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        const userFilter = buildProductFilter(searchParams);
        const hasFilter = Object.keys(userFilter).length > 0;

        const filter = { shopId, ...userFilter };
        const products = await getProductList(filter, ['categoryId'], { createdAt: -1 });

        // default to latest 10 when no filter is applied
        const finalProducts = hasFilter ? products : products.slice(0, 10);

        return serialize({ products: finalProducts, hasFilter });
    });
}


// export async function fetchDataForProductListing({ shopId, filter = {}, sort } = {}) {
//     return afterOnboardingActionGuard(async ({ appUserId }) => {
//         logConsole("ssrcalls : product : fetchAllProducts : appUserId ", appUserId)
//         logConsole("ssrcalls : product : fetchAllProducts : shopId ", shopId)
//         logConsole("ssrcalls : product : fetchAllProducts : filter ", filter)

//         const fullFilter = { appUserId, shopId, ...filter };
//         const data = await getProductList(fullFilter, ['categoryId'], sort);
//         logConsole("ssrcalls : product : fetchAllProducts : data ", data)

//         return serialize(data);
//     });
// }

export async function fetchAProduct({ productId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : product : fetchAProduct : appUserId ", appUserId)
        logConsole("ssrcalls : product : fetchAProduct : productId ", productId)

        const product = await getProduct({ _id: productId });
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