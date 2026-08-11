import React from 'react'
import Navbar from '../MainNavbar'
import { getAppUserFromSession, getAppUserIdFromAppUserSession, getOnboardingFromAppUserSession } from '@/lib/authentication/authentication'
import { redirect } from 'next/navigation';
import { routes } from '@/lib/routes/routes';
import { logConsole } from '@/lib/console/console';

const layout = async ({ children }) => {
    const appUser = await getAppUserFromSession();

    logConsole("app/onboarded/layout.jsx : appUser : ", appUser);

    if (!appUser) {
        redirect(routes.login);
    }

    const onboarding = appUser?.onboarding || null;

    logConsole("app/onboarded/layout.jsx", onboarding);

    if (!onboarding) {
        redirect(routes.onboarding);
    }

    return (
        <div>
            <Navbar />
            {children}</div>
    )
}

export default layout