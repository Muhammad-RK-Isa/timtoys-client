import React, { useContext } from 'react';
import HeroImg from '../../assets/login-splash.svg';
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './../../Providers/AuthProvider/AuthProvider';

const Login = () => {

    const { signIn, signInWithGoogle, signInWithGithub } = useContext( UserContext );

    const location = useLocation();
    const navigate = useNavigate();
    const previousLocation = location.state?.from?.pathname || '/';

    const navigateToPreviousLocation = () => {
        navigate( previousLocation, { replace: true } );
    };

    const handleSignIn = ( e ) => {
        eveent.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn( email, password )
            .then( result => {
                console.log( result );
                navigateToPreviousLocation();
            } )
            .catch( error => {
                setErrorMsg( error.message );
                console.log( error );
                setLoading( false );
            } );
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then( result => {
                console.log( result );
                navigateToPreviousLocation();
            } )
            .catch( error => console.log( error ) );
    };

    const handleGithubSignIn = () => {
        signInWithGithub()
            .then( result => {
                console.log( result );
                navigateToPreviousLocation();
            } )
            .catch( error => console.log( error ) );
    };


    return (
        <div className="hero mt-8 mb-20">
            <div className="grid md:grid-cols-2">
                <figure className='p-20 hidden md:block'>
                    <img src={ HeroImg } alt="figure" className='w-72' />
                </figure>
                <div className="card flex-shrink w-full max-w-sm h-min border border-opacity-50 rounded-lg ">
                    <div className="card-body flex-grow-0 max-h-min">
                        <form
                            onSubmit={ handleSignIn }
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-accent">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="E-mail"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-accent">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>

                        </form>
                        <div className='flex flex-col gap-6 justify-center items-center mt-6'>
                            <p className='text-sm font-semibold'>Or, Sign in with</p>
                            <div className='inline-flex gap-4'>
                                <button
                                    onClick={ handleGoogleSignIn }
                                    className='focus:outline-none'
                                >
                                    <FcGoogle size={ 24 } className='rounded-full p-2 bg-base-200 bg-opacity-60 box-content' />
                                </button>
                                <button
                                    onClick={ handleGithubSignIn }
                                    className='focus:outline-none'
                                >
                                    <VscGithub size={ 24 } className='rounded-full p-2 bg-base-200 bg-opacity-60 box-content' />
                                </button>

                            </div>
                            <div>
                                Don't have an account?
                                <Link className='text-primary ml-2 inline font-semibold' to='/signup'>Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;