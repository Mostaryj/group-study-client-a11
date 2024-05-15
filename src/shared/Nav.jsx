import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hook/useAuth";
// import { renderToString } from "react-dom/server";
import { useEffect, useState } from "react";
//  import ReactTooltip from 'react-tooltip';
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

  // const tooltipContent = <>{user?.displayName || "User name not found"}</>;

  // const tooltipString = renderToString(tooltipContent);

  const navLinks = (
    <>
      <li className="font-semibold " data-tip="Tooltip for Home">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/assignments">Assignments</NavLink>
      </li>
      {user && (
        <li className="font-semibold">
          <NavLink to="/create">Create Assignments</NavLink>
        </li>
      )}

      {user && (
        <li className="font-semibold">
          <NavLink to="/pending">Pending Assignments</NavLink>
        </li>
      )}
   

    </>
  );

  return (
    <div className="">
      <div className="navbar   border-b-2 ">
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
          <a className="font-pop font-semibold lg:text-2xl  sm:flex items-center justify-center text-blue-800 bg-clip-text">
            <span>
              <img src={icon} alt="" className="w-10 h-10 hidden lg:block " />
            </span>
            StudyHub
          </a>
        </div>
        <div className="navbar-center  hidden sm:block md:flex lg:flex">
          <ul className="menu menu-horizontal   px-1 gap-2">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (

            
            // <div className="dropdown dropdown-end ">
            //   <label
            //     tabIndex={0}
            //     className="tooltip tooltip-bottom mr-4  btn btn-ghost  btn-circle avatar"
            //     // data-tip={tooltipString}
            //   >
            //     <div className="w-12 rounded-full ">
            //       <img
            //         src={
            //           user?.photoURL ||
            //           "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            //         }
            //       />
            //     </div>
            //     <li className="font-semibold mt-10 w-20 bg-slate-200">
            //       <NavLink to="/my"> My Submission</NavLink>
            //     </li>
                
                 
               

            //     <button
            //       className="btn text-white absolute mt-6 right-0 p-2 rounded-md shadow-md opacity-0 hover:opacity-100 transition-opacity hover:bg-blue-800 duration-300"
            //       onClick={logOut}
            //     >
            //       LogOut
            //     </button>
            //   </label>
            // </div>
             
            <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
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
                  className="btn text-white bg-red-500 w-full"
                  onClick={logOut}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>

          ) : (
    

            <div className="flex ">
              <Link to="/login">
                <button className="btn bg-emerald-600  text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn bg-emerald-600 text-white">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
        <label className="cursor-pointer grid place-items-center ">
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
