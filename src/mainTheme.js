import { createTheme } from '@mui/material/styles';
import { purple, lightBlue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: lightBlue[900]
        },
        secondary: {
            main: purple[900]
        },
        // Here it is possible to define the colors of the alerts
        /*
        success: {
            main: "#04aa6d",
        },
        error: {
            main: "#f44336",
        },
        warning: {
            main: "#ff9800",
        },
        info: {
            main: "#2196f3",
        },
        */
    },
    typography: {
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        fontFamily: '"Roboto", "Helvetica", sans-serif',
        h1: {
            fontSize: "1.8rem",
            fontWeight: 400,
        },
        h2: {
            fontSize: "1.5rem",
            fontWeight: 400,
        },
        h3: {
            fontSize: "1.3rem",
            fontWeight: 400,
        },
        h4: {
            fontSize: "1.2rem",
        },
        h5: {
            fontSize: "1.1rem",
        },
        h6: {
            fontSize: "1rem",
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                underlineNone: {
                    color: "black",
                    fontWeight: 500,
                    "&:hover": {
                        color: "#01579b",
                    },
                },
                underlineHover: {
                },
                underlineAlways: {
                    color: "#000000",
                },
            },
            defaultProps: {
                underline: "none",
                fontFamily: '"Roboto", "Helvetica", sans-serif',
                fontSize: "1.14rem",
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    color: "white",
                    fontSize: "1.2rem",
                    '& svg': {
                        color: "white",
                    },
                },
            },
        },
        MyCustomForm: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1.5rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                    '& Button': {
                        alignSelf: "center",
                        marginTop: "1rem",
                    },
                    '& > div': {
                        minWidth: "400px",
                        marginBottom: "1rem",
                    }
                },
            },
        },
    }
})

export default theme;
