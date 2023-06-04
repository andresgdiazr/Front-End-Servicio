import React from "react";
import { Box, Paper } from "@mui/material";

function CenteredPaper({ children }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexBasis: "content",
          margin: { xs: "1rem 0rem", sm: "1rem 1rem", md: "1rem 2rem" },
          justifyContent: { xs: "flex-start", md: "center" },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: { xs: "0.5rem", sm: "1rem", md: "2rem" },
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            maxWidth: "1000px",
            rowGap: "1rem",
            "& Button, & a": {
              alignSelf: "flex-start",
            },
          }}
        >
          {children}
        </Paper>
      </Box>
    </>
  );
}

export default CenteredPaper;
