import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import {Menu} from '@mui/icons-material'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme =>({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    endText:{

        flexGrow:3,
        display: 'flex',
        alignItems:'center',
    },    
}))

const Navbar = ({names}) =>{
    const classes = useStyles()
    return(
        <div>
            <h1>wow</h1>
          <AppBar position='fixed' color="primary">
            <Toolbar>
               <Box className={classes.endText}>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>
                {
                    names.map( (name,idx ) => {
                       return <Typography key={idx} variant="h6" className={classes.menuButton} >{name[0]}</Typography>
                    })
                }
                </Box>
                <Typography variant="h6" className={classes.menuButton}> 
                    Mi cuenta
                </Typography>
                <Typography variant="h6" >
                    Cerrar Sesión
                </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.offset}></div>
        </div>
    )
}

export default Navbar;