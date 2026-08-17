import ActionDenied from '@/components/ActionDenied';
import { fetchProductParentSettings } from '@/SSRCalls/Shop.ssrCalls';
import React from 'react'
import ProductParentSettingsContainer from './ProductParentSettingsContainer';

const page = async ({ params }) => {
  const { shopId } = await params;
  const { data: productParentSettings, error } = await fetchProductParentSettings({ shopId });

  if (error) {
    return <ActionDenied error={error} />
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-lg font-semibold text-gray-900">Product settings</h1>
      <p className="mt-1 text-sm text-gray-500">Applies to all products in this shop.</p>

      <ProductParentSettingsContainer
        shopId={shopId}
        initialSettings={productParentSettings.settings.products}
      />
    </div>
  )
}

export default page