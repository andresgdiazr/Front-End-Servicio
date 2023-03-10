import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";

function Overlay({ children, show, onShowChange = () => null }) {
  const [showInternal, setShowInternal] = useState(show);

  useEffect(() => {
    setShowInternal(show);
  }, [show]);

  return (
    <div
      className="overlay-root"
      onClick={(ev) => {
        if (ev.target.className.split(" ").includes("overlay-root")) {
          setShowInternal(false);
          onShowChange(false);
        }
      }}
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1200;
        background-color: rgba(0, 0, 0, 0.5);
        display:flex;
        justify-content:center;
        align-items:center;
        ${!showInternal && "display:none;"}
      `}
    >
      {children}
    </div>
  );
}

export default Overlay;
