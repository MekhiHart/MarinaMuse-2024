import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import { NavLink } from 'react-router-dom';

const NavBar = ({ children, theme, mode }) => {
    // Set default sizes
    const iconSize = window.innerWidth >= 960 ? '2.75vh' : '2.0vh'; // Smaller on medium screens
    const textSize = window.innerWidth >= 960 ? '1.85vh' : '1.5vh'; // Smaller on medium screens

    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <HomeRoundedIcon style={{ fontSize: iconSize }} />
        },
        {
            path: "/history",
            name: "History",
            icon: <AccessTimeFilledRoundedIcon style={{ fontSize: iconSize }} />
        },
        {
            path: "/howtouse",
            name: "How to use",
            icon: <HelpCenterRoundedIcon style={{ fontSize: iconSize }} />
        }
    ];

    return (
        <div style={{ backgroundColor: theme.palette.background.secondary, borderRight: '.25vh solid ' + theme.palette.common.border, width: '17.6vw', height: "100vh" }}>
            <div style={{
                marginLeft: '1vw',
                fontFamily: "DM Sans",
                fontWeight: 700
            }}>
                <div style={{ alignItems: "center", alignSelf: "center", alignContent: "center", marginLeft: '1vw', marginTop: '2vh' }}>
                    <div style={{
                        height: "18vh",
                        display: "flex",
                        paddingTop: "2.25vh",
                        paddingLeft: ".5vw"
                    }}>
                        <img style={{ transition: 'transform .2s', width: 52 * .240 + 'vw', height: 52 * 0.152 + 'vw' }}
                            src={mode === "light" ? "logo.png" : "logoDark.png"} />
                        <div style={{ marginLeft: '-1.5vw', marginTop: '1.6vw' }}>
                            <img className="floating" style={{ transition: 'transform .2s', width: 5 * .15 + 'vw', height: 5 * 0.19 + 'vw' }}
                                src="note2.png" />
                            <img className="floating" style={{ animationDelay: '.25s', marginTop: '1.3vw', marginLeft: '-.4vw', transition: 'transform .2s', width: 5 * .22 + 'vw', height: 5 * 0.21 + 'vw' }}
                                src="note1.png" />
                        </div>
                    </div>
                    <p style={{ marginTop: '4vh', color: theme.palette.text.primary, fontSize: '2vh' }}></p>
                    {
                        menuItem.map((item, index) => (
                            <NavLink style={{
                                marginLeft: '.65vw',
                                marginBottom: '1vh',
                                width: '12.35vw',
                                borderRadius: '.75vh',
                                padding: "1.1vh .7vw",
                                gap: '1.1vh',
                                height: '5vh',
                                display: 'flex',
                                alignItems: 'center' // Align text and icon
                            }}
                                to={item.path}
                                key={index}
                                className={mode === "light" ? "link" : "link1"}
                                activeClassName="active">
                                {item.icon}
                                <div style={{
                                    display: "block",
                                    fontSize: textSize, // Use dynamic text size
                                    fontWeight: 500,
                                    marginLeft: '.1vw'
                                }}>
                                    {item.name}
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default NavBar;
