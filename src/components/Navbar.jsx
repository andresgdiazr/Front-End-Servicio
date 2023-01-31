import React from 'react'
import { Box, AppBar, Icon, Toolbar, Typography, makeStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

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
          <AppBar position='fixed' color="primary">
          
            <Toolbar>
               
               <Box className={classes.endText}>

               
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
             
                

                {
                    names.map(name => {
                   
                       return <Typography variant="h6" onClick={name[1]} className={classes.menuButton} >{name[0]}</Typography>
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
          <div ClassName={classes.offset}></div>
        </div>
    )
}

export default Navbar;