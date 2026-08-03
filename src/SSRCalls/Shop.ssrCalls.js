import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getShopList } from "@/crud/Shop.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function fetchAllShops() {
    return afterOnboardingActionGuard(async ({ appUserId }) => {

        logConsole("ssrcalls : shop : fetchAllShops : appUserId ", appUserId)

        const shops = await getShopList({ appUserId });

        logConsole("ssrcalls : shop : fetchAllShops : shops ", shops)

        return serialize(shops);
    });
}
