import React from 'react'
import { getAppUserIdFromSession } from '@/lib/authentication/authentication';
import { redirect } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from '@/app/(authenticated)/app/MainNavbar';
import ShopManageNav from './ShopManageNav';
import { routes } from '@/lib/routes/routes';

const layout = async ({ children }) => {

  const appUserId = await getAppUserIdFromSession();
  if (!appUserId) {
    redirect(routes.onboarding);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ShopManageNav />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-2 md:p-3">{children}</main>
      </div>
    </div>
  )
}

export default layout