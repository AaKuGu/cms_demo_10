import React from 'react'
import Navbar from '../MainNavbar'

const layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}</div>
    )
}

export default layout