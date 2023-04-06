import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearCuentaProfesor } from "../../api/crearCuentaProfesor";
import GoBackButton from "../../components/atoms/GoBackButton";
import ProfesorForm from "../../components/organisms/ProfesorForm";
import { setLoading } from "../../store/features/main";

function ProfesorCrear() {

  const navigate = useNavigate()

  const [usedEmails,setUsedEmails] = useState([])
  const [usedCedulas,setUsedCedulas] = useState([])

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    dispatch(setLoading(true))
    const response = await crearCuentaProfesor(data)    
    if (response.status == 200) {
      dispatch(setLoading(false))
      navigate(-1)
    }else {
      if( response.data.errors.some( error => error.field === 'email' && error.rule === 'unique' ) ) {
        setUsedEmails([...usedEmails,data.email])
      }      
      if( response.data.errors.some( error => error.field === 'cedula' && error.rule === 'unique' ) ) {
        setUsedCedulas([...usedCedulas,data.cedula])
      }      

      dispatch(setLoading(false))
    }


    


  };

  return (
    <div>
      <GoBackButton to="prev" />
      <h2>Administración de profesores</h2>
      <h3>Creacion de cuenta</h3>

      <ProfesorForm onSubmit={onSubmit} usedEmails={usedEmails} usedCedulas={usedCedulas}/>
    </div>
  );
}

export default ProfesorCrear;
