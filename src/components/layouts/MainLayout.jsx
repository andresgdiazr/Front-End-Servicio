import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Box, Paper } from "@mui/material";

function MainLayout({ routes }) {
  return (
    <>
      <Navbar names={routes} />
      <Box
        sx={{
          display: "flex",
          flexBasis: "content",
          margin: { xs: "1rem 0rem", sm: "1rem 1rem", md: "1rem 2rem" },
          maxWidth: "1600px",
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
          <Outlet />
        </Paper>
      </Box>
    </>
  );
}

export default MainLayout;
