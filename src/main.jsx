import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './Scrollbar.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './Providers/AuthProvider/AuthProvider.jsx';
import { Helmet } from 'react-helmet';
import Home from './Pages/Home/Home.jsx';
import { ThemeProvider } from "@material-tailwind/react";
import Login from './Pages/Login/Login.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';


const routes = createBrowserRouter( [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      }
    ]
  }
] );


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <AuthProvider>
    <Helmet>
      <title>TimToys</title>
    </Helmet>
    <ThemeProvider>
      <RouterProvider router={ routes } />
    </ThemeProvider>
  </AuthProvider>,
);
