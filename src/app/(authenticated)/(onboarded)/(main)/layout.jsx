import React from 'react'
import { getAppUserIdFromSession } from '@/lib/authentication/authentication';
import { redirect } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from '../../MainNavbar';

const layout = async ({ children }) => {

    const appUserId = await getAppUserIdFromSession();
    if (!appUserId) {
        redirect("/onboarding");
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col md:flex-row">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

export default layout