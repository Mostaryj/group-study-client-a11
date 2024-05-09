import { Link } from "react-router-dom";

import error from "../assets/error.jpg"

const Error = () => {
  return (
    <div>
     
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center font-bold lg:text-5xl mb-4">
          Page not found <br /> Enter the right path
        </h1>
        <Link to="/">
          <button className="btn bg-blue-500 text-white">Go Back</button>
        </Link>
      </div>
     <img src={error} alt="" 
      className="w-[550px] h-[300px] border-2 mt-4 rounded-lg mb-4 mx-auto"
     />
     
    </div>
  );
};

export default Error;
