import { Select, MenuItem, Button} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateSeccion } from "../../api/updateSeccion";


function SeccionModificar(){

    const [año,setAño]=useState("  ");
    const [codigo, setCodigo]=useState("   ");

    const { id }= useParams();
    
    const handleSubmit = async (e) =>{

        e.preventDefault();


        let response = await UpdateSeccion(id,{año,codigo});

       
    }

    return(
        <>
        <h2>Administración de secciones</h2>
        <h3>Área de modificación</h3>

        <form id="login" method="post"  onSubmit={handleSubmit}>

                <p className="item">
                <label htmlFor="nombre"> Año </label>
                <Select
		        		labelId="demo-simple-select-label"
		        		id="demo-simple-select"
		        		label="año"
                value={año}
		        		onChange={(e) => setAño(e.target.value)}
		        	  >
		        		<MenuItem value={1}>1</MenuItem>
		        		<MenuItem value={2}>2</MenuItem>
		        		<MenuItem value={3}>3</MenuItem>
		        		<MenuItem value={4}>4</MenuItem>
		        		<MenuItem value={5}>5</MenuItem>
		        	  </Select>


                </p>

                <p className="item">
                <label htmlFor="nombre"> Sección </label>
                <Select
		        		labelId="demo-simple-select-label"
		        		id="demo-simple-select"
		        		label="año"
                        value={codigo}
		        		onChange={(e) => setCodigo(e.target.value)}
		        	  >
		        		<MenuItem value={"A"}>A</MenuItem>
		        		<MenuItem value={"B"}>B</MenuItem>
		        		<MenuItem value={"C"}>C</MenuItem>
		        		<MenuItem value={"D"}>D</MenuItem>
		        	  </Select>
            
            
                </p>

                <p className="item">
                    <Button variant="contained" type="submit">
                     {" "}
                     Guardar y Enviar{" "}
                    </Button>
                </p>
        </form>
        </>
    );
}

export default SeccionModificar;