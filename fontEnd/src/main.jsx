import * as React from "react"
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import UserHome from "./components/userComp/UserHome.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:"/user/:query",
    element: <UserHome/>
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

