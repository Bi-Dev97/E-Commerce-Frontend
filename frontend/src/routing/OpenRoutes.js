import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorage?.token === undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  ); /**The replace options property is a REPLACE navigation action. It's a redirect,
   replacing the current entry in the history stack versus PUSHing a new entry onto the top like a regular navigation. */
};