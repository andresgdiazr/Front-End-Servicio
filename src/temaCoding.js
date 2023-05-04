import { createTheme } from '@mui/material/styles';
import { purple, lightBlue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: lightBlue[900]
        },
        secondary: {
            main: purple[900]
        }
    },
    components: {
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
