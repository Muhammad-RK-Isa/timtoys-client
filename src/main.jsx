import { ThemeProvider } from "@material-tailwind/react";
import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Error from './Pages/Error/Error.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import AuthProvider from './Providers/AuthProvider/AuthProvider.jsx';
import RestrictedRoute from './Routes/RestrictedRoute/RestrictedRoute.jsx';
import './Scrollbar.css';
import './index.css';


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
        loader: ( { params } ) => fetch( `https://tim-toys-server.vercel.app/product/${ params._id }` )
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
