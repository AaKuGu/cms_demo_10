import React from 'react'
import { getAppUserFromSession, getUserFromAuthLibraryFromSession } from '@/lib/authentication/authentication';
import { redirect } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from '../../MainNavbar';
import { routes } from '@/lib/routes/routes';

const layout = async ({ children }) => {

    const userFromAuthLibrary = await getUserFromAuthLibraryFromSession();
    if (!userFromAuthLibrary) {
        redirect(routes.login)
    }

    const appUser = await getAppUserFromSession();
    if (!appUser) {
        redirect(routes.onboarding);
    }


    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col md:flex-row">
                {/* <Sidebar /> */}
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

export default layout