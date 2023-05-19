import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateUser from './Components/CreateUser.jsx';
import UpdateUser from './Components/UpdateUser.jsx';
import Home from './Components/Home.jsx';


const routes = createBrowserRouter( [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch('http://192.168.0.179:5000/users')
      },
      {
        path: '/create_user',
        element: <CreateUser />
      },
      {
        path: '/update_user/:id',
        element: <UpdateUser />,
        loader: ({params}) => fetch(`http://192.168.0.179:5000/user/${params._id}`)
      }
    ]
  }
] );


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <RouterProvider router={ routes } />
  </React.StrictMode>,
);
