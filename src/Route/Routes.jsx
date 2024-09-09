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
import AssignmentDetails from "../pages/Assignment/AssignmentDetails";
import TakeAssignment from "../pages/Assignment/TakeAssignment";
import MySubmitted from "../pages/Assignment/MySubmitted";
import UpdateAssignment from "../pages/Assignment/UpdateAssignment";
import PendingAssignment from "../pages/Assignment/PendingAssignment";



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
        element: <PrivateRoute><MySubmitted></MySubmitted></PrivateRoute>,
        loader: () => fetch("https://group-study-server-eight.vercel.app/submit"),
       
      },
      
      {
        path: '/take/:id',
        element: <TakeAssignment></TakeAssignment>,
        loader: () => fetch('https://group-study-server-eight.vercel.app/study'),
      },
      {
        path: '/pending',
        element: <PrivateRoute><PendingAssignment></PendingAssignment></PrivateRoute>,
        loader: () => fetch("https://group-study-server-eight.vercel.app/submit"),

      },
      {
        path: "/update/:id",
        element: <UpdateAssignment></UpdateAssignment>,
        loader: ({ params }) => fetch(`https://group-study-server-eight.vercel.app/study/${params.id}`),
      }

      ]
    },
  ]);

  export default router;

  