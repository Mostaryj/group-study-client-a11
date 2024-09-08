import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import img from "../../assets/login.avif"
import Social from "../social/Social";
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
        // console.log(result);
        toast.success("Registration successful");

        const profileUpdates = {
          displayName: fullName,
          photoURL: photoURL,
        };

        updateProfile(result.user, profileUpdates)
          .then(() => {
            setUser({
              ...user,
              displayName: fullName,
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
      <Helmet>
        <title>StudyHub | Register</title>
      </Helmet>

      <div className="mt-10 mb-4 flex items-center justify-center bg-base-100">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 rounded-lg">
          {/* Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={img}
              alt="Register Image"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-emerald-600">Register Now!</h1>
            </div>
            <div className=" max-w-sm  mx-auto border-2 rounded-lg p-4 mt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="font-medium mb-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Name"
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
                    placeholder="Email"
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
                    type="text"
                    name="photoURL"
                    placeholder="Photo URL"
                    className="input input-bordered"
                    {...register("photoURL")}
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    })}
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-12 cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  {errors.password && (
                    <span className="text-red-500">
                      Password must be at least 6 characters long and contain at
                      least one uppercase and one lowercase letter
                    </span>
                  )}
                </div>
                <div className="form-control mt-4">
                  <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-800 text-white">
                    Register Now
                  </button>
                </div>
              </form>
             
              <p className="font-medium"> <span className="divider">OR</span></p>
              <Social></Social>
              <p className="text-center p-2 font-medium">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-600">Login now</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
