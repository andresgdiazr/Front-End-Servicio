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
        // TODO descomentar y modificar colores aqui, ademas se pueden agregar mas
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
        h1: {
            fontSize: "1.8rem",
        },
        h2: {
            fontSize: "1.5rem",
        },
        h3: {
            fontSize: "1.3rem",
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
                        minWidth: "230px",
                        marginBottom: "1rem",
                    }
                },
            },
        },
    }
})

export default theme;
