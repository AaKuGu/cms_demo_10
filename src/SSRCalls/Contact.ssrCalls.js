import { afterOnboardingActionGuard } from "@/lib/actions/action";
import { getContact } from "@/crud/Contact.crud";
import { serialize } from "@/lib/serialize";
import { logConsole } from "@/lib/console/console";

export async function getContactForThisShop({ shopId } = {}) {
    return afterOnboardingActionGuard(async ({ appUserId }) => {
        logConsole("ssrcalls : contact : getContactForThisShop : appUserId ", appUserId)
        logConsole("ssrcalls : contact : getContactForThisShop : shopId ", shopId)

        const contact = await getContact({ shopId });
        logConsole("ssrcalls : contact : getContactForThisShop : contact ", contact)

        return serialize(contact);
    });
}