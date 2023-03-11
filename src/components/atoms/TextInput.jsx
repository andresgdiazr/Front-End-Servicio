import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";

function TextInput({ label, placeholder, id, reactHookProps = {} , error}) {

  return (
    <div
      css={css`
        display:grid;
        grid-template-columns: 1fr 1.3fr;
        grid-template-rows: auto auto;

        margin-bottom:0.8rem;

        grid-template-areas:
        "none error"
        "label input";
    

        column-gap: 1rem;
        align-items:center;


        input {
          width:300px;
          font-size:1.05rem;
          padding: 0.6rem 1rem;
          border-radius:3px;
          border: 1px solid #333;
          grid-area:input;
        }
        label {
          justify-self:end;
          font-size:1.05rem;
          grid-area:label;

        }
        
        p {
          display:flex;
          align-items:flex-end;
          height:1rem;
          font-size:0.9rem;
          color:#cc0000;
          grid-area:error;

        }

      `}
    >

      <Typography>{error}</Typography>
      <label htmlFor={id}>{label}</label>
      <input placeholder={placeholder} type="text" id={id} {...reactHookProps} />
    </div>
  );
}

export default TextInput;
