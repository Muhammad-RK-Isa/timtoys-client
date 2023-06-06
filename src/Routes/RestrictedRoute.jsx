import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Providers/AuthProvider/AuthProvider';
import Loader from '../Shared/Loader/Loader';

const RestrictedRoute = ( { children } ) => {
    const { user, setOpenLoginPopUp, loading } = useContext( UserContext );
    const location = useLocation();
    const next = location.pathname || '/';

    const [ isUserLoaded, setIsUserLoaded ] = useState( false );

    useEffect( () => {
        // Check if the user is loaded and set the flag accordingly
        if ( !loading ) {
            setIsUserLoaded( true );
        }
    }, [ loading ] );

    if ( !isUserLoaded ) {
        // Show loader or loading state while user data is being fetched
        return <Loader />;
    }

    if ( user ) {
        return children;
    } else {
        setOpenLoginPopUp( true );
        return <Navigate to={ next } replace={ true } />;
    }
};

export default RestrictedRoute;
