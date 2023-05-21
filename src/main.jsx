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
import Error from './Pages/Error/Error.jsx';
import RestrictedRoute from './Routes/RestrictedRoute/RestrictedRoute.jsx';
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx';


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
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/product/:_id',
        element: <RestrictedRoute><ProductDetails /></RestrictedRoute>,
        loader: ({params}) => fetch(`http://192.168.0.179:5000/product/${params._id}`)
      },
      {
        path: '*',
        element: <Error />
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
