import { useDispatch, useSelector } from "react-redux";
import { hasLoginnedUserAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  // if (!loggedInUser) {
  //   dispatch(hasLoginnedUserAsync());
  // }
  if (!loggedInUser) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
