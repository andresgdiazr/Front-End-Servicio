import { Navigate, useRouteError } from "react-router-dom";


const environment = import.meta.env.MODE;

export default function PaginaError() {
  const error = useRouteError();
  if(  environment === 'production'  )  {
    return  <Navigate to="/login" replace={true} /> ; 
  }
  console.error(error);
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
