import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
// import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { createUser, user, setUser } = useAuth();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
      const { email, password, fullName, photoURL } = data;

    createUser(email, password)
      .then((result) => {
        console.log(result);
        toast.success("Registration successfully");
    
        const profileUpdates = {
          displayName: fullName,
          photoURL: photoURL,
        };

        updateProfile(result.user, profileUpdates)
          .then(() => {
           
            setUser({
              ...user,
              displayName: fullName,
              // email: email ,
              photoURL: photoURL,
            });
          })
          .catch((error) => {
            console.error("Error updating profile", error);
          });


        navigate(from);

        })

      

      .catch((error) => {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      });



  };

  return (
    <div>
      {/* <Helmet>
        <title>Luxury Retreats | Register</title>
      </Helmet> */}
    
      <div className="hero   bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register</h1>
          </div>
          <div className="card shrink-0 max-w-sm  shadow-2xl bg-base-100 md:w-[400px]">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input
                  type="photoURL"
                  name="photoURL"
                  placeholder="PhotoURL"
                  className="input input-bordered"
                  {...register("photoURL")}
                />
              </div>
              <div className="form-control ">
                <label className="label ">
                  <span className="label-text ">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered  relative"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  })}
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute ml-44 md:ml-72 mt-14"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <span className="text-red-500">
                    {" "}
                    Password must be at least 6 characters long and contain at
                    least one uppercase and one lowercase letter
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-blue-800 text-white"
                >
                  Register Now
                </button>
              </div>
            </form>

            <p className="text-center  p-4">
              Already have an account?{" "}
              <Link to="/login">
                {" "}
                <span className="text-blue-600">Login now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
