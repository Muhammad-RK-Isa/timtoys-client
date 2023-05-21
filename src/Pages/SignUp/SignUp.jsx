import React, { useContext } from 'react';
import HeroImg from '../../assets/login-splash.svg';
import { Link } from 'react-router-dom';
import { UserContext } from './../../Providers/AuthProvider/AuthProvider';

const SignUp = () => {

    const { signUp } = useContext( UserContext );

    const handleSignUp = ( e ) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if ( password === confirmPassword ) {
            signUp( email, password )
                .then( result => console.log( result ) )
                .catch( error => console.log( error ) );
        }
    };


    return (
        <div className="hero mt-8 mb-20">
            <div className="grid md:grid-cols-2">
                <figure className='p-20 hidden md:block'>
                    <img src={ HeroImg } alt="figure" className='w-72' />
                </figure>
                <div className="card flex-shrink w-full max-w-sm h-min border border-opacity-50 rounded-lg ">
                    <form
                        className="card-body flex-grow-0 max-h-min"
                        onSubmit={ handleSignUp }
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
                                <span className="label-text font-bold text-accent">Create a strong password</span>
                            </label>
                            <input
                                type="text"
                                name='password'
                                placeholder="New password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-accent">Confirm your password</span>
                            </label>
                            <input
                                type="text"
                                name='confirmPassword'
                                placeholder="Confirm password"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Sign Up</button>
                        </div>

                        <div className='flex flex-col gap-6 justify-center items-center mt-6'>
                            <div>
                                Have an account?
                                <Link className='text-primary ml-2 inline font-semibold' to='/login'>Login</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;