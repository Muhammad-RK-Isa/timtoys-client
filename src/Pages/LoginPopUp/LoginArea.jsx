import React, { useContext, useRef, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Typography,
} from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from 'react-hot-toast';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const LoginArea = () => {

    const { signIn, signInWithGoogle, signInWithGithub, setOpenLoginPopUp, setLoading, requestAccessToken } = useContext( UserContext );
    const emailRef = useRef();
    const passwordRef = useRef();

    const [ passError, setPassError ] = useState( false );
    const [ emptyPass, setEmptyPass ] = useState( false );
    const [ emailError, setEmailError ] = useState( false );
    const [ userNotFound, setUserNotFound ] = useState( false );

    const handleSignIn = async () => {

        const email = emailRef.current.querySelector( "input" ).value;
        const password = passwordRef.current.querySelector( "input" ).value;

        let hasError = false;
        if ( !email ) {
            setEmailError( true );
            hasError = true;
        };

        if ( password === '' ) {
            setEmptyPass( true );
            hasError = true;
        };

        if ( !hasError ) {
            setLoading( true );
            try {
                const result = await signIn( email, password );
                toast.success( "Logged in successfully!" );
                requestAccessToken( { uid: result.user.uid } );
                console.log( result );
                setOpenLoginPopUp( false );
                setLoading( false );
            } catch ( error ) {
                console.log( error );
                toast.error( error.code.split( 'auth/' )[ 1 ] );
                setEmailError( error.code.includes( "auth/invalid-email" ) );
                setUserNotFound( error.code.includes( "auth/user-not-found" ) );
                setPassError( error.code.includes( "auth/wrong-password" ) );
                setLoading( false );
            }
        };
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then( result => {
                requestAccessToken( { uid: result.user.uid } );
                toast.success( "Logged in successfully!" );
                setOpenLoginPopUp( false );
            } )
            .catch( error => console.log( error ) );
    };

    const handleGithubSignIn = () => {
        signInWithGithub()
            .then( result => {
                requestAccessToken( { uid: result.user.uid } );
                toast.success( "Logged in successfully!" );
                setOpenLoginPopUp( false );
            } )
            .catch( error => console.log( error ) );
    };

    const handlePassChange = () => {
        if ( passError || emptyPass ) {
            setPassError( false );
            setEmptyPass( false );
        }
    };

    const handleEmailChange = () => {
        if ( emailError || userNotFound ) {
            setEmailError( false );
            setUserNotFound( false );
        }
    };

    return (
        <Card className="mx-auto w-full max-w-[24rem] shadow-none">
            <CardBody className="flex flex-col gap-4">
                <Input
                    label="Email"
                    size="lg"
                    ref={ emailRef }
                    error={ emailError || userNotFound }
                    onChange={ handleEmailChange }
                />
                <Typography variant="small" color="gray" className={ `${ emailError ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Invalid Email
                </Typography>
                <Typography variant="small" color="gray" className={ `${ userNotFound ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    User Not Found
                </Typography>
                <Input
                    label="Password"
                    size="lg"
                    type="password"
                    ref={ passwordRef }
                    error={ passError || emptyPass }
                    onChange={ handlePassChange }
                />
                <Typography variant="small" color="gray" className={ `${ ( passwordRef?.current?.querySelector( "input" )?.value && passError ) ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Wrong Password
                </Typography>
                <Typography variant="small" color="gray" className={ `${ emptyPass ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Password cannot be empty
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    className="bg-secondary shadow-gray-300 rounded"
                    fullWidth
                    onClick={ handleSignIn }
                >
                    Sign In
                </Button>
                <div class="divider">OR</div>
                <Button
                    className="inline-flex gap-2 items-center justify-center bg-secondary shadow-gray-300 rounded"
                    fullWidth
                    onClick={ handleGoogleSignIn }
                >
                    <FcGoogle size={ 18 } className="box-content" />
                    Continue with Google
                </Button>
                <Button
                    className="inline-flex gap-2 items-center justify-center bg-secondary shadow-gray-300 rounded mt-2"
                    fullWidth
                    onClick={ handleGithubSignIn }
                >
                    <AiFillGithub size={ 18 } className="box-content" />
                    Continue with Github
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginArea;