import { createAppUserAction } from '@/actions/AppUserrs.actions';
import ActionDenied from '@/components/ActionDenied';
import { errorConsole, logConsole } from '@/lib/console/console';
import { fetchAppUserId } from '@/SSRCalls/AppUsers.srrCalls';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const { data: appUserId, error } = await fetchAppUserId();

    errorConsole("onboarding page.jsx : error ", error);
    logConsole("onboarding : page.jsx : appUserId ", appUserId);

    if (error) {
        return <ActionDenied message={error} />;
    }

    if (appUserId) {
        redirect(routes.shops)
    }

    const { data, error: createError } = await createAppUserAction();
    logConsole("/onboarding : createAppUserAction : data :", data)
    logConsole("/onboarding : createAppUserAction : createError :", createError)

    if (createError) {
        return <ActionDenied message={createError} />;
    }

    if (data) {
        redirect(routes.shops)
    }

}

export default page