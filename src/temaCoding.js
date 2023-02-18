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
    }
})

export default theme;
