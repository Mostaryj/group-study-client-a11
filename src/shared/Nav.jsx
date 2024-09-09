import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { useEffect, useState } from "react";
import icon from "../assets/book.png";

const Nav = () => {
  const { logOut, user } = useAuth();

  // console.log(user);

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };



  const navLinks = (
    <>
      <li className="md:font-semibold lg:text-lg">
        <Link to="/">Home</Link>
      </li>
      <li className="md:font-semibold lg:text-lg">
        <Link to="/assignments">All Assignments</Link>
      </li>
      {user && (
        <li className="md:font-semibold lg:text-lg">
          <Link to="/create">Create Assignments</Link>
        </li>
      )}

      {user && (
        <li className="md:font-semibold lg:text-lg">
          <Link to="/pending">Pending Assignments</Link>
        </li>
      )}
   

    </>
  );

  return (
<div className="">
<div className="navbar fixed top-0 z-50 w-full bg-base-100 bg-opacity-90">
        <div className="navbar-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost sm:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <p className=" font-bold text-lg lg:text-2xl  sm:flex items-center justify-center text-emerald-600 dark:text-green-500 bg-clip-text">
            <span>
              <img src={icon} alt="" className="w-10 h-10 hidden lg:block mr-2" />
            </span>
            StudyHub
          </p>
        </div>
        <div className="navbar-center  hidden sm:block  lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 ">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
             
            <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-1  shadow bg-base-100 rounded-box  -mr-16"
            >
              <li className=" mb-2">
                <NavLink to="/my">My Submission</NavLink>
              </li>
              <li>
                <button
                  className="btn text-white bg-red-500 hover:bg-red-800 w-full"
                  onClick={logOut}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>

          ) : (
    

            <div className="flex gap-2">
              <Link to="/login">
                <button className=" hover:border-b-2  font-medium">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className=" hover:border-b-2  font-medium">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
        <label className="cursor-pointer grid place-items-center ml-1">
          <input
            onChange={handleToggle}
            type="checkbox"
            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
          />
          <svg
            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Nav;
