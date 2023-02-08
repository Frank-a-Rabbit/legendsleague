import "../styles/globals.css"
import React, { useState } from "react"
import type { AppProps } from "next/app"
import { UserContextProvider } from "../context/UserContext"
import PageContextProvider from "../context/PageContext"
import PlayersContextProvider from "../context/PlayersContext"
import Header from "../components/Header"
import HeadTag from "../components/HeadTag"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  const [playerList, setPlayerList] = useState([])
  return (
    <UserContextProvider>
      <HeadTag></HeadTag>
      <PageContextProvider context={pageProps}>
        <PlayersContextProvider playerList={playerList} setPlayerList={() => {}}>
          <Layout>
            <Header></Header>
            <Component {...pageProps}></Component>
          </Layout>
        </PlayersContextProvider>
      </PageContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
