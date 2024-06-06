import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import LoginPage from './pages/login/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: "/",
    element: <App/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
