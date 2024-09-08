import {
    createBrowserRouter
  
  } from "react-router-dom";
import Root from "../layOut/Root";
 import Error from "../error/Error";
 import PrivateRoute from "./PrivateRoute"
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Details from "../pages/Home/CardSection/Details";
import Assignments from "../pages/Assignment/Assignments";
import CreateAssignment from "../pages/Assignment/CreateAssignment";
import Pending from "../pages/Assignment/Pending";
import AssignmentDetails from "../pages/Assignment/AssignmentDetails";
import Take from "../pages/Assignment/Take";
import My from "../pages/Assignment/My";
import Update from "../pages/Assignment/Update";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
       errorElement: <Error></Error>,
      children: [
       {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('/fakeData/fakeData.json')
       },
       {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: ()=>fetch('/fakeData/fakeData.json')
      },
      {
        path: '/assignments',
        element: <Assignments></Assignments>,
        loader: () => fetch("https://group-study-server-eight.vercel.app/study"),
      },
      {
        path: '/view/:id',
        element: <AssignmentDetails></AssignmentDetails>,
       loader: () => fetch('https://group-study-server-eight.vercel.app/study'),
      },

      {
        path: '/create',
        element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
      },
        
      {
        path: '/my',
        element: <PrivateRoute><My></My></PrivateRoute>,
        loader: () => fetch("https://group-study-server-eight.vercel.app/submit"),
       
      },
      
      {
        path: '/take/:id',
        element: <Take></Take>,
        loader: () => fetch('https://group-study-server-eight.vercel.app/study'),
      },
      {
        path: '/pending',
        element: <PrivateRoute><Pending></Pending></PrivateRoute>,
        loader: () => fetch("https://group-study-server-eight.vercel.app/submit"),

      },
      {
        path: "/update/:id",
        element: <Update></Update>,
        loader: ({ params }) => fetch(`https://group-study-server-eight.vercel.app/study/${params.id}`),
      }

      ]
    },
  ]);

  export default router;

  