import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
 
  const location = useLocation();

  if(loading){
    return <div className="flex justify-center mt-10 items-center"><span className="loading loading-spinner loading-lg "></span></div>

  }



  if (!user) {
    return <Navigate to="/login" state={location?.pathname || "/"}></Navigate>;
  }
 
  return <div>
    {children}
    </div>;





};

export default PrivateRoute;
