import React from "react"

type LayoutProps = {
    children : React.ReactNode
}

function Layout({ children }: LayoutProps) {
    const toTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <div>
            <section>
                {children}
            </section>
            <button aria-label="back to top" className="back-to-top" onClick={toTop}>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M4.08 11.92L12 4l7.92 7.92l-1.42 1.41l-5.5-5.5V22h-2V7.83l-5.5 5.5l-1.42-1.41M12 4h10V2H2v2h10Z"></path></svg>
            </button>
        </div>
    )
}

export default Layout