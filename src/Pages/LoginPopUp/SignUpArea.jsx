import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from 'react-hot-toast';

const SignUpArea = () => {

    const { updateUserProfile, signUp, setLoading, setOpenLoginPopUp, requestAccessToken } = useContext( UserContext );

    const [ nameError, setNameError ] = useState( false );
    const [ emailError, setEmailError ] = useState( false );
    const [ passwordError, setPasswordError ] = useState( false );
    const [ confirmPasswordError, setConfirmPasswordError ] = useState( false );
    const [ existingAccount, setExistingAccount ] = useState( false );

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const profilePictureRef = useRef();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const handleSignUp = async () => {
        const email = emailRef.current.querySelector( "input" ).value;
        const password = passwordRef.current.querySelector( "input" ).value;
        const confirmPassword = confirmPasswordRef.current.querySelector( "input" ).value;
        const name = nameRef.current.querySelector( "input" ).value;

        const formDataImage = new FormData();
        formDataImage.append( 'key', `${ import.meta.env.VITE_IMAGEBB_API }` );
        formDataImage.append( 'image', profilePictureRef.current.files[ 0 ] );

        let hasErrors = false;

        if ( name.length > 30 || name === "" ) {
            setNameError( true );
            hasErrors = true;
        } else {
            setNameError( false );
        }

        if ( !emailRegex.test( email ) ) {
            setEmailError( true );
            hasErrors = true;
        } else {
            setEmailError( false );
        }

        if ( !passwordRegex.test( password ) ) {
            setPasswordError( true );
            hasErrors = true;
        } else {
            setPasswordError( false );
        }

        if ( password !== confirmPassword ) {
            setConfirmPasswordError( true );
            hasErrors = true;
        } else {
            setConfirmPasswordError( false );
        }

        if ( !hasErrors ) {
            setLoading( true );
            try {
                const response = await fetch( 'https://api.imgbb.com/1/upload', {
                    method: 'POST',
                    body: formDataImage
                } );
                const data = await response.json();
                const photoURL = data?.data?.url;
                try {
                    const result = await signUp( email, password );
                    requestAccessToken( { uid: result.user.uid } );
                    await updateUserProfile( name, photoURL )
                        .catch( error => {
                            console.log( error );
                        } );
                    toast.success( 'Account created succcesfully!' );
                    setOpenLoginPopUp( false );
                    navigateToPreviousLocation();
                } catch ( error ) {
                    setEmailError( error?.code?.includes( "auth/invalid-email" ) );
                    setExistingAccount( error?.code?.includes( "auth/email-already-in-use" ) );
                    setPasswordError( error?.code?.includes( "auth/missing-password" ) );
                    setLoading( false );
                }
                console.log( 'hits the auth' );
            } catch ( error ) {
                console.log( error );
            }
        }

    };

    const emailErrorHandler = () => {
        setEmailError( false );
        setExistingAccount( false );
    };


    return (
        <Card className="mx-auto w-full max-w-[24rem] shadow-none">
            <CardBody className="flex flex-col gap-4">
                <Input
                    ref={ nameRef }
                    label="Full Name"
                    size="lg"
                    type="text"
                    error={ nameError }
                    required
                    onChange={ () => nameError && setNameError( false ) }
                />
                <Typography variant="small" color="gray" className={ `${ nameError ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Name cannot be empty and must be less than 30 characters.
                </Typography>

                <Input
                    ref={ emailRef }
                    label={ `${ emailError ? 'Email (Invalid Email)' : 'Email' }` }
                    type="email"
                    size="lg"
                    error={ emailError || existingAccount }
                    onChange={ ( emailError || existingAccount ) && emailErrorHandler }
                />
                <Typography variant="small" color="gray" className={ `${ existingAccount ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    An account with this email already exists. Please login to continue.
                </Typography>
                <div>
                    <Input
                        ref={ passwordRef }
                        label="Password"
                        size="lg"
                        type="password"
                        error={ passwordError }
                        onChange={ () => passwordError && setPasswordError( false ) }
                    />
                    <Typography variant="small" color="gray" className={ `${ passwordError ? 'text-error' : 'text-warning' } inline-flex gap-1 font-normal mt-2 text-xs` }>
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Use at least 8 characters, one uppercase, one lowercase and one number.
                    </Typography>
                </div>
                <Input
                    ref={ confirmPasswordRef }
                    label="Confirm Password"
                    size="lg"
                    type="password"
                    error={ confirmPasswordError }
                    onChange={ () => confirmPasswordError && setConfirmPasswordError( false ) }
                />

                <Typography variant="small" color="gray" className={ `${ confirmPasswordError ? 'inline-flex' : 'hidden' } gap-1 font-normal mt-2 text-xs text-error` }>
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Passwords do not match.
                </Typography>

                <div className="form-control mt-4">
                    <label className="label ">Upload Profile Picture (Optional)</label>
                    <input
                        ref={ profilePictureRef }
                        type="file"
                        className="file-input file-input-bordered w-full"
                    />
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    className="bg-secondary shadow-gray-300 rounded"
                    fullWidth
                    onClick={ handleSignUp }
                >
                    Create Account
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SignUpArea;