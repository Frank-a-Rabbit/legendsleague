import "../styles/globals.css"
import styles from "../styles/Layout.module.css"
import React, { useState, useEffect } from "react"
import type { AppProps } from "next/app"
import { UserContextProvider } from "../context/UserContext"
import PageContextProvider from "../context/PageContext"
import PlayersContextProvider from "../context/PlayersContext"
import Header from "../components/Header"
import HeadTag from "../components/HeadTag"
import Layout from "../components/Layout"
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const [playerList, setPlayerList] = useState([])
  const pageview = (url: string) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
  const handleRouteChange = (url: string) => {
    pageview(url)
  }
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <UserContextProvider>
      <HeadTag></HeadTag>
      <PageContextProvider context={pageProps}>
        <PlayersContextProvider playerList={playerList} setPlayerList={() => {}}>
          <Layout>
            <Header></Header>
            <div className={styles.spacer}></div>
            <Component {...pageProps}></Component>
            <footer className={styles.footer}>
              <img src="/assets/logo.png" alt="fantasy football heros" />
            </footer>
          </Layout>
        </PlayersContextProvider>
      </PageContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
