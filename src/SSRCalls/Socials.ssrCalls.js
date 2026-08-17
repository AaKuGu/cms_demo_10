import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getSocials } from "@/crud/Socials.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function getAllSocialsForThisShop({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : socials : getAllSocialsForThisShop : appUserId ", appUserId)
        logConsole("ssrcalls : socials : getAllSocialsForThisShop : shopId ", shopId)

        const socials = await getSocials({ shopId });
        logConsole("ssrcalls : socials : getAllSocialsForThisShop : socials ", socials)

        return serialize(socials);
    });
}