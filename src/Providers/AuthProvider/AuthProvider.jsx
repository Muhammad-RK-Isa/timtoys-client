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
        setActiveLink
    };

    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, currentUser => {
            setUser( currentUser );
            setLoading( false );
        } );

        return () => {
            unsubscribe();
        }
    }, [ ] );

    return (
        <UserContext.Provider value={ props }>
            { children }
        </UserContext.Provider>
    );
};

export default AuthProvider;