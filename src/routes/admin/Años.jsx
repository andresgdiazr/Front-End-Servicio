import { Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React, { useState } from "react";
import TablaBusqueda from "components/tables/GenericSearchTable";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const Años = () => {

    
	const [passwordEmailDialog, setPasswordEmailDialog] = useState(false);
	const [passwordEmailProfesorId, setPasswordEmailProfesorId] = useState(null);

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

    const añoActual =[
        {
            año: "2019-2020",
        },
        {
            año: "2020-2021",
        },
    ]

    return(
        <>
            <Typography variant="h2" sx={{mt:2}}>Administración de Años escolares</Typography>
            <Typography variant="outlined" >Año actual: {añoActual.slice(-1)[0].año}</Typography>

            <Button variant="contained" sx={{mt:2}} onClick={handleClickOpen}>
				Crear nuevo año
			</Button>

            <TablaBusqueda 

            datos={añoActual}
            formato={INFO_AÑO}
            acciones={createAcciones()}
            />



<Dialog
    
			open={open}
            onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
           
		>

        <DialogTitle
            sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor:'#ef5350'}}>
				
                <WarningAmberIcon sx={{color:'white', transform: 'scale(1.25)'}} />
		</DialogTitle>

            
           

			<DialogContent  sx={{display:'flex', alignItems:'center',justifyContent:'center',padding:1, 
        backgroundColor:'#ef5350'
        }} >
            
			<DialogContentText sx={{p:1.5}} >      

            <Typography variant="body2" sx={{color:'white'}}>	
            Esta apunto de crear un nuevo año escolar, toda la información del año actual será eliminada del sistema
                </Typography>	
			</DialogContentText>

           
			</DialogContent >
			<DialogActions  sx={{backgroundColor:'#ef5350'}} >
				<Button
                variant='outlined'
                    sx={{color:'white', border:'solid 0.5px white'}}
                    onClick={() => navigate("modificar")}
				>
					Continuar
				</Button>
			</DialogActions>
		</Dialog>
        </>
    )
}

function createAcciones() {

    const navigate = useNavigate();

	return ({ cell }) => {

		return (
			<>
				<EditIcon	
                onClick = { () => {navigate("modificar")}}
				/>
			</>
		);
	};
}

const INFO_AÑO = [
	{
		Header: "Año escolar",
		accessor: "año",
	},
	{
		Header: "Acciones",
		accessor: "acciones",
	},
];