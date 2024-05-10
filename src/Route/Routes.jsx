import {
    createBrowserRouter
  
  } from "react-router-dom";
import Root from "../layOut/Root";
 import Error from "../error/Error";
 import PrivateRoute from "./PrivateRoute"
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Details from "../pages/Home/section/Details";
import Assignments from "../pages/Assignment/Assignments";
import CreateAssignment from "../pages/Assignment/CreateAssignment";
import Pending from "../pages/Assignment/Pending";
import AssignmentDetails from "../pages/Assignment/AssignmentDetails";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
       errorElement: <Error></Error>,
      children: [
       {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('/public/fakeData/fakeData.json')
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
        loader: ()=>fetch('/public/fakeData/fakeData.json')
      },
      {
        path: '/assignments',
        element: <Assignments></Assignments>,
       loader: () => fetch("http://localhost:5000/study"),
      },
      {
        path: '/view/:id',
        element: <AssignmentDetails></AssignmentDetails>,
       loader: () => fetch('http://localhost:5000/study'),
      },
      {
        path: '/create',
        element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
      },
      {
        path: '/pending',
        element: <PrivateRoute><Pending></Pending></PrivateRoute>
      }

      ]
    },
  ]);

  export default router;