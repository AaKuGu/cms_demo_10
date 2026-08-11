import ActionDenied from '@/components/ActionDenied';
import { onboardingInitialDetails } from '@/SSRCalls/AppUsers.srrCalls';
import React from 'react'
import Onboarding from './Onboarding';
import Navbar from '../MainNavbar';
export const dynamic = 'force-dynamic';

const page = async () => {

    const { data: { name, email }, error } = await onboardingInitialDetails();


    if (error) {

        
        return <ActionDenied message={error} />;
    }

    return <>
        <Navbar />
        <Onboarding initialDetails={{ name, email }} />

    </>


}


export default page