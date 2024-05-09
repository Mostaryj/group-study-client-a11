import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import router from './Route/Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


  <AuthProvider>
  {/* <HelmetProvider> */}
  <RouterProvider router={router} ></RouterProvider>

    {/* </HelmetProvider> */}

  </AuthProvider>
      

  </React.StrictMode>,
)
