import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {css} from '@emotion/react'

import {  ArrowBack } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Navbar from '../components/Navbar'

function ProfesorEvaluaciones() {
  const {state:{materia}} = useLocation()
  const navigate = useNavigate()

  useEffect( ()=>  {
    if(!materia) {
      navigate('/dashboard-profesor')
    }
  } )

  return (
    <div>
      <Navbar names={[]} />
      <div>
        
        <ArrowBack  fontSize='large' />  <Link to="/dashboard-profesor"> <Typography> Volver </Typography> </Link>  


      </div>
    </div>
  )
}

export default ProfesorEvaluaciones