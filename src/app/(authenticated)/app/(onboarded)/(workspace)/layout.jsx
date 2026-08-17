import { getWorkspaceContext } from '@/SSRCalls/Workspace.ssrCalls';
import React from 'react'
import WorkspaceNavbar from './WorkspaceNavbar';

const layout = async ({ children }) => {

    const { data: workspaceContext } = await getWorkspaceContext();

    return (
        <div>
            <WorkspaceNavbar workspaceContext={workspaceContext} />
            {children}</div>
    )
}

export default layout