import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AddProduct from '../Pages/AddProduct/AddProduct';
import AllProducts from '../Pages/AllProducts/AllProducts';
import Blog from '../Pages/Blog/Blog';
import Home from '../Pages/Home/Home';
import UpdateProduct from '../Pages/UpdateProduct/UpdateProduct';
import UserProducts from '../Pages/UserProducts/UserProducts';
import RestrictedRoute from './RestrictedRoute';
import Error from './../Pages/Error/Error';

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
                path: '/products/all',
                element: <RestrictedRoute><AllProducts /></RestrictedRoute>
            },
            {
                path: '/user/products/inventory',
                element: <RestrictedRoute><UserProducts /></RestrictedRoute>
            },
            {
                path: '/user/products/add_product',
                element: <RestrictedRoute><AddProduct /></RestrictedRoute>
            },
            {
                path: '/user/product/update/:_id',
                element: <RestrictedRoute><UpdateProduct /></RestrictedRoute>,
                loader: async ( { params } ) => fetch( `${ import.meta.env.VITE_SERVERADDR }/product/${ params._id }` )
            },
            {
                path: '/blog',
                element: <Blog />,
                loader: async () => fetch( `${ import.meta.env.VITE_SERVERADDR }/blogs/all` )
            },
            {
                path: '*',
                element: <Navigate to="error" />
            }
        ]
    },
    {
        path: 'error',
        element: <Error />
    }
] );

export default routes;