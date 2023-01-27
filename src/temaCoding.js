import {createTheme} from '@material-ui/core/styles'
import  purple from '@material-ui/core/colors/purple' 
import lightGreen  from '@material-ui/core/colors/lightGreen'
import { lightBlue } from '@material-ui/core/colors';

const theme = createTheme({
    palette:{
        primary:{
            main: lightBlue[900]
        },
        secondary:{
            main: purple[900]
        }
    }
})

export default theme;
