import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextField, Button, FormControl } from "@mui/material";
import CustomForm from "../CustomForm";

export default function SeccionForm({ especial = false }) {
  const [año, setAño] = React.useState("");
  const [habilitado, setHabilitado] = React.useState(true);
  const handleChange = (e) => {
    setAño(e.target.value);
  };

  const [codigo, setCodigo] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // llamar a la api
  };

  return (
    /* TODO falta terminar */
    <CustomForm onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel id="select-label">Año</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={año}
          label="Año"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="outlined-basic"
        label="Sección"
        variant="outlined"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <Button size="large" variant="contained" color="success">
        Crear sección
      </Button>
    </CustomForm>
  );
}
