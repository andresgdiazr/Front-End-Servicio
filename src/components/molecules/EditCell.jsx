import { css } from "@emotion/react";
import { Cancel, Check, Edit } from "@mui/icons-material";
import React, { useState } from "react";

function EditCell({ editedValue, cell, onChange = () => null }) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <div // TODO editar MUI css?
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          margin-left: 0.5rem;
          cursor: pointer;
        }

        ${editedValue !== null ? "color:magenta;" : ""}

        input {
          width: 2rem;
        }
      `}
    >
      {editMode ? (
        <>
          <input
            type="number"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            min="0"
            max="20"
          />
          <Check
            onClick={() => {
              onChange(value);
              setEditMode(false);
            }}
          />
          <Cancel
            onClick={() => {
              setEditMode(false);
            }}
          />
        </>
      ) : editedValue ? (
        <>
          <div> {editedValue} </div>
          <Edit onClick={() => setEditMode(true)} />
        </>
      ) : (
        <>
          {cell.render("Cell")}
          <Edit onClick={() => setEditMode(true)} />
        </>
      )}
    </div>
  );
}

export default EditCell;
