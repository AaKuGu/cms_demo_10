import { workSpaceAccessCheck } from '@/SSRCalls/Workspace.ssrCalls';
import React from 'react'

const layout = async ({ children }) => {

    await workSpaceAccessCheck();

    return (
        <>{children}</>
    )
}

export default layout