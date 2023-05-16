import { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const environment = import.meta.env.MODE;

export default function PaginaError() {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      environment === "production" &&
      location.pathname !== "/login" &&
      location.pathname !== "/"
    ) {
      navigate(location.pathname.split("/").slice(0, -1).join("/") || "/", {
        replace: true,
      });
    }
  }, [navigate, location]);

  if (environment === "production") {
    return null;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
