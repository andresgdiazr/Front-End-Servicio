import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import GoBackButton from '../../components/atoms/GoBackButton'
import EvaluacionesTable from '../../components/tables/EvaluacionesTable'

function MateriaEvaluaciones() {
  return (
    <div>
      <GoBackButton to="prev" />

      <Link to="crear" >
        <Button variant='contained' > Crear Evaluacion </Button>
      </Link>

      <EvaluacionesTable />
    </div>
  )
}

export default MateriaEvaluaciones