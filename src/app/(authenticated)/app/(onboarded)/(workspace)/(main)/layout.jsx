import React from 'react'
import { getAppUserFromSession, getUserFromAuthLibraryFromSession } from '@/lib/authentication/authentication';
import { redirect } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from '../../../MainNavbar';
import { routes } from '@/lib/routes/routes';
import ShopsNavbar from './ShopsNavbar';
import { getWorkspaceContext } from '@/SSRCalls/Workspace.ssrCalls';

const layout = async ({ children }) => {

    const userFromAuthLibrary = await getUserFromAuthLibraryFromSession();
    if (!userFromAuthLibrary) {
        redirect(routes.login)
    }

    const appUser = await getAppUserFromSession();
    if (!appUser) {
        redirect(routes.onboarding);
    }

    const { data: workspaceContext } = await getWorkspaceContext();


    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col">
                {/* <ShopsNavbar workspaceContext={workspaceContext} /> */}
                <main className="flex-1 p-4 md:p-6">
                    {children}</main>
            </div>
        </div>
    )
}

export default layout