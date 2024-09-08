import { useForm } from "react-hook-form";
import Social from "../social/Social";
import useAuth from "../../Hook/useAuth";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import img from "../../assets/login.avif";

const Login = () => {
  const { signInUser } = useAuth();
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
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        toast.success("Login successful", result);

        //  const user = {email};
        navigate(from);
      })
      .catch((error) => {
        toast.error(
          "Failed to login. Please check your email or password.",
          error
        );
      });
  };

  return (
    <div>
      <Helmet>
        <title>StudyHub | Login</title>
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

          <div className="w-full md:w-1/2">            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-emerald-600">Login Now!</h1>
            </div>
            <div className=" max-w-sm  mx-auto border-2 rounded-lg p-4 mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="">
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
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute mt-14 ml-48 sm:ml-56"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control mt-4">
              <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-800 text-white">
                  Login
                </button>
              </div>
            </form>
            <p className="font-medium"> <span className="divider">OR</span></p>
              <Social></Social>
              <p className="text-center p-2 font-medium">
                New here?{" "}
                <Link to="/register">
                  <span className="text-blue-600">Create a account</span>
                </Link>
              </p>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Login;
