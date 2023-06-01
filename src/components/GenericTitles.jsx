import React from "react";
import { Typography } from "@mui/material";

function GenericTitles({ title, prevSubtitles = [], newSubtitle }) {
  function RenderPrevSubtitles() {
    return prevSubtitles.map((subtitle, i) => (
      <Typography
        key={i}
        variant="h3"
        sx={{ marginBottom: "-0.8rem", fontSize: "14px", color: "#6F6F6F" }}
      >
        {subtitle}
      </Typography>
    ));
  }

  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: "-0.8rem" }}>
        {title}
      </Typography>

      {RenderPrevSubtitles()}

      {newSubtitle ? (
        <Typography variant="h2" sx={{ marginTop: "1rem" }}>
          {newSubtitle}
        </Typography>
      ) : null}
    </>
  );
}

export default GenericTitles;
