import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getAboutUs } from "@/crud/AboutUs.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function getAboutUsForThisShop({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : aboutUs : getAboutUsForThisShop : appUserId ", appUserId)
        logConsole("ssrcalls : aboutUs : getAboutUsForThisShop : shopId ", shopId)

        const aboutUs = await getAboutUs({ shopId });
        logConsole("ssrcalls : aboutUs : getAboutUsForThisShop : aboutUs ", aboutUs)

        return serialize(aboutUs);
    });
}