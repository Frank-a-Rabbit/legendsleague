import React from "react"
import Head from "next/head"

const HeadTag = () => {
    return (
        <Head>
            <title>Fantasy Football Heros</title>
            <meta name="description" content="Fantasy Football using classic players." />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Montserrat:wght@800&display=swap" rel="stylesheet"></link>
        </Head>
    )
}

export default HeadTag