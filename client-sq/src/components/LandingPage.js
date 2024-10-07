import React, { useState } from "react";
import { Modal, Grid, Fade, Stack } from '@mui/material';
import '../styles/App.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: ".75vh",
    boxShadow: 24,
    width: "78%",
    height: "74%",
    fontFamily: "DM Sans",
    outline: "none",
    border: 'none',
}

function LandingPage({ theme, mode }) {

    const [open, setOpen] = useState(true);
    const [mainPageFadeIn, setMainPageFadeIn] = useState(true)
    const [clickNum, setClickNum] = useState(1);

    const handleClick = () => {
        setClickNum(1 + clickNum);
        console.log(clickNum)
    }

    return (
        <>
            <Modal open={open} >
                <Grid
                    container
                    sx={[style, { backgroundColor: theme.palette.background.primary, color: theme.palette.text.primary }, mainPageFadeIn === true ? { padding: '0vh' } : { padding: 0 }]}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {mainPageFadeIn === true ?
                        <Fade in={mainPageFadeIn} timeout={3000}>

                            <Grid  style={{
                                
                                width: "100%",
                                height: "100%",
                                marginTop: "7.5vh"
                            }}>
                                <div style={{
                                    textAlign: 'center', fontSize: '6vh', fontWeight: "bold",
                                    color: theme.palette.text.primary,
                                    marginTop: '0vh'
                                }}>
                                    Hey <a style={{ color: theme.palette.primary.main }}>MarinaHacks!👋</a>
                                </div>

                                <div style={{ textAlign: 'center', fontWeight: 500, fontSize: '3.4vh', height: '8vh', color: theme.palette.text.primary, marginTop: '1vh' }}>Ready to add your vibe to the party with MarinaMuse?</div>
                                
                                <div style={{marginLeft: '-7vh'}}>
                                <img className ="floating2" src="BeachNotes.png"
                                    style={{
                                       
                                        width: .070 * 88 + 'vh',
                                        height: .070 * 93 + 'vh',
                                        display: "block",
                                        marginTop: "2vh",
                                        marginBottom: "-4.25vh",
                                      
                                        marginLeft: "auto",
                                        marginRight: "auto",

                                    }} />
                                    </div>
                                    <div style={{marginLeft: '4vh'}}>
                                    <img className ="floating2" src="BeachNotes2.png" 
                                    style={{animationDelay: '1.5s',
                                        transform: "rotate(10deg)",
                                        width: .070 * 70 + 'vh',
                                        height: .070 * 69 + 'vh',
                                        
                                        display: "block",
                                        marginBottom: "-8vh",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }} />
                                    </div>
                                 
                                <img src="BeachMuseGraphics.png"
                                    style={{

                                        height: .070 * 379 + 'vh',
                                        width: .070 * 740 + 'vh',
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",

                                    }} />
                                    
                                <div style={{ textAlign: 'center', marginTop: '5vh' }}>
                                    <button

                                        style={{
                                            fontWeight: 500,
                                            color: "white",
                                            backgroundColor: theme.palette.primary.main,
                                            width: '12.5vw',
                                            height: '7vh',
                                            fontSize: '2.25vh',
                                            borderRadius: '.75vh',
                                            border: 'none'

                                        }}
                                        onClick={() => { setOpen(false); localStorage.setItem('visited', 'true') }}
                                    >
                                        Ready to vibe!

                                    </button>
                                    <button
                                        style={{
                                            fontWeight: 500,
                                            backgroundColor: "#EBEEFF",
                                            color: theme.palette.primary.main,
                                            width: '12.5vw',
                                            height: '7vh',
                                            fontSize: '2.25vh',
                                            borderRadius: '.75vh',
                                            border: 'none',
                                            marginLeft: '1.1vw'
                                        }}
                                        onClick={() => { setMainPageFadeIn(false); console.log(clickNum) }}
                                    >
                                        How to use

                                    </button>

                                </div>

                            </Grid>
                        </Fade> : <></>}

                    {mainPageFadeIn === false && clickNum === 1 ?
                        <Fade in={!mainPageFadeIn} timeout={3000}>

                            <div style={{ display: "inline-flex", width: "100%", height: "100%"}}>
                                <div style={{
                                    width: "49.5%", height: "100%",
                                    paddingTop: "20.625vh", paddingLeft: "6.7vw",
                                }}>
                                    <div style={{ color: theme.palette.primary.main, fontWeight: "bold", fontSize: "3.70vh" }}>How to find songs</div>

                                    <div style={{ height: '8vh', marginTop: "0.1vh", fontWeight: 500, color: theme.palette.text.primary, fontSize: "2.9725vh", lineHeight: '4vh' }}> In the search bar, type in a song or artist. Then, hit enter to see results.</div>


                                    <div style={{ marginTop: "9.5vh", display: "inline-flex" }}>
                                        <button

                                            style={{

                                                fontWeight: 500,
                                                color: "white",
                                                backgroundColor: theme.palette.primary.main,
                                                width: '12.5vw',
                                                height: '6.9vh',
                                                fontSize: '2.225vh',
                                                borderRadius: '1.4vh',
                                                border: 'none',

                                            }}
                                            onClick={() => { handleClick(); console.log(clickNum) }}
                                        > Next </button>
                                        <img src={mode === "light" ? "SliderLight1.png" : "SliderDark1.png"}
                                            style={{
                                                marginLeft: "18.2vw",
                                                marginTop: "19.7vh",
                                                width: .0925 * 62 + 'vh',
                                                height: .0925 * 16 + 'vh'

                                            }}></img>
                                    </div>
                                </div>
                                <div>
                                    <img src={mode === "light" ? "LandingPageLight1.png" : "LandingPageDark1.png"}
                                        style={{
                                           
                                            marginLeft: '4.5vw',
                                            marginTop: "5.65vh",
                                            width: .0925 * 612 + 'vh',
                                            height: .0925 * 738 + 'vh',
                                        }} />
                                </div>
                            </div>
                        </Fade> : <></>}
                    {mainPageFadeIn === false && clickNum === 2 ?
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                            <div style={{
                                width: "49.5%", height: "100%",
                                paddingTop: "20.625vh", paddingLeft: "6.7vw",
                            }}>
                                <div style={{ color: theme.palette.primary.main, fontWeight: "bold", fontSize: "3.70vh" }}>How to queue songs</div>

                                <div style={{ height: '8vh', marginTop: "0.1vh", fontWeight: 500, color: theme.palette.text.primary, fontSize: "2.9725vh", lineHeight: '4vh' }}>
                                    On the right to a song, click on the plus icon. A check mark will show a successful queue.</div>


                                <div style={{ marginTop: "9.5vh", display: "inline-flex" }}>
                                    <button

                                        style={{

                                            fontWeight: 500,
                                            color: "white",
                                            backgroundColor: theme.palette.primary.main,
                                            width: '12.5vw',
                                            height: '6.9vh',
                                            fontSize: '2.225vh',
                                            borderRadius: '1.4vh',
                                            border: 'none',

                                        }}
                                        onClick={() => { handleClick(); console.log(clickNum) }}
                                    > Next </button>
                                    <img src={mode === "light" ? "SliderLight2.png" : "SliderDark2.png"}
                                        style={{
                                            marginLeft: "18.2vw",
                                            marginTop: "19.7vh",
                                            width: .0925 * 62 + 'vh',
                                            height: .0925 * 16 + 'vh'

                                        }}></img>
                                </div>
                            </div>
                            <div>
                                <img src={mode === "light" ? "LandingPageLight2.png" : "LandingPageDark2.png"}
                                    style={{
                                        marginLeft: '4.5vw',
                                        marginTop: "5.65vh",
                                        width: .0925 * 612 + 'vh',
                                        height: .0925 * 738 + 'vh',

                                    }} />
                            </div>
                        </div>
                        : <></>}

                    {mainPageFadeIn === false && clickNum === 3 ?
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>
                            <div style={{
                                width: "49.5%", height: "100%",
                                paddingTop: "20.625vh", paddingLeft: "6.7vw",
                            }}>
                                <div style={{ color: theme.palette.primary.main, fontWeight: "bold", fontSize: "3.70vh" }}>Other things to know</div>

                                <div style={{ height: '8vh', marginTop: "0.1vh", fontWeight: 500, color: theme.palette.text.primary, fontSize: "2.9725vh", lineHeight: '4vh' }}>
                                    We implemented the following rules to create the best experience for MarinaHacks!</div>


                                <div style={{ marginTop: "9.5vh", display: "inline-flex" }}>
                                    <button

                                        style={{

                                            fontWeight: 500,
                                            color: "white",
                                            backgroundColor: theme.palette.primary.main,
                                            width: '12.5vw',
                                            height: '6.9vh',
                                            fontSize: '2.225vh',
                                            borderRadius: '1.4vh',
                                            border: 'none',

                                        }}
                                        onClick={() => { setOpen(false); setMainPageFadeIn(true); setClickNum(1); localStorage.setItem('visited', 'true'); }}
                                    > Ready to vibe! </button>
                                    <img src={mode === "light" ? "SliderLight3.png" : "SliderDark3.png"}
                                        style={{
                                            marginLeft: "18.2vw",
                                            marginTop: "19.7vh",
                                            width: .0925 * 62 + 'vh',
                                            height: .0925 * 16 + 'vh'

                                        }}></img>
                                </div>
                            </div>
                            <div style={{ margin: "auto", paddingLeft: '2.5vw', paddingBottom: '5vh' }}>

                                <Stack direction="column" spacing={'3vh'}>
                                    <Grid
                                        container
                                        sx={{
                                            backgroundColor: theme.palette.background.third, boxShadow: "0vw .5vh 1vw 0.25vw " + theme.palette.common.boxShadow, borderRadius: '1.3vh', height: "10.5vh", width: "30.4vw", textAlign: "center",
                                            border: '.25vh solid ' + theme.palette.common.boxShadow
                                        }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <div style={{ fontWeight: 500, fontSize: '2.6vh', marginTop: "0vh", lineHeight: '3.25vh' }}>Explicit, low energy, and instrumental<br />songs are excluded.</div>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{
                                            backgroundColor: theme.palette.background.third, boxShadow: "0vw .5vh 1vw 0.25vw " + theme.palette.common.boxShadow, borderRadius: '1.3vh', height: "10.5vh", width: "30.4vw", textAlign: "center",
                                            border: '.25vh solid ' + theme.palette.common.boxShadow
                                        }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <div style={{ fontWeight: 500, fontSize: '2.6vh', marginTop: "0vh", lineHeight: '3.25vh' }}>The same song cannot play until after 10<br />songs.</div>
                                    </Grid>
                                    <Grid
                                        container
                                        sx={{
                                            backgroundColor: theme.palette.background.third, boxShadow: "0vw .5vh 1vw 0.25vw " + theme.palette.common.boxShadow, borderRadius: '1.3vh', height: "10.5vh", width: "30.4vw", textAlign: "center",
                                            border: '.25vh solid ' + theme.palette.common.boxShadow
                                        }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center">
                                        <div style={{ fontWeight: 500, fontSize: '2.6vh', marginTop: "0vh", lineHeight: '3.25vh' }}>Songs can only be added every 30 <br /> seconds per person.</div>
                                    </Grid>
                                </Stack>
                            </div>
                        </div>
                        : <></>}
                </Grid>
            </Modal>
        </>
    )
}
export default LandingPage

