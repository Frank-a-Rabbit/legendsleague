import React, { useContext } from "react"

type LayoutProps = {
    children : React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <section>
                {children}
            </section>
        </div>
    )
}

export default Layout