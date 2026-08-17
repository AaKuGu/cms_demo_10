import ActionDenied from '@/components/ActionDenied';
import { logConsole } from '@/lib/console/console';
import { fetchBusinessIManageForOthers } from '@/SSRCalls/Shop.ssrCalls'
import Link from 'next/link';
import React from 'react'

const page = async () => {

  const { data: businessesToManage, error } = await fetchBusinessIManageForOthers();

  logConsole('onboarded/manage/stores/page.jsx : businessesToManage ', businessesToManage);

  if (error) {
    logConsole('onboarded/manage/stores/page.jsx : error ', error);
    return <ActionDenied message={error} />;
  }

  const hasBusinesses = businessesToManage && businessesToManage.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Team access
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Stores you manage
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Businesses that have added you as a manager.
          </p>
        </div>

        {!hasBusinesses && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
            <p className="text-sm font-medium text-slate-700">
              No stores assigned to you yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              When an owner adds your email to their team, their store will show up here.
            </p>
          </div>
        )}

        {hasBusinesses && (
          <ul className="space-y-3">
            {businessesToManage.map((business) => {
              const owner = business.ownerId;

              return (
                <li
                  key={business._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700">
                      {owner?.name ? owner.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {owner?.name || "Unnamed owner"}
                      </p>
                      <p className="truncate text-sm text-slate-500">
                        {owner?.phone || "No phone on file"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/onboarded/manage/stores/${owner?._id}`}
                    className="shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    Manage
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page