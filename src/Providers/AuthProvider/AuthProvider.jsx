import { createContext, useEffect, useState } from 'react';
import { app } from '../../Firebase/firebase.config';
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';

export const UserContext = createContext();
const AuthProvider = ( { children } ) => {

    const auth = getAuth( app );
    const [ user, setUser ] = useState( null );
    const [ loading, setLoading ] = useState( false );
    const [ activeLink, setActiveLink ] = useState( '' );

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

    const logOut = () => {
        setLoading( true );
        return signOut( auth );
    };


    // ! Products Contexts and stuffs
    const [ products, setProducts ] = useState( null );
    const [ category, setCategory ] = useState( null );
    const [ categories, setCategories ] = useState( null );
    const [ subCategories, setSubCategories ] = useState( [] );

    const requestCategories = async ( category ) => {
        try {
            const response = await fetch( `http://192.168.0.179:5000/categories` );
            const data = await response.json();
            setCategories( data );
        } catch ( error ) {
            console.log( error );
        }
    };
    const requestSubCategories = async ( category ) => {
        try {
            const response = await fetch( `http://192.168.0.179:5000/sub_categories?category=${ encodeURIComponent( category ) }` );
            const data = await response.json();
            setSubCategories( data );
        } catch ( error ) {
            console.log( error );
        }
    };

    const requestProductsByCategory = async ( category ) => {
        try {
            const response = await fetch( `http://192.168.0.179:5000/products/filter_by_category?category=${ encodeURIComponent( category ) }` );
            const data = await response.json();
            setProducts( data );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        requestCategories();
        requestSubCategories( category );
        requestProductsByCategory( category );
    }, [ category ] );


    const props = {
        user,
        setUser,
        signIn,
        signUp,
        logOut,
        signInWithGoogle,
        signInWithGithub,
        loading,
        setLoading,
        activeLink,
        setActiveLink,
        requestSubCategories,
        requestProductsByCategory,
        products,
        subCategories,
        category,
        setCategory,
        categories,
    };

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