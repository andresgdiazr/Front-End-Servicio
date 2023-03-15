import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";

function SelectInput({
  id,
  label,
  error,
  options = [],
  onChange = () => null,
  value,
  inputRef
}) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1.3fr;
        grid-template-rows: auto auto;
        margin-bottom: 0.8rem;

        column-gap: 1rem;
        align-items: center;

        grid-template-areas:
          "none error"
          "label input";

        label {
          justify-self: end;
          font-size: 1.05rem;
          grid-area: label;
        }

        select {
          width: 350px;
          font-size: 1.05rem;
          padding: 0.6rem 1rem;
          border-radius: 3px;
          border: 1px solid #333;
          grid-area: input;
        }

        p {
          display: flex;
          align-items: flex-end;
          height: 1rem;
          font-size: 0.9rem;
          color: #cc0000;
          grid-area: error;
        }
      `}
    >
      <Typography>{error}</Typography>
      <label htmlFor={id}> {label} </label>
      <select
        ref={inputRef}
        value={value}
        name="pets"
        id="pet-select"
        onChange={(ev) => onChange(ev.target.value)}
      >
        {options.map(({ value, display }) => {
          return (
            <option key={value} value={value}>
              {display}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectInput;
