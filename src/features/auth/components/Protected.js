import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const loggedInUser = useSelector(selectLoggedInUser);
  if (!loggedInUser) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
