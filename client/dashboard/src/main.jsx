import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import LoginPage from './pages/login/LoginPage.jsx';
import Setting from './pages/home/Setting.jsx';


const authHome = () => {
  const access_token = localStorage.access_token
  if(!access_token) {
    throw redirect('/login')
  }
  return null
}
const authLogin = () => {
  const access_token = localStorage.access_token
  if(access_token) {
    throw redirect('/')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>,
    loader:authLogin
  },
  {
    path: "/",
    element: <App/>,
    loader:authHome
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
