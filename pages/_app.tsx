import "../styles/globals.css"
import styles from "../styles/Layout.module.css"
import React, { useState, useEffect, useContext } from "react"
import type { AppProps } from "next/app"
import { UserContextProvider, UserContext, UserContextType } from "../context/UserContext"
import PageContextProvider from "../context/PageContext"
import PlayersContextProvider from "../context/PlayersContext"
import Header from "../components/Header"
import HeadTag from "../components/HeadTag"
import Layout from "../components/Layout"
import { useRouter } from 'next/router'
import Link from "next/link"

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
  const atHome = router.pathname === "/"
  const currentUser = useContext<UserContextType | null>(UserContext)?.currentUser
  console.log("currentUser ", currentUser)
  return (
    <UserContextProvider>
      <HeadTag></HeadTag>
      <PageContextProvider context={pageProps}>
        <PlayersContextProvider playerList={playerList} setPlayerList={() => {}}>
          <Layout>
            <Header></Header>
            <div className={styles.spacer}></div>
            <Component {...pageProps}></Component>
            {atHome && (
              <div className={styles.infoCont}>
                {currentUser && (
                  <div>hi</div>
                )}
                <h1>Fantasy Football Heros</h1>
                <p className={styles.pHeading}>
                  Ever wished you could play fantasy football year round? How about playing at any time, day or night? Well now you can! Fantasy Football Heros allows you to play fantasy football at your leisure using stats from legendary heros of football. See the <Link href="/about">about</Link> page for more information.
                </p>
                <p className={styles.pHeading}>
                  <b>How to play: </b>
                  Choose 4 quarterbacks, 3 runningbacks, and 2 wide receivers. The game will make selections after each of your picks. Once both teams have been picked a random game from the career of each player will be selected giving the stats needed to calculate scores.
                </p>
                <Link className={styles.ctaBtn} href="/login">Signup or login to play</Link>
                <h2>Available players</h2>
                <ul>
                  <li>
                    <div>
                      <h3>Troy Aikman</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Interceptions: </span>141<br />
                        <span>Total Touchdowns: </span>165<br />
                        <span>Total Yards: </span>32,942<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Mark Rypien</h3>
                      <p>
                        <span>Seasons Played: </span>10<br />
                        <span>Total Interceptions: </span>88<br />
                        <span>Total Touchdowns: </span>115<br />
                        <span>Total Yards: </span>18,416<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Warren Moon</h3>
                      <p>
                        <span>Seasons Played: </span>17<br /><br />
                        <span>Total Interceptions: </span>233<br /><br />
                        <span>Total Touchdowns: </span>291<br /><br />
                        <span>Total Yards: </span>49,325<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Steve Largent</h3>
                      <p>
                        <span>Seasons Played: </span>14<br />
                        <span>Total Receptions: </span>819<br />
                        <span>Total Touchdowns: </span>100<br />
                        <span>Total Yards: </span>13,089<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Joe Namath</h3>
                      <p>
                        <span>Seasons Played: </span>8<br />
                        <span>Total Interceptions: </span>116<br />
                        <span>Total Touchdowns: </span>76<br />
                        <span>Total Yards: </span>12,176<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Roger Staubach</h3>
                      <p>
                        <span>Seasons Played: </span>10<br />
                        <span>Total Interceptions: </span>107<br />
                        <span>Total Touchdowns: </span>152<br />
                        <span>Total Yards: </span>22,279<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>John Elway</h3>
                      <p>
                        <span>Seasons Played: </span>16<br />
                        <span>Total Interceptions: </span>226<br />
                        <span>Total Touchdowns: </span>300<br />
                        <span>Total Yards: </span>51,475<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Joe Montana</h3>
                      <p>
                        <span>Seasons Played: </span>15<br />
                        <span>Total Interceptions: </span>139<br />
                        <span>Total Touchdowns: </span>273<br />
                        <span>Total Yards: </span>40,551<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Jim Kelly</h3>
                      <p>
                        <span>Seasons Played: </span>11<br />
                        <span>Total Interceptions: </span>175<br />
                        <span>Total Touchdowns: </span>237<br />
                        <span>Total Yards: </span>35,467<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Steve McNair</h3>
                      <p>
                        <span>Seasons Played: </span>13<br />
                        <span>Total Interceptions: </span>119<br />
                        <span>Total Touchdowns: </span>174<br />
                        <span>Total Yards: </span>31,304<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Phil Simms</h3>
                      <p>
                        <span>Seasons Played: </span>14<br />
                        <span>Total Interceptions: </span>157<br />
                        <span>Total Touchdowns: </span>199<br />
                        <span>Total Yards: </span>33,462<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Bernie Kosar</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Interceptions: </span>87<br />
                        <span>Total Touchdowns: </span>124<br />
                        <span>Total Yards: </span>23,301<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Dan Marino</h3>
                      <p>
                        <span>Seasons Played: </span>17<br />
                        <span>Total Interceptions: </span>252<br />
                        <span>Total Touchdowns: </span>420<br />
                        <span>Total Yards: </span>61,361<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Vinny Testaverde</h3>
                      <p>
                        <span>Seasons Played: </span>21<br />
                        <span>Total Interceptions: </span>267<br />
                        <span>Total Touchdowns: </span>275<br />
                        <span>Total Yards: </span>46,233<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Kurt Warner</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Interceptions: </span>128<br />
                        <span>Total Touchdowns: </span>208<br />
                        <span>Total Yards: </span>32,344<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Drew Bledsoe</h3>
                      <p>
                        <span>Seasons Played: </span>14<br />
                        <span>Total Interceptions: </span>206<br />
                        <span>Total Touchdowns: </span>251<br />
                        <span>Total Yards: </span>44,611<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Rich Gannon</h3>
                      <p>
                        <span>Seasons Played: </span>16<br />
                        <span>Total Interceptions: </span>104<br />
                        <span>Total Touchdowns: </span>180<br />
                        <span>Total Yards: </span>28,743<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Terry Bradshaw</h3>
                      <p>
                        <span>Seasons Played: </span>14<br />
                        <span>Total Interceptions: </span>210<br />
                        <span>Total Touchdowns: </span>212<br />
                        <span>Total Yards: </span>27,989<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Herschel Walker</h3>
                      <p>
                        <span>Seasons Played: </span>9<br />
                        <span>Total Receiving Yards: </span>4,387<br />
                        <span>Total Receiving Touchdowns: </span>18<br />
                        <span>Total Rushing Yards: </span>7,996<br />
                        <span>Total Rushing Touchdowns: </span>60<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Jerome Bettis</h3>
                      <p>
                        <span>Seasons Played: </span>13<br />
                        <span>Total Receiving Yards: </span>1,449<br />
                        <span>Total Receiving Touchdowns: </span>3<br />
                        <span>Total Rushing Yards: </span>13,662<br />
                        <span>Total Rushing Touchdowns: </span>91<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Barry Sanders</h3>
                      <p>
                        <span>Seasons Played: </span>10<br />
                        <span>Total Receiving Yards: </span>2,921<br />
                        <span>Total Receiving Touchdowns: </span>10<br />
                        <span>Total Rushing Yards: </span>15,269<br />
                        <span>Total Rushing Touchdowns: </span>99<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Keyshawn Johnson</h3>
                      <p>
                        <span>Seasons Played: </span>11<br />
                        <span>Total Receptions: </span>814<br />
                        <span>Total Touchdowns: </span>64<br />
                        <span>Total Yards: </span>10,571<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Ladanian Tomlinson</h3>
                      <p>
                        <span>Seasons Played: </span>11<br />
                        <span>Total Receiving Yards: </span>4,772<br />
                        <span>Total Receiving Touchdowns: </span>17<br />
                        <span>Total Rushing Yards: </span>13,684<br />
                        <span>Total Rushing Touchdowns: </span>145<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Lynn Swann</h3>
                      <p>
                        <span>Seasons Played: </span>9<br />
                        <span>Total Receptions: </span>336<br />
                        <span>Total Touchdowns: </span>51<br />
                        <span>Total Yards: </span>5,462<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Marcus Allen</h3>
                      <p>
                        <span>Seasons Played: </span>16<br />
                        <span>Total Receiving Yards: </span>5,411<br />
                        <span>Total Receiving Touchdowns: </span>21<br />
                        <span>Total Rushing Yards: </span>12,243<br />
                        <span>Total Rushing Touchdowns: </span>123<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Michael Irvin</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Receptions: </span>750<br />
                        <span>Total Touchdowns: </span>65<br />
                        <span>Total Yards: </span>11,904<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Randy Moss</h3>
                      <p>
                        <span>Seasons Played: </span>14<br />
                        <span>Total Receptions: </span>982<br />
                        <span>Total Touchdowns: </span>256<br />
                        <span>Total Yards: </span>15,292<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Ricky Watters</h3>
                      <p>
                        <span>Seasons Played: </span>10<br />
                        <span>Total Receiving Yards: </span>4,248<br />
                        <span>Total Receiving Touchdowns: </span>13<br />
                        <span>Total Rushing Yards: </span>10,643<br />
                        <span>Total Rushing Touchdowns: </span>78<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Roger Craig</h3>
                      <p>
                        <span>Seasons Played: </span>11<br />
                        <span>Total Receiving Yards: </span>4,911<br />
                        <span>Total Receiving Touchdowns: </span>17<br />
                        <span>Total Rushing Yards: </span>8,189<br />
                        <span>Total Rushing Touchdowns: </span>56<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Eric Dickerson</h3>
                      <p>
                        <span>Seasons Played: </span>11<br />
                        <span>Total Receiving Yards: </span>2,137<br />
                        <span>Total Receiving Touchdowns: </span>6<br />
                        <span>Total Rushing Yards: </span>13,529<br />
                        <span>Total Rushing Touchdowns: </span>90<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Sterling Sharpe</h3>
                      <p>
                        <span>Seasons Played: </span>7<br />
                        <span>Total Receptions: </span>595<br />
                        <span>Total Touchdowns: </span>65<br />
                        <span>Total Yards: </span>8,134<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Terrell Davis</h3>
                      <p>
                        <span>Seasons Played: </span>7<br />
                        <span>Total Receiving Yards: </span>1,280<br />
                        <span>Total Receiving Touchdowns: </span>5<br />
                        <span>Total Rushing Yards: </span>7,607<br />
                        <span>Total Rushing Touchdowns: </span>60<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Thurman Thomas</h3>
                      <p>
                        <span>Seasons Played: </span>13<br />
                        <span>Total Receiving Yards: </span>4,458<br />
                        <span>Total Receiving Touchdowns: </span>23<br />
                        <span>Total Rushing Yards: </span>12,074<br />
                        <span>Total Rushing Touchdowns: </span>65<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Tony Dorsett</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Receiving Yards: </span>3,554<br />
                        <span>Total Receiving Touchdowns: </span>13<br />
                        <span>Total Rushing Yards: </span>12,739<br />
                        <span>Total Rushing Touchdowns: </span>77<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Andre Reed</h3>
                      <p>
                        <span>Seasons Played: </span>16<br />
                        <span>Total Receptions: </span>951<br />
                        <span>Total Touchdowns: </span>87<br />
                        <span>Total Yards: </span>13,198<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Andre Rison</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Receptions: </span>743<br />
                        <span>Total Touchdowns: </span>84<br />
                        <span>Total Yards: </span>10,205<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Bo Jackson</h3>
                      <p>
                        <span>Seasons Played: </span>4<br />
                        <span>Total Receiving Yards: </span>352<br />
                        <span>Total Receiving Touchdowns: </span>2<br />
                        <span>Total Rushing Yards: </span>2,782<br />
                        <span>Total Rushing Touchdowns: </span>16<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Clinton Portis</h3>
                      <p>
                        <span>Seasons Played: </span>9<br />
                        <span>Total Receiving Yards: </span>2,018<br />
                        <span>Total Receiving Touchdowns: </span>5<br />
                        <span>Total Rushing Yards: </span>9,923<br />
                        <span>Total Rushing Touchdowns: </span>75<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Earl Campbell</h3>
                      <p>
                        <span>Seasons Played: </span>8<br />
                        <span>Total Receiving Yards: </span>806<br />
                        <span>Total Receiving Touchdowns: </span>0<br />
                        <span>Total Rushing Yards: </span>9,407<br />
                        <span>Total Rushing Touchdowns: </span>74<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Franco Harris</h3>
                      <p>
                        <span>Seasons Played: </span>13<br />
                        <span>Total Receiving Yards: </span>2,287<br />
                        <span>Total Receiving Touchdowns: </span>9<br />
                        <span>Total Rushing Yards: </span>12,120<br />
                        <span>Total Rushing Touchdowns: </span>91<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Emmitt Smith</h3>
                      <p>
                        <span>Seasons Played: </span>15<br />
                        <span>Total Receiving Yards: </span>3,224<br />
                        <span>Total Receiving Touchdowns: </span>11<br />
                        <span>Total Rushing Yards: </span>18,355<br />
                        <span>Total Rushing Touchdowns: </span>164<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Peyton Manning</h3>
                      <p>
                        <span>Seasons Played: </span>17<br />
                        <span>Total Interceptions: </span>251<br />
                        <span>Total Touchdowns: </span>539<br />
                        <span>Total Yards: </span>71,940<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Brett Favre</h3>
                      <p>
                        <span>Seasons Played: </span>20<br />
                        <span>Total Interceptions: </span>336<br />
                        <span>Total Touchdowns: </span>508<br />
                        <span>Total Yards: </span>71,838<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Dan Fouts</h3>
                      <p>
                        <span>Seasons Played: </span>15<br />
                        <span>Total Interceptions: </span>242<br />
                        <span>Total Touchdowns: </span>254<br />
                        <span>Total Yards: </span>43,040<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Jim Everett</h3>
                      <p>
                        <span>Seasons Played: </span>12<br />
                        <span>Total Interceptions: </span>175<br />
                        <span>Total Touchdowns: </span>203<br />
                        <span>Total Yards: </span>34,837<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Ken Anderson</h3>
                      <p>
                        <span>Seasons Played: </span>16<br />
                        <span>Total Interceptions: </span>160<br />
                        <span>Total Touchdowns: </span>197<br />
                        <span>Total Yards: </span>32,838<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Christian Okoye</h3>
                      <p>
                        <span>Seasons Played: </span>6<br />
                        <span>Total Receiving Yards: </span>294<br />
                        <span>Total Receiving Touchdowns: </span>0<br />
                        <span>Total Rushing Yards: </span>4,897<br />
                        <span>Total Rushing Touchdowns: </span>40<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Walter Payton</h3>
                      <p>
                        <span>Seasons Played: </span>13<br />
                        <span>Total Receiving Yards: </span>4,538<br />
                        <span>Total Receiving Touchdowns: </span>15<br />
                        <span>Total Rushing Yards: </span>16,729<br />
                        <span>Total Rushing Touchdowns: </span>110<br />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Jerry Rice</h3>
                      <p>
                        <span>Seasons Played: </span>20<br />
                        <span>Total Receptions: </span>1549<br />
                        <span>Total Touchdowns: </span>197<br />
                        <span>Total Yards: </span>22,895<br />
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
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
