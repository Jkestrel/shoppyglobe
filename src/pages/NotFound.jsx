import { Link, useRouteError } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>{error?.statusText || "The page you are looking for does not exist."}</p>

      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
