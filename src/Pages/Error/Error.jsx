import React from 'react';
import cat from '../../assets/cat.jpg';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row justify-center items-center gap-4 bg-[#ffecce] text-secondary h-screen'>
            <img src={ cat } className='w-72' alt="" />
            <div className='flex flex-col justify-center items-center md:items-start max-w-screen-sm gap-4 text-center md:text-left'>
                <h1 className='text-6xl md:text-7xl font-bold'>How did you get here?</h1>
                <p className='text-4xl'>I couldn't find the page you were looking for.</p>
                <Link
                    className='underline underline-offset-1 hover:decoration-green-600'
                    to='/'
                >
                    Go back to homepage.
                </Link>
            </div>
        </div>
    );
};

export default Error;