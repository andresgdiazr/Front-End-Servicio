import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { getNotasOfSeccion } from "api/getNotasOfSeccion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "store/features/main";
import { useSeccionData } from "store/features/navigationData";
import * as ExcelJS from "exceljs";
import SeccionesTitles from "components/SeccionesTitles";

function NotasDeSeccion() {
  const [lapso, setLapso] = useState(1);

  const seccion = useSeccionData();

  const dispatch = useDispatch();

  const download = async () => {
    dispatch(setLoading(true));
    const data = await getNotasOfSeccion({lapso, seccionId: seccion.id});


    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Notas");

    // Add data to the sheet
    sheet.columns = data.headers

    for(const row of data.rows){
      sheet.addRow(row)
    }

    // Get the buffer data
    const excelData = await workbook.xlsx.writeBuffer();

    const b = new Blob([excelData], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = URL.createObjectURL(b);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notas-seccion-${seccion.año}-${seccion.codigo}-lapso-${lapso}.xlsx`; 

    link.click();
    URL.revokeObjectURL(url);



    dispatch(setLoading(false))
  }

  return (
    <>
      <SeccionesTitles newSubtitle="Descarga de notas"></SeccionesTitles>

      <FormControl>
        <InputLabel id="lapso-select"> Lapso </InputLabel>

        <Select
          labelId="lapso-select"
          value={lapso}
          label="Lapso"
          onChange={(e) => {
            setLapso(e.target.value);
          }}
        >
          <MenuItem value={1}>Primer Lapso</MenuItem>
          <MenuItem value={2}>Segundo Lapso</MenuItem>
          <MenuItem value={3}>Tercer Lapso</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={download} variant="contained" > Descargar </Button>
    </>
  );
}

export default NotasDeSeccion;
