import { css, Typography } from '@mui/material'
import React from 'react'

function EmptyTableRow({rows,headerGroups,message}) {

  if(  rows.length == 0) {
    return (
      <tr>
        <td colSpan={headerGroups[0].headers.length}>
          <div
            css={css`
              width:100%;
              p {
                text-align:center;
                font-size:1.2rem;
                color:gray;
                padding:0.5rem 0;
              }
            `}
          >
            <Typography>{message}</Typography>
          </div>
        </td>
      </tr>
    )
  } else {
    return null
  }

}

export default EmptyTableRow