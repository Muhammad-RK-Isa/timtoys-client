import React, { useContext } from 'react';
import { UserContext } from '../../Providers/AuthProvider/AuthProvider';
import { useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';


const RestrictedRoute = ({children}) => {

    const { user, loading, setLoading } = useContext( UserContext );
    const location = useLocation();

    if ( loading ) {
        // ? Scale Loader
        return <ScaleLoader color="#292726" className='bg-accent bg-opacity-30 p-10' />;
    }
    else if ( user ) {
        return children;
    }
    else {
        return <Navigate state={ { from: location } } to="/login" replace />;
    }
};

export default RestrictedRoute;