import { css } from "@emotion/react";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
function SelectInput({
	id,
	label,
	error,
	options = [],
	onChange = () => null,
	value,
	inputRef,
}) {
	return (
		<div // TODO editar MUI css?
		>
			<Typography>{error}</Typography>
			<Typography variant="body2">{label}</Typography>
			
			<FormControl fullWidth>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {options.map(({ value, display }) => {
							return (
								<MenuItem key={value} value={value}>
									{display}
								</MenuItem>
							);
						})}
        </Select>
      </FormControl>

		
			
		</div>
	);
}

export default SelectInput;
