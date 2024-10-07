import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material";

const CustomSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checked={window.localStorage.getItem('theme') === 'dark'}/>
))(({ theme }) => ({
    marginTop: '-.4vh',
    width: "7.4vh",
    height: "3.7vh",
    padding: 0,
    borderRadius: "5vh",
    backgroundColor: "#F9A8D4",
    '& .MuiSwitch-switchBase': {
        padding: 0,
        marginTop: "0.475vh",
        marginLeft: "0.475vh",
        // transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(3.7vh)',
            color: '#fff',
            "& .MuiSwitch-thumb:before": {
               
                width: '2.75vh',
                height:'2.75vh',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="{max}" width="{max}" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#F9A8D4"
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
            },
            '& + .MuiSwitch-track': {
                
                height:'2.75vh',
                backgroundColor: "#F9A8D4",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left 10% bottom 50%",
               
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#FFF"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
                opacity: 1,
                border: 0,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#F9A8D4',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        
        boxSizing: 'border-box',
        width: '2.75vh',
        height:'2.75vh',
        
        
        "&:before": {
            content: "''",
            position: "absolute",
            width: "2.75vh",
            height: "2.75vh",
            
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="{max}" width="{max}" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                "#F9A8D4"
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
        }
    },
    '& .MuiSwitch-track': {
        marginLeft: '-.15vh',
        marginTop: '0.5vh',

        height: '2.75vh',
        opacity: 1,
        paddingBottom: '1vh',
        backgroundColor: "#F9A8D4",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10% bottom 50%",
       
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#FFF"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
    },
}));

export default CustomSwitch;
