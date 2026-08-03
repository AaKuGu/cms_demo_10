import ActionDenied from '@/components/ActionDenied';
import { fetchAShop } from '@/SSRCalls/Shop.ssrCalls';
import Link from 'next/link';
import React from 'react'

const page = async ({ params }) => {
  const { shopId } = await params;

  const { data: shop, error } = await fetchAShop({ shopId });

  if (error) {
    return <ActionDenied message={error} />;
  }

  const formattedDate = new Date(shop.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 p-5">
          {shop.logo ? (
            <img
              src={shop.logo}
              alt={shop.name}
              className="h-14 w-14 rounded-full object-cover ring-1 ring-gray-200"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-lg font-medium text-white">
              {shop.name.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {shop.name.replace(/_/g, " ")}
            </h1>
            {shop.slug ? (
              <p className="text-sm text-gray-400">localhost:3000/{shop.slug}</p>
            ) : (
              <p className="text-sm text-amber-600">No store URL set yet</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Address
            </p>
            <p className="mt-1 text-sm text-gray-900">
              {shop.address || <span className="text-gray-400">Not added</span>}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Google Maps
            </p>
            {shop.googleMapLink ? (
              <a
                href={shop.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-gray-900 underline underline-offset-2 hover:text-gray-600"
              >
                View on map
              </a>
            ) : (
              <p className="mt-1 text-sm text-gray-400">Not added</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Created on
            </p>
            <p className="mt-1 text-sm text-gray-900">{formattedDate}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Shop ID
            </p>
            <p className="mt-1 truncate text-sm text-gray-500">{shop._id}</p>
          </div>
        </div>


        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-gray-200 p-5">
          <button className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Edit shop
          </button>


          {shop.slug ? (
            <Link
              href={`/${shop.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              View live site
            </Link>
          ) : (
            <button
              disabled
              title="Add a store URL to enable this"
              className="cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-sm text-white"
            >
              View live site
            </button>
          )}
        </div>
      </div>
    </div >
  )
}

export default page