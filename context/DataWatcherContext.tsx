import React, { useState, createContext, useEffect, useRef, use } from 'react'
import { set } from 'react-ga'

declare global {
    interface Window {
        dataLayer: any
    }
}

type DataWatcherContextType = {
    pushToDataLayer: (event: any) => void
    createEvent: (event: any) => void
}

type DataWatcherProviderType = {
    children: React.ReactNode
}

const DataWatcherContext = createContext<DataWatcherContextType | null>(null)

const DataWatcherProvider: React.FC<DataWatcherProviderType> = ({ children }) => {
    const dataLayer: any = useRef([])
    const pushToDataLayer = (event: any) => {
        dataLayer.current.push(event)
        console.log('pushing to data layer', dataLayer === window.dataLayer)
    }
    const createEvent = (ga4event: any) => {
        const { action, category, event, ffh_label, value } = ga4event
        return {
            event: event,
            eventCategory: category,
            eventAction: action,
            ffh_label: ffh_label,
            eventValue: value,
        }
    }

    useEffect(() => {
        if (window.dataLayer !== undefined) {
            dataLayer.current = window.dataLayer || []
        }
    }, [])
    
    return (
        <DataWatcherContext.Provider value={{ pushToDataLayer, createEvent }}>
            {children}
        </DataWatcherContext.Provider>
    )
}

const useDataWatcher = () => {
    const context = React.useContext(DataWatcherContext)
    if (context === null) {
        throw new Error('UseDataWatcher must be used within a DataWatcherProvider')
    }
    return context
}

export { DataWatcherProvider, useDataWatcher }
