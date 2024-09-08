import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Hook/useAuth";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";

const Root = () => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center mt-10 items-center">
        <span className="loading loading-spinner loading-lg "></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto px-2 sm:px-0">
        <Nav></Nav>
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
      <ToastContainer></ToastContainer>
      <Footer></Footer>
    </div>
  );
};

export default Root;
