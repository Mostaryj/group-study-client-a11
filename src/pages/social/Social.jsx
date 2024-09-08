import {  FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
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
    <div className="p-2">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleSocial(googleLogin)}
          className="btn border-2 border-emerald-600 hover:hover:bg-emerald-600 hover:text-white"
        >
                    Login with 

          <FaGoogle className="text-blue-600 h-6 w-6 hover:text-white" />
        </button>

       
      </div>
      
    </div>
  );
};

export default Social;
