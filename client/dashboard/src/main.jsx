import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Homepage from './pages/home/Homepage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
