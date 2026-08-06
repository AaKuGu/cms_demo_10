import ActionDenied from '@/components/ActionDenied';
import { fetchAShop } from '@/SSRCalls/Shop.ssrCalls';
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }) => {
    const { shopId } = await params;

    console.log("authenticated/live/shopId : ", shopId);

    const { data: shop, error } = await fetchAShop({ shopId });
    if (error) {
        return <ActionDenied message={error} />
    }
    redirect(`/${shop.slug}`);
}

export default page;