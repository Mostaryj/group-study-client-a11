import {  FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Social = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state || "/";

  const handleSocial = (socialProvider) => {
    socialProvider()
    .then((result) => {
       if (result) {
     toast.success( "login successful!");
      
        navigate(from);
       }
    });
  };


  return (
    <div className="p-4">
      <p className="text-center"> Or, </p>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleSocial(googleLogin)}
          className="btn btn-outline "
        >
          <FaGoogle className="text-blue-600" />
          Login with Google
        </button>

       
      </div>
      <p className="text-center p-2">
        Do not have an account?{" "}
        <Link to="/register">
          {" "}
          <span className="text-blue-600">Register Now</span>
        </Link>
      </p>
    </div>
  );
};

export default Social;
