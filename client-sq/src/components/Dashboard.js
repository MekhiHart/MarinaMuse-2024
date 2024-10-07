import React, { useState, useEffect, useContext } from "react";
import '../styles/App.css'
import axios from 'axios';
import Queue from "./Queue"
import { IconButton, Container } from '@mui/material';
import DisplayResults from "./DisplayResults";
import NowPlaying from "./NowPlaying";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SocketContext } from './App'

const Dashboard = ({ theme, mode }) => {

  const [borderColor, setBC] = useState(".25vh solid " + theme.palette.common.border)

  const socket = useContext(SocketContext);

  const [text, setText] = useState("Loading")
  const [searchResults, setSearchResults] = useState([])
  //const [goodSongsArr, setPassArr] = useState([])
  const [dynInput, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [queueData, setQueueData] = useState([])
  const [accessToken, setAccessToken] = useState("")

  const [loading, setLoading] = useState(false)


  const [clicked, setClicked] = useState(false)
  const [keyPressed, setKeyPressed] = useState("")


  function handleFocus() {
    setBC(".25vh solid " + theme.palette.primary.main)
    setClicked(true)
  }

  function handleBlur() {
    setBC(".25vh solid " + theme.palette.common.border)
    setClicked(false)
  }
  useEffect(() => {
    let ignore = false;

    async function fetchToken() {
      const result = await axios(process.env.REACT_APP_API_URL + '/host/token')
      if (!ignore) setAccessToken(result.data)
    }

    fetchToken();

    return () => { ignore = true; }
  }, [])


  const handleKeyPress = (event) => {
    setKeyPressed(event.key)
    if (event.key === 'Enter') {
      // Perform change here
      setSearch(dynInput)
    }
  }

  // Hook handling retrieving the data of the queue from the backend.
  useEffect(() => {
    let ignore = false;

    async function fetchQueue() {
      const result = await axios(process.env.REACT_APP_API_URL + '/queue/show');
      if (!ignore) setQueueData(result.data);
    }
    fetchQueue();

    socket.on('queueAdd', (data) => {
      setQueueData((prevData) => [...prevData, data]);
    })

    socket.on('queuePop', (data) => {
      setQueueData((prevData) => [...prevData.slice(1)]);
    })

    return () => { ignore = true; socket.off('queueAdd'); socket.off('queuePop') }
  }, [])

  useEffect(() => {

    function loadingDots() {
      let timer = setTimeout(() => {
        setText("Loading.")
      }, 250)

      let timer2 = setTimeout(() => {
        setText("Loading..")
      }, 500)

      let timer3 = setTimeout(() => {
        setText("Loading...")
      }, 750)
    }

    if (loading) {
      loadingDots()
      setText("Loading")
    }
  }, [loading])

  // Hook handling relay of search request to backend. Backend serves as middle to Spotify API.
  useEffect(() => {

    const searchTracks = async (searchQuery) => {
      setLoading(true)
      return axios
        .post(process.env.REACT_APP_API_URL + "/search/tracks", {
          searchString: searchQuery,
          params: { limit: 50 }
        })
        .then(res => {
          setLoading(false)
          return res.data;

        })
        .catch((err) => {
          console.log(err)
        })
    }



    function filter(features) {
      var boolFilter = []
      for (let i = 0; i < features.length; i++) {
        if (features[i] === null) {
          boolFilter.push(false);
        }
        else if (features[i].energy <= 0.3 ||
          features[i].loudness <= -17 ||
          features[i].acousticness >= .8 ||
          features[i].instrumentalness >= 0.60 ||
          features[i].valence <= 0.15 ||
          features[i].tempo <= 45) {

          boolFilter.push(false);

        }
        else {
          boolFilter.push(true);
        }
      }
      return boolFilter;
    }


    if (!search) return setSearchResults([])
    // Parse search query

    searchTracks(search).then(res => {

      console.log("AUDIO feats", res.features.audio_features)

      let boolArray = filter(res.features.audio_features)

      console.log("filter", boolArray)
      let counter = 0

      setSearchResults(
        res.tracks.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
          //Track attributes
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            albumName: track.album.name,
            songDuration: track.duration_ms,
            explicit: track.explicit,
            filter: boolArray[counter++],
            spotifyUrl: track.external_urls.spotify
          }
        })
      )
    })

  }, [search])

  return (
    <div style={{ minHeight: "100vh", width: 100 * .8 + 'vw', maxWidth: "100%" }}>
      <div style={{ display: "inline-flex", width: "100%", height: 100 + 'vh', marginTop: -100 * .00 + 'vh' }}>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif",
          marginTop: 100 * .00 + 'vh',
          marginLeft: 100 * .01 + 'vw',
          width: 100 * .303 + 'vw'
        }}>

          <div style={{ display: "flex", flexDirection: "row" }}>

            <input type="search" id="site-search" style={{
              marginLeft: 0,
              marginTop: 100 * .018 + 'vh',
              width: 100 * .29 + 'vw',
              height: 100 * .06 + 'vh',
              borderRadius: 100 * .015 + 'vh',
              border: borderColor,
              borderColor: theme.palette.common.border,
              paddingLeft: 100 * .027 + 'vw',
              paddingRight: 100 * .00875 + 'vw',
              backgroundColor: theme.palette.background.secondary,
              color: theme.palette.text.primary
            }}
              placeholder="Search for a song to queue"
              className={theme.palette.mode == 'light' ? "searchA" : "searchB"}
              onChange={(e) => { setInput(e.target.value) }}
              onKeyPress={
                handleKeyPress
              }
              onFocus={handleFocus}
              onBlur={handleBlur} />


            <IconButton disableRipple

              style={{
                marginTop: 100 * .0235 + 'vh', marginLeft: -100 * .2875 + 'vw', height: 100 * .05 + 'vh',
                width: 100 * .05 + 'vh', borderRadius: 80,

                color: clicked ? theme.palette.primary.main : theme.palette.common.misc
              }}
              onClick={() => {

                setSearch(dynInput)

              }}
              type="button"
              variant="contained"
              children={<SearchRoundedIcon style={{ fontSize: 100 * .02 + 'vw' }} />}
              fullWidth={false}
            >
            </IconButton>


          </div>
          <div
            style={{ fontWeight: "bold", display: "flex", flexDirection: "row" }}
          >
            <div>
              {/* results component */}
              {
                keyPressed !== "Enter" && searchResults.length === 0 ?
                  (<div
                    //sx={{boxShadow:3}}
                    style={{
                      position: "relative",
                      border: '.25vh solid ' + theme.palette.common.border,
                      height: 100 * 0.755 + 'vh',
                      marginTop: 100 * 0.02 + 'vh',
                      overflowY: "auto",
                      width: 100 * 0.29 + 'vw',
                      backgroundColor: theme.palette.background.secondary,
                      borderRadius: 100 * .015 + 'vh',
                      color: theme.palette.text.primary
                    }}>

                    {!clicked ?
                      <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>
                        <div style={{ height: '25vh' }}>
                          <div style={{ fontSize: 100 * 0.0145 + 'vw', height: "4.25vh" }}>
                            Guidelines
                          </div>

                          <div style={{ fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "1.75vh" }}>
                            <div class="circle" style={{
                              backgroundColor: theme.palette.background.secondary,
                              border: ".25vh solid " + theme.palette.text.primary,
                              color: theme.palette.text.primary, fontSize: "1vw", marginLeft: ".4vw", marginTop: "0.5vh"
                            }} >1</div>
                            <div style={{ fontSize: 100 * 0.0105 + 'vw', width: "23vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                              To keep the playlist diverse, add a variety of songs. Everyone loves discovering new jams!
                            </div>
                          </div>

                          <div style={{ fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "2vh" }}>
                            <div class="circle" style={{
                              backgroundColor: theme.palette.background.secondary,
                              border: ".25vh solid " + theme.palette.text.primary,
                              color: theme.palette.text.primary, fontSize: "1vw", marginLeft: ".4vw", marginTop: "0.5vh"
                            }} >2</div>
                            <div style={{ fontSize: 100 * 0.0105 + 'vw', width: "23vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                              If you loved a song you heard earlier, you can find it again in the history tab.
                            </div>
                          </div>

                          <div style={{ fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "2vh" }}>
                            <div class="circle" style={{
                              backgroundColor: theme.palette.background.secondary,
                              border: ".25vh solid " + theme.palette.text.primary,
                              color: theme.palette.text.primary, fontSize: "1vw", marginLeft: ".4vw", marginTop: "0.5vh"
                            }} >3</div>
                            <div style={{ fontSize: 100 * 0.0105 + 'vw', width: "23vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                              To keep the event professional we've disabled adding explicit songs.
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>
                        <div style={{ height: '25vh' }}>
                          <div style={{ fontSize: 100 * 0.0145 + 'vw', height: "4.25vh" }}>
                            Results
                          </div>
                          {loading ?
                            <div style={{ fontSize: 100 * 0.01025 + 'vw', height: "0vh" }}>
                              {text}
                            </div>
                            :
                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw' }}>
                              Your search results will show here once you <a style={{ color: theme.palette.primary.main }}>hit enter</a>
                            </div>}
                        </div>
                      </div>
                    }

<div style={{
                    opacity:  "70%",
                   
                    position: "absolute",
                    left: "0",
                    right: "0",
                    bottom: mode === "light" ? 4 + 'vh' : 10  + 'vh',
                    
          
                  }}> 
                 <img class = {mode === "light" ? "sidetoside":"snoring"  }style={{
                    display: "flex",
                    transformOrigin: "bottom right",
                    

                   
                    zIndex: 2,
                    position: "relative",
                    marginBottom: mode === "light" ? '-15.25vw': "-5.5vw",
                    marginLeft: mode === "light" ? '2vw': "9vw",
                    
                    width:  mode === "light" ? 54* 0.148 + 'vw' : 5.7* .3378 + 'vw',
                    height: mode === "light" ? 54* 0.146 + 'vw' : 5.7*.6089   + 'vw',
                  }}
                    src={ mode === "light" ? "sharkSk8.png" : "zZ.png" } />
                  <img  style={{
                    
                    zIndex: 1,
                    position: "relative",
                    width: mode === "light" ? 54 *.46253 + 'vw' : 54 *.41668 + 'vw',
                    height: mode === "light" ? 54 *0.30512 + 'vw' : 54 *0.25243   + 'vw',
                    display: "flex",
                    marginLeft:  "auto",
                    marginRight:"auto",
                   
                
          
                  }}
                    src={ mode === "light" ? "faded.png" : "fadedDark.png" } />
                    </div>
                  </div>) : (
                    searchResults.length != 0 ?
                      (<div style={{
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                        color: "#3d435a",
                        border: '.25vh solid ' + theme.palette.common.border,
                        borderRadius: 100 * .015 + 'vh',
                        backgroundColor: theme.palette.background.secondary,
                        width: 100 * 0.29 + 'vw',
                        height: 100 * 0.755 + 'vh',
                        marginTop: 100 * 0.02 + 'vh',
                      }}>


                        <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>


                          <div style={{ fontSize: 100 * 0.0145 + 'vw', height: "4.25vh", color: theme.palette.text.primary }}>
                            Results
                          </div>

                          {loading ?
                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw', height: "0vh", color: theme.palette.text.primary }}>
                              {text}
                            </div>
                            :
                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw', height: "0vh", color: theme.palette.text.primary }}>
                              Explicit or recently added songs are grayed out.
                            </div>
                          }

                        </div>

                        <DisplayResults trackList={searchResults} theme={theme} />
                      </div>)
                      :
                      (
                        <div style={{
                          overflowX: 'hidden',
                          overflowY: 'hidden',
                          color: "#3d435a",
                          border: '.25vh solid ' + theme.palette.common.border,
                          borderRadius: 100 * .015 + 'vh',
                          backgroundColor: theme.palette.background.secondary,
                          width: 100 * 0.29 + 'vw',
                          height: 100 * 0.755 + 'vh',
                          marginTop: 100 * 0.02 + 'vh',
                        }}>
                          <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>


                            <div style={{ fontSize: 100 * 0.0145 + 'vw', height: "4.25vh", color: theme.palette.text.primary }}>
                              Results
                            </div>

                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw', height: "1vh", color: theme.palette.text.primary }}>
                              Hm... We couldn’t find anything. Try searching again.
                            </div>

                            <img style={{
                              width: 54 * 0.2 + 'vw',
                              height: 54 * 0.09512 + 'vw',
                              display: "flex",
                              marginTop: "10vh",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                              src={mode === "light" ? "BeeLight.png" : "BeeDark.png"} />
                          </div>
                        </div>
                      )
                  )
              }
            </div>
          </div>
        </Container>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif", marginTop: 100 * .05 + 'vh',
        }}>

          <Container style={{
            border: '.25vh solid ' + theme.palette.common.border,
            borderRadius: 100 * .015 + 'vh',
            backgroundColor: theme.palette.background.secondary,
            height: 100 * 0.835 + 'vh',
            width: 100 * 0.4 + 'vw',
            overflowY: "hidden",
            marginTop: -100 * .032 + 'vh',
            marginLeft: -100 * .0 + 'vh',
            minWidth: 100 * .4748 + 'vw',
            overflowX: "hidden",
            fontFamily: "DM Sans"
          }}>


            <div style={{ marginLeft: -100 * .02 + 'vh' }}>
              <div style={{ marginLeft: 100 * .012 + 'vw', marginTop: 100 * .026 + 'vh' }}>
                <div style={{ height: 100 * 0.3 + 'vh' }}>
                  <h2 style={{ color: theme.palette.text.primary, fontWeight: "1000", fontSize: 100 * 0.0167 + 'vw' }}>Now playing</h2>
                  {accessToken === "" ?
                    <h2 color={theme.palette.text.primary}>LOGIN TO SEE THE PLAYER</h2> :
                    <NowPlaying theme={theme} mode={mode} />
                  }
                </div>

                <div >
                  <h2 style={{ color: theme.palette.text.primary, marginTop: -100 * 0.001 + 'vh', fontSize: 100 * 0.0147 + 'vw', height: "4vh", fontWeight: "1000" }}>Next up</h2>

                  <div style={{ marginTop: 100 * 0.0075 + 'vh', fontSize: 100 * 0.01 + 'vw', fontFamily: "DM Sans", fontWeight: "bold", color: theme.palette.text.primary, fontWeight: 300 }}>
                    <span style={{ marginLeft: 100 * 0.007 + 'vw' }}> # </span>

                   
                      <span style={{ marginLeft: 100 * 0.0175 + 'vw' }}> Title </span> 
                     

                    <div style={{
                      borderTop: ".25vh solid " + theme.palette.common.border,
                      width: '100%',
                      marginTop: 100 * .00755 + 'vh',
                      height: 100 * .018 + 'vh'
                    }} />
                  </div>

                  {queueData.length === 0 ?
                    <div style={{ opacity: "50%", color: theme.palette.text.primary, marginLeft: '.5vw', fontSize: 100 * 0.0147 + 'vw', height: "4vh", fontWeight: 300 }}>
                      Be the first to add a song to the queue!
                    </div>
                    :
                    <Queue trackList={queueData} theme={theme} />}
                </div>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard;