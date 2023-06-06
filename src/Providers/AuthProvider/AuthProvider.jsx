import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../../Firebase/firebase.config';
import { useTitle } from '../../Utils/useTitle';

export const UserContext = createContext();
const AuthProvider = ( { children } ) => {

    const auth = getAuth( app );
    const [ user, setUser ] = useState();
    const [ loading, setLoading ] = useState( true );
    const [ activeLink, setActiveLink ] = useState( 'Home' );
    const [ isToggled, setIsToggled ] = useState( false );
    const [ openLoginPopUp, setOpenLoginPopUp ] = useState( false );
    const [ detailsModalOpen, setDetailsModalOpen ] = useState( false );
    const [ productForDetails, setProductForDetails ] = useState( null );

    // ! Store (create a new user if user doesn't exist in the database) User To MongoDB
    const storeProductInDB = async ( title, thumbnailImage, seller, description, price, listPrice, features, attributes, brand, manufacturerAttributes, category, quantity ) => {
        try {
            const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/products/add_product`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( {
                    uid,
                    email
                } )
            } );
            const data = await response.json();
            console.log( data );
        } catch ( error ) {
            console.log( error );
        }
    };


    // ! Auth Contexts and stuffs
    const signIn = ( email, password ) => {
        setLoading( true );
        return signInWithEmailAndPassword( auth, email, password );
    };

    const signInWithGoogle = () => {
        setLoading( true );
        return signInWithPopup( auth, new GoogleAuthProvider() );
    };

    const signInWithGithub = () => {
        setLoading( true );
        return signInWithPopup( auth, new GithubAuthProvider() );
    };

    const signUp = ( email, password ) => {
        setLoading( true );
        return createUserWithEmailAndPassword( auth, email, password );
    };

    const updateUserProfile = ( displayName, photoURL ) => {
        setLoading( true );
        return updateProfile( auth.currentUser, {
            displayName,
            photoURL
        } );
    };

    const logOut = () => {
        setLoading( true );
        return signOut( auth );
    };

    const requestAccessToken = async ( uid ) => {
        try {
            const response = await fetch( `${ import.meta.env.VITE_SERVERADDR }/auth/request_access_token`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( { uid } )
            } );
            const data = await response.json();
            localStorage.setItem( 'jwt-access-token', data.token );
        }
        catch ( error ) {
            console.log( error );
        }
    };

    const props = {
        user,
        setUser,
        signIn,
        signUp,
        updateUserProfile,
        logOut,
        signInWithGoogle,
        signInWithGithub,
        requestAccessToken,
        loading,
        setLoading,
        activeLink,
        setActiveLink,
        storeProductInDB,
        setIsToggled,
        isToggled,
        openLoginPopUp,
        setOpenLoginPopUp,
        detailsModalOpen,
        setDetailsModalOpen,
        productForDetails,
        setProductForDetails
    };

    useEffect( () => {
        useTitle( activeLink );
    }, [ activeLink ] );


    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, currentUser => {
            setUser( currentUser );
            setLoading( false );
        } );

        return () => {
            unsubscribe();
        };
    }, [] );

    return (
        <UserContext.Provider value={ props }>
            { children }
        </UserContext.Provider>
    );
};

export default AuthProvider;