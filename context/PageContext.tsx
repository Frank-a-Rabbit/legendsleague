import React, { createContext } from "react"

type PageContextProps = {
    children : React.ReactNode,
    context : any
}

export const PageContext = createContext({})

const PageContextProvider = ({ context, children }: PageContextProps) => {
    
    return (
        <PageContext.Provider value={context}>
            {children}
        </PageContext.Provider>
    )
}

export default PageContextProvider