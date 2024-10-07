import { useState, useEffect, React } from 'react';
import { Container } from '@mui/material';


const HowToUse = ({ theme }) => {
  
  // handling mobile vs. desktop screen size
  const [isMobile, setMobile] = useState(window.innerWidth <= 600);
  const handleScreenSize = () => {
    setMobile(window.innerWidth <= 600);
  }

  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  })

  return (
    <div>
      {
        isMobile ? (
          <div style={{ minHeight: "100vh", width: "80%", maxWidth: "100%" }}>
          <Container style={{
            fontFamily: "'DM Sans', sans-serif", marginTop: 100 * .045 + 'vh', marginLeft: 100 * .01 + 'vw',
            fontSize: 100 * .021 + 'vw', fontWeight: "1000", color: theme.palette.text.primary
          }}>
            <div
              style={{
                border: '.25vh solid ' + theme.palette.common.border,
                marginTop: 100 * .025 + 'vh', borderRadius: 100 * .015 + 'vh',
                flexDirection: "row", fontWeight: "bold",
                height: "auto", backgroundColor: theme.palette.background.secondary,
                width: '90vw', padding: "4vw"
              }}>
    
    
              <div style={{ display: "flex" }}>
                <div style={{ color: theme.palette.text.primary }}>
                  <div style={{ fontSize: 100 * 2.1 * 0.0125 + 'vh', color: theme.palette.primary.main }}>
                    How to find songs
                  </div>
                  <div style={{ fontWeight: 500, fontSize: 100 * 2.1 * 0.009 + 'vh' }}>
    
                    In the search bar, type in a song or artist. Then, hit enter to see results. *To ensure playlist diversity, we've disabled album searches to avoid others adding an entire album.
                  </div>
                </div>
    
    
                {/* <img style={{ marginTop: '-0.3vh', marginLeft: '7.5vw', height: '22.85vh', width: 22.85 * 612 / 247 + 'vh', objectFit: "contain" }}
                  objectFit="cover"src={theme.palette.text.primary == "#3C435C"? "htf.png" : "htfDark.png" } /> */}
              </div>
            </div>
    
            <div
              style={{
                border: '.25vh solid ' + theme.palette.common.border,
                marginTop: 100 * .02 + 'vh', borderRadius: 100 * .015 + 'vh',
                display: "flex", flexDirection: "row", fontWeight: "bold",
                height: "auto", backgroundColor: theme.palette.background.secondary, color: theme.palette.text.primary,
                width: '90vw', padding: "4vw"
              }}>
    
              <div style={{ display: "flex" }}>
                <div style={{color: theme.palette.text.primary }}>
                  <div style={{ fontSize: 100 * 2.1 * 0.0125 + 'vh', color: theme.palette.primary.main }}>
                    How to queue songs
                  </div>
                  <div style={{ fontWeight: 500, fontSize: 100 * 2.1 * 0.009 + 'vh' }}>
                    On the right to a song, click on the plus icon. A check mark will show a successful queue.
                  </div>
    
                </div>
                {/* <img style={{ marginTop: '-.03vh', marginLeft: '7.5vw', height: '22.6vh', width: 22.6 * 612 / 244 + 'vh', objectFit: "contain" }}
                  objectFit="cover" src={theme.palette.text.primary == "#3C435C"? "htq.png" : "htqDark.png" } /> */}
              </div>
            </div>
    
            <div
              style={{
                border: '.25vh solid ' + theme.palette.common.border,
                marginTop: 100 * .02 + 'vh', borderRadius: 100 * .015 + 'vh',
                display: "flex", flexDirection: "row", fontWeight: "bold",
                minHeight: "32.5vh", backgroundColor: theme.palette.background.secondary, color: theme.palette.text.primary,
                width: '90vw', padding: "4vw"
              }}>
    
              <div style={{ color: theme.palette.text.primary, fontWeight: 500, fontSize: 100 * 2.1 * 0.009 + 'vh', }}>
                <div style={{ fontWeight: 700, fontSize: 100 * 2.1 * 0.0125 + 'vh', color: theme.palette.primary.main }}>
                  Frequently asked questions
                </div>
                <div style={{ fontWeight: 700, }}>
                  Why can't I add a song to the playlist?
                </div>
                <div style={{}}>
                  Some reasons why you might not be able to add a song:
                </div>
                <div style={{ marginLeft: '1vw', }}>
                  • The song is already in the playlist.
                </div>
                <div style={{ marginLeft: '1vw', }}>
                  • The song might be too explicit.
                </div>
                <div style={{ marginLeft: '1vw', }}>
                  • The song is too low tempo and might make others sleepy.
                </div>
    
                <div style={{ marginLeft: '1vw', }}>
                  • The song was frequently played and temporarily disabled for the next 10 songs.
                </div>
                <div style={{ marginLeft: '1vw', }}>
                  • You have a 30 second cool down before adding your next song!
                </div>
    
                {/* <img  style={{ marginLeft: '58.5vw',marginTop: '-20vh',width: 95 * .204 + 'vh', height: 95 * 0.245 + 'vh' }}
                                src={theme.palette.text.primary === "#3C435C"? "sharkQuestion.png": "sharkQuestionDark.png"} /> */}
              </div>
    
    
            </div>
          </Container>
        </div>
        ) : (

    <div style={{ minHeight: "100vh", width: "80%", maxWidth: "100%" }}>
      <Container
        style={{
          fontFamily: "'DM Sans', sans-serif",
          marginTop: 100 * 0.045 + "vh",
          marginLeft: 100 * 0.01 + "vw",
          fontSize: 100 * 0.021 + "vw",
          fontWeight: "1000",
          color: theme.palette.text.primary,
        }}
      >
        How to use
        <div
          style={{
            border: ".25vh solid " + theme.palette.common.border,
            marginTop: 100 * 0.025 + "vh",
            borderRadius: 100 * 0.015 + "vh",
            flexDirection: "row",
            fontWeight: "bold",
            height: "23vh",
            backgroundColor: theme.palette.background.secondary,
            width: 100 * 0.7775 + "vw",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginTop: 100 * 0.02 + "vh",
                marginLeft: 100 * 0.016 + "vw",
                color: theme.palette.text.primary,
              }}
            >
              <div
                style={{
                  fontSize: 100 * 2.1 * 0.0125 + "vh",
                  color: theme.palette.primary.main,
                }}
              >
                How to find songs
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 100 * 2.1 * 0.009 + "vh",
                  width: "33vw",
                }}
              >
                In the search bar, type in a song or artist. Then, hit enter to
                see results. *To ensure playlist diversity, we've disabled album
                searches to avoid others adding an entire album.
              </div>
            </div>

            <img
              style={{
                marginTop: "-0.3vh",
                marginLeft: "7.5vw",
                height: "22.85vh",
                width: (22.85 * 612) / 247 + "vh",
                objectFit: "contain",
              }}
              objectFit="cover"
              src={
                theme.palette.text.primary == "#3C435C"
                  ? "htf.png"
                  : "htfDark.png"
              }
            />
          </div>
        </div>
        <div
          style={{
            border: ".25vh solid " + theme.palette.common.border,
            marginTop: 100 * 0.02 + "vh",
            borderRadius: 100 * 0.015 + "vh",
            display: "flex",
            flexDirection: "row",
            fontWeight: "bold",
            height: "23vh",
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.text.primary,
            width: 100 * 0.7775 + "vw",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginTop: 100 * 0.02 + "vh",
                marginLeft: 100 * 0.016 + "vw",
                color: theme.palette.text.primary,
              }}
            >
              <div
                style={{
                  fontSize: 100 * 2.1 * 0.0125 + "vh",
                  color: theme.palette.primary.main,
                }}
              >
                How to queue songs
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 100 * 2.1 * 0.009 + "vh",
                  width: "33vw",
                }}
              >
                On the right to a song, click on the plus icon. A check mark
                will show a successful queue.
              </div>
            </div>
            <img
              style={{
                marginTop: "-.03vh",
                marginLeft: "7.5vw",
                height: "22.6vh",
                width: (22.6 * 612) / 244 + "vh",
                objectFit: "contain",
              }}
              objectFit="cover"
              src={
                theme.palette.text.primary == "#3C435C"
                  ? "htq.png"
                  : "htqDark.png"
              }
            />
          </div>
        </div>
        <div
          style={{
            border: ".25vh solid " + theme.palette.common.border,
            marginTop: 100 * 0.02 + "vh",
            borderRadius: 100 * 0.015 + "vh",
            display: "flex",
            flexDirection: "row",
            fontWeight: "bold",
            minHeight: "32.5vh",
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.text.primary,
            width: 100 * 0.7775 + "vw",
          }}
        >
          <div
            style={{
              marginTop: 100 * 0.02 + "vh",
              marginLeft: 100 * 0.016 + "vw",
              color: theme.palette.text.primary,
              fontWeight: 500,
              fontSize: 100 * 2.1 * 0.009 + "vh",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 100 * 2.1 * 0.0125 + "vh",
                color: theme.palette.primary.main,
              }}
            >
              Frequently asked questions
            </div>
            <div style={{ fontWeight: 700 }}>
              Why can't I add a song to the playlist?
            </div>
            <div style={{}}>
              Some reasons why you might not be able to add a song:
            </div>
            <div style={{ marginLeft: "1vw" }}>
              • The song is already in the playlist.
            </div>
            <div style={{ marginLeft: "1vw" }}>
              • The song might be too explicit.
            </div>
            <div style={{ marginLeft: "1vw" }}>
              • The song is too low tempo and might make others sleepy.
            </div>

            <div style={{ marginLeft: "1vw" }}>
              • The song was frequently played and temporarily disabled for the
              next 10 songs.
            </div>
            <div style={{ marginLeft: "1vw" }}>
              • You have a 30 second cool down before adding your next song!
            </div>

            <img
              style={{
                marginLeft: "58.5vw",
                marginTop: "-20vh",
                width: 95 * 0.204 + "vh",
                height: 95 * 0.245 + "vh",
              }}
              src={
                theme.palette.text.primary === "#3C435C"
                  ? "sharkQuestion.png"
                  : "sharkQuestionDark.png"
              }
            />
          </div>
        </div>
      </Container>
    </div>
        )
      }
    </div>
  );
};

export default HowToUse;
