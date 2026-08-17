import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getCategoryList } from "@/crud/Category.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function fetchAllCategories({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId, managingBusinessUserId }) => {
        logConsole("ssrcalls : category : fetchAllCategories : appUserId ", appUserId);
        logConsole("ssrcalls : category : fetchAllCategories : shopId ", shopId);

        const categories = await getCategoryList({ shopId });
        logConsole("ssrcalls : category : fetchAllCategories : categories ", categories);

        return serialize(categories);
    });
}
